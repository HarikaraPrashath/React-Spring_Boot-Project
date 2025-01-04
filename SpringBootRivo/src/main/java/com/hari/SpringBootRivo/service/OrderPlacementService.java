package com.hari.SpringBootRivo.service;


import com.hari.SpringBootRivo.model.OrderPlacement;
import com.hari.SpringBootRivo.repository.OrderPlacementRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderPlacementService {

    private final OrderPlacementRepo orderPlacementRepo;
    
    public OrderPlacementService(OrderPlacementRepo orderPlacementRepo) {
        this.orderPlacementRepo = orderPlacementRepo;
    }


    public List<OrderPlacement> getAllProducts() {
        return orderPlacementRepo.findAll();
    }

    public OrderPlacement getProductById(Integer id) {
        return orderPlacementRepo.findById(id).orElseThrow(()->new RuntimeException("Order Not Found"));
    }

    public OrderPlacement createProduct(OrderPlacement orderPlacement) {
        return orderPlacementRepo.save(orderPlacement);
    }

//upcoming days we will update this method
//    public OrderPlacement updateProduct(Integer id, OrderPlacement orderPlacement) {
//        return
//    }

    public void deleteProduct(Integer id) {
        OrderPlacement orderPlacement = getProductById(id);
        orderPlacementRepo.delete(orderPlacement);
    }
}
