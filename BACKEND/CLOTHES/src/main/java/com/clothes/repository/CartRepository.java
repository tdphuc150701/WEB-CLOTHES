package com.clothes.repository;

import java.util.List;
import java.util.Optional;

import com.clothes.entity.Cart;
import com.clothes.entity.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
	List<Cart> findByUser(UserEntity user);
	Optional<Cart> findById(Long id);
}
