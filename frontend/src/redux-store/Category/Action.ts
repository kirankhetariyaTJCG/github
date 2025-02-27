// Third Party Imports
import { createAsyncThunk } from '@reduxjs/toolkit'

// Service Imports
import apiCall from '@/Helper/Service'

// Helper Imports
import APIConstants from '@/Helper/APIConstants'

export const duplicateEntity = async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.DUPLICATE_ENTITY,
            data: {
                id: payload?.id,
                type: payload?.type, // 1.Category, 2.Item, 3.Addon, 4.Choice 5.Promotion
            },
            method: 'post',
        })

        if (res?.success && res?.statusCode === 200) {
            if (payload?.parentKey) {
                return { parentArrayId: res?.data[payload?.parentKey], addObject: res?.data }
            }

            return res?.data
        }
    } catch (error) {

        return error
    }
}

export const getCategories = createAsyncThunk('restaurant/getCategories', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_MENU_DETAILS,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {
        return error
    }
})

export const changeCategoryPosition = createAsyncThunk('restaurant/changeCategoryPosition', async (payload: any) => {
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

export const addCategory = createAsyncThunk('restaurant/addCategory', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.ADD_CATEGORY,
            data: payload,
            method: 'post',
            isMultipart: payload?.image instanceof Blob
        })

        if (res?.success && res?.statusCode === 201) {
            return res?.data
        } else return
    } catch (error) {

        return error
    }
})

export const editCategory = createAsyncThunk('restaurant/editCategory', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.EDIT_CATEGORY,
            data: payload,
            method: 'post',
            isMultipart: payload?.image instanceof Blob
        })

        return res?.data
    } catch (error) {

        return error
    }
})

export const deleteCategory = createAsyncThunk('restaurant/deleteCategory', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.DELETE_CATEGORY,
            data: { id: payload },
            method: 'post',
        })

        if (res?.success && res?.statusCode === 200) {
            return { _id: payload }
        }

    } catch (error) {

        return error
    }
})

export const addItem = createAsyncThunk('restaurant/addItem', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_ITEM,
            data: payload,
            method: 'post',
            isMultipart: payload?.image instanceof Blob
        })

        return { parentArrayId: res?.data?.category_id, addObject: res?.data }

    } catch (error) {
        return error
    }
})

export const editItem = createAsyncThunk('restaurant/editItem', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_ITEM,
            data: payload,
            method: 'post',
            isMultipart: payload?.image instanceof Blob
        })

        return { parentArrayId: res?.data?.category_id, _id: res?.data?._id, ...res?.data }

    } catch (error) {
        return error
    }
})

export const deleteItem = createAsyncThunk('restaurant/deleteItem', async (payload: any) => {
    try {
        await apiCall({
            url: APIConstants.DELETE_ITEM,
            data: { id: payload?.id },
            method: 'post',
        })


        return { parentArrayId: payload?.category_id, _id: payload?.id }

    } catch (error) {
        return error
    }
})

export const changeItemPosition = createAsyncThunk('restaurant/changeItemPosition', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.CHANGE_ITEM_POSITION,
            data: {
                category_id: payload?.category_id,
                itemIdsArray: payload?.items?.map((item: any) => item?._id)
            },
            method: 'post',
        })

        if (res && res?.statusCode === 200) {
            return { parentArrayId: payload?.category_id, data: payload?.items }
        }

        return { data: payload?.oldItems }

    } catch (error) {
        return error
    }
})

export const duplicateCategory = createAsyncThunk('restaurant/duplicateCategory', duplicateEntity)

export const duplicateItem = createAsyncThunk('restaurant/duplicateItem', duplicateEntity)

export const setCategoryVisibility = createAsyncThunk('restaurant/setCategoryVisibility', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_VISIBILITY,
            data: payload,
            method: 'post',
        })

        if (res && res?.statusCode === 200) {
            return res?.data
        }
    } catch (error) {
        return error
    }
})

export const setItemVisibility = createAsyncThunk('restaurant/setItemVisibility', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.MANAGE_VISIBILITY,
            data: payload,
            method: 'post',
        })

        if (res && res?.statusCode === 200) {
            return { parentArrayId: res?.data?.category_id, _id: res?.data?._id, ...res?.data }
        }
    } catch (error) {
        return error
    }
})

export const addSize = createAsyncThunk('restaurant/addSize', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.ADD_SIZE,
            data: payload?.data,
            method: 'post',
        })

        return { parentArrayId: payload?.category_id, subArrayId: res?.data?.item_id, addObject: res?.data }

    } catch (error) {
        return error
    }
})

export const editSize = createAsyncThunk('restaurant/editSize', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.EDIT_SIZE,
            data: payload?.data,
            method: 'post',
        })

        return { parentArrayId: payload?.category_id, subArrayId: res?.data?.item_id, ...res?.data }

    } catch (error) {
        return error
    }
})

export const deleteSize = createAsyncThunk('restaurant/deleteSize', async (payload: any) => {
    try {
        await apiCall({
            url: APIConstants.DELETE_SIZE,
            data: { id: payload?.id },
            method: 'post',
        })


        return { parentArrayId: payload?.category_id, subArrayId: payload?.item_id, _id: payload?.id }

    } catch (error) {
        return error
    }
})

export const getTags = createAsyncThunk('restaurant/getTags', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.GET_TAGS,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {

        return error
    }
})

export const getAllergens = createAsyncThunk('restaurant/getAllergens', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.ITEM_EXTRA_DETAILS,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {

        return error
    }
})

export const getNutritionalValues = createAsyncThunk('restaurant/getNutritionalValues', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.ITEM_EXTRA_DETAILS,
            data: payload,
            method: 'post',
            isHideToast: true
        })

        return res
    } catch (error) {

        return error
    }
})

export const addAllergens = createAsyncThunk('restaurant/addAllergens', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.ITEM_EXTRA_DETAIL,
            data: payload,
            method: 'post',
            isMultipart: payload?.image instanceof Blob
        })

        if (res?.success && res?.statusCode === 201) {
            return res?.data
        } else return
    } catch (error) {

        return error
    }
})

export const editAllergens = createAsyncThunk('restaurant/editAllergens', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.ITEM_EXTRA_DETAIL,
            data: payload,
            method: 'post',
        })

        return res?.data
    } catch (error) {

        return error
    }
})

export const deleteAllergens = createAsyncThunk('restaurant/deleteAllergens', async (payload: any) => {
    try {
        const res = await apiCall({
            url: APIConstants.DELETE_ITEM_EXTRA_DETAIL,
            data: { id: payload },
            method: 'post',
        })

        if (res?.success && res?.statusCode === 200) {
            return { _id: payload }
        }

    } catch (error) {

        return error
    }
})
