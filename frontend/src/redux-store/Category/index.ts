// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Action Imports
import {
  addAllergens, addCategory, addItem, addSize, changeCategoryPosition, changeItemPosition, deleteAllergens, deleteCategory, deleteItem,
  deleteSize, duplicateCategory, duplicateItem, editAllergens, editCategory, editItem, editSize, getAllergens, getCategories, getTags,
  setCategoryVisibility, setItemVisibility
} from './Action'
import { AddCustomAsyncThunk, CustomAsyncThunk, DeleteCustomAsyncThunk, EditCustomAsyncThunk } from '@/Helper/CustomAsyncThunk'

interface Initial {
  category: any[]
  tags: any[]
  allergens: any[]
  nutritionals: any[]
  loading: boolean
  initialLoading: boolean
  error: any
}

const initialState: Initial = {
  category: [],
  tags: [],
  allergens: [],
  nutritionals: [],
  loading: false,
  initialLoading: false,
  error: null
}

const Category = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    setCategory(state: any, action: PayloadAction<any>) {
      state.category = action.payload
    },
  },
  extraReducers: (builder) => {
    CustomAsyncThunk(builder, getCategories, 'category')
    CustomAsyncThunk(builder, changeCategoryPosition, 'category')
    AddCustomAsyncThunk(builder, addCategory, 'category')
    AddCustomAsyncThunk(builder, duplicateCategory, 'category')
    EditCustomAsyncThunk(builder, editCategory, 'category', '_id')
    EditCustomAsyncThunk(builder, setCategoryVisibility, 'category', '_id')
    DeleteCustomAsyncThunk(builder, deleteCategory, 'category', '_id')
    AddCustomAsyncThunk(builder, addItem, 'category', 'items')
    AddCustomAsyncThunk(builder, duplicateItem, 'category', 'items')
    EditCustomAsyncThunk(builder, editItem, 'category', '_id', 'items')
    EditCustomAsyncThunk(builder, setItemVisibility, 'category', '_id', 'items')
    DeleteCustomAsyncThunk(builder, deleteItem, 'category', '_id', 'items')
    CustomAsyncThunk(builder, changeItemPosition, 'category', 'items')
    AddCustomAsyncThunk(builder, addSize, 'category', 'items', 'sizes')
    EditCustomAsyncThunk(builder, editSize, 'category', '_id', 'items', 'sizes')
    DeleteCustomAsyncThunk(builder, deleteSize, 'category', '_id', 'items', 'sizes')
    CustomAsyncThunk(builder, getTags, 'tags')
    CustomAsyncThunk(builder, getAllergens, 'allergens')
    AddCustomAsyncThunk(builder, addAllergens, 'allergens', undefined, undefined, true)
    EditCustomAsyncThunk(builder, editAllergens, 'allergens', '_id', undefined, undefined, true)
    DeleteCustomAsyncThunk(builder, deleteAllergens, 'allergens', '_id', undefined, undefined, true)
  },
})

export const { setCategory } = Category.actions

export default Category.reducer
