package com.ovs.service;

import com.ovs.dto.ProjectDto;
import com.ovs.entity.Category;
import com.ovs.entity.Project;
import com.ovs.exception.ResourceNotFoundException;
import com.ovs.repository.CategoryRepository;
import com.ovs.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final CategoryRepository categoryRepository;

    public ProjectService(ProjectRepository projectRepository, CategoryRepository categoryRepository) {
        this.projectRepository = projectRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getProjectsByCategory(Long categoryId) {
        return projectRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return convertToDto(project);
    }

    @Transactional
    public ProjectDto createProject(ProjectDto dto) {
        Category category = null;
        if (dto.getCategoryId() != null) {
            category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));
        }

        Project project = Project.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .clientName(dto.getClientName())
                .completionDate(dto.getCompletionDate())
                .category(category)
                .build();

        Project saved = projectRepository.save(project);
        return convertToDto(saved);
    }

    @Transactional
    public ProjectDto updateProject(Long id, ProjectDto dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        Category category = null;
        if (dto.getCategoryId() != null) {
            category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));
        }

        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setImageUrl(dto.getImageUrl());
        project.setClientName(dto.getClientName());
        project.setCompletionDate(dto.getCompletionDate());
        project.setCategory(category);

        Project saved = projectRepository.save(project);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        projectRepository.delete(project);
    }

    public ProjectDto convertToDto(Project project) {
        return ProjectDto.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .imageUrl(project.getImageUrl())
                .clientName(project.getClientName())
                .completionDate(project.getCompletionDate())
                .categoryId(project.getCategory() != null ? project.getCategory().getId() : null)
                .categoryName(project.getCategory() != null ? project.getCategory().getName() : null)
                .build();
    }
}
