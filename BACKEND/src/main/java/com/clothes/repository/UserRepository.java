package com.clothes.repository;

import java.util.List;
import java.util.Optional;
import com.clothes.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
	Optional<UserEntity> findById(Long id);

	Optional<UserEntity> findByUsername(String username);

	List<UserEntity> deleteByUsername(String username);

	boolean existsByUsername(String username);

}
