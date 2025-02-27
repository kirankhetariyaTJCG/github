// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'
import APIConstants from '@/Helper/APIConstants'
import AppUtils from '@/Helper/AppUtils'

export const getWebsiteData = createAsyncThunk('restaurant/getWebsiteData', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_WEBSITE,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        if (res?.success && res?.statusCode === 200) {
            const getSections = res?.data?.website_sections ? JSON.parse(res?.data?.website_sections) : []
            let sections = getSections.map((item: any) => ({ ...item, id: AppUtils.randomId() }))
            sections = sections.map((item: any) => item?.type === 'LOGO'
                ? { ...item, restaurantName: res?.data?.restaurant?.name }
                : item
            )

            return {
                data: {
                    ...res?.data,
                    previewType: res?.data?.preview_type ? res?.data?.preview_type : 1,
                    pageType: res?.data?.page_type ? res?.data?.page_type : 1,
                    fonts: res?.data?.font_type ? res?.data?.font_type : 1,
                    navigation: res?.data?.navigation_type ? res?.data?.navigation_type : 2,
                    sections: sections,
                    temp_section: sections,
                    center: res?.data?.center,
                    color: res?.data?.color_scheme
                        ? JSON.parse(res?.data?.color_scheme)
                        : {
                            label: 'Orange-White',
                            main: '#FF5833',
                            secondary: '#FFFFFF',
                            light: '#FFE8E2',
                            btnTextColor: '#FF5833'
                        },
                    isWebsiteChanged: false
                }
            }
        }

    } catch (error) {
        return error
    }
});


export const editWebsiteData = createAsyncThunk('restaurant/editWebsiteDate', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GENERATE_WEBSITE,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        if (res?.success && res?.statusCode === 200) {
            const getSections = res?.data?.website_sections ? JSON.parse(res?.data?.website_sections) : []
            let sections = getSections?.map((item: any) => ({ ...item, id: AppUtils.randomId() }))
            sections = sections.map((item: any) => item?.type === 'LOGO'
                ? { ...item, restaurantName: res?.data?.restaurant?.name }
                : item
            )

            return {
                data: {
                    ...res?.data,
                    previewType: res?.data?.preview_type ? res?.data?.preview_type : 1,
                    pageType: res?.data?.page_type ? res?.data?.page_type : 1,
                    sections: sections,
                    temp_section: sections,
                    fonts: res?.data?.font_type ? res?.data?.font_type : 1,
                    center: res?.data?.center,
                    navigation: res?.data?.navigation_type ? res?.data?.navigation_type : 2,
                    color: res?.data?.color_scheme
                        ? JSON.parse(res?.data?.color_scheme)
                        : {
                            label: 'Orange-White',
                            main: '#FF5833',
                            secondary: '#FFFFFF',
                            light: '#FFE8E2',
                            btnTextColor: '#FF5833'
                        },
                    isWebsiteChanged: false
                }
            }
        }

    } catch (error) {

        return error
    }
})

export const changeSectionsPosition = createAsyncThunk('restaurant/changeSectionsPosition', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.CHANGE_CATEGORY_POSITION,
            data: {
                restaurant_id: payload?.restaurant_id,
                categoryIds: payload?.categories?.map((item: any) => item?._id)
            },
            method: 'post',
        })

        if (res && res?.statusCode === 200) {
            return { data: payload?.categories }
        }

        return { data: payload?.oldCategories }

    } catch (error) {

        return error
    }
})

export const uploadImage = async (payload: any) => {

    const res = await apiCall({
        url: APIConstants.UPLOAD_FILE,
        data: {
            file: payload
        },
        method: 'post',
        isMultipart: true,
        isHideToast: true
    })

    return res
}