'use client'
import Link from 'next/link'
import App from 'next/app';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import Input from '@mui/material/Input';
import { Container } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addTodo } from '@/redux/searchSlice';
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import { useSession } from 'next-auth/react'
import { loginSuccess, logout } from '@/redux/userSlice';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));



const inputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
};



function AppHeader() {
    const router = useRouter();
    const session = useSession();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [searchQuerry, setSearchQuerry] = useState('');
    const [user, setUser] = useState<IUser | null>(null);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const dispatch = useDispatch();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const storedUserJSON = localStorage.getItem('user');
    // let storedUser = null;

    // try {
    //     storedUser = JSON.parse(storedUserJSON);
    // } catch (error) {
    //     console.error('Error parsing stored user:', error);
    // }

    const handleLogOut = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        dispatch(logout());
        router.push('/login');
    };
    useEffect(() => {
        const getJWT = async () => {
            const token = localStorage.getItem('jwtToken');
            try {
                const response = await axios.get('http://localhost:8081/api/auth/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userData = response.data;
                setUser(userData)
                localStorage.setItem('user', JSON.stringify(userData));
                dispatch(loginSuccess(userData));
            } catch (error) {
                console.error('Lỗi trong quá trình lấy thông tin người dùng:', error);
            }
        };

        getJWT(); // Gọi hàm getJWT khi component được tạo ra
    }, []); // De

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addTodo(searchQuerry));
        localStorage.setItem('searchData', searchQuerry);
        router.push(`/search`);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#186F65" }}>
            <Toolbar>
                <Grid container spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={3}>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', color: "white", textDecoration: "none" }}>
                                <Typography sx={{
                                    fontFamily: "Helvetica",
                                    fontSize: '30px',
                                    justifyContent: 'center',
                                    paddingLeft: '35px',
                                    alignItems: 'center',
                                    display: 'inline-flex',
                                    marginRight: '50px',
                                    fontWeight: "bold",
                                    '&:hover': {
                                        opacity: "0.5"
                                    }
                                }}>
                                    <AutoStoriesIcon sx={{ fontSize: "30px", marginRight: '10px' }} />
                                    Phong <span style={{ color: 'greenyellow', paddingLeft: "10px" }}>  Cách ! </span>
                                    <br />
                                </Typography>
                            </Box>
                            <span style={{ fontFamily: "arial", textAlign: 'center', fontSize: "15px", justifyContent: "center", color: 'rgb(169,169,169)', marginTop: "" }}>
                                Định hình phong cách sống theo riêng bạn !
                            </span>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Search >
                            <form onSubmit={onSearch} style={{ width: '400px' }}>
                                <SearchIconWrapper color="inherit" onClick={onSearch}>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    style={inputStyle}
                                    value={searchQuerry}
                                    placeholder="Search..."
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={(e) => setSearchQuerry(e.target.value)}
                                />
                            </form>
                        </Search>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "center" }}>
                        <div>
                            <Link href="/blogs">
                                <Button variant="outlined" sx={{
                                    backgroundColor: '#FFC502',
                                    marginRight: "3px",
                                    color: "#F5F5F5",
                                    fontWeight: "bold",
                                    border: " 1px solid #F0000000"
                                }}>Products</Button>
                            </Link>
                            <Link href="/manager">
                                <Button variant="outlined" sx={{
                                    backgroundColor: '#FFC502',
                                    marginRight: "3px",
                                    color: "#F5F5F5",
                                    fontWeight: "bold",
                                    border: " 1px solid #F0000000"
                                }}>Manage</Button>
                            </Link>
                            <Link href="/cart">
                                <Button variant="outlined" sx={{
                                    backgroundColor: '#FFC502',
                                    marginRight: "3px",
                                    color: "#F5F5F5",
                                    fontWeight: "bold",
                                    border: " 1px solid #F0000000"
                                }}>Cart</Button>
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={2} sx={{ marginLeft: "auto" }}>
                        {isLoggedIn ?
                            <Box sx={{ display: 'inline-flex', marginLeft: 'auto' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar src="/broken-image.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <span style={{ marginRight: '10px', fontWeight: "bold", paddingRight: '10px' }}>{user?.username}</span>
                                </div>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <div>
                                        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                        <Link href='/registration' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem>Profile</MenuItem>
                                        </Link>
                                        <Link href='/manager' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem>Manage</MenuItem>
                                        </Link>
                                    </div>
                                </Menu>
                            </Box>
                            :
                            <Box sx={{ display: 'inline-flex', marginLeft: 'auto' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Tooltip title="Open settings">
                                        <Button variant="outlined" sx={{ backgroundColor: 'white', color: "A4907C" }}>
                                            <SettingsIcon color="primary" />
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                Account
                                            </IconButton>
                                        </Button>
                                    </Tooltip>
                                </div>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <div>
                                        <Link href='/login' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem>Login</MenuItem>
                                        </Link>
                                        <Link href='/registration' color="inherit" style={{ textDecoration: 'none', color: 'black' }}>
                                            <MenuItem>Registrator</MenuItem>
                                        </Link>
                                    </div>
                                </Menu>
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default AppHeader;