// Third Party Imports
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'
import * as crypto from 'crypto'

// Helper Imports
import Constants from '../Constants'
import Storage from '../Storage'

const AppUtils = {
  // encode the string function
  decodeStr: (str: any) => {
    return CryptoJS.AES.decrypt(str && str && str !== null && str !== undefined && str, '1ROOS')?.toString(
      CryptoJS.enc.Utf8
    )
  },

  // decode the string function
  encodeStr: (str: string) => CryptoJS.AES.encrypt(str, '1ROOS')?.toString(),

  // Decode Key
  decodeKey: (string: string): string => {
    const textParts = string.split(':');

    // Extract IV and encrypted text
    const iv = Buffer.from(textParts.shift() || '', 'hex');
    const encryptedText: any = Buffer.from(textParts.join(':'), 'hex');

    // Create decipher
    const cryptoFn: any = crypto
    const decipher = cryptoFn.createDecipheriv(Constants.ALGORITHM, Buffer.from(Constants.ENCRYPT_KEY, 'hex') as any, iv)

    // Decrypt the data
    let decrypted: any = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // Return the decrypted string
    return decrypted.toString();
  },

  // Set Cookie Data
  setCookie: (key: string, val: any, expires?: number) =>
    Cookies.set(key, AppUtils.encodeStr(JSON.stringify(val)), { expires: expires }),

  // Remove Cookie Data
  removeCookie: (key: string) => Cookies.remove(key),

  // Get Login Data
  getLoginData: (key: string) => {
    const data = Cookies.get(key)

    return data && data !== null && data !== undefined && JSON.parse(AppUtils.decodeStr(data))
  },

  // apiError handle
  apiErrorHandling: (formik: any, fields: string[], error: any) => {
    let isError = true
    if (typeof error !== 'undefined' && error !== null) {
      for (let i = 0; i < fields.length; i++) {
        if (typeof error[fields[i]] !== 'undefined' && error[fields[i]] !== null && error[fields[i]] !== '') {
          formik.setFieldTouched(fields[i], true, false)
          formik.setFieldError(fields[i], error[fields[i]])
          isError = false
        }
      }
    }

    return isError
  },

  roundOff: (value: number, decimals: number) => {
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
  },

  // check any value from arry
  checkValueFromArr: (arr: any, fields: any) => {
    let isValid = false
    if (typeof arr !== 'undefined' && arr !== null && arr?.length > 0) {
      let passVal = 0
      for (let i = 0; i < fields.length; i++) {
        if (arr.includes(fields[i])) {
          passVal = passVal + 1
        }
      }
      if (passVal === fields?.length) {
        isValid = true
      }
    }
    return isValid
  },

  // check any value
  checkValue: (field: any) => {
    let isData = false
    if (typeof field !== 'undefined' && field !== null) {
      if (typeof field === 'string' && field?.trim() !== '') {
        isData = true
      } else if (typeof field === 'boolean') {
        isData = true
      } else if (typeof field === 'number') {
        isData = true
      } else if (typeof field === 'object') {
        isData = true
      }
    }

    return isData
  },

  checkFieldValue: (data: any, field: any) => {
    let isData = false
    if (AppUtils.checkValue(data) && typeof data?.[field] !== 'undefined' && data?.[field] !== null) {
      if (typeof data?.[field] === 'string' && data?.[field]?.trim() !== '') {
        isData = true
      } else if (typeof data?.[field] === 'boolean') {
        isData = true
      } else if (typeof data?.[field] === 'number') {
        isData = true
      } else if (typeof data?.[field] === 'object') {
        isData = true
      }
    }

    return isData
  },

  //for mobile number setup
  mobileNumberFormate: (value: string) => {
    let mNumString = value
    let formatted = ''
    if (typeof mNumString !== 'undefined' && mNumString !== null) {
      mNumString = mNumString.replace(/[^0-9]/g, '')
      let block1 = ''
      let block2 = ''
      let block3 = ''

      //for set number formate 3-3-4
      block1 = mNumString.substring(0, 3)
      if (block1?.length === 3 && mNumString?.length > 3) {
        block1 = '(' + block1 + ')-'
      }
      block2 = mNumString.substring(3, 6)
      if (block2?.length === 3 && mNumString?.length > 6) {
        block2 = block2 + '-'
      }
      block3 = mNumString.substring(6, 10)
      if (block3?.length === 4) {
        block3 = block3 + ''
      }

      formatted = block1 + block2 + block3
      // }
    }
    return formatted
  },

  // Create random string
  randomId() {
    const result = Math.random().toString(36).substring(2, 7)
    return result
  },

  getFileNameFromUrl: (url: any) => {
    if (typeof url == 'string') {
      const urlArr = url.split("'/'")
      if (Array.isArray(urlArr) && urlArr.length > 0) return urlArr[urlArr.length - 1]
    }

    return ''
  },

  reorderList: (list: Iterable<unknown> | ArrayLike<unknown>, startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  },


  parseNumber: (value: string) => {

    const sanitizedValue = value.replace(/[^0-9.]/g, '')

    const validValue = sanitizedValue.replace(/(\.\d{2})\d+/g, '$1')

    if (/^\d*\.?\d{0,2}$/.test(validValue)) {
      return validValue
    }

    return 0;
  },

  hexToRgba: (hex: string, alpha: number) => {
    const bigint = parseInt(hex?.replace('#', ''), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  },

  getRandomColor: () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }

    return color
  },

  getFileSize: (size: number) => {
    const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    return `${(size / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
  },

  activeNavhandler: () => {
    const pathname = window?.location?.pathname
    if (pathname?.includes('marketing-tools')) {
      return 1
    } else if (pathname?.includes('reports')) {
      return 2
    } else if (pathname?.includes('setup')) {
      return 0
    } else {
      return 0
    }
  },

  getFontFamily: (fontType: number) => {
    switch (fontType) {
      case 1:
        return { fontFamily: "'Lexend', sans-serif" }
      case 2:
        return { fontFamily: "'Poppins', sans-serif" }
      case 3:
        return { fontFamily: "'Montserrat', sans-serif" }
      case 4:
        return { fontFamily: "'Serif Sans', serif" }
      default:
        return { fontFamily: "'Lexend', sans-serif" }
    }
  },

  hasPermission: (permissions: any[], route: string): boolean => {
    return Array.isArray(permissions) && permissions.some(
      (permission) =>
        permission.is_access && (Array.isArray(permission.sub_permission) && permission.sub_permission.includes(route))
    )
  }

}

export default AppUtils
