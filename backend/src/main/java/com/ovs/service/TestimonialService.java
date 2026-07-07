package com.ovs.service;

import com.ovs.dto.TestimonialDto;
import com.ovs.entity.Testimonial;
import com.ovs.exception.ResourceNotFoundException;
import com.ovs.repository.TestimonialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public TestimonialService(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    @Transactional(readOnly = true)
    public List<TestimonialDto> getAllTestimonials() {
        return testimonialRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TestimonialDto getTestimonialById(Long id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));
        return convertToDto(testimonial);
    }

    @Transactional
    public TestimonialDto createTestimonial(TestimonialDto dto) {
        Testimonial testimonial = Testimonial.builder()
                .name(dto.getName())
                .position(dto.getPosition())
                .company(dto.getCompany())
                .content(dto.getContent())
                .rating(dto.getRating() != null ? dto.getRating() : 5)
                .imageUrl(dto.getImageUrl())
                .build();

        Testimonial saved = testimonialRepository.save(testimonial);
        return convertToDto(saved);
    }

    @Transactional
    public TestimonialDto updateTestimonial(Long id, TestimonialDto dto) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));

        testimonial.setName(dto.getName());
        testimonial.setPosition(dto.getPosition());
        testimonial.setCompany(dto.getCompany());
        testimonial.setContent(dto.getContent());
        testimonial.setRating(dto.getRating() != null ? dto.getRating() : 5);
        testimonial.setImageUrl(dto.getImageUrl());

        Testimonial saved = testimonialRepository.save(testimonial);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteTestimonial(Long id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));
        testimonialRepository.delete(testimonial);
    }

    public TestimonialDto convertToDto(Testimonial testimonial) {
        return TestimonialDto.builder()
                .id(testimonial.getId())
                .name(testimonial.getName())
                .position(testimonial.getPosition())
                .company(testimonial.getCompany())
                .content(testimonial.getContent())
                .rating(testimonial.getRating())
                .imageUrl(testimonial.getImageUrl())
                .build();
    }
}
