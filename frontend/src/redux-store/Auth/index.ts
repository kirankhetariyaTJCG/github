// ** Third Party Imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const authState: {
  authUser: any
  isLoading: boolean
} = {
  authUser: {},
  isLoading: false
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    fetchAuthUser(state: any, action: PayloadAction<any>) {
      state.authUser = action.payload
    },
    setIsLoading(state: any, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    }
  }
})

export const { fetchAuthUser, setIsLoading } = AuthSlice.actions

export default AuthSlice.reducer

export const auth_data = (state: any) => state.auth.authUser

export const is_loading = (state: any) => state.auth.isLoading
