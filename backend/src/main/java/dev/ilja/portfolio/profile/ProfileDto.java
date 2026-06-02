package dev.ilja.portfolio.profile;

import dev.ilja.portfolio.project.LocalizedText;
import java.util.List;

public record ProfileDto(
    String name,
    String location,
    String linkedin,
    LocalizedRoles roles,
    LocalizedText headline,
    LocalizedText intro,
    LocalizedText availability,
    List<String> skills,
    List<TimelineItem> timeline
) {
  public record LocalizedRoles(List<String> en, List<String> ru) {
  }

  public record TimelineItem(String period, String company, String role, String note) {
  }
}
