package dev.ilja.portfolio.project;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record ProjectDto(
    UUID id,
    String slug,
    String status,
    int rank,
    List<String> tags,
    LocalizedText title,
    LocalizedText summary,
    LocalizedText impact,
    List<String> metrics,
    CaseStudy caseStudy,
    OffsetDateTime createdAt,
    OffsetDateTime updatedAt
) {
  public record CaseStudy(List<String> en, List<String> ru) {
  }
}
