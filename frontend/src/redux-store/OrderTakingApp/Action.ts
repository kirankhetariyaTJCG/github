// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'
import APIConstants from '@/Helper/APIConstants'

export const getLoginHistory = createAsyncThunk('restaurant/getLoginHistory', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_LOGIN_HISTORY,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {

        return error
    }
})

export const sendAppLink = async (payload: any) => {
    const res = await apiCall({
        url: APIConstants.SEND_APP_LINK,
        data: payload,
        method: 'post',
    })

    return res
}