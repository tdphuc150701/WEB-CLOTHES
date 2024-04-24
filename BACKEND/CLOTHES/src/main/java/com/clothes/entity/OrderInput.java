package com.clothes.entity;

public class OrderInput {
	private String fullName;
	private String fullAddress;
	private String phoneNumber;
	private int quantity;
	private int amount;
	private int status;
	private Long productId;
	private String user;


	public OrderInput() {
	}

	public OrderInput(String fullName, String fullAddress, String phoneNumber, int quantity, int amount, int status,
			Long productId, String user) {
		this.fullName = fullName;
		this.fullAddress = fullAddress;
		this.phoneNumber = phoneNumber;
		this.quantity = quantity;
		this.amount = amount;
		this.status = status;
		this.productId = productId;
		this.user = user;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getFullAddress() {
		return fullAddress;
	}

	public void setFullAddress(String fullAddress) {
		this.fullAddress = fullAddress;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
}