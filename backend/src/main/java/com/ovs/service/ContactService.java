package com.ovs.service;

import com.ovs.dto.ContactDto;
import com.ovs.entity.Contact;
import com.ovs.exception.ResourceNotFoundException;
import com.ovs.repository.ContactRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Transactional(readOnly = true)
    public List<ContactDto> getAllContactMessages() {
        return contactRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ContactDto getContactMessageById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));
        return convertToDto(contact);
    }

    @Transactional
    public ContactDto createContactMessage(ContactDto dto) {
        Contact contact = Contact.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .status("UNREAD")
                .build();

        Contact saved = contactRepository.save(contact);
        return convertToDto(saved);
    }

    @Transactional
    public ContactDto updateContactMessageStatus(Long id, String status) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));

        contact.setStatus(status.toUpperCase());
        Contact saved = contactRepository.save(contact);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteContactMessage(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));
        contactRepository.delete(contact);
    }

    public ContactDto convertToDto(Contact contact) {
        return ContactDto.builder()
                .id(contact.getId())
                .name(contact.getName())
                .email(contact.getEmail())
                .phone(contact.getPhone())
                .subject(contact.getSubject())
                .message(contact.getMessage())
                .createdAt(contact.getCreatedAt())
                .status(contact.getStatus())
                .build();
    }
}
