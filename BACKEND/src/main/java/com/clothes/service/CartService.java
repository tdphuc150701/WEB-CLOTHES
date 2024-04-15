package com.clothes.service;

import java.util.List;

import com.clothes.config.JwtRequestFilter;
import com.clothes.entity.Cart;
import com.clothes.entity.Product;
import com.clothes.entity.UserEntity;
import com.clothes.repository.CartRepository;
import com.clothes.repository.ProductRepository;
import com.clothes.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {
	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private UserRepository userRepository;

	public Cart addToCart(Long productId, Integer quantity) {
		Product product = productRepository.findById(productId).get();
		String userName = JwtRequestFilter.CURRENT_USER;

		UserEntity user = null;
		if (userName != null) {
			user = userRepository.findByUsername(userName).get();
		}

		if (product != null && user != null) {
			Cart cart = new Cart(product, user, quantity);
			cartRepository.save(cart);
			return cart;
		}
		return null;
	}

	public Cart updateToCart(Long cartId, Long productId, Integer quantity) {
		Product product = productRepository.findById(productId).get();
		String userName = JwtRequestFilter.CURRENT_USER;

		UserEntity user = null;
		if (userName != null) {
			user = userRepository.findByUsername(userName).get();
		}
		if (product != null && user != null) {
			Cart cart = new Cart(cartId, quantity, product, user);
			cartRepository.save(cart);
			return cart;
		}
		return null;
	}

	public List<Cart> getCart() {
		String username = JwtRequestFilter.CURRENT_USER;
		UserEntity user = userRepository.findByUsername(username).get();
		return cartRepository.findByUser(user);
	}
}