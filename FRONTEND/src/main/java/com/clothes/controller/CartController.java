package com.clothes.controller;

import java.util.List;
import java.util.Optional;
import com.clothes.entity.Cart;
import com.clothes.exception.ResponseObject;
import com.clothes.repository.CartRepository;
import com.clothes.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/cart")
public class CartController {
	@Autowired
	private CartRepository repository;
	@Autowired
	private CartService cartService;

	@PreAuthorize("hasRole('USER')")
	@GetMapping("")
	ResponseEntity<List<Cart>> getAllCart() {
		try {
			return new ResponseEntity<>(cartService.getCart(), HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("/{cartId}")
	public ResponseEntity<Cart> getById(@PathVariable Long cartId) {
		Optional<Cart> foundCart = repository.findById(cartId);
		return foundCart.map(cart -> ResponseEntity.ok(cart)).orElse(ResponseEntity.notFound().build());
	}

	@PreAuthorize("hasRole('USER')")
	@PostMapping("/{productId}/{quantity}")
	ResponseEntity<Cart> postCart(@PathVariable(name = "productId") Long productId,
			@PathVariable(name = "quantity") Integer quantity) {
		return new ResponseEntity<>(cartService.addToCart(productId, quantity), HttpStatus.OK);
	}

	@GetMapping("/profile")
	@PreAuthorize("hasRole('USER')")
	public String profile() {
		return "profile";
	}

	@PreAuthorize("hasRole('User')")
	@PutMapping("/{cartId}/{productId}/{quantity}")
	ResponseEntity<Cart> putCart(@PathVariable(name = "cartId") Long cartId,
			@PathVariable(name = "productId") Long productId, @PathVariable(name = "quantity") Integer quantity) {
		Cart updatedCart = cartService.updateToCart(cartId, productId, quantity);
		if (updatedCart != null) {

			return new ResponseEntity<>(updatedCart, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/{cartId}")
	ResponseEntity<ResponseObject> deleteCart(@PathVariable Long cartId) {
		boolean exits = repository.existsById(cartId);
		if (exits) {
			repository.deleteById(cartId);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("success", "delete data successfully", ""));
		}
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(new ResponseObject("failed", "Cannot find data to delete", ""));
	}
}