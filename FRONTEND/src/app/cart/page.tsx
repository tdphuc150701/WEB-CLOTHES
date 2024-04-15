/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { getCarts, removeCartItem } from '../service/CartService';
import { updateCartItemQuantity } from '../service/CartService';
import { TableFooter } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';


interface ICartItem {
    id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
    };
}

const CartComponent: React.FC = () => {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCarts(token);
                setCartItems(data);
                setIsLoading(false);
            } catch (error) {
                setError(`Error fetching cart: ${error}`);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleQuantityChange = async (cartId: number, productId: number, quantity: number) => {
        try {
            // Kiểm tra xem số lượng mới có lớn hơn 0 không
            if (quantity > 0) {
                // Gửi yêu cầu API PUT để cập nhật số lượng sản phẩm trong giỏ hàng
                const updatedCartItem = await updateCartItemQuantity(cartId, productId, quantity, token);

                // Cập nhật chỉ mục cụ thể trong mảng cartItems
                const updatedCartItems = cartItems.map(item => {
                    if (item.id === cartId) {
                        return updatedCartItem;
                    }
                    return item;
                });
                setCartItems(updatedCartItems);
            } else {
                // Nếu số lượng mới không hợp lệ (lớn hơn 0), hiển thị thông báo hoặc xử lý theo nhu cầu của bạn
                console.error('Invalid quantity');
            }
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };
    const calculateTotalPrice = (item: ICartItem) => {
        if (item.product && item.product.price) {
            return item.quantity * item.product.price;
        } else {
            return 0;
        }
    };
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateTotalPrice(item), 0);
    };

    const handleDeleteItemClick = async (cartId: number) => {
        try {
            await removeCartItem(cartId, token);
            const updatedCart = await getCarts(token);
            setCartItems(updatedCart);
        } catch (error) {
            console.error(`Error removing item ${cartId} from cart:`, error);
        }
    };

    return (
        <div>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>Your Cart</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead style={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>STT</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>Product Name</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>Image</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>Price</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>Quantity</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>Total</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>Actions</TableCell> {/* Thêm tiêu đề cột mới */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(cartItems) && cartItems.map((item, index) => (
                            <TableRow key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{item.product ? item.product.name : 'Unknown Product'}</TableCell>
                                <img
                                    src={item.product.imageUrl}
                                    alt="Image" style={{ width: '75px', maxHeight: '50px' }} />
                                <TableCell align="center">{item.product ? (item.product.price ? `$${item.product.price}` : 'Unknown Price') : 'Unknown Product'}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleQuantityChange(item.id, item.product.id, item.quantity - 1)}>-</Button>
                                    {item.quantity}
                                    <Button onClick={() => handleQuantityChange(item.id, item.product.id, item.quantity + 1)}>+</Button>
                                </TableCell>
                                <TableCell align="center">${calculateTotalPrice(item)}</TableCell>
                                <TableCell align="center"> {/* Thêm nút xóa với biểu tượng */}
                                    <Button onClick={() => handleDeleteItemClick(item.id)}>
                                        <GridDeleteIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3} align="right" style={{ fontWeight: 'bold' }}>Total:</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                {/* Hiển thị tổng tiền của đơn hàng */}
                                ${calculateTotal()}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>Checkout</Button>
        </div>
    );
};

export default CartComponent;