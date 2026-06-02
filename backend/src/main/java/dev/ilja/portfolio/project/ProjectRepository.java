package dev.ilja.portfolio.project;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class ProjectRepository {
  private static final Pattern SLUG_CLEANUP = Pattern.compile("[^a-z0-9]+");
  private final JdbcTemplate jdbc;

  public ProjectRepository(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public List<ProjectDto> findAll() {
    String sql = """
        select id, slug, status, rank_order, created_at, updated_at
        from projects
        order by rank_order, created_at
        """;
    return jdbc.query(sql, (rs, rowNum) -> hydrate(mapBase(rs)));
  }

  public Optional<ProjectDto> findById(UUID id) {
    try {
      String sql = """
          select id, slug, status, rank_order, created_at, updated_at
          from projects
          where id = ?
          """;
      return Optional.of(hydrate(jdbc.queryForObject(sql, (rs, rowNum) -> mapBase(rs), id)));
    } catch (EmptyResultDataAccessException exception) {
      return Optional.empty();
    }
  }

  @Transactional
  public ProjectDto create(ProjectRequest request) {
    UUID id = UUID.randomUUID();
    String slug = normalizeSlug(request.slug(), request.title().en());
    jdbc.update("""
        insert into projects (id, slug, status, rank_order)
        values (?, ?, ?, ?)
        """, id, slug, request.status(), request.rank());
    replaceChildren(id, request);
    return findById(id).orElseThrow();
  }

  @Transactional
  public Optional<ProjectDto> update(UUID id, ProjectRequest request) {
    int updated = jdbc.update("""
        update projects
        set slug = ?, status = ?, rank_order = ?, updated_at = now()
        where id = ?
        """, normalizeSlug(request.slug(), request.title().en()), request.status(), request.rank(), id);
    if (updated == 0) {
      return Optional.empty();
    }
    deleteChildren(id);
    replaceChildren(id, request);
    return findById(id);
  }

  @Transactional
  public boolean delete(UUID id) {
    return jdbc.update("delete from projects where id = ?", id) > 0;
  }

  private ProjectBase mapBase(ResultSet rs) throws SQLException {
    return new ProjectBase(
        rs.getObject("id", UUID.class),
        rs.getString("slug"),
        rs.getString("status"),
        rs.getInt("rank_order"),
        rs.getObject("created_at", OffsetDateTime.class),
        rs.getObject("updated_at", OffsetDateTime.class)
    );
  }

  private ProjectDto hydrate(ProjectBase base) {
    Map<String, Translation> translations = translations(base.id());
    Translation en = translations.getOrDefault("en", new Translation("", "", ""));
    Translation ru = translations.getOrDefault("ru", en);
    return new ProjectDto(
        base.id(),
        base.slug(),
        base.status(),
        base.rank(),
        orderedStrings("project_tags", "label", base.id()),
        new LocalizedText(en.title(), ru.title()),
        new LocalizedText(en.summary(), ru.summary()),
        new LocalizedText(en.impact(), ru.impact()),
        orderedStrings("project_metrics", "label", base.id()),
        new ProjectDto.CaseStudy(caseStudy(base.id(), "en"), caseStudy(base.id(), "ru")),
        base.createdAt(),
        base.updatedAt()
    );
  }

  private Map<String, Translation> translations(UUID projectId) {
    String sql = """
        select lang, title, summary, impact
        from project_translations
        where project_id = ?
        """;
    Map<String, Translation> result = new LinkedHashMap<>();
    jdbc.query(sql, rs -> {
      result.put(rs.getString("lang"), new Translation(
          rs.getString("title"),
          rs.getString("summary"),
          rs.getString("impact")
      ));
    }, projectId);
    return result;
  }

  private List<String> orderedStrings(String table, String column, UUID projectId) {
    String sql = "select " + column + " from " + table + " where project_id = ? order by item_order";
    return jdbc.query(sql, (rs, rowNum) -> rs.getString(column), projectId);
  }

  private List<String> caseStudy(UUID projectId, String lang) {
    String sql = """
        select body
        from project_case_study_items
        where project_id = ? and lang = ?
        order by item_order
        """;
    return jdbc.query(sql, (rs, rowNum) -> rs.getString("body"), projectId, lang);
  }

  private void replaceChildren(UUID id, ProjectRequest request) {
    insertTranslation(id, "en", request.title().en(), request.summary().en(), request.impact().en());
    insertTranslation(id, "ru", request.title().ru(), request.summary().ru(), request.impact().ru());
    insertOrdered("project_tags", "label", id, cleanList(request.tags()));
    insertOrdered("project_metrics", "label", id, cleanList(request.metrics()));
    ProjectDto.CaseStudy caseStudy = request.caseStudy() == null
        ? new ProjectDto.CaseStudy(List.of(), List.of())
        : request.caseStudy();
    insertCaseStudy(id, "en", cleanList(caseStudy.en()));
    insertCaseStudy(id, "ru", cleanList(caseStudy.ru()));
  }

  private void deleteChildren(UUID id) {
    jdbc.update("delete from project_translations where project_id = ?", id);
    jdbc.update("delete from project_tags where project_id = ?", id);
    jdbc.update("delete from project_metrics where project_id = ?", id);
    jdbc.update("delete from project_case_study_items where project_id = ?", id);
  }

  private void insertTranslation(UUID id, String lang, String title, String summary, String impact) {
    jdbc.update("""
        insert into project_translations (project_id, lang, title, summary, impact)
        values (?, ?, ?, ?, ?)
        """, id, lang, title, summary, impact);
  }

  private void insertOrdered(String table, String column, UUID projectId, List<String> values) {
    for (int i = 0; i < values.size(); i++) {
      jdbc.update(
          "insert into " + table + " (project_id, item_order, " + column + ") values (?, ?, ?)",
          projectId,
          i + 1,
          values.get(i)
      );
    }
  }

  private void insertCaseStudy(UUID projectId, String lang, List<String> values) {
    for (int i = 0; i < values.size(); i++) {
      jdbc.update("""
          insert into project_case_study_items (project_id, lang, item_order, body)
          values (?, ?, ?, ?)
          """, projectId, lang, i + 1, values.get(i));
    }
  }

  private List<String> cleanList(List<String> input) {
    if (input == null) {
      return List.of();
    }
    List<String> result = new ArrayList<>();
    for (String item : input) {
      if (item != null && !item.isBlank()) {
        result.add(item.trim());
      }
    }
    return result;
  }

  private String normalizeSlug(String explicitSlug, String fallback) {
    String source = explicitSlug == null || explicitSlug.isBlank() ? fallback : explicitSlug;
    String slug = SLUG_CLEANUP.matcher(source.toLowerCase(Locale.ROOT)).replaceAll("-");
    return slug.replaceAll("(^-|-$)", "");
  }

  private record ProjectBase(
      UUID id,
      String slug,
      String status,
      int rank,
      OffsetDateTime createdAt,
      OffsetDateTime updatedAt
  ) {
  }

  private record Translation(String title, String summary, String impact) {
  }
}
