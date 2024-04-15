import axios from 'axios';
const API_BASE_URL = 'http://localhost:8081/api/category';
export const fetchCategoryList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch categories');
    }
};
export const fetchProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${categoryId}`); // Đảm bảo URL API chính xác
        return response.data; // Trả về dữ liệu sản phẩm từ API
    } catch (error) {
        throw new Error(`Error fetching products by category: ${error}`);
    }
};
