// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Initial {
  pre_made: any[]
  loading: boolean
}

const state: Initial = {
  loading: false,
  pre_made: [
    {
      _id: AppUtils.randomId(),
      headline: '20% OFF your next online order',
      coupon_code: 'WIN5',
      used: 0,
      status: true
    },
    {
      _id: AppUtils.randomId(),
      headline: '20% OFF your next online order',
      coupon_code: 'WIN4',
      used: 0,
      status: true
    },
    {
      _id: AppUtils.randomId(),
      headline: '15% OFF your next online order',
      coupon_code: 'WIN3',
      used: 0,
      status: true
    },
    {
      _id: AppUtils.randomId(),
      headline: '15% OFF your next online order',
      coupon_code: 'WIN2',
      used: 0,
      status: true
    },
    {
      _id: AppUtils.randomId(),
      headline: '10% OFF your next online order',
      coupon_code: 'WIN1',
      used: 0,
      status: true
    },
    {
      _id: AppUtils.randomId(),
      headline: '15% OFF, yours for the taking',
      coupon_code: '2NDOFF',
      used: 0,
      status: true
    },
    {
      _id: AppUtils.randomId(),
      headline: '15% Off Your 1st Order',
      coupon_code: 'V9GOM1C9N3BJ7JO',
      used: 0,
      status: true
    }
  ]
}

const PreMade = createSlice({
  name: 'pre_made',
  initialState: state,
  reducers: {
    setPreMade(state: any, action: PayloadAction<any>) {
      state.pre_made = action.payload
    },
    editPreMade(state: any, action: PayloadAction<any>) {
      state.pre_made = state.pre_made?.map((item: any) => {
        if (item?._id === action.payload?._id) {
          return { ...item, ...action.payload }
        }

        return item
      })
    },
    setStatus(state: any, action: PayloadAction<any>) {
      state.pre_made = state.pre_made?.map((item: any) => {
        if (item?._id === action.payload) {
          item.status = !item.status

          return item
        }
        return item
      })
    }
  }
})

export const { setPreMade, editPreMade, setStatus } = PreMade.actions

export default PreMade.reducer

export const pre_made = (state: any) => state.pre_made.pre_made

export const is_loading = (state: any) => state.pre_made.loading
