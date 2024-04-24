package com.clothes.service;

import java.util.List;
import java.util.Optional;

import com.clothes.config.JwtRequestFilter;
import com.clothes.entity.OrderDetail;
import com.clothes.entity.OrderInput;
import com.clothes.entity.Product;
import com.clothes.entity.UserEntity;
import com.clothes.repository.OrderDetailRepository;
import com.clothes.repository.ProductRepository;
import com.clothes.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailService {

	private static String ORDER_PLACE = "Place";
	@Autowired
	private OrderDetailRepository orderDetailRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private UserRepository userRepository;

	public List<OrderDetail> getAllCategories() {
		List<OrderDetail> OrderDetails = orderDetailRepository.findAll();
		return OrderDetails;

	}

	public void placeOrder(OrderInput orderInput) {
		Product product = productRepository.findById(orderInput.getProductId()).get();
		String currentUser = JwtRequestFilter.CURRENT_USER;
		UserEntity user = userRepository.findByUsername(currentUser).get();

		OrderDetail orderDetail = new OrderDetail(orderInput.getFullName(), orderInput.getFullAddress(),
				orderInput.getPhoneNumber(), orderInput.getQuantity(), orderInput.getAmount(), orderInput.getStatus(),
				product, user);
		orderDetailRepository.save(orderDetail);
	}

	public void updatePlaceOrder(OrderInput orderInput, Long orderId) {

		Product product = productRepository.findById(orderInput.getProductId()).get();
		String currentUser = orderInput.getUser();
		UserEntity user = userRepository.findByUsername(currentUser).get();

		Optional<Object> orderDetail = orderDetailRepository.findById(orderId).map(orderDetail1 -> {
			orderDetail1.setOrderFullName(orderInput.getFullName());
			orderDetail1.setOrderAddress(orderInput.getFullAddress());
			orderDetail1.setOrderPhoneNumber(orderInput.getPhoneNumber());
			orderDetail1.setOrderStatus(orderInput.getStatus());
			orderDetail1.setQuantity(orderInput.getQuantity());
			orderDetail1.setOrderAmount(orderInput.getAmount());
			orderDetail1.setProduct(product);
			orderDetail1.setUser(user);

			return orderDetailRepository.save(orderDetail1);
		});
	}
}