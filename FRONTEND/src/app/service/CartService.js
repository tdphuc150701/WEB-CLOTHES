import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/cart';

// Hàm để lấy thông tin giỏ hàng từ API
export const getCarts = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });
        ;
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};
export const getCartInfor = async (cartId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${cartId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};


// Hàm để thêm một sản phẩm vào giỏ hàng
export const addToCart = async (productId, quantity, token) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/${productId}/${quantity}`,
            // Payload data
            { productId, quantity },
            // Headers
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};

// Hàm để cập nhật số lượng của một sản phẩm trong giỏ hàng
export const updateCartItemQuantity = async (cardId, itemId, quantity, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${cardId}/${itemId}/${quantity}`,
            { cardId, itemId, quantity }

            , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error updating quantity of item ${itemId} in cart:`, error);
        throw error;
    }
};

// Hàm để xóa một sản phẩm khỏi giỏ hàng
export const removeCartItem = async (itemId, token) => {
    try {
        await axios.delete(`${API_BASE_URL}/${itemId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`Item ${itemId} removed from cart successfully`);
    } catch (error) {
        console.error(`Error removing item ${itemId} from cart:`, error);
        throw error;
    }
};

// Hàm để xóa toàn bộ sản phẩm khỏi giỏ hàng
export const clearCart = async () => {
    try {
        await axios.delete(`${API_BASE_URL}`);
        console.log('Cart cleared successfully');
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};