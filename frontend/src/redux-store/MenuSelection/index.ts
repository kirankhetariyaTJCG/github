// Third Party Imports
import { createSlice } from '@reduxjs/toolkit'

// Action Imports
import { getAllMenu, editMenu, addMenu, deleteMenu, getDefaultMenu } from './Action'
import { AddCustomAsyncThunk, CustomAsyncThunk, DeleteCustomAsyncThunk, EditCustomAsyncThunk } from '@/Helper/CustomAsyncThunk'

interface Initial {
  selectedMenuData: any[]
  loading: boolean
  defaultMenuData: any[]
  error: any
}

const state: Initial = {
  loading: false,
  error: null,
  selectedMenuData: [],
  defaultMenuData: []
}

const MenuSelection = createSlice({
  name: 'menuSelection',
  initialState: state,
  reducers: {},
  extraReducers: builder => {
    CustomAsyncThunk(builder, getAllMenu, 'selectedMenuData')
    CustomAsyncThunk(builder, getDefaultMenu, 'defaultMenuData')
    EditCustomAsyncThunk(builder, editMenu, 'selectedMenuData', '_id')
    AddCustomAsyncThunk(builder, addMenu, 'selectedMenuData')
    DeleteCustomAsyncThunk(builder, deleteMenu, 'selectedMenuData', '_id')
  }
})

export default MenuSelection.reducer
