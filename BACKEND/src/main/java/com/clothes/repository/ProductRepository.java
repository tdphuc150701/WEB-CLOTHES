package com.clothes.repository;

import java.util.List;
import java.util.Optional;

import com.clothes.entity.Category;
import com.clothes.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	Optional<Product> findById(Long id);

	List<Product> findByCategory(Category category);

	public List<Product> findByName(String key);

}
