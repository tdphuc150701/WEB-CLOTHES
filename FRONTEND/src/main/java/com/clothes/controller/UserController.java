package com.clothes.controller;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.clothes.config.JwtTokenUtil;
import com.clothes.dto.EmailAndUsername;
import com.clothes.dto.UserDTO;
import com.clothes.entity.JwtRequest;
import com.clothes.entity.JwtResponse;
import com.clothes.entity.Role;
import com.clothes.entity.UserEntity;
import com.clothes.repository.RoleRepository;
import com.clothes.repository.UserRepository;
import com.clothes.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api")
public class UserController {
	@Autowired
	private JwtService JwtService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;

	@Autowired
	private JwtTokenUtil jwtToken;

	// @PostConstruct
	// public void initRoleAndUser() {
	// userService.initRoleAndUser();
	// }

	@PostMapping({ "/auth/register" })
	ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
		if (userRepository.existsByUsername(userDTO.getUsername())) {
			return ResponseEntity.badRequest().body("Username is already taken!");
		}
		UserEntity user = new UserEntity();
		user.setUsername(userDTO.getUsername());
		user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		user.setEmail(userDTO.getEmail());
		Role roles = roleRepository.findByName("USER").get();
		user.setRole(Collections.singletonList(roles));
		userRepository.save(user);
		return ResponseEntity.ok(user);
	}

	@PostMapping("/auth/login")
	ResponseEntity<?> login(@RequestBody JwtRequest authenticationRequest) throws Exception {

		String token = jwtService.authenticate(authenticationRequest.getUsername(),
				authenticationRequest.getPassword());
		return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);

	}

	@GetMapping({ "/forUser" })
	@PreAuthorize("hasRole('USER')")
	public String forUser() {
		return "This URL is only accessible to the user";
	}

	@GetMapping("/auth/users")
	public ResponseEntity<List<EmailAndUsername>> getUser() {

		List<UserEntity> users = userRepository.findAll();

		// Chuyển đổi từ UserEntity sang EmailAndUsername
		List<EmailAndUsername> emailAndUsernames = users.stream().map(user -> {
			List<String> roles = user.getRole().stream().map(Role::getName).collect(Collectors.toList());
			EmailAndUsername emailAndUsername = new EmailAndUsername();
			emailAndUsername.setUsername(user.getUsername());
			emailAndUsername.setEmail(user.getEmail());
			emailAndUsername.setRoleName(roles);
			return emailAndUsername;
		}).collect(Collectors.toList());

		return ResponseEntity.ok(emailAndUsernames);
	}

	@GetMapping("/auth/user")
	public ResponseEntity<UserEntity> getUserInfo() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		UserEntity user = userRepository.findByUsername(username)
				.orElseThrow(() -> new RuntimeException("User not found with username: " + username));
		return ResponseEntity.ok(user);
	}

}