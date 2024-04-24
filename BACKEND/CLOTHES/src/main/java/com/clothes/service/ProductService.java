package com.clothes.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.clothes.dto.ProductDTO;
import com.clothes.entity.Category;
import com.clothes.entity.Product;
import com.clothes.repository.CategoryRepository;
import com.clothes.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	public List<ProductDTO> getAllProducts() {
		List<Product> products = productRepository.findAll();
		List<ProductDTO> productDTOs = new ArrayList<>();

		for (Product p : products) {
			ProductDTO productDTO = new ProductDTO();
			productDTO.setId(p.getId());
			productDTO.setImageUrl(p.getImageUrl());
			productDTO.setName(p.getName());
			productDTO.setPrice(p.getPrice());
			productDTO.setSale_price(p.getSale_price());
			productDTO.setDescription(p.getDescription());
			productDTO.setStatus(p.getStatus());
			Category category = p.getCategory();
			String categoryName = category.getName();
			productDTO.setCategoryName(categoryName);
			productDTOs.add(productDTO);
		}
		return productDTOs;
	}

	public Product createProduct(ProductDTO productDTO) {
		Product product = new Product();
		product.setName(productDTO.getName());
		product.setImageUrl(productDTO.getImageUrl());
		product.setPrice(productDTO.getPrice());
		product.setSale_price(productDTO.getSale_price());
		product.setDescription(productDTO.getDescription());
		product.setStatus(productDTO.getStatus());
		Category category = categoryRepository.findByName(productDTO.getCategoryName());
		product.setCategory(category);
		product = productRepository.save(product);
		return product;
	}

	public Product updateProduct(Long id, ProductDTO productDTO) {
		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent()) {
			Product product = optionalProduct.get();
			product.setName(productDTO.getName());
			product.setPrice(productDTO.getPrice());
			product.setSale_price(productDTO.getSale_price());
			product.setDescription(productDTO.getDescription());
			product.setStatus(productDTO.getStatus());
			Category category = categoryRepository.findByName(productDTO.getCategoryName());
			product.setCategory(category);
			Product updatedBook = productRepository.save(product);
			return updatedBook;
	}
		return null;
		
		}

	public void deleteBook(long id) {
		productRepository.deleteById(id);

	}
}
