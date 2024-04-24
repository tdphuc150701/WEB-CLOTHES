package com.clothes.service;

import java.util.List;
import java.util.Optional;

import com.clothes.entity.Category;
import com.clothes.repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;

	public List<Category> getAllCategories() {
		List<Category> categories = categoryRepository.findAll();
		return categories;

	}

	public Category update(Long id, Category category) {
		Optional<Category> optionalCategory = categoryRepository.findById(id);
		if (optionalCategory.isPresent()) {
			Category existingCategory = optionalCategory.get();
			existingCategory.setName(category.getName());
			return categoryRepository.save(existingCategory);
		} else {

			return null;
		}
	}

	public Category createCategory(Category newCategory) {
		return categoryRepository.save(newCategory);
	}

	public void deleteCategory(Long id) {
		categoryRepository.deleteById(id);
	}
}
