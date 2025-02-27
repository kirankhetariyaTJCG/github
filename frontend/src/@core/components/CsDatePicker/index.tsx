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
  size?: 'small' | 'medium'
  error?: any
  helperText?: any
  selected?: Date | any
  onChange?: (date: Date | any) => void
  InputProps?: OutlinedInputProps
  autoComplete?: string
}

const CsDatePicker = (props: Props) => {
  // Props
  const { boxProps, placeholderText, sx, label, error, helperText, selected, onChange, size, InputProps, autoComplete, ...rest } =
    props

  return (
    <StyledReactDatePicker {...boxProps} style={{ width: '100%' }}>
      <ReactDatePickerComponent
        popperPlacement='bottom-start'
        {...rest}
        placeholderText={placeholderText}
        selected={selected}
        onChange={onChange}
        autoComplete={autoComplete}
        customInput={
          <TextField
            size={size ? size : 'small'}
            fullWidth
            label={label}
            sx={{ ...sx, '& .MuiInputBase-root': { borderRadius: '8px !important' } }}
            error={error}
            helperText={helperText}
            InputProps={InputProps}
            autoComplete={autoComplete}
          />
        }
      />
    </StyledReactDatePicker>
  )
}

export default CsDatePicker
