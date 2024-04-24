package com.clothes.entity;

public class JwtResponse {
	private String jwtToken;
	private String tokenType = "Bearer";

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public String getTokenType() {
		return tokenType;
	}

	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}

	public JwtResponse(String jwtToken) {
		this.jwtToken = jwtToken;
	}

}