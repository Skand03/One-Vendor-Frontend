package com.ovs.controller;

import com.ovs.dto.TestimonialDto;
import com.ovs.service.TestimonialService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping("/testimonials")
    public ResponseEntity<List<TestimonialDto>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAllTestimonials());
    }

    // Admin endpoints
    @PostMapping("/admin/testimonials")
    public ResponseEntity<TestimonialDto> createTestimonial(@Valid @RequestBody TestimonialDto testimonialDto) {
        return new ResponseEntity<>(testimonialService.createTestimonial(testimonialDto), HttpStatus.CREATED);
    }

    @PutMapping("/admin/testimonials/{id}")
    public ResponseEntity<TestimonialDto> updateTestimonial(@PathVariable Long id, @Valid @RequestBody TestimonialDto testimonialDto) {
        return ResponseEntity.ok(testimonialService.updateTestimonial(id, testimonialDto));
    }

    @DeleteMapping("/admin/testimonials/{id}")
    public ResponseEntity<?> deleteTestimonial(@PathVariable Long id) {
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.ok().body("Testimonial deleted successfully");
    }
}
