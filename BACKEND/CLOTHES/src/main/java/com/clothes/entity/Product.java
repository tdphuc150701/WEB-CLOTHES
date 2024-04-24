package com.clothes.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;
	@Column(nullable = false)
	private String imageUrl;
	@Column(nullable = false)
	private double price;
	@Column(nullable = false)
	private double sale_price;
	@Column(nullable = true)
	private String description;
	@Column(nullable = false)
	private int status;

//	@Column
//	private String title;
//	@Column
//	private String author;
//	@Column(length = 2000)
//	private String description;
//	@Column(length = 2000)
//	private String imageUrl;
//	private int price;
//	private int quantityInStock;
	@ManyToOne
	@JoinColumn(name = "category_id")
	@JsonIgnoreProperties(value = { "id", "products" })
	private Category category;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getSale_price() {
		return sale_price;
	}

	public void setSale_price(double sale_price) {
		this.sale_price = sale_price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Product(Long id, String name, String imageUrl, double price, double sale_price, String description,
			int status, Category category) {
		super();
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.price = price;
		this.sale_price = sale_price;
		this.description = description;
		this.status = status;
		this.category = category;
	}

	public Product() {
		super();
	}

}
