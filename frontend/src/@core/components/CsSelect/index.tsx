'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Select, { SelectProps } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'

const CsSelect = (
  props: SelectProps & { StartIcon?: any; label?: string; helperText?: any; options?: any[]; endIcon?: any }
) => {
  // Props
  const { sx, StartIcon, error, label, helperText, options, value, onChange, endIcon, ...restProps } = props

  // State
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Box sx={sx}>
      <Box
        sx={{
          outlineWidth: open ? 2 : 1,
          outlineStyle: 'solid',
          outlineColor: theme =>
            open
              ? theme.palette.primary.main
              : error
              ? theme.palette.error.main
              : theme.palette.customColors.inputBorder,
          '&:hover': {
            outlineColor: theme => (error ? theme.palette.error.main : theme.palette.secondary.dark)
          },
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          '&:focus-within': {
            outlineColor: theme =>
              open
                ? error
                  ? theme.palette.error.main
                  : theme.palette.primary.main
                : error
                ? theme.palette.error.main
                : theme.palette.customColors.inputBorder
          }
        }}
      >
        {StartIcon && <Box sx={{ pl: 3, lineHeight: '0.5' }}>{StartIcon}</Box>}
        <FormControl fullWidth error={error}>
          {label && (
            <InputLabel
              id='demo-basic-select-outlined-label'
              sx={{
                top: value ? '-3px' : '-9px',
                bgcolor: theme => theme.palette.background.paper,
                px: 1,
                '&.Mui-focused': {
                  top: '-3px'
                }
              }}
            >
              {label}
            </InputLabel>
          )}
          <Select
            sx={{
              '& > fieldset': {
                border: 'none !important'
              }
            }}
            size='small'
            id='demo-basic-select-outlined'
            labelId='demo-basic-select-outlined-label'
            value={value}
            onChange={onChange}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            {...restProps}
          >
            {Array.isArray(options) &&
              options?.length > 0 &&
              options?.map((item: any, i: number) => {
                return (
                  <MenuItem key={i} value={item?.value}>
                    {item?.label}
                  </MenuItem>
                )
              })}
          </Select>
        </FormControl>
        {endIcon && <Box sx={{ pr: 3, lineHeight: '0.5' }}>{endIcon}</Box>}
      </Box>
      {error && <FormHelperText sx={{ color: theme => theme.palette.error.main }}>{helperText}</FormHelperText>}
    </Box>
  )
}

export default CsSelect
