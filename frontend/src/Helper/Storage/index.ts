import { AES, enc } from 'crypto-js'
import { isUndefined, isNull } from 'lodash'
import Cookies from 'js-cookie'

import Constants from '@/Helper/Constants'

const secretKey = Constants.LOCAL_STORAGE_KEY
const prefix = Constants.LOCAL_STORAGE_PREFIX

class StoreClass {
  // LocalStorage Methods

  get<T>(key: string): T | string | null {
    const storedItem = localStorage.getItem(`${prefix}.${key}`)
    const item = storedItem ? storedItem.replaceAll('"', '') : null

    if (item && key !== Constants.VERSION_KEY && key !== Constants.USER_TOKEN && key !== Constants.REFRESH_TOKEN) {
      try {
        const decryptedValue = AES.decrypt(item, secretKey).toString(enc.Utf8)
        return decryptedValue ? (JSON.parse(decryptedValue) as T) : null
      } catch (error) {
        console.error('Failed to decrypt or parse item:', error)
        return null
      }
    }

    return item
  }

  set<T>(key: string, value: T | string | null): void {
    if (
      value !== null &&
      value !== undefined &&
      key !== Constants.VERSION_KEY &&
      key !== Constants.USER_TOKEN &&
      key !== Constants.REFRESH_TOKEN
    ) {
      const encryptedValue = AES.encrypt(JSON.stringify(value), secretKey).toString()
      localStorage.setItem(`${prefix}.${key}`, encryptedValue)
    } else {
      localStorage.setItem(`${prefix}.${key}`, value as string)
    }
  }

  remove(key: string): void {
    localStorage.removeItem(`${prefix}.${key}`)
  }

  has(key: string): boolean {
    const item = this.get(key)
    return !isUndefined(item) && !isNull(item)
  }

  clearAll(): void {
    localStorage.clear()
  }

  clearSessionStorage(): void {
    sessionStorage.clear()
  }

  getUserToken(): string | null {
    const configData = this.get<{ USERTOKEN: string } | string>(Constants.CONFIG_DATA)
    if (typeof configData === 'object' && configData !== null) {
      return configData.USERTOKEN
    }
    return null
  }

  // Cookie Methods

  setCookie<T>(key: string, value: T | string | null, options?: Cookies.CookieAttributes): void {
    if (
      value !== null &&
      value !== undefined &&
      key !== Constants.VERSION_KEY &&
      key !== Constants.USER_TOKEN &&
      key !== Constants.REFRESH_TOKEN
    ) {
      const encryptedValue = AES.encrypt(JSON.stringify(value), secretKey).toString()
      Cookies.set(`${prefix}.${key}`, encryptedValue, { ...options })
    } else {
      Cookies.set(`${prefix}.${key}`, value as string, { ...options })
    }
  }

  getCookie<T>(key: string): T | string | null {
    const storedItem = Cookies.get(`${prefix}.${key}`)
    const item = storedItem ? storedItem.replaceAll('"', '') : null

    if (item && key !== Constants.VERSION_KEY && key !== Constants.USER_TOKEN && key !== Constants.REFRESH_TOKEN) {
      try {
        const decryptedValue = AES.decrypt(item, secretKey).toString(enc.Utf8)
        console.log('decryptedValue ---', decryptedValue)
        return decryptedValue ? (JSON.parse(decryptedValue) as T) : null
      } catch (error) {
        console.error('Failed to decrypt or parse cookie:', error)
        return null
      }
    }

    return item
  }

  setDefaultCookie<T>(key: string, value: T | string | null, options?: Cookies.CookieAttributes): void {
    if (value !== null && value !== undefined) {
      // If the value is an object or array, stringify it
      const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
      Cookies.set(`${Constants.LOCAL_STORAGE_PREFIX}.${key}`, valueToStore as string, { ...options });
    }
  }


  getDefaultCookie<T>(key: string): T | string | null {
    const storedItem = Cookies.get(`${Constants.LOCAL_STORAGE_PREFIX}.${key}`);

    if (storedItem) {
      // Try parsing the stored item if it's a valid JSON string
      try {
        return JSON.parse(storedItem) as T;
      } catch (e) {
        return storedItem; // If parsing fails, return the raw string
      }
    }

    return null;
  }

  removeCookie(key: string, options?: Cookies.CookieAttributes): void {
    Cookies.remove(`${prefix}.${key}`, { ...options })
  }

  hasCookie(key: string): boolean {
    return !!this.getCookie(key)
  }

  clearAllCookies(): void {
    const allCookies = Cookies.get()
    Object.keys(allCookies).forEach(cookieKey => Cookies.remove(cookieKey))
  }

  // Common utility function examples

  hasKeyAnywhere(key: string): boolean {
    return this.has(key) || !!sessionStorage.getItem(key) || this.hasCookie(key)
  }
}

export default new StoreClass()
