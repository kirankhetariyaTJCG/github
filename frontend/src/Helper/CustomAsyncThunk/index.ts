// Third Party Imports
import { AsyncThunk, ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'

// Helper Imports
import AppUtils from '../AppUtils'

interface AsyncState {
  loading: boolean
  extraLoading?: boolean
  initialLoading?: boolean
  error: string | null
}

export const CustomAsyncThunk = <T>(
  builder: ActionReducerMapBuilder<T & AsyncState>,
  asyncThunk: AsyncThunk<any, any, any>,
  dataKey: keyof T,
  subArrayKey?: any,
  customHandler?: (state: any, action: PayloadAction<any>) => void
) => {
  builder
    .addCase(asyncThunk.pending, state => {
      state.loading = true;
      state.extraLoading = true;
      state.initialLoading = true;
      state.error = null;
    })
    .addCase(asyncThunk.fulfilled, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.extraLoading = false;
      state.initialLoading = false;
      if (AppUtils.checkValue(subArrayKey) && AppUtils.checkValue(action.payload)) {
        const { parentArrayId, data } = action.payload;
        state[dataKey] = state[dataKey]?.map((item: any) => {
          if (item?._id === parentArrayId) {
            item[subArrayKey] = data;
            return item;
          }
          return item;
        });
      } else {
        if (AppUtils.checkValue(action.payload)) {
          state[dataKey] = action.payload?.data;
        }
      }
      if (customHandler) {
        customHandler(state, action);
      }
    })
    .addCase(asyncThunk.rejected, (state: any, action: PayloadAction<any>) => {
      state.loading = false;
      state.extraLoading = false;
      state.initialLoading = false;
      state.error = action.payload.error;
      state[dataKey] = action.payload?.data;
    });
};

export const EditCustomAsyncThunk = <T>(
  builder: ActionReducerMapBuilder<T & AsyncState>,
  asyncThunk: AsyncThunk<any, any, any>,
  dataKey: keyof T,
  identifier: string,
  subArrayKey?: any,
  childArrayKey?: any,
  isExtra?: boolean
) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      if (isExtra) {
        state.extraLoading = true
      } else {
        state.loading = true
      }
      state.error = null;
    })
    .addCase(asyncThunk.fulfilled, (state: any, action: PayloadAction<any>) => {
      if (isExtra) {
        state.extraLoading = false
      } else {
        state.loading = false
      }

      if (AppUtils.checkValue(childArrayKey) && AppUtils.checkValue(subArrayKey)) {
        const { parentArrayId, subArrayId, _id, ...updatedFields } = action.payload;

        const parentIndex = state[dataKey].findIndex(
          (item: any) => item._id === parentArrayId
        );

        if (parentIndex !== -1) {
          const items = state[dataKey][parentIndex][subArrayKey];

          if (items) {
            const itemIndex = items.findIndex((item: any) => item._id === subArrayId);

            if (itemIndex !== -1) {
              const sizes = items[itemIndex][childArrayKey];

              if (sizes) {
                const sizeIndex = sizes.findIndex((size: any) => size._id === _id);

                if (sizeIndex !== -1) {
                  state[dataKey][parentIndex][subArrayKey][itemIndex][childArrayKey][sizeIndex] = {
                    ...sizes[sizeIndex],
                    ...updatedFields,
                  };
                }
              }
            }
          }
        }

      } else if (AppUtils.checkValue(subArrayKey)) {
        const { parentArrayId, _id, ...updatedFields } = action.payload;

        const parentIndex = state[dataKey].findIndex(
          (item: any) => item?._id === parentArrayId
        );

        if (parentIndex !== -1) {
          const items = state[dataKey][parentIndex][subArrayKey];

          if (items) {
            const itemIndex = items.findIndex((item: any) => item?._id === _id);

            if (itemIndex !== -1) {
              state[dataKey][parentIndex][subArrayKey][itemIndex] = {
                ...items[itemIndex],
                ...updatedFields
              };
            }
          }
        }
      } else {
        if (Array.isArray(state[dataKey]) && AppUtils.checkValue(action.payload)) {
          state[dataKey] = state[dataKey].map((item: any) =>
            item[identifier] === action.payload[identifier] ? { ...item, ...action.payload } : item
          )
        } else {
          if (AppUtils.checkValue(action.payload)) {
            state[dataKey] = { ...state[dataKey], ...action.payload };
          }
        }
      }
    })
    .addCase(asyncThunk.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.extraLoading = false;
      state.error = action.payload?.error || 'Something went wrong';
    });
};

