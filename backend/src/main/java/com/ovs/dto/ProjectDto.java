package com.ovs.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDto {
    private Long id;

    @NotBlank(message = "Project name is required")
    private String name;

    private String description;
    private String imageUrl;
    private String clientName;
    private LocalDate completionDate;
    private Long categoryId;
    private String categoryName;
}
