package com.clothes.controller;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

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
import com.clothes.service.UserService;
import com.clothes.util.EmailUtil;
import com.clothes.util.OtpUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	@Autowired
	private EmailUtil emailUtil;

	@Autowired
	private OtpUtil otpUtil;
	@Autowired
	private UserService userService;
	// @PostConstruct
	// public void initRoleAndUser() {
	// userService.initRoleAndUser();
	// }

	@PostMapping({ "/auth/register" })
	ResponseEntity<?> register(@RequestBody UserDTO userDTO) {
		String otp = otpUtil.generateOtp();
		try {
			emailUtil.sendOtpEmail(userDTO.getEmail(), otp);
		} catch (MessagingException e) {
			throw new RuntimeException("Unable to send otp pls try again");
			// TODO: handle exception
		}
		if (userRepository.existsByUsername(userDTO.getUsername())) {
			return ResponseEntity.badRequest().body("Username is already taken!");
		}
		UserEntity user = new UserEntity();
		user.setUsername(userDTO.getUsername());
		user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		user.setEmail(userDTO.getEmail());
		Role roles = roleRepository.findByName("USER").get();
		user.setRole(Collections.singletonList(roles));
		user.setOtp(otp);
		user.setOtpGeneratedTime(LocalDateTime.now());
		userRepository.save(user);
		return ResponseEntity.ok(user);
	}

	@PostMapping("/auth/login")
	ResponseEntity<?> login(@RequestBody JwtRequest authenticationRequest) throws Exception {
		Optional<UserEntity> userOptional = userRepository.findByUsername(authenticationRequest.getUsername());
		if (!userOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
		}

		UserEntity user = userOptional.get();

		if (!user.isActive()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Your account is not verified");
		}

		String token = jwtService.authenticate(authenticationRequest.getUsername(),
				authenticationRequest.getPassword());
		return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);

	}

	@GetMapping("/auth/users")
	public ResponseEntity<List<EmailAndUsername>> getUser() {
		List<UserEntity> users = userRepository.findAll();
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

	@PutMapping("/auth/verify/account")
	public ResponseEntity<String> verifyAccount(@RequestParam String email, @RequestParam String otp) {
	    UserEntity user = userRepository.findByEmail(email);
	    if (user != null && user.getOtp().equals(otp)
	            && Duration.between(user.getOtpGeneratedTime(), LocalDateTime.now()).getSeconds() < (10 * 60)) {
	        user.setActive(true);
	        userRepository.save(user);
	        return ResponseEntity.ok("OTP verified");
	    } else {
	        return ResponseEntity.badRequest().body("Invalid OTP or OTP expired");
	    }
	}

	@PutMapping("/auth/regenerate-otp")
	public ResponseEntity<String> regenerateOtp(@RequestParam String email) {
		return new ResponseEntity<>(userService.regenerateOtp(email), HttpStatus.OK);
	}

}