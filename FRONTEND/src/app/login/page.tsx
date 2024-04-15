'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { authenticateUser } from '@/redux/userSlice';
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';
import Grid from '@mui/material/Grid';
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/redux/userSlice';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from 'next/link'
import axios from 'axios';
import { mutate } from 'swr';
import { loginUser } from '../service/UserService'




interface Iprops {
    users: IUser[]
    onLoginSuccess: () => void;

}
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}


const LoginForm = (props: Iprops) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async (e: any) => {
        e.preventDefault();

        // Kiểm tra xem username và password có được điền vào không
        if (!username || !password) {
            setUserNameError("Vui lòng điền đầy đủ thông tin đăng nhập.");
            setPasswordError('');
            return;
        }

        // Gọi hàm loginUser từ service để thực hiện đăng nhập
        try {
            const response = await loginUser({ username, password });
            const token = response;
            localStorage.setItem('jwtToken', token);
            dispatch(loginSuccess(token));
            router.push('/');
        } catch (error) {
            toast.error("Sai thông tin đăng nhập")
            // Xử lý lỗi và hiển thị thông báo cho người dùng
        }
    };

    return (

        <div>
            <h2 style={{ marginTop: "10px", textAlign: "center" }}>Login</h2>
            {/* <form onSubmit={handleLogin}> */}
            <form onSubmit={handleLogin}>
                <TextField
                    label="User"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    error={!!userNameError}
                    helperText={userNameError}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    error={!!passwordError}
                    helperText={passwordError}
                />


                <Button
                    sx={{ marginTop: "10px" }}
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                >
                    Login
                </Button>


            </form>
            <Divider light />

            <p style={{
                textAlign: "center",
                fontWeight: "bold",
                borderTop: "1px solid black",
                marginLeft: "100px",
                marginRight: "100px",
                paddingTop: "10px"
            }}>Or</p>
            <Button
                variant="contained"
                sx={{}}
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={() => signIn("google", { callbackUrl: 'http://localhost:8081/login' })}
                fullWidth
            >

                Login with Google
            </Button>

            <Link href="../registration" style={{ display: 'flex', justifyContent: "space-between" }}>
                <Button sx={{
                    marginLeft: 'auto',
                    marginRight: '0', // Đảm bảo không có khoảng cách bên phải }}>

                }}>

                    Registration

                </Button>
            </Link>


        </div >

    );

};

export default LoginForm;