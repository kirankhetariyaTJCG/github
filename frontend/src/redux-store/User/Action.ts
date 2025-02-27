// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'
import APIConstants from '@/Helper/APIConstants'

export const updateProfile = createAsyncThunk('user/updateProfile', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.GET_RESTAURANT_DETAILS,
      data: payload,
      method: 'post',
      isHideToast: true
    })

    return res
  } catch (error) {
    console.log(error)

    return error
  }
})
