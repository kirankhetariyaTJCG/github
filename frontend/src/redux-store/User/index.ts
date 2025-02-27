// Third Party Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Action Imports
import { updateProfile } from './Action'
import { CustomAsyncThunk } from '@/Helper/CustomAsyncThunk'

interface Initial {
  user: any
  loading: boolean
  error: any
}

const state: Initial = {
  user: {},
  loading: false,
  error: null
}

const UserSlice = createSlice({
  name: 'user',
  initialState: state,
  reducers: {
    setLoading(state: any, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  },
  extraReducers: builder => {
    CustomAsyncThunk(builder, updateProfile, 'user')
  }
})

export const { setLoading } = UserSlice.actions

export default UserSlice.reducer

export const user = (state: any) => state.user.user

export const is_loading = (state: any) => state.user.loading
