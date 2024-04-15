/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Link from 'next/link';
// import '../styles/app.module.css'
import '@/styles/app.css'
import { fetchCategoryList, fetchProductsByCategory } from '../app/service/CategoryService';
import { addToCart, updateCartItemQuantity, getCarts } from '@/app/service/CartService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
interface IProps {
    blogs: IBlog[];
}

function TableComponent(props: IProps) {
    const router = useRouter();
    const { blogs } = props;
    const [categories, setCategories] = useState<IBlog[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [filteredProducts, setFilteredProducts] = useState<IBlog[]>([]);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const token = localStorage.getItem('jwtToken');


    useEffect(() => {
        fetchCategoryList()
            .then((data) => {
                setCategories(data);
                setSelectedCategory(null);
                setFilteredProducts(blogs);
            })
            .catch((error) => console.error('Error fetching categories:', error));
    }, [blogs]);


    const handleCategorySelect = (categoryId: number | null) => {
        setSelectedCategory(categoryId);
        if (categoryId === null) {
            setFilteredProducts(blogs);
        } else {
            fetchProductsByCategory(categoryId)
                .then((data) => {
                    setFilteredProducts(data);
                })
                .catch((error) => console.error('Error fetching products by category:', error));
        }
    };
    const productList = Array.isArray(filteredProducts) ? filteredProducts : [filteredProducts];

    const handleAddtoCart = async (productId: number) => {
        if (!token) {
            // Nếu không có token, hiển thị thông báo và không thực hiện hành động "Add to cart"
            toast.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            return;
        }
        try {
            const existingCartItem = cartItems.find(item => item.product.id === productId);
            if (existingCartItem) {
                // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
                await updateCartItemQuantity(existingCartItem.id, productId, existingCartItem.quantity + 1, token);
            } else {
                // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng với số lượng là 1
                await addToCart(productId, 1, token);
            }
            // Sau khi thêm sản phẩm vào giỏ hàng, cập nhật danh sách sản phẩm trong giỏ hàng
            const updatedCartItems = await getCarts(token);
            setCartItems(updatedCartItems);
            console.log('Product added to cart successfully');
            router.push('/cart');

        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };


    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ display: 'inline-block', borderBottom: '2px solid black', paddingBottom: '5px' }}>Product</h2>
            </div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    native
                    value={selectedCategory || ''}
                    onChange={(event) => handleCategorySelect(Number(event.target.value) || null)}
                    inputProps={{
                        name: 'category',
                        id: 'category-select',
                    }}
                >
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={3} sx={{ mb: 5 }} >
                {productList?.map((row) => {
                    return (
                        < Grid key={row.id} item md={3} sx={{ mb: 5 }} >
                            <Box className="blog-card" sx={{ width: '100%', textAlign: 'center' }}
                            >
                                <img
                                    src={row.imageUrl}
                                    // src={img}
                                    alt="Mô tả hình ảnh"
                                    width="100%"
                                    height="350"
                                />
                                <hr style={{ margin: "10px 0", border: "none", borderBottom: "1px solid #ccc" }} />
                                <Typography mt={2} variant='h6' sx={{ padding: "5px", fontWeight: "bold", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    {row.name}
                                </Typography>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <Typography variant='body2' >
                                        {row.description}
                                    </Typography>
                                </Collapse>
                                <Typography variant='h5' sx={{ padding: "5px", fontWeight: "bold", color: 'red', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}  >
                                    {row.price} $
                                </Typography>
                                <Box sx={{ padding: "5px", display: "flex", alignItems: "center", justifyContent: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                    <Rating sx={{ padding: "5px", justifyContent: 'center' }} name="half-rating" defaultValue={2.5} precision={row.rate} />
                                    <Typography sx={{ padding: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}  >
                                        {row.count}
                                    </Typography>
                                </Box>
                                <Link href={`/blogs/${row.id}`} className='btn btn-danger mx-3' style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="warning" className="view-button" sx={{ padding: "20px", paddingLeft: "30px", paddingRight: "30px", width: "175px", height: "75px" }}>
                                        View
                                    </Button>

                                </Link>

                                <Button className='btn btn-danger mx-3' variant="contained" color="success" sx={{ padding: "20px", paddingLeft: "30px", paddingRight: "30px", width: "175px", height: "75px", marginTop: "200px" }}
                                    onClick={() => handleAddtoCart(row.id)}
                                >
                                    Add to cart
                                </Button>





                            </Box>
                        </Grid>)
                })}
            </Grid>
        </div>
    );
}

export default TableComponent;