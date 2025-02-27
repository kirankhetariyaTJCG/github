// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'

// Helper Imports
import APIConstants from '@/Helper/APIConstants'

export const getTaxCategories = createAsyncThunk('restaurant/getTaxCategories', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_TAX_CATEOGORIES,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {

        return error
    }
})

export const addTaxCategory = createAsyncThunk('restaurant/addTaxCategory', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.ADD_TAX_CATEGORY,
            data: payload,
            method: 'post',
        })

        return res?.data
    } catch (error) {

        return error
    }
})

export const editTaxCategory = createAsyncThunk('restaurant/editTaxCategory', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.EDIT_TAX_CATEGORY,
            data: payload,
            method: 'post',
        })

        return res?.data
    } catch (error) {

        return error
    }
})

export const deleteTaxCategory = createAsyncThunk('restaurant/deleteTaxCategory', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.DELETE_TAX_CATEGORY,
            data: { id: payload },
            method: 'post',
        })

        if (res?.success && res?.statusCode === 200) {
            return { _id: payload }
        }

    } catch (error) {

        return error
    }
})