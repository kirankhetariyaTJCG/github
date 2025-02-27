// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'

const languages = [
  { name: 'Albanian', language_code: 'sq', checked: true, isDefault: false },
  { name: 'Arabic', language_code: 'ar', checked: true, isDefault: false },
  { name: 'Armenian', language_code: 'hy', checked: true, isDefault: false },
  { name: 'Bosanski', language_code: 'bs', checked: true, isDefault: false },
  { name: 'Catalan', language_code: 'ca', checked: true, isDefault: false },
  { name: 'Central Khmer', language_code: 'km', checked: true, isDefault: false },
  { name: 'Český', language_code: 'cs', checked: true, isDefault: false },
  { name: 'Dansk', language_code: 'da', checked: true, isDefault: false },
  { name: 'Deutsch', language_code: 'de', checked: true, isDefault: false },
  { name: 'English', language_code: 'en', checked: true, isDefault: true },
  { name: 'Español', language_code: 'es', checked: true, isDefault: false },
  { name: 'Español (Argentina)', language_code: 'es-ar', checked: true, isDefault: false },
  { name: 'Español (Bolivia)', language_code: 'es-bo', checked: true, isDefault: false },
  { name: 'Español (Costa Rica)', language_code: 'es-cr', checked: true, isDefault: false },
  { name: 'Español (México)', language_code: 'es-mx', checked: true, isDefault: false },
  { name: 'Estonian', language_code: 'et', checked: true, isDefault: false },
  { name: 'Finnish', language_code: 'fi', checked: true, isDefault: false },
  { name: 'Français', language_code: 'fr', checked: true, isDefault: false },
  { name: 'Hebrew', language_code: 'he', checked: true, isDefault: false },
  { name: 'Hrvatski', language_code: 'hr', checked: true, isDefault: false },
  { name: 'Icelandic', language_code: 'is', checked: true, isDefault: false },
  { name: 'Indonesian', language_code: 'id', checked: true, isDefault: false },
  { name: 'Italiano', language_code: 'it', checked: true, isDefault: false },
  { name: 'Japanese', language_code: 'ja', checked: true, isDefault: false },
  { name: 'Latvian', language_code: 'lv', checked: true, isDefault: false },
  { name: 'Lithuanian', language_code: 'lt', checked: true, isDefault: false },
  { name: 'Magyar', language_code: 'hu', checked: true, isDefault: false },
  { name: 'Nederlands', language_code: 'nl', checked: true, isDefault: false },
  { name: 'Norwegian Bokmål', language_code: 'nb', checked: true, isDefault: false },
  { name: 'Persian', language_code: 'fa', checked: true, isDefault: false },
  { name: 'Polski', language_code: 'pl', checked: true, isDefault: false },
  { name: 'Português', language_code: 'pt', checked: true, isDefault: false },
  { name: 'Português (Brasil)', language_code: 'pt-br', checked: true, isDefault: false },
  { name: 'Română', language_code: 'ro', checked: true, isDefault: false },
  { name: 'Slovenian', language_code: 'sl', checked: true, isDefault: false },
  { name: 'Slovenský', language_code: 'sk', checked: true, isDefault: false },
  { name: 'Srpski', language_code: 'sr', checked: true, isDefault: false },
  { name: 'Svenska', language_code: 'sv', checked: true, isDefault: false },
  { name: 'Telugu', language_code: 'te', checked: true, isDefault: false },
  { name: 'Thai', language_code: 'th', checked: true, isDefault: false },
  { name: 'Tiếng Việt', language_code: 'vi', checked: true, isDefault: false },
  { name: 'Türkçe', language_code: 'tr', checked: true, isDefault: false },
  { name: 'Vlaams', language_code: 'fl', checked: true, isDefault: false },
  { name: 'Ελληνικη', language_code: 'el', checked: true, isDefault: false },
  { name: 'Български', language_code: 'bg', checked: true, isDefault: false },
  { name: 'македонски', language_code: 'mk', checked: true, isDefault: false },
  { name: 'Русский', language_code: 'ru', checked: true, isDefault: false },
  { name: 'українська', language_code: 'uk', checked: true, isDefault: false },
  { name: 'ქართული', language_code: 'ka', checked: true, isDefault: false },
  { name: '简体中文', language_code: 'zh-cn', checked: true, isDefault: false },
  { name: '繁體中文', language_code: 'zh-tw', checked: true, isDefault: false }
]

const Languages = () => {
  // State
  const [arr, setArr] = useState<any[]>(languages)

  return (
    <>
      <Box sx={{ p: 4, height: 'calc(100vh - 9.5rem)', overflow: 'auto' }}>
        <Grid container columnSpacing={4} sx={{ width: '100%', m: 0, justifyContent: 'center' }}>
          {Array.isArray(arr) &&
            arr?.length > 0 &&
            arr?.map((item: any, index: number) => {
              return (
                <Grid key={index} item xs={12} sm={4} sx={{ pl: index % 3 === 0 ? '0 !important' : '1rem !important' }}>
                  <Box
                    sx={{
                      px: 4,
                      py: 2,
                      border: theme => `2px solid ${theme.palette.divider}`,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 4,
                      '&:hover .chip': { opacity: 1 }
                    }}
                  >
                    <FormControlLabel
                      sx={{ '& .MuiTypography-root': { opacity: '1 !important', fontWeight: 500 } }}
                      control={
                        <Checkbox
                          disabled={item?.isDefault}
                          checked={item?.checked}
                          onChange={() =>
                            setArr(
                              arr?.map((val: any, i: number) =>
                                i === index ? { ...val, checked: !item?.checked } : val
                              )
                            )
                          }
                        />
                      }
                      label={item?.name}
                    />
                    {item?.checked && (
                      <Chip
                        className='chip'
                        sx={{ opacity: item?.isDefault ? 1 : 0, transition: 'all 0.2s ease-in-out' }}
                        variant='filled'
                        size='small'
                        label={item?.isDefault ? 'Default' : 'Set as default'}
                        color={'primary'}
                        clickable={!item?.isDefault}
                        onClick={() =>
                          setArr(
                            arr?.map((val: any, i: number) =>
                              i === index ? { ...val, isDefault: true } : { ...val, isDefault: false }
                            )
                          )
                        }
                      />
                    )}
                  </Box>
                </Grid>
              )
            })}
        </Grid>
      </Box>
    </>
  )
}

export default Languages
