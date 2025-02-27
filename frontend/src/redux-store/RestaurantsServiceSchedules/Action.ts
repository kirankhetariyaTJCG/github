// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'
import APIConstants from '@/Helper/APIConstants'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import { specificHours, weekDays } from '@/views/pages/RestaturentBasics/OpeningHours'

export const manageRestaurantServiceSchedules = createAsyncThunk('restaurants/manageRestaurantServiceSchedules', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.MANAGE_RESTAURANT_SERVICE_SCHEDULES,
      data: payload.data,
      method: 'post'
    })
    if (res?.success && res?.statusCode === 200) {
      return { ...res?.data }
    }
    return { data: payload.old_schedule_data }


  } catch (error) {

    return error
  }
})


export const getRestaurantServiceSchedules = createAsyncThunk('restaurants/getRestaurantServiceSchedules', async (payload: any) => {
  try {
    const res = await apiCall({
      url: APIConstants.GET_RESTAURANT_All_SERVICE_SCHEDULES,
      data: payload.data,
      method: 'post',
      isHideToast: true
    })

    if (res?.success && res?.statusCode === 200) {
      const updatedServvices = specificHours?.map((item: any, index: number) => {
        return {
          ...item,
          ...res?.data[index],
          hours: AppUtils.checkValue(res?.data[index]?.hours) ? res?.data[index]?.hours : weekDays
        }
      })

      return { data: updatedServvices}
    }

    return { data: payload.old_schedule_data }

  } catch (error) {

    return error
  }
})


export const managePauseServices = createAsyncThunk('restaurants/managePauseServices', async (payload: any) => {

  try {
    const res = await apiCall({
      url: APIConstants.MANAGE_PAUSE_SERVICES,
      data: payload.data,
      method: 'post',
      isHideToast: true
    })

    if (res?.success && res?.statusCode === 201) {

      return res.data
    }

    return { data: payload.old_pause_services_data }

  } catch (error) {

    return error
  }
})

//get api for pause services
export const getPauseServices = createAsyncThunk('restaurants/getPauseServices', async (payload: any,) => {
  try {
    const res = await apiCall({
      url: APIConstants.GET_PAUSE_SERVICES,
      data: payload.data,
      method: 'post',
      isHideToast: true
    })
    if (res?.success && res?.statusCode === 200) {

      return res
    }

    return { data: payload.old_pause_services_data}

  } catch (error) {

    return error
  }
})


export const deletePauseServices = createAsyncThunk('restaurants/deletePauseServices', async (payload: any,) => {
  try {
    const res = await apiCall({
      url: APIConstants.DELETE_PAUSE_SERVICES,
      data: {id:payload},
      method: 'post',
      isHideToast: true
    })

    if (res?.success && res?.statusCode === 200) {
      return { _id: payload }
  }

    // return { data: payload.old_pause_services_data}

  } catch (error) {

    return error
  }
})

