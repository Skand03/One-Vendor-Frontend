package com.ovs.controller;

import com.ovs.dto.BookingDto;
import com.ovs.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // Public booking endpoint
    @PostMapping("/bookings")
    public ResponseEntity<BookingDto> createBooking(@Valid @RequestBody BookingDto bookingDto) {
        return new ResponseEntity<>(bookingService.createBooking(bookingDto), HttpStatus.CREATED);
    }

    // Admin endpoints
    @GetMapping("/admin/bookings")
    public ResponseEntity<List<BookingDto>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/admin/bookings/{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    @PutMapping("/admin/bookings/{id}/status")
    public ResponseEntity<BookingDto> updateBookingStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusMap) {
        String status = statusMap.get("status");
        return ResponseEntity.ok(bookingService.updateBookingStatus(id, status));
    }

    @DeleteMapping("/admin/bookings/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok().body("Booking deleted successfully");
    }
}
