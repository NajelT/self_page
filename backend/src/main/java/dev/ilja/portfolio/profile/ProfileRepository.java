package dev.ilja.portfolio.profile;

import dev.ilja.portfolio.project.LocalizedText;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ProfileRepository {
  private final JdbcTemplate jdbc;

  public ProfileRepository(JdbcTemplate jdbc) {
    this.jdbc = jdbc;
  }

  public ProfileDto getProfile() {
    UUID profileId = jdbc.queryForObject("select id from profiles order by created_at limit 1", UUID.class);
    return jdbc.queryForObject("""
        select name, location, linkedin, headline_en, headline_ru, intro_en, intro_ru, availability_en, availability_ru
        from profiles
        where id = ?
        """, (rs, rowNum) -> new ProfileDto(
        rs.getString("name"),
        rs.getString("location"),
        rs.getString("linkedin"),
        new ProfileDto.LocalizedRoles(roles(profileId, "en"), roles(profileId, "ru")),
        new LocalizedText(rs.getString("headline_en"), rs.getString("headline_ru")),
        new LocalizedText(rs.getString("intro_en"), rs.getString("intro_ru")),
        new LocalizedText(rs.getString("availability_en"), rs.getString("availability_ru")),
        skills(profileId),
        timeline(profileId)
    ), profileId);
  }

  private List<String> roles(UUID profileId, String lang) {
    return jdbc.query("""
        select label
        from profile_roles
        where profile_id = ? and lang = ?
        order by item_order
        """, (rs, rowNum) -> rs.getString("label"), profileId, lang);
  }

  private List<String> skills(UUID profileId) {
    return jdbc.query("""
        select label
        from profile_skills
        where profile_id = ?
        order by item_order
        """, (rs, rowNum) -> rs.getString("label"), profileId);
  }

  private List<ProfileDto.TimelineItem> timeline(UUID profileId) {
    return jdbc.query("""
        select period, company, role, note
        from profile_timeline_items
        where profile_id = ?
        order by item_order
        """, (rs, rowNum) -> new ProfileDto.TimelineItem(
        rs.getString("period"),
        rs.getString("company"),
        rs.getString("role"),
        rs.getString("note")
    ), profileId);
  }
}
