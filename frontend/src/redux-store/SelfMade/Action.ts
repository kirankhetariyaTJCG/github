// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'

// Helper Imports
import APIConstants from '@/Helper/APIConstants'
import { duplicateEntity } from '../Category/Action'

export const getSelfMade = createAsyncThunk('restaurant/getSelfMade', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_SELF_MADE_PROMO,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {
        return error
    }
})

export const addSelfMade = createAsyncThunk('restaurant/addSelfMade', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_SELF_MADE_PROMO,
            data: payload,
            method: 'post',
            isMultipart: payload?.promotion_image instanceof Blob
        })

        if (res?.success && res?.statusCode === 201) {
            return res?.data
        } else return
    } catch (error) {

        return error
    }
})

export const editSelfMade = createAsyncThunk('restaurant/editSelfMade', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_SELF_MADE_PROMO,
            data: payload,
            method: 'post',
            isMultipart: payload?.promotion_image instanceof Blob
        })

        return res?.data
    } catch (error) {

        return error
    }
})

export const deleteSelfMade = createAsyncThunk('restaurant/deleteSelfMade', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_SELF_MADE_PROMO,
            data: { id: payload?.id, isDeleted: true, menu_id: payload?.menu_id },
            method: 'post',
        })

        if (res?.success && res?.statusCode === 200) {
            return { _id: payload?.id }
        }

    } catch (error) {

        return error
    }
})

export const duplicatePromotion = createAsyncThunk('restaurant/duplicatePromotion', duplicateEntity)

export const getPromotions = createAsyncThunk('restaurant/getPromotions', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_PROMOTIONS,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res

    } catch (error) {

        return error
    }
})