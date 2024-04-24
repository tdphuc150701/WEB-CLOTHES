package com.clothes.controller;

import java.util.List;
import java.util.Optional;

import com.clothes.entity.OrderDetail;
import com.clothes.entity.OrderInput;
import com.clothes.exception.ResponseObject;
import com.clothes.repository.OrderDetailRepository;
import com.clothes.repository.ProductRepository;
import com.clothes.service.OrderDetailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/orderDetail")
public class OrderDetailController {
	@Autowired
	private OrderDetailService orderDetailService;

	@Autowired
	private OrderDetailRepository orderDetailRepository;

	@Autowired
	private ProductRepository productRepository;

	@GetMapping("")
	ResponseEntity<?> getAllOrderDetail() {
		List<OrderDetail> orderDetails = orderDetailService.getAllCategories();
		if (orderDetails != null) {
			return ResponseEntity.ok(orderDetails);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{cartId}")
	ResponseEntity<?> findById(@PathVariable Long cartId) {
		Optional<OrderDetail> foundOrder = orderDetailRepository.findById(cartId);

		if (foundOrder.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("success", "Query product successfully", foundOrder));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ResponseObject("failed", "Can't find product with id = " + cartId, ""));
		}
	}

	@PostMapping("")
	ResponseEntity<ResponseObject> postOrderDetail(@RequestBody OrderInput orderInput) {
		try {
			orderDetailService.placeOrder(orderInput);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("success", "Insert data successfully", ""));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("error", "Insert data failed", ""));
		}
	}

	@PutMapping("/{orderId}")
	ResponseEntity<ResponseObject> updateOrder(@RequestBody OrderInput newOrder, @PathVariable Long orderId) {
		try {
			orderDetailService.updatePlaceOrder(newOrder, orderId);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("success", "Insert data successfully", ""));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("error", "Insert data failed", ""));
		}
	}

	@DeleteMapping("/{orderId}")
	public ResponseEntity<ResponseObject> deleteOrderDetail(@PathVariable Long orderId) {
		orderDetailRepository.deleteById(orderId);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
