package com.hari.SpringBootRivo.controller;

import com.hari.SpringBootRivo.model.OrderPlacement;
import com.hari.SpringBootRivo.service.OrderPlacementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/OrderPlace")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderPlaceController {

    private final OrderPlacementService orderPlacementService;

    public OrderPlaceController(OrderPlacementService orderPlacementService) {
        this.orderPlacementService = orderPlacementService;
    }

    @GetMapping("/getAllOrders")
    public ResponseEntity<List<OrderPlacement>> getAllProducts() {
        return ResponseEntity.ok(orderPlacementService.getAllProducts());
    }

    @GetMapping("/singleOrder/{id}")
    public ResponseEntity<OrderPlacement> getProductById(@PathVariable Integer id) {
        return ResponseEntity.ok(orderPlacementService.getProductById(id));
    }

    @PostMapping("/OrderCreation")
    public ResponseEntity<OrderPlacement> createProduct(@RequestBody OrderPlacement orderPlacement) {
        System.out.println("Received Data: " + orderPlacement);
        return ResponseEntity.ok(orderPlacementService.createProduct(orderPlacement));
    }

//    @PutMapping("/update/{id}")
//    public ResponseEntity<OrderPlacement> updateProduct(@PathVariable Integer id, @RequestBody Products productDetails) {
//        return ResponseEntity.ok(orderPlacementService.updateProduct(id, productDetails));
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        orderPlacementService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
