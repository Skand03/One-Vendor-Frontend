package com.ovs.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "website_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WebsiteSetting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 20)
    private String phone;

    @Column(nullable = false, length = 500)
    private String address;

    @Column(name = "whatsapp_number", nullable = false, length = 20)
    private String whatsappNumber;

    @Column(name = "about_text", columnDefinition = "TEXT")
    private String aboutText;

    @Column(name = "logo_url", length = 500)
    private String logoUrl;
}
