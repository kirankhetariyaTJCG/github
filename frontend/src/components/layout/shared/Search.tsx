'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import useMediaQuery from '@mui/material/useMediaQuery'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Sidebar Data Imports
import { sidebar, SidebarItem, MenuTypes } from '@/data/sidebarData'

const flattenSidebar = (sidebar: SidebarItem[]) => {
  const pages: { name: string; href: string; group: string; mainParentHref: string }[] = []

  const traverseMenu = (menu: MenuTypes[], parent: MenuTypes, mainParentHref: string) => {
    menu.forEach(item => {
      if (item.subMenu) {
        traverseMenu(item.subMenu, item, mainParentHref)
      } else {
        pages.push({ name: item.name, href: item.href || '', group: parent.name, mainParentHref })
      }
    })
  }

  sidebar.forEach(item => {
    traverseMenu(item.menu, item, item.href || '')
  })

  return pages
}

const Search = () => {
  // State
  const [val, setVal] = useState<any>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // Hooks
  const router = useRouter()
  const pages = useMemo(() => flattenSidebar(sidebar), [])

  // Media Query
  const md = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

  return (
    <>
      <Collapse in={open} orientation='horizontal' sx={{ mr: 2 }}>
        <Autocomplete
          size='small'
          sx={{
            width: '16rem',
            '& .MuiInputBase-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.7)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.7) !important'
              }
            },
            '& .MuiSvgIcon-root': {
              color: 'rgba(255, 255, 255, 0.7) !important'
            },
            '& .MuiAutocomplete-clearIndicator': {
              color: 'rgba(255, 255, 255, 0.7) !important'
            }
          }}
          options={pages}
          groupBy={option => option.group}
          getOptionLabel={option => option.name}
          isOptionEqualToValue={(option, value) => option.href === value.href}
          value={val}
          onChange={(e, value) => {
            setVal(value)
            if (value?.mainParentHref && value?.href) {
              router.push(`/${value?.mainParentHref}/${value?.href}`)
            }
            setOpen(false)
          }}
          popupIcon={<Icon icon={'mingcute:down-line'} color='rgba(255, 255, 255, 0.7)' />}
          PaperComponent={props => (
            <Paper
              {...props}
              sx={{
                '& .MuiAutocomplete-option': {
                  fontWeight: 500,
                  color: theme => theme.palette.text.secondary,
                  pl: 10,
                  fontSize: '0.9rem'
                },
                '& .MuiListSubheader-root': {
                  fontWeight: 600,
                  fontSize: '1rem'
                }
              }}
            />
          )}
          renderInput={params => (
            <TextField
              {...params}
              placeholder='Search Pages...'
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)'
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'rgba(255, 255, 255, 0.7)'
                },
                '& .MuiInputBase-input': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }}
            />
          )}
        />
      </Collapse>
      <IconButton
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            bgcolor: theme => `${theme.palette.secondary.lightOpacity} !important`,
            color: theme => theme.palette.primary.light
          }
        }}
        onClick={(e: any) => {
          md ? setAnchorEl(e.currentTarget) : setOpen(!open)
          setVal(null)
        }}
      >
        <Icon icon={open || Boolean(anchorEl) ? 'ic:round-close' : 'flowbite:search-outline'} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <Autocomplete
          size='small'
          sx={{ width: 250, mx: 4, my: 2 }}
          options={pages}
          groupBy={option => option.group}
          getOptionLabel={option => option.name}
          isOptionEqualToValue={(option, value) => option.href === value.href}
          value={val}
          onChange={(e: any, value: any) => {
            setVal(value)
            if (value?.mainParentHref && value?.href) {
              router.push(`/${value?.mainParentHref}/${value?.href}`)
            }
            setAnchorEl(null)
          }}
          popupIcon={<Icon icon={'mingcute:down-line'} />}
          PaperComponent={(props: any) => (
            <Paper
              {...props}
              sx={{
                '& .MuiAutocomplete-option': {
                  fontWeight: 500,
                  color: theme => theme.palette.text.secondary,
                  pl: 10,
                  fontSize: '0.9rem'
                },
                '& .MuiListSubheader-root': {
                  fontWeight: 600,
                  fontSize: '1rem'
                }
              }}
            />
          )}
          renderInput={params => (
            <TextField
              {...params}
              placeholder='Search Pages...'
            // sx={{
            //   '& .MuiInputLabel-root': {
            //     color: 'rgba(255, 255, 255, 0.7)'
            //   },
            //   '& .MuiInputLabel-root.Mui-focused': {
            //     color: 'rgba(255, 255, 255, 0.7)'
            //   },
            //   '& .MuiInputBase-input': {
            //     color: 'rgba(255, 255, 255, 0.7)'
            //   }
            // }}
            />
          )}
        />
      </Menu>
    </>
  )
}

export default Search
