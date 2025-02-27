// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'

// Helper Imports
import APIConstants from '@/Helper/APIConstants'

export const getAllMenu = createAsyncThunk('menu/getAllMenu', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.GET_ALL_MENU,
      data: payload,
      method: 'post',
      isHideToast: true
    })

    return res
  } catch (error) {

    return error
  }
})

export const getDefaultMenu = createAsyncThunk('menu/getDefaultMenu', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.GET_DEFAULT_MENU,
      data: payload,
      method: 'post',
      isHideToast: true
    })

    return res
  } catch (error) {

    return error
  }
})

export const addMenu = createAsyncThunk('restaurant/addMenu', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.ADD_MENU,
      data: payload,
      method: 'post',
      isMultipart: payload?.cuisine_image instanceof Blob
    })

    return res?.data
  } catch (error) {

    return error
  }
})

export const editMenu = createAsyncThunk('menu/editMenu', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.EDIT_MENU,
      data: payload,
      method: 'post',
      isMultipart: payload?.cuisine_image instanceof Blob
    })

    return res?.data
  } catch (error) {

    return error
  }
})

export const deleteMenu = createAsyncThunk('menu/deleteMenu', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.DELETE_MENU,
      data: { id: payload },
      method: 'post'
    })

    if (res?.success && res?.statusCode === 200) {
      return { _id: payload }
    }

  } catch (error) {

    return error
  }
})
