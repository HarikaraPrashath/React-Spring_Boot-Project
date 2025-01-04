package com.hari.SpringBootRivo.repository;

import com.hari.SpringBootRivo.model.OrderPlacement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderPlacementRepo  extends JpaRepository<OrderPlacement,Integer> {
}
