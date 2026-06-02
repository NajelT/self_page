package dev.ilja.portfolio.project;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
  private final ProjectRepository projects;

  public ProjectController(ProjectRepository projects) {
    this.projects = projects;
  }

  @GetMapping
  public List<ProjectDto> all() {
    return projects.findAll();
  }

  @PostMapping
  public ResponseEntity<ProjectDto> create(@Valid @RequestBody ProjectRequest request) {
    ProjectDto created = projects.create(request);
    return ResponseEntity.created(URI.create("/api/projects/" + created.id())).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ProjectDto> update(@PathVariable UUID id, @Valid @RequestBody ProjectRequest request) {
    return projects.update(id, request)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, Boolean>> delete(@PathVariable UUID id) {
    return projects.delete(id) ? ResponseEntity.ok(Map.of("ok", true)) : ResponseEntity.notFound().build();
  }
}
