'use client'

// MUI Imports
import Autocomplete from '@mui/material/Autocomplete'
import type { AutocompleteProps } from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

// Define the props interface
interface CsAutocompleteProps<T> extends Partial<AutocompleteProps<T, boolean, boolean, boolean>> {
  label?: string
  sx?: object
  error?: boolean
  fieldSx?: object
  StartIcon?: React.ReactNode
  helperText?: any
  placeholder?: string
  options: readonly T[]
  disableCloseOnSelect?: boolean
  size?: 'small' | 'medium'
}

const CsAutocomplete = <T,>(props: CsAutocompleteProps<T>) => {
  // Props
  const {
    label,
    sx,
    error,
    fieldSx,
    StartIcon,
    helperText,
    placeholder,
    options,
    disabled,
    size,
    autoFocus,
    PaperComponent,
    ...restProps
  } = props

  return (
    <Autocomplete
      {...restProps}
      options={options}
      disabled={disabled}
      PaperComponent={PaperComponent}
      fullWidth
      size='small'
      sx={sx}
      renderInput={(params: any) => (
        <TextField
          {...params}
          label={label}
          size={size}
          autoFocus={autoFocus}
          placeholder={placeholder}
          inputProps={{ ...params.inputProps }}
          InputProps={{ ...params.InputProps }}
          error={error}
          helperText={helperText}
        />
      )}
    />
  )
}

export default CsAutocomplete
