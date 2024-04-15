package com.clothes.entity;

import javax.persistence.*;

@Entity
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String orderFullName;
	private String orderAddress;
	private String orderPhoneNumber;
	private int quantity;
	private double orderAmount;
	private int orderStatus;
	@OneToOne
	private Product product;
	@OneToOne
	private UserEntity user;

	public OrderDetail() {
	}

	public OrderDetail(String orderFullName, String orderAddress, String orderPhoneNumber, int quantity,
			double orderAmount, int orderStatus, Product product, UserEntity user) {
		this.orderFullName = orderFullName;
		this.orderAddress = orderAddress;
		this.orderPhoneNumber = orderPhoneNumber;
		this.quantity = quantity;
		this.orderAmount = orderAmount;
		this.orderStatus = orderStatus;
		this.product = product;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOrderFullName() {
		return orderFullName;
	}

	public void setOrderFullName(String orderFullName) {
		this.orderFullName = orderFullName;
	}

	public String getOrderAddress() {
		return orderAddress;
	}

	public void setOrderAddress(String orderAddress) {
		this.orderAddress = orderAddress;
	}

	public String getOrderPhoneNumber() {
		return orderPhoneNumber;
	}

	public void setOrderPhoneNumber(String orderPhoneNumber) {
		this.orderPhoneNumber = orderPhoneNumber;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getOrderAmount() {
		return orderAmount;
	}

	public void setOrderAmount(double orderAmount) {
		this.orderAmount = orderAmount;
	}

	public int getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(int orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Product getProduct() {
		return product;
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
