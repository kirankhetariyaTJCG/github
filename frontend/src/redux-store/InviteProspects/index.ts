// Third Party Imports
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Steps {
  title: string
  isDone: boolean
}

const defaultSteps = [
  { title: 'Invite Type', isDone: false },
  { title: 'Preview Invitation', isDone: false },
  { title: 'Import Clients', isDone: false },
  { title: 'Send Invitation', isDone: false }
]

interface Initial {
  loading: boolean
  error: any
  activeStep: number
  steps: Steps[]
  invite_type: number | null
  isList: boolean
}

const state: Initial = {
  loading: false,
  error: null,
  activeStep: 0,
  invite_type: null,
  steps: defaultSteps,
  isList: false
}

const ProspectsSlice = createSlice({
  name: 'invite_prospects',
  initialState: state,
  reducers: {
    setActiveStep(state: any, action: PayloadAction<number>) {
      state.activeStep = action.payload
    },
    setDoneSteps(state: any, action: PayloadAction<{ index: number; isDone: boolean }>) {
      const { index, isDone } = action.payload
      state.steps = state.steps.map((item: any, i: number) => (i === index ? { ...item, isDone: isDone } : item))
    },
    setInviteType(state: any, action: PayloadAction<number>) {
      state.invite_type = action.payload
    },
    setDefaultSteps(state: any) {
      state.steps = defaultSteps
      state.invite_type = null
    },
    setIsList(state: any, action: PayloadAction<boolean>) {
      state.isList = action.payload
    }
  }
})

export const { setActiveStep, setDoneSteps, setInviteType, setDefaultSteps, setIsList } = ProspectsSlice.actions

export default ProspectsSlice.reducer

export const active_step = (state: any) => state.invite_prospects.activeStep

export const invite_type = (state: any) => state.invite_prospects.invite_type

export const is_list = (state: any) => state.invite_prospects.isList

export const steps = (state: any) => state.invite_prospects.steps
