
'use client'

import { createSlice, configureStore } from '@reduxjs/toolkit'

interface IState {
    blogs: IBlog[]
}

const initialState: IState = {
    blogs: []
}

export const searchSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        updateData: (state, action) => {
            state.blogs = action.payload;
        },


    }
})

export const { updateData } = searchSlice.actions
// export const selectValue = (state) => state.counter.value
export default searchSlice.reducer
