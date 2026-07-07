package com.ovs.repository;

import com.ovs.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByPhone(String phone);
    List<Booking> findByEmail(String email);
    List<Booking> findByStatus(String status);
}
