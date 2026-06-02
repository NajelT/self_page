package dev.ilja.portfolio.project;

import jakarta.validation.constraints.NotBlank;

public record LocalizedText(
    @NotBlank String en,
    @NotBlank String ru
) {
}
