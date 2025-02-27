// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'

// Helper Imports
import APIConstants from '@/Helper/APIConstants'

export const getServiceFees = createAsyncThunk('restaurant/getServiceFees', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_SERVICE_FEES,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {
        return error
    }
})

export const addServiceFees = createAsyncThunk('restaurant/addServiceFees', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_SERVICE_FEES,
            data: payload,
            method: 'post',
        })

        if (res?.success && res?.statusCode === 201) {
            return res?.data
        } else return
    } catch (error) {

        return error
    }
})

export const editServiceFees = createAsyncThunk('restaurant/editServiceFees', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_SERVICE_FEES,
            data: payload,
            method: 'post',
        })

        return res?.data
    } catch (error) {

        return error
    }
})

export const changeServiceStatus = createAsyncThunk('restaurant/changeServiceStatus', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_SERVICE_FEES,
            data: payload,
            method: 'post',
        })

        return res?.data
    } catch (error) {

        return error
    }
})

export const deleteServiceFees = createAsyncThunk('restaurant/deleteServiceFees', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_SERVICE_FEES,
            data: { id: payload, is_deleted: true },
            method: 'post',
        })

        if (res?.success && res?.statusCode === 200) {
            return { _id: payload }
        }

    } catch (error) {

        return error
    }
})