package com.ovs.controller;

import com.ovs.dto.WebsiteSettingDto;
import com.ovs.service.WebsiteSettingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class WebsiteSettingController {

    private final WebsiteSettingService websiteSettingService;

    public WebsiteSettingController(WebsiteSettingService websiteSettingService) {
        this.websiteSettingService = websiteSettingService;
    }

    @GetMapping("/settings")
    public ResponseEntity<WebsiteSettingDto> getSettings() {
        return ResponseEntity.ok(websiteSettingService.getSettings());
    }

    // Admin endpoint
    @PutMapping("/admin/settings")
    public ResponseEntity<WebsiteSettingDto> updateSettings(@Valid @RequestBody WebsiteSettingDto dto) {
        return ResponseEntity.ok(websiteSettingService.updateSettings(dto));
    }
}
