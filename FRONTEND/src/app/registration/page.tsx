'use client'
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { toast } from 'react-toastify';
import { registerUser } from '../service/UserService';
import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
    const router = useRouter();
    const [passwordShown, setPasswordShown] = useState(false);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleUserNameChange = (event: any) => {
        setUsername(event.target.value);
    };

    const handlePhoneChange = (event: any) => {
        setPhone(event.target.value);
    };

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleUserNameBlur = () => {
        if (username.trim() === '') {
            setUserNameError('Vui lòng nhập thông tin');
            return false;
        } else if (username.length < 5) {
            setUserNameError('Thông tin phải có ít nhất 5 ký tự');
            return false;
        }
        setUserNameError('');
        return true;
    };

    const handlePhoneBlur = () => {
        const regexPhone = /^(0\d{9,10}|84\d{8,9})$/;

        if (phone.trim() === '') {
            setPhoneError('Vui lòng nhập thông tin');
            return false;
        } else if (!regexPhone.test(phone)) {
            setPhoneError('Đầu phải có 0 và có ít nhất 10 số');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const handleEmailBlur = () => {
        const regexEmail = /^\S+@\S+\.\S+$/;

        if (email.trim() === '') {
            setEmailError('Vui lòng nhập thông tin');
            return false;
        } else if (!regexEmail.test(email)) {
            setEmailError('Phải là kí tự và có @ vd aaa@gmail.com');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handlePasswordBlur = () => {
        if (password.trim() === '') {
            setPasswordError('Vui lòng nhập thông tin');
            return false;
        } else if (password.length < 5) {
            setPasswordError('Thông tin phải có ít nhất 5 ký tự');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!handleUserNameBlur() || !handlePhoneBlur() || !handleEmailBlur() || !handlePasswordBlur()) {
            toast.error('Đăng ký thất bại');
            return;
        }

        try {
            const userData = { username, email, password };
            await registerUser(userData);
            toast.success('Đăng ký thành công!');
            setUsername('');
            setPhone('');
            setEmail('');
            setPassword('');
            router.push('/login');
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('Đăng ký thất bại');
        }
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div>
            <h2 style={{ marginTop: '10px', textAlign: 'center' }}>Registrator</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={handleUserNameChange}
                    onBlur={handleUserNameBlur}
                    margin="normal"
                    error={!!userNameError}
                    helperText={userNameError}
                />
                <TextField
                    type="number"
                    label="Number"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                    margin="normal"
                    error={!!phoneError}
                    helperText={phoneError}
                />
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    margin="normal"
                    error={!!emailError}
                    helperText={emailError}
                />
                <TextField
                    type={passwordShown ? 'text' : 'password'}
                    label="Password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePassword} edge="end">
                                    {passwordShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    error={!!passwordError}
                    helperText={passwordError}
                />
                <Button type="submit" variant="contained" color="primary">
                    Đăng ký
                </Button>
            </form>
        </div>
    );
};

export default RegistrationForm;