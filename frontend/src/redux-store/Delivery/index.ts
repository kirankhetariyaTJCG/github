// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Action Imports
import { AddCustomAsyncThunk, CustomAsyncThunk, DeleteCustomAsyncThunk, EditCustomAsyncThunk } from '@/Helper/CustomAsyncThunk'
import { addDeliveryZone, deleteDeliveryZone, editDeliveryZone, getDeliveryZones } from './Action'

interface Toggle { _id: string, value: boolean, key: 'isHover' | 'isDraw' | 'editable' }
interface Initial {
  deliveryZones: any[]
  reloadKey: number
  loading: boolean
  error: any
}

const state: Initial = { deliveryZones: [], reloadKey: 0, loading: false, error: null }

const DeliverySlice = createSlice({
  name: 'delivery',
  initialState: state,
  reducers: {
    updateZoneArr(state: any, action: PayloadAction<any>) {
      state.deliveryZones = state.deliveryZones?.map((item: any) => {
        if (item?._id === action.payload?._id) {
          return { ...item, ...action.payload }
        }

        return item
      })
    },
    hoverZone(state: any, action: PayloadAction<any>) {
      const { _id, isHover } = action.payload
      state.deliveryZones = state.deliveryZones?.map((item: any) => {
        item.isHover = false
        if (item?._id === _id) {
          item.isHover = isHover

          return item
        }
        return item
      })
    },
    setZoneKey(state: any, action: PayloadAction<Toggle>) {
      const { _id, value, key } = action.payload
      state.deliveryZones = state.deliveryZones?.map((item: any) => item?._id === _id
        ? { ...item, [key]: value }
        : { ...item, [key]: false })
    },
    setReloadKey(state: any) {
      state.reloadKey = state.reloadKey + 1
    },
  },
  extraReducers: builder => {
    CustomAsyncThunk(builder, getDeliveryZones, 'deliveryZones')
    AddCustomAsyncThunk(builder, addDeliveryZone, 'deliveryZones')
    EditCustomAsyncThunk(builder, editDeliveryZone, 'deliveryZones', '_id')
    DeleteCustomAsyncThunk(builder, deleteDeliveryZone, 'deliveryZones', '_id')
  },
})

export const {
  updateZoneArr,
  hoverZone,
  setReloadKey,
  setZoneKey,
} = DeliverySlice.actions

export default DeliverySlice.reducer
