// Third Party Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Action Imports
import { CustomAsyncThunk } from '@/Helper/CustomAsyncThunk'
import { getLoginHistory } from './Action'

interface Initial {
    takingOrder: any
    loading: boolean
    error: any
}

const state: Initial = {
    takingOrder: {},
    loading: false,
    error: null
}

const TakingOrderSlice = createSlice({
    name: 'takingOrder',
    initialState: state,
    reducers: {
        setLoading(state: any, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    },
    extraReducers: builder => {
        CustomAsyncThunk(builder, getLoginHistory, 'takingOrder')
    }
})

export const { setLoading } = TakingOrderSlice.actions

export default TakingOrderSlice.reducer
