// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'

// Helper Imports
import APIConstants from '@/Helper/APIConstants'

export const getOrders = createAsyncThunk('restaurant/getOrders', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_ORDERS,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {
        return error
    }
})

export const getClients = createAsyncThunk('restaurant/getClients', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_CLIENTS,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {
        return error
    }
})

export const getCategoriesReports = createAsyncThunk('restaurant/getCategoriesReports', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_CATEGORIES,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {
        return error
    }
})

export const getItemsReports = createAsyncThunk('restaurant/getItemsReports', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_CATEGORIES,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {
        return error
    }
})

export const getOrderById = async (payload: any) => {

    const res = await apiCall({
        url: APIConstants.GET_ORDER_BY_ID,
        data: payload,
        method: 'post',
        isHideToast: true
    })

    return res

}