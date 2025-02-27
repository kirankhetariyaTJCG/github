// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Action Imports
import { editServeMaster, getServeMaster } from './Action'
import { CustomAsyncThunk } from '@/Helper/CustomAsyncThunk'

interface Initial {
  serveMaster: any
  loading: boolean
  error: any
}

const state: Initial = {
  loading: false,
  error: null,
  serveMaster: {}
}

const serveMasterSlice = createSlice({
  name: 'serveMaster',
  initialState: state,
  reducers: {
    setMenuArr(state: any, action: PayloadAction<any>) {
      state.serveMaster = action.payload
    },
    setDefaultMenuArr(state: any, action: PayloadAction<any>) {
      state.default_arr = action.payload
    },
    editMenuArr(state: any, action: PayloadAction<any>) {
      state.serveMaster = state.serveMaster?.map((item: any) => {
        if (item?._id === action.payload?._id) {
          return { ...item, ...action.payload }
        }

        return item
      })
    },
    addMenuArr(state: any, action: PayloadAction<any>) {
      state.serveMaster.push(action.payload)
    },
    deleteMenuArr(state: any, action: PayloadAction<any>) {
      state.serveMaster = state.serveMaster.filter((item: any) => item?._id !== action.payload)
    },
    setDefaultMenu(state: any, action: PayloadAction<any>) {
      state.default_arr = state.default_arr?.map((item: any) => {
        if (item?._id === action.payload) {
          item.is_checked = !item.is_checked

          return item
        }
        return item
      })
    }
  },
  extraReducers: builder => {
    CustomAsyncThunk(builder, getServeMaster, 'serveMaster')
    CustomAsyncThunk(builder, editServeMaster, 'serveMaster')
  }
})

export const { setMenuArr, editMenuArr, addMenuArr, deleteMenuArr, setDefaultMenuArr, setDefaultMenu } =
  serveMasterSlice.actions

export default serveMasterSlice.reducer

export const serveMaster = (state: any) => state.serveMaster.serveMaster

export const is_loading = (state: any) => state.serveMaster.loading
