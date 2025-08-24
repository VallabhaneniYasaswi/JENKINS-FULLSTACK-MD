package com.klef.dev.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicine_table")
public class Medicine {
    @Id
    @Column(name = "medicine_id")
    private int id;

    @Column(name = "medicine_name", nullable = false, length = 100)
    private String name;

    @Column(name = "medicine_brand", nullable = false, length = 50)
    private String brand;

    @Column(name = "medicine_category", nullable = false, length = 50)
    private String category;

    @Column(name = "medicine_price", nullable = false)
    private double price;

    @Column(name = "medicine_quantity", nullable = false)
    private int quantity;

    @Column(name = "medicine_expiry", nullable = false, length = 20)
    private String expiryDate;

    @Column(name = "medicine_supplier", nullable = false, length = 100)
    private String supplier;

    // getters & setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getExpiryDate() { return expiryDate; }
    public void setExpiryDate(String expiryDate) { this.expiryDate = expiryDate; }

    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }
}
