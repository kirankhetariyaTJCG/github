// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'

// Helper Imports
import APIConstants from '@/Helper/APIConstants'

export const getQrFlyers = createAsyncThunk('restaurant/getQrFlyers', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_FLYERS,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res

    } catch (error) {
        return error
    }
})

export const addQrFlyer = createAsyncThunk('restaurant/addQrFlyer', async (payload: any) => {
    try {
        const res = await apiCall({
            url: payload?.image ? APIConstants.MANAGE_FLYER_PAGE : APIConstants.MANAGE_FLYER,
            data: payload,
            method: 'post',
            isMultipart: payload?.image
        })

        if (res?.success && res?.statusCode === 201) {
            return res?.data
        } else return
    } catch (error) {

        return error
    }
})

export const editQrFlyer = createAsyncThunk('restaurant/editQrFlyer', async (payload: any) => {
    try {
        const res = await apiCall({
            url: payload?.image ? APIConstants.MANAGE_FLYER_PAGE : APIConstants.MANAGE_FLYER,
            data: payload,
            method: 'post',
            isMultipart: payload?.image
        })

        return res?.data
    } catch (error) {

        return error
    }
})

export const deleteQrFlyer = createAsyncThunk('restaurant/deleteQrFlyer', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.DELETE_FLYER,
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

export const generateQrCode = async (payload: any) => {

    const res = await apiCall({
        url: APIConstants.GENERATE_QR,
        data: payload,
        method: 'post',
    })

    return res
}