
'use client'

import { createSlice, configureStore } from '@reduxjs/toolkit'

interface IState {
    value: any
}

const initialState: IState = {
    value: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented: state => {
            state.value += 1
        },

        decremented: state => {
            state.value -= 1
        },

        incrementByAmount: (state, action) => {
            state.value += action.payload
        },

    }
})

export const { incremented, decremented, incrementByAmount } = counterSlice.actions
export const selectCounter = (state: { counter: { value: any; }; }) => { state.counter.value }
// export const selectValue = (state) => state.counter.value
export default counterSlice.reducer
