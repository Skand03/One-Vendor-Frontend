package com.ovs.controller;

import com.ovs.dto.GalleryDto;
import com.ovs.service.GalleryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class GalleryController {

    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @GetMapping("/gallery")
    public ResponseEntity<List<GalleryDto>> getAllGalleryItems(
            @RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            return ResponseEntity.ok(galleryService.getGalleryItemsByCategory(categoryId));
        }
        return ResponseEntity.ok(galleryService.getAllGalleryItems());
    }

    @GetMapping("/gallery/{id}")
    public ResponseEntity<GalleryDto> getGalleryItemById(@PathVariable Long id) {
        return ResponseEntity.ok(galleryService.getGalleryItemById(id));
    }

    // Admin endpoints
    @PostMapping("/admin/gallery")
    public ResponseEntity<GalleryDto> createGalleryItem(@Valid @RequestBody GalleryDto galleryDto) {
        return new ResponseEntity<>(galleryService.createGalleryItem(galleryDto), HttpStatus.CREATED);
    }

    @PutMapping("/admin/gallery/{id}")
    public ResponseEntity<GalleryDto> updateGalleryItem(@PathVariable Long id, @Valid @RequestBody GalleryDto galleryDto) {
        return ResponseEntity.ok(galleryService.updateGalleryItem(id, galleryDto));
    }

    @DeleteMapping("/admin/gallery/{id}")
    public ResponseEntity<?> deleteGalleryItem(@PathVariable Long id) {
        galleryService.deleteGalleryItem(id);
        return ResponseEntity.ok().body("Gallery item deleted successfully");
    }
}
