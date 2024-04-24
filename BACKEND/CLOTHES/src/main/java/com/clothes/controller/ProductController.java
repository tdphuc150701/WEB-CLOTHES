package com.clothes.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.clothes.dto.ProductDTO;
import com.clothes.entity.Category;
import com.clothes.entity.Product;
import com.clothes.exception.ResponseObject;
import com.clothes.repository.CategoryRepository;
import com.clothes.repository.ProductRepository;
import com.clothes.service.ProductService;
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
@RequestMapping(path = "/api/product")
public class ProductController {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductService productService;
	@Autowired
	private CategoryRepository categoryRepository;

	@GetMapping("")
	ResponseEntity<List<ProductDTO>> getAllProduct() {
		List<ProductDTO> products = productService.getAllProducts();
		if (products != null) {
			return new ResponseEntity<>(products, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	ResponseEntity<List<ProductDTO>> findById(@PathVariable Long id) {
		Optional<Product> foundProduct = productRepository.findById(id);
		List<ProductDTO> listDTO = new ArrayList<>();
		ProductDTO productDTO = new ProductDTO();
		productDTO.setId(foundProduct.get().getId());
		productDTO.setName(foundProduct.get().getName());
		productDTO.setImageUrl(foundProduct.get().getImageUrl());
		productDTO.setPrice(foundProduct.get().getPrice());
		productDTO.setSale_price(foundProduct.get().getSale_price());
		productDTO.setStatus(foundProduct.get().getStatus());
		Category category = foundProduct.get().getCategory();
		String categoryName = category.getName();
		productDTO.setCategoryName(categoryName);
		productDTO.setDescription(foundProduct.get().getDescription());
		listDTO.add(productDTO);

		if (foundProduct.isPresent()) {
			return new ResponseEntity<>(listDTO, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("")
	public ResponseEntity<Product> createProduct(@RequestBody ProductDTO productDTO) {
		Product createdProduct = productService.createProduct(productDTO);
		return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
		Product product = productService.updateProduct(id, productDTO);
		if (product != null) {
			return new ResponseEntity<>(product, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<ResponseObject> deleteBook(@PathVariable Long id) {
		productService.deleteBook(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/product/{id}")
	ResponseEntity<List<Product>> getProductByCategory(@PathVariable Long id) {
		Optional<Category> categoryOptional = categoryRepository.findById(id);
		if (categoryOptional.isPresent()) {
			Category category = categoryOptional.get();
			List<Product> productList = productRepository.findByCategory(category);
			return new ResponseEntity<>(productList, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

}
