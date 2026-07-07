package com.ovs.controller;

import com.ovs.dto.ServiceDto;
import com.ovs.service.ServiceEntityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ServiceController {

    private final ServiceEntityService serviceService;

    public ServiceController(ServiceEntityService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping("/services")
    public ResponseEntity<List<ServiceDto>> getAllServices(
            @RequestParam(required = false) Long categoryId) {
        if (categoryId != null) {
            return ResponseEntity.ok(serviceService.getServicesByCategory(categoryId));
        }
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<ServiceDto> getServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceService.getServiceById(id));
    }

    // Admin endpoints
    @PostMapping("/admin/services")
    public ResponseEntity<ServiceDto> createService(@Valid @RequestBody ServiceDto serviceDto) {
        return new ResponseEntity<>(serviceService.createService(serviceDto), HttpStatus.CREATED);
    }

    @PutMapping("/admin/services/{id}")
    public ResponseEntity<ServiceDto> updateService(@PathVariable Long id, @Valid @RequestBody ServiceDto serviceDto) {
        return ResponseEntity.ok(serviceService.updateService(id, serviceDto));
    }

    @DeleteMapping("/admin/services/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.ok().body("Service deleted successfully");
    }
}
