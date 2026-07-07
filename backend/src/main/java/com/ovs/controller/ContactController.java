package com.ovs.controller;

import com.ovs.dto.ContactDto;
import com.ovs.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // Public contact endpoint
    @PostMapping("/contact")
    public ResponseEntity<ContactDto> submitMessage(@Valid @RequestBody ContactDto contactDto) {
        return new ResponseEntity<>(contactService.createContactMessage(contactDto), HttpStatus.CREATED);
    }

    // Admin endpoints
    @GetMapping("/admin/contact-messages")
    public ResponseEntity<List<ContactDto>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllContactMessages());
    }

    @GetMapping("/admin/contact-messages/{id}")
    public ResponseEntity<ContactDto> getMessageById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContactMessageById(id));
    }

    @PutMapping("/admin/contact-messages/{id}/status")
    public ResponseEntity<ContactDto> updateMessageStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusMap) {
        String status = statusMap.get("status");
        return ResponseEntity.ok(contactService.updateContactMessageStatus(id, status));
    }

    @DeleteMapping("/admin/contact-messages/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        contactService.deleteContactMessage(id);
        return ResponseEntity.ok().body("Contact message deleted successfully");
    }
}
