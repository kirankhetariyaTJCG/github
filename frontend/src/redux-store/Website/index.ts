// Third Party Imports
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Action Imports
import { CustomAsyncThunk } from '@/Helper/CustomAsyncThunk'
import { editWebsiteData, getWebsiteData } from './Action'

interface ColorTypes {
  label: string
  main: string
  secondary: string
  light: string
  btnTextColor: string
}

interface initialState {
  website: {
    sections: any[];
    temp_section: any[];
    color: ColorTypes;
    fonts: number,
    navigation: number
    previewType: number
    pageType: number
    isWebsiteChanged: boolean,
  }
  loading: boolean
  error: any
  openMenu: boolean
}

const initialState: initialState = {
  website: {
    sections: [],
    temp_section: [],
    color: {
      label: 'Orange-White',
      main: '#FF5833',
      secondary: '#FFFFFF',
      light: '#FFE8E2',
      btnTextColor: '#FF5833'
    },
    fonts: 1,
    navigation: 2,
    previewType: 1,
    pageType: 1,
    isWebsiteChanged: false,
  },
  loading: false,
  error: null,
  openMenu: false
}

const WebsiteSlice = createSlice({
  name: 'website',
  initialState: initialState,
  reducers: {
    setSections(state, action: PayloadAction<any>) {
      state.website.temp_section = action.payload
      state.website.isWebsiteChanged = true
    },
    addSection(state, action: PayloadAction<any>) {
      state.website.temp_section.push(action.payload)
      state.website.isWebsiteChanged = true
    },
    editSection(state, action: PayloadAction<any>) {
      state.website.temp_section = state.website.temp_section?.map((item: any) =>
        item?.id === action.payload?.id ? { ...item, ...action.payload } : item
      )
      state.website.isWebsiteChanged = true
    },
    deleteSection(state, action: PayloadAction<string>) {
      state.website.temp_section = state.website.temp_section.filter((item: any) => item?.id !== action.payload)
      state.website.isWebsiteChanged = true
    },
    setShowSection(state, action: PayloadAction<string>) {
      state.website.temp_section = state.website?.temp_section?.map((item: any) =>
        item?.id === action.payload ? { ...item, isActive: !item?.isActive } : item
      )
      state.website.isWebsiteChanged = true
    },
    setWebsite(state, action: PayloadAction<any>) {
      state.website = { ...state.website, ...action.payload }
    },
    setPreviewType(state, action: PayloadAction<number>) {
      state.website.previewType = action.payload
    },
    setPageType(state, action: PayloadAction<number>) {
      state.website.pageType = action.payload
    },
    setToggleMenu(state, action: PayloadAction<boolean>) {
      state.openMenu = action.payload
    }
  },
  extraReducers: builder => {
    CustomAsyncThunk(builder, getWebsiteData, 'website')
    CustomAsyncThunk(builder, editWebsiteData, 'website')
  },
})

export const {
  addSection,
  editSection,
  deleteSection,
  setSections,
  setShowSection,
  setWebsite,
  setPageType,
  setPreviewType,
  setToggleMenu
} = WebsiteSlice.actions

export default WebsiteSlice.reducer
