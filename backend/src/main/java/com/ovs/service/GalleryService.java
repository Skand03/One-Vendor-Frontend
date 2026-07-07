package com.ovs.service;

import com.ovs.dto.GalleryDto;
import com.ovs.entity.Category;
import com.ovs.entity.Gallery;
import com.ovs.exception.ResourceNotFoundException;
import com.ovs.repository.CategoryRepository;
import com.ovs.repository.GalleryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final CategoryRepository categoryRepository;

    public GalleryService(GalleryRepository galleryRepository, CategoryRepository categoryRepository) {
        this.galleryRepository = galleryRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<GalleryDto> getAllGalleryItems() {
        return galleryRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<GalleryDto> getGalleryItemsByCategory(Long categoryId) {
        return galleryRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public GalleryDto getGalleryItemById(Long id) {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));
        return convertToDto(gallery);
    }

    @Transactional
    public GalleryDto createGalleryItem(GalleryDto dto) {
        Category category = null;
        if (dto.getCategoryId() != null) {
            category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));
        }

        Gallery gallery = Gallery.builder()
                .title(dto.getTitle())
                .imageUrl(dto.getImageUrl())
                .category(category)
                .build();

        Gallery saved = galleryRepository.save(gallery);
        return convertToDto(saved);
    }

    @Transactional
    public GalleryDto updateGalleryItem(Long id, GalleryDto dto) {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));

        Category category = null;
        if (dto.getCategoryId() != null) {
            category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));
        }

        gallery.setTitle(dto.getTitle());
        gallery.setImageUrl(dto.getImageUrl());
        gallery.setCategory(category);

        Gallery saved = galleryRepository.save(gallery);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteGalleryItem(Long id) {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found with id: " + id));
        galleryRepository.delete(gallery);
    }

    public GalleryDto convertToDto(Gallery gallery) {
        return GalleryDto.builder()
                .id(gallery.getId())
                .title(gallery.getTitle())
                .imageUrl(gallery.getImageUrl())
                .categoryId(gallery.getCategory() != null ? gallery.getCategory().getId() : null)
                .categoryName(gallery.getCategory() != null ? gallery.getCategory().getName() : null)
                .build();
    }
}
