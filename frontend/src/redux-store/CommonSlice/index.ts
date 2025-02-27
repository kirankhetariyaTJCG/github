// Third Party Imports
import { createSlice } from '@reduxjs/toolkit'

interface Initial {
  country: any
  state: any
  city: any
  loading: boolean
  error: any
}

const initialState: Initial = {
  country: [],
  state: [],
  city: [],
  loading: false,
  error: null
}

const CommonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {},
})

// export const { } = CommonSlice.actions

export default CommonSlice.reducer

export const country_arr = (state: any) => state.common.country

export const state_arr = (state: any) => state.common.state

export const city_arr = (state: any) => state.common.city

export const is_loading = (state: any) => state.common.loading
