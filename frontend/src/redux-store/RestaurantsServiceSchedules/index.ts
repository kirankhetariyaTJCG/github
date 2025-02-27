// Third Party Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Action Imports
import { deletePauseServices, getPauseServices, getRestaurantServiceSchedules, managePauseServices, manageRestaurantServiceSchedules } from './Action'
import { AddCustomAsyncThunk, CustomAsyncThunk, DeleteCustomAsyncThunk, EditCustomAsyncThunk } from '@/Helper/CustomAsyncThunk'

interface Initial {
  serviceSchedules: any
  loading: boolean
  initialLoading: boolean
  error: any
  pauseServices:any
}

const state: Initial = {
  serviceSchedules: [],
  loading: false,
  initialLoading: false,
  error: null,
  pauseServices:[]
}

const RestaurantServiceSchedulesSlice = createSlice({
  name: 'restaurantServiceSchedules',
  initialState: state,
  reducers: {
    setLoading(state: any, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setHours(state, action: PayloadAction<any>) {
      const { _id, hours } = action.payload
      state.serviceSchedules = state.serviceSchedules?.map((item: any) =>
        item?._id === _id ? { ...item, hours: hours } : item)

    },
    setServices(state, action: PayloadAction<any>) {
      state.serviceSchedules = action.payload
    }
  },
  extraReducers: builder => {
    CustomAsyncThunk(builder, getRestaurantServiceSchedules, 'serviceSchedules')
    EditCustomAsyncThunk(builder, manageRestaurantServiceSchedules, 'serviceSchedules', '_id')
    CustomAsyncThunk(builder,getPauseServices, 'pauseServices')
    AddCustomAsyncThunk(builder,managePauseServices, 'pauseServices')
    DeleteCustomAsyncThunk(builder,deletePauseServices,'pauseServices',"_id")

  }
})

export const { setLoading, setHours, setServices } = RestaurantServiceSchedulesSlice.actions

export default RestaurantServiceSchedulesSlice.reducer
