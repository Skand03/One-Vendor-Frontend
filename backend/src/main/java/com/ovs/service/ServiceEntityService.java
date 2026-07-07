package com.ovs.service;

import com.ovs.dto.ServiceDto;
import com.ovs.entity.Category;
import com.ovs.entity.ServiceEntity;
import com.ovs.exception.ResourceNotFoundException;
import com.ovs.repository.CategoryRepository;
import com.ovs.repository.ServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceEntityService {

    private final ServiceRepository serviceRepository;
    private final CategoryRepository categoryRepository;

    public ServiceEntityService(ServiceRepository serviceRepository, CategoryRepository categoryRepository) {
        this.serviceRepository = serviceRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public List<ServiceDto> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ServiceDto> getServicesByCategory(Long categoryId) {
        return serviceRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ServiceDto getServiceById(Long id) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        return convertToDto(service);
    }

    @Transactional
    public ServiceDto createService(ServiceDto dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));

        ServiceEntity service = ServiceEntity.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .amcApplicable(dto.getAmcApplicable() != null && dto.getAmcApplicable())
                .category(category)
                .build();

        ServiceEntity saved = serviceRepository.save(service);
        return convertToDto(saved);
    }

    @Transactional
    public ServiceDto updateService(Long id, ServiceDto dto) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));

        service.setName(dto.getName());
        service.setDescription(dto.getDescription());
        service.setImageUrl(dto.getImageUrl());
        service.setAmcApplicable(dto.getAmcApplicable() != null && dto.getAmcApplicable());
        service.setCategory(category);

        ServiceEntity saved = serviceRepository.save(service);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteService(Long id) {
        ServiceEntity service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + id));
        serviceRepository.delete(service);
    }

    public ServiceDto convertToDto(ServiceEntity service) {
        return ServiceDto.builder()
                .id(service.getId())
                .name(service.getName())
                .description(service.getDescription())
                .imageUrl(service.getImageUrl())
                .amcApplicable(service.getAmcApplicable())
                .categoryId(service.getCategory().getId())
                .categoryName(service.getCategory().getName())
                .build();
    }
}
