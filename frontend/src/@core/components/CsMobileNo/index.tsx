// React Imports
import React, { useEffect, useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'
import { InputAdornment, TextField } from '@mui/material'

// Third Party Imports
import Select, { StylesConfig } from 'react-select'

// Helper Imports
import countryCodes from '@/Helper/CountryName'
import Constants from '@/Helper/Constants'

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  stdCodeChange: (val: { value: string; label: string; country_code_initials: string }) => void
  stdcode: { value: string; label: string; country_code_initials?: string; image?: string }
  extraid?: string
  sx?: object
  fullWidth?: boolean
  autoFocus?: boolean
  label?: string
  name?: string
  value?: string
  disabled?: boolean
  placeholder?: string
  error?: boolean
  helperText?: any
  InputProps?: any
}

const CsMobileNo = (props: Props) => {
  // Props
  const {
    onChange,
    stdCodeChange,
    stdcode,
    autoFocus,
    disabled,
    error,
    extraid,
    fullWidth,
    helperText,
    label,
    name,
    placeholder,
    sx,
    value,
    InputProps
  } = props

  // State to hold the document body reference only on the client side
  const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(null)

  // Use useEffect to set the document body on the client side after the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMenuPortalTarget(document.body)
    }
  }, [])

  // Hooks
  const theme = useTheme()

  const colourStyles: StylesConfig<any, false> = {
    option: (styles, { isFocused, isSelected }) => {
      return {
        ...styles,
        display: 'flex',
        backgroundColor: isFocused || isSelected ? theme.palette.primary.main : 'transparent',
        color: isFocused || isSelected ? '#fff' : '#000'
      }
    },
    menuPortal: base => ({
      ...base,
      zIndex: 9999,
      textAlign: 'center',
      maxHeight: '10rem',
      boxShadow: '0 0.125rem 0.25rem 0.0625rem $appDarkGryClr !important',
      backgroundColor: 'transparent',
      width: '6rem'
    })
  }

  // Change textfield events
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.value.replace(Constants.NO_REGEX, '').slice(0, 10)
    if (onChange) {
      onChange(event)
    }
  }

  // Change std code events
  const handleClickCodeItem = (val: { value: string; label: string; country_code_initials: string }) => {
    stdCodeChange(val)
  }

  return (
    <TextField
      sx={{ ...sx, '& .MuiInputBase-root': { pl: 1 } }}
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      InputProps={{
        ...InputProps,
        startAdornment: (
          <InputAdornment position='start'>
            <Box
              sx={{
                backgroundColor: 'inherit',
                '& >div': {
                  '& >div': {
                    width: '6.5rem',
                    border: 'none',
                    boxShadow: 'none !important',
                    backgroundColor: 'inherit',
                    '& >div': {
                      '& >div': {
                        display: 'flex',
                        color: 'inherit',
                        '& >input': {
                          color: 'inherit'
                        }
                      }
                    }
                  }
                }
              }}
            >
              <Select
                isDisabled={disabled}
                menuPortalTarget={menuPortalTarget} // Pass the client-side document.body reference
                id={extraid ? extraid : 'cus-mob-std-select'}
                placeholder=''
                value={stdcode}
                formatOptionLabel={option => (
                  <Box sx={{ height: '2rem', display: 'flex', alignItems: 'center' }}>
                    <p>{option.label}</p>
                  </Box>
                )}
                onChange={handleClickCodeItem}
                options={countryCodes}
                styles={colourStyles}
                maxMenuHeight={160}
              />
            </Box>
          </InputAdornment>
        )
      }}
    />
  )
}

export default CsMobileNo
