// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { addQrFlyer, deleteQrFlyer, editQrFlyer, getQrFlyers } from './Action'
import { AddCustomAsyncThunk, CustomAsyncThunk, DeleteCustomAsyncThunk, EditCustomAsyncThunk } from '@/Helper/CustomAsyncThunk'

interface Initial {
  qr_flyers: any[]
  loading: boolean
  error: any
}

const initialState: Initial = {
  qr_flyers: [],
  loading: false,
  error: null,
}

const QrFlyers = createSlice({
  name: 'qr_code',
  initialState: initialState,
  reducers: {
    setPdfLink(state, action: PayloadAction<any>) {
      state.qr_flyers = state.qr_flyers?.map((item: any) => item?._id === action.payload?._id ? { ...item, ...action?.payload } : item)
    }
  },
  extraReducers: builder => {
    CustomAsyncThunk(builder, getQrFlyers, 'qr_flyers')
    AddCustomAsyncThunk(builder, addQrFlyer, 'qr_flyers')
    EditCustomAsyncThunk(builder, editQrFlyer, 'qr_flyers', '_id')
    DeleteCustomAsyncThunk(builder, deleteQrFlyer, 'qr_flyers', '_id')
  },
})

export const { setPdfLink } = QrFlyers.actions

export default QrFlyers.reducer
