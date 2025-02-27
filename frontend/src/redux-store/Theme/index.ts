// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Initial {
  activeNav: number | null
}

const themeState: Initial = {
  activeNav: 0
}

const ThemeSlice = createSlice({
  name: 'theme',
  initialState: themeState,
  reducers: {
    setActiveNav(state: any, action: PayloadAction<number>) {
      state.activeNav = action.payload
    }
  }
})

export const { setActiveNav } = ThemeSlice.actions

export default ThemeSlice.reducer

export const active_nav = (state: any) => state.theme.activeNav
