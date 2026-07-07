package com.ovs.service;

import com.ovs.dto.BookingDto;
import com.ovs.entity.Booking;
import com.ovs.entity.Category;
import com.ovs.entity.ServiceEntity;
import com.ovs.exception.ResourceNotFoundException;
import com.ovs.repository.BookingRepository;
import com.ovs.repository.CategoryRepository;
import com.ovs.repository.ServiceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CategoryRepository categoryRepository;
    private final ServiceRepository serviceRepository;
    private final EmailService emailService;

    public BookingService(BookingRepository bookingRepository,
                          CategoryRepository categoryRepository,
                          ServiceRepository serviceRepository,
                          EmailService emailService) {
        this.bookingRepository = bookingRepository;
        this.categoryRepository = categoryRepository;
        this.serviceRepository = serviceRepository;
        this.emailService = emailService;
    }

    @Transactional(readOnly = true)
    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BookingDto getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        return convertToDto(booking);
    }

    @Transactional
    public BookingDto createBooking(BookingDto dto) {
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));

        ServiceEntity service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new ResourceNotFoundException("Service not found with id: " + dto.getServiceId()));

        Booking booking = Booking.builder()
                .fullName(dto.getFullName())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .address(dto.getAddress())
                .preferredDate(dto.getPreferredDate())
                .timeSlot(dto.getTimeSlot())
                .message(dto.getMessage())
                .status("PENDING")
                .category(category)
                .service(service)
                .build();

        Booking saved = bookingRepository.save(booking);

        // Send email notification to owner in the background/safely
        try {
            emailService.sendBookingNotification(saved);
        } catch (Exception e) {
            System.err.println("Error calling email service: " + e.getMessage());
        }

        return convertToDto(saved);
    }

    @Transactional
    public BookingDto updateBookingStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));

        booking.setStatus(status.toUpperCase());
        Booking saved = bookingRepository.save(booking);
        return convertToDto(saved);
    }

    @Transactional
    public void deleteBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
        bookingRepository.delete(booking);
    }

    public BookingDto convertToDto(Booking booking) {
        return BookingDto.builder()
                .id(booking.getId())
                .fullName(booking.getFullName())
                .phone(booking.getPhone())
                .email(booking.getEmail())
                .address(booking.getAddress())
                .preferredDate(booking.getPreferredDate())
                .timeSlot(booking.getTimeSlot())
                .message(booking.getMessage())
                .status(booking.getStatus())
                .categoryId(booking.getCategory().getId())
                .categoryName(booking.getCategory().getName())
                .serviceId(booking.getService().getId())
                .serviceName(booking.getService().getName())
                .createdAt(booking.getCreatedAt())
                .build();
    }
}
