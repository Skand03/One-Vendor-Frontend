package com.ovs.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GalleryDto {
    private Long id;

    @NotBlank(message = "Gallery title is required")
    private String title;

    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    private Long categoryId;
    private String categoryName;
}
