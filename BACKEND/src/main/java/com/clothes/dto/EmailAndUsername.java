package com.clothes.dto;

import java.util.List;

public class EmailAndUsername {
	private String username;
	private String email;
	private List<String> roleName;

	public List<String> getRoleName() {
		return roleName;
	}

	public void setRoleName(List<String> roles) {
		this.roleName = roles;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
