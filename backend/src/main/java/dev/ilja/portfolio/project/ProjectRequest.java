package dev.ilja.portfolio.project;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;

public record ProjectRequest(
    String slug,
    @NotBlank String status,
    @Positive int rank,
    List<String> tags,
    @Valid @NotNull LocalizedText title,
    @Valid @NotNull LocalizedText summary,
    @Valid @NotNull LocalizedText impact,
    List<String> metrics,
    ProjectDto.CaseStudy caseStudy
) {
}
