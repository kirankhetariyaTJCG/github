// Third Party Imports
import { createSlice } from '@reduxjs/toolkit'

// Action Imports
import { CustomAsyncThunk } from '@/Helper/CustomAsyncThunk'
import { getCategoriesReports, getClients, getItemsReports, getOrders } from './Action'

interface Initial {
    orders: any[]
    clients: any[]
    categories: any[]
    items: any[]
    reloadKey: number
    loading: boolean
    error: any
    record_count: number
    total_clients: number
    total_categories: number
    total_items: number
}

const state: Initial = {
    orders: [],
    clients: [],
    categories: [],
    items: [],
    reloadKey: 0,
    loading: false,
    error: null,
    record_count: 0,
    total_clients: 0,
    total_categories: 0,
    total_items: 0,
}

const ReportsSlice = createSlice({
    name: 'reports',
    initialState: state,
    reducers: {},
    extraReducers: builder => {
        CustomAsyncThunk(builder, getOrders, 'orders', null, (state: any, action: any) => {
            state.record_count = action.payload?.record_count || 0
        })
        CustomAsyncThunk(builder, getClients, 'clients', null, (state: any, action: any) => {
            state.total_clients = action.payload?.record_count || 0
        })
        CustomAsyncThunk(builder, getCategoriesReports, 'categories', null, (state: any, action: any) => {
            state.total_categories = action.payload?.record_count || 0
        })
        CustomAsyncThunk(builder, getItemsReports, 'items', null, (state: any, action: any) => {
            state.total_items = action.payload?.record_count || 0
        })
    },
})

export const { } = ReportsSlice.actions

export default ReportsSlice.reducer
