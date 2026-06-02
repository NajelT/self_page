package dev.ilja.portfolio.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "portfolio")
public record PortfolioProperties(String backofficeToken) {
}
