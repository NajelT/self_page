package dev.ilja.portfolio.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminTokenInterceptor implements HandlerInterceptor {
  private static final Set<String> WRITE_METHODS = Set.of("POST", "PUT", "PATCH", "DELETE");
  private final PortfolioProperties properties;

  public AdminTokenInterceptor(PortfolioProperties properties) {
    this.properties = properties;
  }

  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
    if (!request.getRequestURI().startsWith("/api/") || !WRITE_METHODS.contains(request.getMethod())) {
      return true;
    }

    String expected = "Bearer " + properties.backofficeToken();
    String actual = request.getHeader(HttpHeaders.AUTHORIZATION);
    if (expected.equals(actual)) {
      return true;
    }

    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.setContentType("application/json");
    response.getWriter().write("{\"error\":\"Missing or invalid backoffice token.\"}");
    return false;
  }
}
