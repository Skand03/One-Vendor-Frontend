package com.ovs.controller;

import com.ovs.dto.ProjectDto;
import com.ovs.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDto>> getAllProjects(
            @RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            return ResponseEntity.ok(projectService.getProjectsByCategory(categoryId));
        }
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    // Admin endpoints
    @PostMapping("/admin/projects")
    public ResponseEntity<ProjectDto> createProject(@Valid @RequestBody ProjectDto projectDto) {
        return new ResponseEntity<>(projectService.createProject(projectDto), HttpStatus.CREATED);
    }

    @PutMapping("/admin/projects/{id}")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectDto projectDto) {
        return ResponseEntity.ok(projectService.updateProject(id, projectDto));
    }

    @DeleteMapping("/admin/projects/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().body("Project deleted successfully");
    }
}
