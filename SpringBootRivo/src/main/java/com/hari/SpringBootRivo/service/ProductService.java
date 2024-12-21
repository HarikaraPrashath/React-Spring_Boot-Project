package com.hari.SpringBootRivo.service;

import com.hari.SpringBootRivo.model.Products;
import com.hari.SpringBootRivo.repository.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepo productRepo;

    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public List<Products> getAllProducts() {
        return productRepo.findAll();
    }

    public Products getProductById(Integer id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Products createProduct(Products product) {
        return productRepo.save(product);
    }

    public Products updateProduct(Integer id, Products productDetails) {
        Products product = getProductById(id);
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setSize(productDetails.getSize());
        product.setColor(productDetails.getColor());
        product.setImageUrl(productDetails.getImageUrl());
        return productRepo.save(product);
    }

    public void deleteProduct(Integer id) {
        Products product = getProductById(id);
        productRepo.delete(product);
    }
}
