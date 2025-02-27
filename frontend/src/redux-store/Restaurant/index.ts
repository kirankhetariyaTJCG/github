// Third Party Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Action Imports
import { restaurantDetail, editRestaurantDetail } from './Action'
import { CustomAsyncThunk } from '@/Helper/CustomAsyncThunk'

interface Initial {
  restaurant: any
  loading: boolean
  initialLoading: boolean
  error: any
}

const state: Initial = {
  restaurant: {},
  loading: false,
  initialLoading: false,
  error: null
}

const RestaurantSlice = createSlice({
  name: 'restaurant',
  initialState: state,
  reducers: {
    setLoading(state: any, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    editRestaurentData(state: any, action: PayloadAction<any>) {
      const { isServe, data } = action.payload
      if (isServe) {
        state.restaurant = { ...state.restaurant, ...data }
      } else {
        state.restaurant = data
      }
    }
  },
  extraReducers: builder => {
    CustomAsyncThunk(builder, restaurantDetail, 'restaurant')
    CustomAsyncThunk(builder, editRestaurantDetail, 'restaurant')
  }
})

export const { setLoading, editRestaurentData } = RestaurantSlice.actions

export default RestaurantSlice.reducer

export const restaurant = (state: any) => state.restaurant.restaurant

export const is_loading = (state: any) => state.restaurant.loading
