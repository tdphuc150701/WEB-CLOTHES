package com.clothes.service;

import java.time.LocalDateTime;

import javax.mail.MessagingException;

import com.clothes.entity.UserEntity;
import com.clothes.repository.UserRepository;
import com.clothes.util.EmailUtil;
import com.clothes.util.OtpUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private OtpUtil otpUtil;
	@Autowired
	private EmailUtil emailUtil;
	
	 public String regenerateOtp(String email) {
		    UserEntity user = userRepository.findByEmail(email);
		       
		    String otp = otpUtil.generateOtp();
		    try {
		      emailUtil.sendOtpEmail(email, otp);
		    } catch (MessagingException e) {
		      throw new RuntimeException("Unable to send otp please try again");
		    }
		    user.setOtp(otp);
		    user.setOtpGeneratedTime(LocalDateTime.now());
		    userRepository.save(user);
		    return "Email sent... please verify account within 1 minute";
		  }
}
