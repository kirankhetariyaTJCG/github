'use client'

// React Imports
import type { ComponentProps } from 'react'

// MUI imports
import { BoxProps } from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { OutlinedInputProps } from '@mui/material'

// Third-party Imports
import ReactDatePickerComponent from 'react-datepicker'

// Custom Imports
import StyledReactDatePicker from '@/libs/styles/AppReactDatepicker'

type Props = ComponentProps<typeof ReactDatePickerComponent> & {
  boxProps?: BoxProps
  sx?: any
  label?: string
  error?: any
  helperText?: any
  size?: 'small' | 'medium'
  InputProps?: OutlinedInputProps
}

const TimePicker = (props: Props) => {
  // Props
  const { boxProps, placeholderText, sx, label, error, helperText, dateFormat, size, InputProps, ...rest } = props

  return (
    <StyledReactDatePicker {...boxProps}>
      <ReactDatePickerComponent
        popperPlacement='bottom-start'
        {...rest}
        placeholderText={placeholderText}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption='Time'
        dateFormat={dateFormat ? dateFormat : 'h:mm aa'}
        customInput={
          <TextField
            size={size ? size : 'small'}
            fullWidth
            label={label}
            sx={{ ...sx, '& .MuiInputBase-root': { borderRadius: '8px !important' } }}
            error={error}
            helperText={helperText}
            InputProps={InputProps}
          />
        }
      />
    </StyledReactDatePicker>
  )
}

export default TimePicker
