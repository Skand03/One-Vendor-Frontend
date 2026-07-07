package com.ovs.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceDto {
    private Long id;

    @NotBlank(message = "Service name is required")
    private String name;

    private String description;
    private String imageUrl;
    
    private Boolean amcApplicable = false;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    private String categoryName;
}
