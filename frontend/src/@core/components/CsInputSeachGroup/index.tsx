import { useState } from 'react'
import { TextField, MenuItem, Box, Select } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { SxProps, Theme } from '@mui/system'

interface Props {
  options: any[]
  setSearchValue: (val: string) => void
  setSelectedOption: (val: string | number) => void
  searchValue: string
  selectedOption: string | number
  placeholderSearch?: string
  boxSx: SxProps<Theme>
}

const CsInputSearchGroup = (props: Props) => {
  const { options, setSearchValue, searchValue, setSelectedOption, selectedOption, placeholderSearch, boxSx } = props

  const [isFocused, setIsFocused] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0,
        alignItems: 'center',
        // borderColor: theme => isFocused || isDropdownOpen ? theme.palette.primary.main : 'transperent',
        boxShadow: isFocused || isDropdownOpen ? `0 0 0 2px ${theme.palette.primary.dark}` : 'none',
        borderWidth: 2,
        borderRadius: 1,
        padding: 0,
        width: { lg: 'fit-content' },
        ...boxSx
      }}
    >
      {/* Search TextField */}
      <TextField
        inputProps={{ 'aria-label': 'Without label' }}
        variant='outlined'
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        size='small'
        sx={{
          width: { xs: '100%', lg: '16rem' },
          mr: -2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none'
            }
          }
        }}
        placeholder={placeholderSearch || 'Search'}
      />

      {/* Dropdown Select */}
      <Select
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          bgcolor: 'transparent',
          // color: '#ffffff',
          borderRadius: '0 4px 4px 0 !important',
          borderLeft: '1px solid #989898 !important',
          minWidth: '150px',
          '& fieldset': {
            border: 'none !important'
          }
        }}
        value={selectedOption}
        onChange={e => setSelectedOption(e.target.value)}
        size='small'
        onOpen={() => setIsDropdownOpen(true)} // Handle dropdown open
        onClose={() => setIsDropdownOpen(false)} // Handle dropdown close
      >
        {options.map((option: any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

export default CsInputSearchGroup
