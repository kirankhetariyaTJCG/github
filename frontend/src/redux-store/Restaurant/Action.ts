// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Slice Imports
import { setLoading } from '.'

// Service Imports
import apiCall from '@/Helper/Service'
import APIConstants from '@/Helper/APIConstants'
import { AppDispatch } from '..'
import { RESTAURANT_DATA } from '@/Helper/Constants/PublicVariable'

export const restaurantDetail = createAsyncThunk('restaurant/restaurantDetail', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.GET_RESTAURANT_DETAILS,
      data: payload,
      method: 'post',
      isHideToast: true
    })

    if (res?.data) {
      RESTAURANT_DATA.ID = res?.data?._id
    }
    return res
  } catch (error) {
    console.log(error)

    return error
  }
})

export const editRestaurantDetail = createAsyncThunk('restaurant/editRestaurantDetail', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.EDIT_RESTAURANT_DETAILS,
      data: payload.data,
      method: 'post'
    })
    if (res?.success && res?.statusCode === 200) {
      return res
    }

    return { data: payload.old_restaurant_data }

  } catch (error) {
    console.log(error)

    return error
  }
})

export const sendVerificationEmail = async (passData: any, dispatch: AppDispatch) => {
  dispatch(setLoading(true))

  const res = await apiCall({
    url: APIConstants.SEND_VERIFICATION_EMAIL,
    data: { email: passData.email },
    method: 'post',
    isLogin: passData.isLogin
  })

  dispatch(setLoading(false))

  return res
}

export const generateWebsite = async (payload: any, dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true))
    const res = await apiCall({
      url: APIConstants.GENERATE_WEBSITE,
      data: payload,
      method: 'post',
      isHideToast: true
    })

    dispatch(setLoading(false))

    return res
  } catch (error) {

    return error
  }
}

export const getStripeDetails = async (payload: any, dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true))
    const res = await apiCall({
      url: APIConstants.PAYMENT_KEY,
      data: payload,
      method: 'post',
      isHideToast: true
    })

    dispatch(setLoading(false))

    return res
  } catch (error) {

    return error
  }
}