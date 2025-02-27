// Third Party Imports
import axios from 'axios'
import { toast } from 'react-toastify'

// Helper Imports
import UrlHelper from '../Url'
import AppUtils from '../AppUtils'
import Storage from '../Storage'
import Constants from '../Constants'
import APIConstants from '../APIConstants'

const statusCode = [200, 201]

interface Props {
  url: string
  isMultipart?: boolean
  method: string
  data?: any
  isLogin?: boolean
  isHideToast?: boolean
}

// Function to check if accessToken is expired (15 minutes)
const isTokenExpired = (issueTime: number | null) => {
  if (!issueTime) return true // Consider the token expired if there's no issueTime

  const currentTime = new Date().getTime()
  const fifteenMinutesInMilliseconds = 15 * 60 * 1000

  return currentTime - issueTime >= fifteenMinutesInMilliseconds
}

const redirectToLogin = () => {
  Storage.remove(Constants.CONFIG_DATA)
  Storage.removeCookie(Constants.LOGGED_IN)
  window.location.href = '/login'
}

// Function to get a new accessToken using the refresh token
const refreshAccessToken = async () => {
  try {
    const refreshToken = Storage.get<any>(Constants.CONFIG_DATA)?.refreshToken
    const response = await axios.post(`${UrlHelper.serverUrl}${UrlHelper.API_PATH}${APIConstants.REFRESH_TOKEN}`, {
      refresh_token: refreshToken
    })

    if (AppUtils.checkValue(response?.data?.accessToken)) {
      Storage.set(Constants.CONFIG_DATA, {
        ...Storage.get<any>(Constants.CONFIG_DATA),
        accessToken: response.data.accessToken,
        tokenIssueTime: new Date().getTime()
      })

      return response.data.accessToken
    }
  } catch (error) {
    redirectToLogin()
    console.error('Error refreshing token:', error)
    throw error
  }
}

const apiCall = async (props: Props) => {
  const { url, isMultipart, method, data, isLogin, isHideToast } = props

  let response: any

  // Get accessToken and its issueTime from storage
  let accessToken = Storage.get<any>(Constants.CONFIG_DATA)?.accessToken
  let tokenIssueTime = Storage.get<any>(Constants.CONFIG_DATA)?.tokenIssueTime || null

  // Check if token is expired and refresh if necessary
  if (!isLogin && isTokenExpired(tokenIssueTime)) {
    try {
      accessToken = await refreshAccessToken()
    } catch (error) {
      console.error('Failed to refresh access token:', error)
      return // Handle token refresh failure appropriately
    }
  }

  let header: any = {}

  if (!isLogin) {
    header = {
      Authorization: `Bearer ${accessToken ?? ''}`,
      ...(isMultipart && { 'Content-Type': 'multipart/form-data' })
    }
  }

  try {
    response = await axios({
      method: method,
      url: `${UrlHelper.serverUrl}${UrlHelper.API_PATH}${url}`,
      headers: header,
      data: data
    })
  } catch (e: any) {
    console.log(':::service catch::::', e)
    response = e
  }

  if (statusCode.some((item: any) => item === response?.data?.statusCode) && response?.data?.success) {
    if (!AppUtils.checkValue(isHideToast) && !isHideToast) {
      toast.success(response?.data?.message, { position: 'top-right', closeOnClick: true, draggable: true })
    }

    return response.data
  } else {
    response?.response?.data?.statusCode === 401 && redirectToLogin()

    if (response?.response?.data?.message) {
      toast.error(
        response?.response?.data?.message,
        { position: 'top-right', closeOnClick: true, draggable: true }
      )
    } else {
      Object.entries(response.response.data.errors).forEach(([field, message]) => {
        toast.error(
          `${field}: ${message}`,
          { position: 'top-right', closeOnClick: true, draggable: true }
        )
      });

      return response?.response?.data
    }
  }

  if (isLogin) return response?.data
  else return response?.response?.data
}

export default apiCall
