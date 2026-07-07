package com.ovs.repository;

import com.ovs.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByCategoryId(Long categoryId);
    List<ServiceEntity> findByNameContainingIgnoreCase(String query);
}
