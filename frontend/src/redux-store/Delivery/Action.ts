// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'

// Helper Imports
import APIConstants from '@/Helper/APIConstants'

export const getDeliveryZones = createAsyncThunk('restaurant/getDeliveryZones', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.GET_DELIVERYZONES,
      data: payload,
      method: 'post',
      isHideToast: true
    })

    const updateDeliveryZones = Array.isArray(res?.data) && res?.data?.length > 0 ?
      res?.data?.map((item: any) => {
        return {
          ...item,
          isHover: false,
          isDraw: false,
          editable: false,
        }
      }) : []

    return { data: updateDeliveryZones }

  } catch (error) {
    return error
  }
})

export const addDeliveryZone = createAsyncThunk('restaurant/addDeliveryZone', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.ADD_DELIVERYZONE,
      data: payload,
      method: 'post',
    })

    if (res?.success && res?.statusCode === 201) {
      return { ...res?.data, isHover: false, isDraw: false, editable: false }
    } else return
  } catch (error) {

    return error
  }
})

export const editDeliveryZone = createAsyncThunk('restaurant/editDeliveryZone', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.EDIT_DELIVERYZONE,
      data: payload,
      method: 'post',
    })

    return { ...res?.data, isHover: false, isDraw: false, editable: false }
  } catch (error) {

    return error
  }
})

export const deleteDeliveryZone = createAsyncThunk('restaurant/deleteDeliveryZone', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.DELETE_DELIVERYZONE,
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