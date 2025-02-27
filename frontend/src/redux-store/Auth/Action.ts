// Slice Imports
import { setIsLoading } from '.'
import { AppDispatch } from '..'

// Helpers Imports
import apiCall from '../../Helper/Service'
import APIConstants from '@/Helper/APIConstants'

export const loginUser = async (passData: any, dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({ url: APIConstants.LOGIN, data: passData, method: 'post', isLogin: true })

  dispatch(setIsLoading(false))

  return res
}

export const registerUser = async (payload: any, dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({ url: APIConstants.REGISTER, data: payload, method: 'post', isLogin: true })

  dispatch(setIsLoading(false))

  return res
}

export const forgotPassword = async (passData: any, dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({ url: APIConstants.FORGOT_PASSWORD, data: passData, method: 'post', isLogin: true })

  dispatch(setIsLoading(false))

  return res
}

export const resetPassword = async (passData: any, dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({
    url: APIConstants.RESET_PASSWORD,
    data: passData,
    method: 'post',
    isLogin: true
  })

  dispatch(setIsLoading(false))

  return res
}

export const changePassword = async (passData: any, dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({
    url: APIConstants.CHANGE_PASSWORD,
    data: passData,
    method: 'post',
    isLogin: true
  })

  dispatch(setIsLoading(false))

  return res
}

export const resetEmail = async (passData: any, dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({
    url: APIConstants.RESET_EMAIL,
    data: passData,
    method: 'post',
    isLogin: true
  })

  dispatch(setIsLoading(false))

  return res
}

export const changeEmailRequest = async (passData: any, dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({ url: APIConstants.CHNAGE_EMAIL_REQUEST, data: passData, method: 'post' })

  dispatch(setIsLoading(false))

  return res
}

export const logoutUser = async (dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({ url: APIConstants.LOGOUT, method: 'get' })

  dispatch(setIsLoading(false))

  return res
}

export const updateProfile = async (passData: any, dispatch: any) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({ url: APIConstants.UPDATE_PROFILE, data: passData, method: 'post', isMultipart: true })

  dispatch(setIsLoading(false))

  return res
}

export const removeProfileImage = async (passData: any, dispatch: any) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({ url: APIConstants.REMOVE_PROFILE_IMAGE, data: passData, method: 'post' })

  dispatch(setIsLoading(false))

  return res
}

export const verifyEmail = async (passData: any, dispatch: AppDispatch) => {
  dispatch(setIsLoading(true))

  const res = await apiCall({
    url: APIConstants.VERIFY_EMAIL,
    data: passData,
    method: 'post',
    isLogin: true
  })

  dispatch(setIsLoading(false))

  return res
}