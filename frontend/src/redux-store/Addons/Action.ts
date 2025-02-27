// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'

// Helper Imports
import APIConstants from '@/Helper/APIConstants'
import { duplicateEntity } from '../Category/Action'

export const getAddons = createAsyncThunk('restaurant/getAddons', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_ALL_ADDONS,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {

        return error
    }
})

export const changeAddonPosition = createAsyncThunk('restaurant/changeAddonPosition', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.CHANGE_ADDON_POSITION,
            data: {
                restaurant_id: payload?.restaurant_id,
                addonIds: payload?.addons?.map((item: any) => item?._id)
            },
            method: 'post',
        })

        if (res && res?.statusCode === 200) {
            return { data: payload?.addons }
        }

        return { data: payload?.oldAddons }

    } catch (error) {

        return error
    }
})

export const addAddon = createAsyncThunk('restaurant/addAddon', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.ADD_ADDON,
            data: payload,
            method: 'post',
        })

        return res?.data
    } catch (error) {

        return error
    }
})

export const editAddon = createAsyncThunk('restaurant/editAddon', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.EDIT_ADDON,
            data: payload,
            method: 'post',
        })

        return res?.data
    } catch (error) {

        return error
    }
})

export const deleteAddon = createAsyncThunk('restaurant/deleteAddon', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.DELETE_ADDON,
            data: { id: payload },
            method: 'post',
        })

        if (res?.success && res?.statusCode === 200) {
            return { _id: payload }
        } else return { _id: null }

    } catch (error) {

        return error
    }
})



export const addChoice = createAsyncThunk('restaurant/addChoice', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.ADD_CHOICE,
            data: payload,
            method: 'post',
        })

        return { parentArrayId: res?.data?.addon_id, addObject: res?.data }
    } catch (error) {

        return error
    }
})

export const editChoice = createAsyncThunk('restaurant/editChoice', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.EDIT_CHOICE,
            data: payload,
            method: 'post',
        })

        return { parentArrayId: res?.data?.addon_id, _id: res?.data?._id, ...res?.data }
    } catch (error) {

        return error
    }
})

export const deleteChoice = createAsyncThunk('restaurant/deleteChoice', async (payload: any) => {
    try {
        await apiCall({
            url: APIConstants.DELETE_CHOICE,
            data: { id: payload?.id },
            method: 'post',
        })


        return { parentArrayId: payload?.addon_id, _id: payload?.id }

    } catch (error) {

        return error
    }
})

export const changeChoicePosition = createAsyncThunk('restaurant/changeChoicePosition', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.CHANGE_CHOICE_POSITION,
            data: {
                addon_id: payload?.addon_id,
                choiceOrderedId: payload?.choices?.map((item: any) => item?._id)
            },
            method: 'post',
        })

        if (res && res?.statusCode === 200) {
            return { parentArrayId: payload?.addon_id, data: payload?.choices }
        }

        return { data: payload?.oldChoices }

    } catch (error) {

        return error
    }
})

export const duplicateAddon = createAsyncThunk('restaurant/duplicateAddon', duplicateEntity)

export const duplicateChoice = createAsyncThunk('restaurant/duplicateChoice', duplicateEntity)