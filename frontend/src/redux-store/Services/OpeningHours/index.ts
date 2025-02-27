// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Initial {
  exceptions: any[]
}

const initialState: Initial = { exceptions: [] }

const OpeningHours = createSlice({
  name: 'opening_hours',
  initialState: initialState,
  reducers: {
    setExceptions(state: any, action: PayloadAction<any>) {
      state.exceptions = action.payload
    },

    addException(state: any, action: PayloadAction<any>) {
      state.exceptions.push(action.payload)
    },
    editException(state: any, action: PayloadAction<any>) {
      state.exceptions = state.exceptions?.map((item: any) => {
        if (item?._id === action.payload?._id) {
          return { ...item, ...action.payload }
        }

        return item
      })
    },
    deleteException(state: any, action: PayloadAction<any>) {
      state.exceptions = state.exceptions.filter((item: any) => item?._id !== action.payload)
    }
  }
})

export const { setExceptions, addException, editException, deleteException } = OpeningHours.actions

export default OpeningHours.reducer

export const exceptions = (state: any) => state.services.opening_hours.exceptions
