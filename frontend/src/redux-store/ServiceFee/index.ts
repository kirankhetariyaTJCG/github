// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Action Imports
import { CustomAsyncThunk, AddCustomAsyncThunk, EditCustomAsyncThunk, DeleteCustomAsyncThunk } from '@/Helper/CustomAsyncThunk'
import { addServiceFees, changeServiceStatus, deleteServiceFees, editServiceFees, getServiceFees } from './Action'

interface Initial {
  service_fees: any[]
  loading: boolean
  error: any
}

const state: Initial = {
  loading: false,
  service_fees: [],
  error: null
}

const ServiceFee = createSlice({
  name: 'fees',
  initialState: state,
  reducers: {},
  extraReducers: builder => {
    CustomAsyncThunk(builder, getServiceFees, 'service_fees')
    AddCustomAsyncThunk(builder, addServiceFees, 'service_fees')
    EditCustomAsyncThunk(builder, editServiceFees, 'service_fees', '_id')
    DeleteCustomAsyncThunk(builder, deleteServiceFees, 'service_fees', '_id')
    EditCustomAsyncThunk(builder, changeServiceStatus, 'service_fees', '_id')
  },
})

export const { } = ServiceFee.actions

export default ServiceFee.reducer
