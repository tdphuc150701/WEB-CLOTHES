package com.clothes.repository;

import java.util.List;
import java.util.Optional;

import com.clothes.entity.OrderDetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
	public List<OrderDetail> findByOrderPhoneNumber(String orderPhoneNumber);

	Optional<OrderDetail> findById(Long id);
}
