package com.clothes.entity;

import javax.persistence.*;

@Entity
@Table(name = "carts")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Integer quantity;

	@OneToOne
	private Product product;

	@OneToOne
	private UserEntity user;

	public Cart() {
	}

	public Cart(Product product, UserEntity user, Integer quantity) {

		this.product = product;
		this.user = user;
		this.quantity = quantity;
	}

	public Cart(Long id, Integer quantity, Product product, UserEntity user) {
		this.id = id;
		this.quantity = quantity;
		this.product = product;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}
}
