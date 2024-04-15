package com.clothes.controller;

import java.util.List;
import java.util.Optional;
import com.clothes.entity.Category;
import com.clothes.exception.ResponseObject;
import com.clothes.repository.CategoryRepository;
import com.clothes.service.CategoryService;
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
@RequestMapping(path = "/api/category")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private CategoryRepository categoryRepository;

	@GetMapping("")
	ResponseEntity<?> getAllCategory() {
		List<Category> categories = categoryService.getAllCategories();
		if (categories != null) {
			return ResponseEntity.ok(categories);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/{id}")
	ResponseEntity<?> findById(@PathVariable Long id) {
		Optional<Category> foundProduct = categoryRepository.findById(id);

		if (foundProduct.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("success", "Query product successfully", foundProduct));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ResponseObject("failed", "Can't find product with id = " + id, ""));
		}
	}

	@PostMapping("")
	public ResponseEntity<Category> createCategory(@RequestBody Category newCategory) {
		Category createCategory = categoryService.createCategory(newCategory);
		return new ResponseEntity<>(createCategory, HttpStatus.CREATED);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category newCategory) {
		Category category = categoryService.update(id, newCategory);
		if (category != null) {
			return new ResponseEntity<>(newCategory, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<ResponseObject> deleteCategory(@PathVariable Long id) {
		categoryService.deleteCategory(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
