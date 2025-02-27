'use client'

// React Imports
import { useRef, useState, useEffect } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Badge from '@mui/material/Badge'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { restaurantDetail } from '@/redux-store/Restaurant/Action'

import { auth_data, fetchAuthUser } from '@/redux-store/Auth'
import { restaurant } from '@/redux-store/Restaurant'
import { logoutUser } from '@/redux-store/Auth/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import Storage from '@/Helper/Storage'
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'
import Constants from '@/Helper/Constants'

// const menu = [
//   {
//     name: 'My Profile',
//     icon: 'streamline:user-identifier-card',
//     href: '/my-profile'
//   },
//   {
//     name: 'Paid Services',
//     icon: 'hugeicons:invoice-03',
//     href: '/paid-services'
//   },
//   {
//     name: 'Billing Service',
//     icon: 'mdi:invoice-text-clock-outline',
//     href: '/billing-settings'
//   },
//   // {
//   //   name: 'Billing History',
//   //   icon: 'mdi:book-clock-outline',
//   //   href: '/billing-history'
//   // },
//   {
//     name: 'Terms & Conditions',
//     icon: 'carbon:rule-locked',
//     href: '/terms-conditions'
//   },
//   {
//     name: 'Privacy Policy',
//     icon: 'iconoir:privacy-policy',
//     href: '/privacy-policy'
//   },
//   { name: 'Notifications', href: '/notifications', icon: 'mi:notification' },
//   { name: 'Supported Languages', href: '/languages', icon: 'tabler:language' }
// ]

// Styled component for badge content

const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  // States
  const [open, setOpen] = useState<boolean>(false)
  // const [loginData, setLoginData] = useState<any>({})

  const path = `${UrlHelper.imgPath}`;

  // Hooks
  const anchorRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const restaurantData = useSelector(restaurant)
  const loginData = useSelector(auth_data);

  const handleUserLogout = async () => {

    const res = await logoutUser(dispatch)

    if (res?.success && res?.statusCode === 200) {
      Storage.remove(Constants.CONFIG_DATA)
      Storage.removeCookie(Constants.LOGGED_IN)
      router.push('/login')
    }
  }

  useEffect(() => {
    if (AppUtils.checkValue(Storage.get<any>(Constants.CONFIG_DATA)?.restaurant_id)) {
      dispatch(restaurantDetail({ id: Storage.get<any>(Constants.CONFIG_DATA)?.restaurant_id }))
    }
  }, [])

  useEffect(() => {
    if (AppUtils.checkValue(restaurantData) && Object?.keys(restaurantData)?.length > 0) {
      dispatch(fetchAuthUser({ ...restaurantData?.user, restaurant_name: restaurantData?.name }))
      // setLoginData({ ...restaurantData?.user, restaurant_name: restaurantData?.name })
    }
  }, [restaurantData])

  const handleDropdownClose = (event?: any | (MouseEvent | TouchEvent), url?: string) => {
    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={() => setOpen(!open)} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{ cursor: 'pointer', ml: 2 }}
      >
        <Avatar
          ref={anchorRef}
          alt={loginData?.firstName ?? 'Profile Image'}
          src={loginData?.profile_image ? (path + loginData?.profile_image) : '/images/avatars/1.png'}
          onClick={() => setOpen(!open)}
          sx={{ width: 30, height: 30 }}
        />
      </Badge>

      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-4 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper elevation={8}>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>
                    <Avatar
                      alt={loginData?.first_name || ''}
                      src={
                        loginData?.profile_image
                          ? (path + loginData?.profile_image)
                          : '/images/avatars/1.png'
                      }
                    />
                    <div className='flex items-start flex-col'>
                      <Typography variant='body2' className='font-medium' color='text.primary'>
                        {loginData?.first_name || ''} {loginData?.last_name || ''}
                      </Typography>
                      <Typography variant='caption'>{loginData?.email || ''}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />

                  <MenuItem
                    className='gap-3 pli-4'
                    onClick={() => {
                      router.push('/profile/my-profile')
                      setOpen(false)
                    }}
                  >
                    <Icon icon={'lucide:user-round'} />
                    <Typography color='text.primary'>My Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    className='gap-3 pli-4'
                    onClick={() => {
                      router.push('/profile/account-settings')
                      setOpen(false)
                    }}
                  >
                    <Icon icon={'tabler:settings'} />
                    <Typography color='text.primary'>Settings</Typography>
                  </MenuItem>
                  <MenuItem
                    className='gap-3 pli-4'
                    onClick={() => {
                      router.push('/profile/privacy-policy')
                      setOpen(false)
                    }}
                  >
                    <Icon icon={'iconoir:privacy-policy'} />
                    <Typography color='text.primary'>Privacy Policy</Typography>
                  </MenuItem>
                  <MenuItem
                    className='gap-3 pli-4'
                    onClick={() => {
                      router.push('/profile/terms-conditions')
                      setOpen(false)
                    }}
                  >
                    <Icon icon={'fluent:document-arrow-right-24-regular'} />
                    <Typography color='text.primary'>Terms & Conditions</Typography>
                  </MenuItem>
                  <div className='flex items-center plb-1.5 pli-4'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='ri-logout-box-r-line' />}
                      onClick={handleUserLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>

      {/* <Menu
        keepMounted
        anchorEl={open}
        onClose={() => setOpen(null)}
        open={Boolean(open)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>
          <Avatar
            alt={loginData?.firstName ?? 'User Profile'}
            src={loginData?.profileImage ? `${UrlHelper.imgPath}${loginData?.profileImage}` : '/images/avatars/1.png'}
          />
          <Box className='flex items-start flex-col'>
            <Typography variant='body1' className='font-medium' color='text.primary'>
              {loginData?.firstName} {loginData?.lastName}
            </Typography>
            <Typography variant='caption'>{loginData?.email ? loginData?.email : 'N/A'}</Typography>
          </Box>
        </Box>
        <Divider />
        {Array.isArray(menu) &&
          menu?.length > 0 &&
          menu?.map((item: any, index: number) => {
            return (
              <MenuItem
                key={index}
                sx={{ fontWeight: 500, fontSize: '0.9375rem', gap: 3 }}
                onClick={() => {
                  router.push(`/profile${item?.href}`)
                  setOpen(null)
                }}
              >
                <Icon icon={item?.icon} /> {item?.name}
              </MenuItem>
            )
          })}
        <Box sx={{ p: 2, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
          <Button
            fullWidth
            variant='contained'
            sx={{ color: '#fff' }}
            endIcon={<Icon icon='line-md:log-out' />}
            onClick={handleUserLogout}
          >
            Logout
          </Button>
        </Box>
      </Menu> */}
    </>
  )
}

export default UserDropdown
