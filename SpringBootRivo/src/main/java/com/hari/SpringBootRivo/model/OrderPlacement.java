package com.hari.SpringBootRivo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "OrderPlace")
public class OrderPlacement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "Price")
    private double price;

    @Column(name = "CardNumber")
    private String cNumber;

    @Column(name = "Year&Month")
    private String yearAndMonth;

    @Column(name = "CNN")
    private String cnn;

    @Column(name = "CardType")
    private String cType;

    @Column(name = "UserId")
    private String userId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getcNumber() {
        return cNumber;
    }

    public void setcNumber(String cNumber) {
        this.cNumber = cNumber;
    }

    public String getYearAndMonth() {
        return yearAndMonth;
    }

    public void setYearAndMonth(String yearAndMonth) {
        this.yearAndMonth = yearAndMonth;
    }

    public String getCnn() {
        return cnn;
    }

    public void setCnn(String cnn) {
        this.cnn = cnn;
    }

    public String getcType() {
        return cType;
    }

    public void setcType(String cType) {
        this.cType = cType;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