export const DeleteCustomAsyncThunk = <T>(
  builder: ActionReducerMapBuilder<T & AsyncState>,
  asyncThunk: AsyncThunk<any, any, any>,
  dataKey: keyof T,
  identifier: string,
  subArrayKey?: any,
  childArrayKey?: any,
  isExtra?: boolean,
  customHandler?: (state: any, action: PayloadAction<any>) => void
) => {
  builder
    .addCase(asyncThunk.pending, state => {
      if (isExtra) {
        state.extraLoading = true;
      } else {
        state.loading = true;
      }
      state.error = null;
    })
    .addCase(asyncThunk.fulfilled, (state: any, action: PayloadAction<any>) => {
      if (isExtra) {
        state.extraLoading = false;
      } else {
        state.loading = false;
      }

      if (AppUtils.checkValue(childArrayKey) && AppUtils.checkValue(subArrayKey)) {
        const { parentArrayId, subArrayId, _id } = action.payload;

        state[dataKey] = state[dataKey].map((val: any) => {
          if (val?._id === parentArrayId) {
            val[subArrayKey] = val[subArrayKey]?.map((item: any) => {
              if (item?._id === subArrayId) {
                item[childArrayKey] = item[childArrayKey]?.filter((size: any) => size._id !== _id);
                return item;
              }
              return item;
            });
            return val;
          }
          return val;
        });
      } else if (AppUtils.checkValue(subArrayKey)) {
        const { parentArrayId, _id } = action.payload;

        state[dataKey] = state[dataKey].map((val: any) => {
          if (val?._id === parentArrayId) {
            val[subArrayKey] = val[subArrayKey]?.filter((value: any) => value?._id !== _id);
            return val;
          }
          return val;
        });
      } else {
        if (Array.isArray(state[dataKey]) && AppUtils.checkValue(action.payload[identifier])) {
          state[dataKey] = state[dataKey].filter((item: any) => item[identifier] !== action.payload[identifier]);
        }
      }

      // Execute the custom handler if provided
      if (customHandler) {
        customHandler(state, action);
      }
    })
    .addCase(asyncThunk.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.extraLoading = false;
      state.error = action.payload?.error || 'Failed to delete item';
    });
};


export const AddCustomAsyncThunk = <T>(
  builder: ActionReducerMapBuilder<T & AsyncState>,
  asyncThunk: AsyncThunk<any, any, any>,
  dataKey: keyof T,
  subArrayKey?: any,
  childArrayKey?: any,
  isExtra?: boolean,
) => {
  builder
    .addCase(asyncThunk.pending, state => {
      if (isExtra) {
        state.extraLoading = true
      } else {
        state.loading = true
      }
      state.error = null
    })
    .addCase(asyncThunk.fulfilled, (state: any, action: PayloadAction<any>) => {
      if (isExtra) {
        state.extraLoading = false
      } else {
        state.loading = false
      }
      if (AppUtils.checkValue(childArrayKey) && AppUtils.checkValue(subArrayKey)) {
        const { parentArrayId, subArrayId, addObject } = action.payload

        const items = state[dataKey].find((val: any) => val?._id === parentArrayId)
        const childArray = items[subArrayKey].find((val: any) => val?._id === subArrayId)
        if (AppUtils.checkValue(childArray[childArrayKey]) && Array.isArray(childArray[childArrayKey]) && childArray[childArrayKey]?.length > 0 && AppUtils.checkValue(addObject)) {
          childArray[childArrayKey]?.push(addObject)
        } else {
          childArray[childArrayKey] = [addObject]
        }
      }
      else if (AppUtils.checkValue(subArrayKey)) {
        const { parentArrayId, addObject } = action.payload

        const items = state[dataKey].find((val: any) => val?._id === parentArrayId)
        if (AppUtils.checkValue(items[subArrayKey]) && Array.isArray(items[subArrayKey]) && items[subArrayKey]?.length > 0 && AppUtils.checkValue(addObject)) {
          items[subArrayKey]?.push(addObject)
        } else {
          items[subArrayKey] = [addObject]
        }
      }
      else {
        if (AppUtils.checkValue(action.payload)) {
          state[dataKey].push(action.payload)
        }
      }
    })
    .addCase(asyncThunk.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.extraLoading = false
      state.error = action.payload?.error || 'Failed to delete item'
    })
}
