import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/product'; // Thay đổi thành URL của API thực tế

// Hàm để lấy danh sách sản phẩm từ API
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
export const putProduct = async (productId, updatedProductData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/products/${productId}`, updatedProductData);
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${productId}:`, error);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        await axios.delete(`${API_BASE_URL}/products/${productId}`);
        console.log(`Product with ID ${productId} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
        throw error;
    }
};
export const postProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/products`, productData);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};
export const getProduct = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error;
    }
};
