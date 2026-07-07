package com.ovs.service;

import com.ovs.dto.WebsiteSettingDto;
import com.ovs.entity.WebsiteSetting;
import com.ovs.exception.ResourceNotFoundException;
import com.ovs.repository.WebsiteSettingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class WebsiteSettingService {

    private final WebsiteSettingRepository websiteSettingRepository;

    public WebsiteSettingService(WebsiteSettingRepository websiteSettingRepository) {
        this.websiteSettingRepository = websiteSettingRepository;
    }

    @Transactional
    public WebsiteSettingDto getSettings() {
        List<WebsiteSetting> list = websiteSettingRepository.findAll();
        if (list.isEmpty()) {
            // Seed a default one if none exists
            WebsiteSetting defaultSettings = WebsiteSetting.builder()
                    .companyName("One Vendor Solutions")
                    .email("onevendorsolutions@gmail.com")
                    .phone("+91 85760 84127")
                    .address("123 Corporate Blvd, Business District, Delhi, India")
                    .whatsappNumber("918576084127")
                    .aboutText("Experience B2B procurement excellence.")
                    .logoUrl("/logo.jpg")
                    .build();
            WebsiteSetting saved = websiteSettingRepository.save(defaultSettings);
            return convertToDto(saved);
        }
        return convertToDto(list.get(0));
    }

    @Transactional
    public WebsiteSettingDto updateSettings(WebsiteSettingDto dto) {
        List<WebsiteSetting> list = websiteSettingRepository.findAll();
        WebsiteSetting settings;
        if (list.isEmpty()) {
            settings = new WebsiteSetting();
        } else {
            settings = list.get(0);
        }

        settings.setCompanyName(dto.getCompanyName());
        settings.setEmail(dto.getEmail());
        settings.setPhone(dto.getPhone());
        settings.setAddress(dto.getAddress());
        settings.setWhatsappNumber(dto.getWhatsappNumber());
        settings.setAboutText(dto.getAboutText());
        settings.setLogoUrl(dto.getLogoUrl());

        WebsiteSetting saved = websiteSettingRepository.save(settings);
        return convertToDto(saved);
    }

    public WebsiteSettingDto convertToDto(WebsiteSetting setting) {
        return WebsiteSettingDto.builder()
                .id(setting.getId())
                .companyName(setting.getCompanyName())
                .email(setting.getEmail())
                .phone(setting.getPhone())
                .address(setting.getAddress())
                .whatsappNumber(setting.getWhatsappNumber())
                .aboutText(setting.getAboutText())
                .logoUrl(setting.getLogoUrl())
                .build();
    }
}
