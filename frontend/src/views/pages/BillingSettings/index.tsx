'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Imports
import BillingInfo from './BillingInfo'
import AddCardDetails from './AddCardDetails'
import ChangeOwner from './ChangeOwner'

// Icon Imports
import Icon from '@/@core/components/Icon'

const BillingSettingsView = () => {
  // State
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [editInfo, setEditInfo] = useState<boolean>(false)
  const [addCard, setAddCard] = useState<boolean>(false)
  const [isOwn, setIsOwn] = useState<boolean>(false)
  const arr = [
    { label: 'Company Name:', value: 'dasd' },
    { label: 'Company Name (in English characters):', value: 'dasd' },
    { label: 'Name:', value: 'Jhon Doe' },
    { label: 'Phone number:', value: '+49 2255889960' },
    { label: 'Country:', value: 'Germany' },
    { label: 'Address:', value: 'Test' },
    { label: 'City & Zip:', value: 'Berlin 10115' },
    { label: 'VAT ID:', value: '' }
  ]

  return (
    <>
      <Card sx={{ width: '100%', height: '100%' }}>
        <Box
          sx={{
            p: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {(editInfo || addCard || isOwn) && (
              <IconButton
                color='primary'
                sx={{ mr: 4, bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={() => {
                  setEditInfo(false)
                  setAddCard(false)
                  setIsOwn(false)
                }}
              >
                <Icon icon={'ion:arrow-back-outline'} />
              </IconButton>
            )}
            <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Billing Settings</Typography>
          </Box>
          {(editInfo || addCard || isOwn) && (
            <LoadingButton
              variant='contained'
              onClick={() => {
                setEditInfo(false)
                setAddCard(false)
                setIsOwn(false)
              }}
            >
              Save
            </LoadingButton>
          )}
        </Box>
        <Box sx={{ p: 4, overflow: 'auto', height: 'calc(100vh - 10rem)' }}>
          <Collapse in={!editInfo && !addCard && !isOwn}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Billing Address</Typography>
              <LoadingButton
                sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={(e: any) => setAnchorEl(e.currentTarget)}
              >
                Change
              </LoadingButton>
            </Box>
            <Box sx={{ mt: 4 }}>
              {Array.isArray(arr) &&
                arr?.length > 0 &&
                arr?.map((item: any, index: number) => {
                  return (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box sx={{ width: { sm: '40%' } }}>
                        <Typography sx={{ fontWeight: 500 }}>{item?.label}</Typography>
                      </Box>
                      <Box sx={{ width: { sm: '60%' }, ml: 2 }}>
                        <Typography sx={{ fontWeight: 600 }}>{item?.value}</Typography>
                      </Box>
                    </Box>
                  )
                })}
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4 }}>
              <Typography sx={{ fontSize: '1rem', fontWeight: 700 }}>Credit Card</Typography>
              <LoadingButton
                sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                onClick={() => setAddCard(true)}
              >
                Add
              </LoadingButton>
            </Box>
          </Collapse>
          <Collapse in={editInfo}>
            <BillingInfo />
          </Collapse>
          <Collapse in={addCard}>
            <AddCardDetails />
          </Collapse>
          <Collapse in={isOwn}>
            <ChangeOwner />
          </Collapse>
        </Box>
      </Card>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem
          sx={{ display: 'flex', alignItems: 'center' }}
          onClick={() => {
            setEditInfo(true)
            setAnchorEl(null)
          }}
        >
          <Icon icon={'bx:edit'} />
          <Typography sx={{ ml: 2, fontWeight: 500 }}>Edit Billing Info</Typography>
        </MenuItem>
        <MenuItem
          sx={{ display: 'flex', alignItems: 'center' }}
          onClick={() => {
            setIsOwn(true)
            setAnchorEl(null)
          }}
        >
          <Icon icon={'ic:round-change-circle'} />
          <Typography sx={{ ml: 2, fontWeight: 500 }}>Change Ownership</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default BillingSettingsView
