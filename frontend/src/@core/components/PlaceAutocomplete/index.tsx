// React Imports
import React, { useState } from 'react'

// MUI Imports
import { OutlinedInputProps, Popper, List, ListItem, Paper, CircularProgress } from '@mui/material'
import TextField from '@mui/material/TextField'

// Third Party Imports
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const PlacesAutocompleteComponent = PlacesAutocomplete as unknown as React.ComponentType<any>;



// Define props types
interface Props {
  label: string
  placeholder?: string
  error?: boolean
  helperText?: any
  value: string
  onChange: (address: string, latLng?: { lat: number; lng: number }) => void
  InputProps?: OutlinedInputProps
  sx?: any
}

const PlaceAutocomplete: React.FC<Props> = ({
  label,
  placeholder,
  error = false,
  helperText = '',
  onChange,
  value,
  InputProps,
  sx
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const searchOptions: google.maps.places.AutocompleteOptions = {
    fields: ['address_components', 'geometry', 'icon', 'name'],
    types: ['establishment']
  }

  const handleSelect = async (address: string) => {
    try {
      const results = await geocodeByAddress(address)
      const latLng = await getLatLng(results[0])
      onChange(address, latLng)
      setAnchorEl(null) // Close Popper after selecting an address
    } catch (error) {
      console.error('Error getting the latitude and longitude', error)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, suggestions: any[]) => {
    setAnchorEl(event.currentTarget)
    if (event.key === 'ArrowDown') {
      setActiveIndex(prev => (prev === suggestions.length - 1 ? 0 : prev + 1))
    } else if (event.key === 'ArrowUp') {
      setActiveIndex(prev => (prev === 0 ? suggestions.length - 1 : prev - 1))
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      handleSelect(suggestions[activeIndex].description)
      setAnchorEl(null)
    }
  }

  return (
    <PlacesAutocompleteComponent value={value} onChange={onChange} onSelect={handleSelect} searchOptions={searchOptions}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading } : any) => {
        const mutableSuggestions = [...suggestions]

        return (
          <div onFocus={event => setAnchorEl(event.currentTarget)} onBlur={() => setTimeout(() => null, 100)}>
            <TextField
              {...getInputProps({
                label,
                placeholder,
                variant: 'outlined',
                fullWidth: true,
                error,
                helperText
              })}
              value={value || ''}
              InputProps={{ ...InputProps, endAdornment: loading ? <CircularProgress size={20} /> : null }}
              sx={sx}
              onKeyDown={event => handleKeyDown(event, mutableSuggestions)}
            />

            <Popper
              open={!!mutableSuggestions.length && !!anchorEl}
              anchorEl={anchorEl}
              placement='bottom-start'
              sx={{ width: anchorEl?.clientWidth, zIndex: 9 }}
              modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
            >
              <Paper
                elevation={3}
                style={{ width: anchorEl?.clientWidth }}
                sx={{
                  boxShadow: theme => theme.shadows[3],
                  zIndex: 9,
                  width: anchorEl?.clientWidth,
                  borderRadius: '8px',
                  maxHeight: 200,
                  overflowY: 'auto',
                  overflowX: 'hidden'
                }}
              >
                <List>
                  {mutableSuggestions.map((suggestion, index) => {
                    const isActive = index === activeIndex
                    return (
                      <ListItem
                        {...getSuggestionItemProps(suggestion, {
                          style: {
                            backgroundColor: isActive ? '#f0f0f0' : '#fff',
                            cursor: 'pointer'
                          }
                        })}
                        key={suggestion.placeId}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => {
                          handleSelect(suggestion.description)
                          setAnchorEl(null) // Close Popper after selecting a suggestion by clicking
                        }}
                      >
                        {suggestion.description}
                      </ListItem>
                    )
                  })}
                </List>
              </Paper>
            </Popper>
          </div>
        )
      }}
    </PlacesAutocompleteComponent>
  )
}

export default PlaceAutocomplete
