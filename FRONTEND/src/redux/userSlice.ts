'use client'

import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa interface cho trạng thái user
interface IUserState {
    token: string | null; // Thông tin mã JWT
    isLoggedIn: boolean;
    userData: UserData | null;
}
interface UserData {
    username: string;
    email: string;
    // Thêm các thuộc tính khác của người dùng nếu cần
}

// Khởi tạo trạng thái ban đầu cho user
const initialState: IUserState = {
    token: null,
    isLoggedIn: false,
    userData: null,
};

// Tạo slice cho user
export const userSlice = createSlice({
    name: 'user', // Tên của slice
    initialState, // Trạng thái ban đầu
    reducers: {
        // Action để cập nhật thông tin mã JWT khi đăng nhập thành công
        loginSuccess: (state, action) => {
            state.token = action.payload; // Cập nhật token từ action payload
            state.isLoggedIn = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.token = null; // Xóa token khi đăng xuất
            state.isLoggedIn = false;
            state.userData = null;
        },
    },
});

// Export các action từ userSlice để sử dụng trong ứng dụng
export const { loginSuccess, logout } = userSlice.actions;

// Export reducer của userSlice để tích hợp vào rootReducer
export default userSlice.reducer;