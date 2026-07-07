package com.ovs.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestimonialDto {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    private String position;
    private String company;

    @NotBlank(message = "Content is required")
    private String content;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot exceed 5")
    private Integer rating;

    private String imageUrl;
}
