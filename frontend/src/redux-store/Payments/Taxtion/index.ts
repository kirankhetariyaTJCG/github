// Third Party Imports
import { createSlice } from '@reduxjs/toolkit'

// Action Imports
import { addTaxCategory, editTaxCategory, deleteTaxCategory, getTaxCategories } from './Action'
import {
  CustomAsyncThunk,
  AddCustomAsyncThunk,
  EditCustomAsyncThunk,
  DeleteCustomAsyncThunk
} from '@/Helper/CustomAsyncThunk'

interface Initial {
  taxCategory: any[]
  loading: boolean
  error: any
  initialLoading: boolean
}

const initialState: Initial = {
  taxCategory: [],
  loading: false,
  error: null,
  initialLoading: false
}

const Taxtion = createSlice({
  name: 'taxtion',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    CustomAsyncThunk(builder, getTaxCategories, 'taxCategory')
    AddCustomAsyncThunk(builder, addTaxCategory, 'taxCategory')
    EditCustomAsyncThunk(builder, editTaxCategory, 'taxCategory', '_id')
    DeleteCustomAsyncThunk(builder, deleteTaxCategory, 'taxCategory', '_id')
  },
})

export default Taxtion.reducer
