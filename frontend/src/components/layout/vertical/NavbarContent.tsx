'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Third Party Imports
import { useSelector } from 'react-redux'

// Custom Imports
import NavToggle from './NavToggle'
import Search from '../shared/Search'
import LanguageDropdown from '@components/layout/shared/LanguageDropdown'
import UserDropdown from '@components/layout/shared/UserDropdown'
import NotificationDropdown from '../shared/NotificationDropdown'

// Store Imports
import { auth_data } from '@/redux-store/Auth'
import { restaurant } from '@/redux-store/Restaurant'

const NavbarContent = () => {
  // State
  const [data, setData] = useState<any>({})

  // Hooks
  const restaurantData = useSelector((state:any)=>state.restaurant.restaurant)

  useEffect(() => {
    setData(restaurantData)
  }, [restaurantData])

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', p: '0 0.5rem' }}
      >
        <div className='flex items-center gap-[7px]'>
          <NavToggle />
          <Box>
            <Typography
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
                fontSize: { xs: '0.8rem', sm: '1.2rem' },
                textTransform: 'capitalize'
              }}
            >
              {data?.name ?? 'Restaurent Name'}
            </Typography>
          </Box>
        </div>
        <div className='flex items-center'>
          <Search />
          <LanguageDropdown />
          <NotificationDropdown />
          <UserDropdown />
        </div>
      </Box>
    </>
  )
}

export default NavbarContent
