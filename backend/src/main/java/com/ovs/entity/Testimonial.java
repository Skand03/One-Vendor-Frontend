package com.ovs.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "testimonials")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 100)
    private String position;

    @Column(length = 100)
    private String company;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Integer rating = 5;

    @Column(name = "image_url", length = 500)
    private String imageUrl;
}
