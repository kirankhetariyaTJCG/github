// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Action Imports
import { CustomAsyncThunk, AddCustomAsyncThunk, EditCustomAsyncThunk, DeleteCustomAsyncThunk } from '@/Helper/CustomAsyncThunk'
import { addSelfMade, deleteSelfMade, duplicatePromotion, editSelfMade, getPromotions, getSelfMade } from './Action'

interface Initial {
  self_made: any[]
  deal_type: any[]
  promotions: any[]
  loading: boolean
  error: any
  record_count: number
}

const state: Initial = {
  loading: false,
  error: null,
  record_count: 0,
  self_made: [],
  promotions: [],
  deal_type: [
    {
      title: '% discount on cart',
      desc: '% discount on your total cart value, usually combined with a condition like minimum ordering amount',
      icon: 'tabler:shopping-cart-discount',
      isLocked: false,
      type: 1
    },
    {
      title: '% discount on selected items',
      desc: 'For example: 30% off on any dessert or drink',
      icon: 'tabler:shopping-bag-discount',
      isLocked: false,
      type: 2
    },
    {
      title: 'Free delivery',
      desc: 'Free delivery (discounted delivery) for orders over a certain cart value.',
      icon: 'iconamoon:delivery-free',
      isLocked: false,
      type: 3
    },
    {
      title: 'Buy one, get one free',
      desc: 'For example: Buy a main dish and get the second for free.',
      icon: 'hugeicons:tags',
      isLocked: false,
      type: 4
    },
    {
      title: 'Fixed discount amount on cart',
      desc: 'Fixed discount amount on the total cart value, usually combined with a condition like minimum ordering amount.',
      icon: 'mdi:cart-discount',
      isLocked: false,
      type: 5
    },
    {
      title: 'Payment method reward',
      desc: '% discount on your total cart value if you pay with a certain payment method. For example: Credit card online.',
      icon: 'mdi:account-payment-outline',
      isLocked: false,
      type: 6
    },
    {
      title: 'Get a FREE item',
      desc: 'For example: Free drink on any order $30+',
      icon: 'fluent-emoji-high-contrast:free-button',
      isLocked: false,
      type: 7
    },
    {
      title: 'Meal bundle',
      desc: 'A selection of dishes at a fixed price. For example: Any 2 appetizers + 2 main dishes + 2 desserts => All for $55!',
      icon: 'mdi:burger',
      isLocked: true,
      type: 8
    },
    {
      title: 'Buy 2,3,... get one free',
      desc: 'For example: Buy two main dishes and get the third for free.',
      icon: 'mdi:tag-multiple-outline',
      isLocked: true,
      type: 9
    },
    {
      title: 'Free dish or discounted item as part of a meal',
      desc: 'For example: Free dessert or drink if you purchase starter + main dish.',
      icon: 'emojione-monotone:free-button',
      isLocked: true,
      type: 10
    },
    {
      title: 'Fixed discount amount on combo deal',
      desc: 'For example: Buy any main dish plus dessert and get $5 off.',
      icon: 'ion:fast-food-outline',
      isLocked: true,
      type: 11
    },
    {
      title: '% discount on combo deal',
      desc: 'For example: Buy any main dish plus dessert and get 10% off.',
      icon: 'ic:twotone-fastfood',
      isLocked: true,
      type: 12
    },
    {
      title: 'Meal bundle with speciality',
      desc: 'Same as "Meal bundle" but a subset of selected items are only available with an extra fee.',
      icon: 'icon-park-twotone:cooking',
      isLocked: true,
      type: 13
    }
  ]
}

const SelfMade = createSlice({
  name: 'self_made',
  initialState: state,
  reducers: {
    setSelfMade(state: any, action: PayloadAction<any>) {
      state.self_made = action.payload
    }
  },
  extraReducers: builder => {
    CustomAsyncThunk(builder, getSelfMade, 'self_made', null, (state, action) => {
      state.record_count = action.payload?.record_count || 0
    })
    CustomAsyncThunk(builder, getPromotions, 'promotions')
    AddCustomAsyncThunk(builder, addSelfMade, 'self_made')
    AddCustomAsyncThunk(builder, duplicatePromotion, 'self_made')
    EditCustomAsyncThunk(builder, editSelfMade, 'self_made', '_id')
    DeleteCustomAsyncThunk(builder, deleteSelfMade, 'self_made', '_id', undefined, undefined, false,
      (state) => state.record_count = (state.record_count || 0) - 1)
  },
})

export const { setSelfMade } = SelfMade.actions

export default SelfMade.reducer
