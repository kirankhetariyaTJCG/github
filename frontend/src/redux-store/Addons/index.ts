// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Action Imports
import {
  addAddon,
  addChoice,
  changeAddonPosition,
  changeChoicePosition,
  deleteAddon,
  deleteChoice,
  duplicateAddon,
  duplicateChoice,
  editAddon,
  editChoice,
  getAddons
} from './Action'
import {
  AddCustomAsyncThunk,
  CustomAsyncThunk,
  DeleteCustomAsyncThunk,
  EditCustomAsyncThunk
} from '@/Helper/CustomAsyncThunk'

interface Initial {
  addons: any[]
  loading: boolean
  initialLoading: boolean
  error: any
}

const initialState: Initial = {
  addons: [],
  loading: false,
  initialLoading: false,
  error: null
}

const Addons = createSlice({
  name: 'addons',
  initialState: initialState,
  reducers: {
    setAddons(state: any, action: PayloadAction<any>) {
      state.addons = action.payload
    },
  },
  extraReducers: (builder) => {
    CustomAsyncThunk(builder, getAddons, 'addons')
    CustomAsyncThunk(builder, changeAddonPosition, 'addons')
    AddCustomAsyncThunk(builder, addAddon, 'addons')
    AddCustomAsyncThunk(builder, duplicateAddon, 'addons')
    EditCustomAsyncThunk(builder, editAddon, 'addons', '_id')
    DeleteCustomAsyncThunk(builder, deleteAddon, 'addons', '_id')
    AddCustomAsyncThunk(builder, addChoice, 'addons', 'choices')
    AddCustomAsyncThunk(builder, duplicateChoice, 'addons', 'choices')
    EditCustomAsyncThunk(builder, editChoice, 'addons', '_id', 'choices')
    DeleteCustomAsyncThunk(builder, deleteChoice, 'addons', '_id', 'choices')
    CustomAsyncThunk(builder, changeChoicePosition, 'addons', 'choices')
  },
})

export const { setAddons } = Addons.actions

export default Addons.reducer
