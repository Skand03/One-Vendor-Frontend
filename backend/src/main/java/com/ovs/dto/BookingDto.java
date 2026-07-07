package com.ovs.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDto {
    private Long id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Address is required")
    private String address;

    @NotNull(message = "Preferred date is required")
    private LocalDate preferredDate;

    private String timeSlot;
    private String message;
    private String status;

    @NotNull(message = "Category ID is required")
    private Long categoryId;
    private String categoryName;

    @NotNull(message = "Service ID is required")
    private Long serviceId;
    private String serviceName;

    private LocalDateTime createdAt;
}
