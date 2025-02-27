// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Slice Imports
import { setLoading } from '../Restaurant'

// Service Imports
import apiCall from '@/Helper/Service'

// Helper Imports
import APIConstants from '@/Helper/APIConstants'

export const getServeMaster = createAsyncThunk('restaurant/getServeMaster', async (passData: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.EDIT_RESTAURANT_DETAILS,
      data: passData,
      method: 'post',
      isHideToast: true
    })

    return res
  } catch (error) {
    console.log(error)

    return error
  }
})

export const editServeMaster = createAsyncThunk('restaurant/editServeMaster', async (passData: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.EDIT_RESTAURANT_DETAILS,
      data: passData,
      method: 'post'
    })

    return res
  } catch (error) {
    console.log(error)

    return error
  }
})
