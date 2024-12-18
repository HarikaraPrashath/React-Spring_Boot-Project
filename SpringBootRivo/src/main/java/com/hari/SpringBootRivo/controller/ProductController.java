package com.hari.SpringBootRivo.controller;

import com.hari.SpringBootRivo.model.Products;
import com.hari.SpringBootRivo.service.CloudinaryService;
import com.hari.SpringBootRivo.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private  final ProductService productService;
    private final CloudinaryService cloudinaryService;

    public ProductController(ProductService productService, CloudinaryService cloudinaryService) {
        this.productService = productService;
        this.cloudinaryService = cloudinaryService;
    }


    @PostMapping("/uploadimage")
    public ResponseEntity<?> handleImageUploadUrl(@RequestParam("my_file") MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            Map result = cloudinaryService.uploadImage(bytes);
            return ResponseEntity.ok().body(result);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred during image upload");
        }
    }

    @GetMapping
    public ResponseEntity<List<Products>> getAllProducts(){
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable Integer id){
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<Products> createProduct (@RequestBody Products products){
        return ResponseEntity.ok(productService.createProduct(products));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Products> updateProduct(@PathVariable Integer id, @RequestBody Products productDetails) {
        return ResponseEntity.ok(productService.updateProduct(id, productDetails));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
