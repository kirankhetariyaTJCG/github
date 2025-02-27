// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useDispatch, useSelector } from 'react-redux'

// Store Imports
import {
  setActiveStep,
  setDoneSteps,
  invite_type,
  setInviteType,
  setDefaultSteps,
  setIsList
} from '@/redux-store/InviteProspects'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const InviteType = () => {
  // Hooks
  const dispatch = useDispatch()
  const inviteType = useSelector(invite_type)

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '-webkit-fill-available' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, width: '35rem' }}>
          <Box
            sx={{
              width: '50%',
              overflow: 'hidden',
              cursor: 'pointer',
              textAlign: 'center',
              outline: theme => `2px solid ${inviteType === 1 ? theme.palette.primary.main : theme.palette.divider}`,
              bgcolor: theme =>
                inviteType == 1 ? theme.palette.primary.lightOpacity : theme.palette.background.default,
              borderRadius: '8px',
              '&:hover': { outlineColor: theme => theme.palette.primary.main }
            }}
            onClick={() => dispatch(setInviteType(1))}
          >
            <Box
              component={'img'}
              src='/images/KickStarter/Campaigns.png'
              sx={{ width: 'auto', height: '18rem', pt: 4 }}
            />
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '1.2rem',
                p: 4,
                borderTop: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              Email Invite
            </Typography>
          </Box>
          <Box
            sx={{
              width: '50%',
              overflow: 'hidden',
              cursor: 'pointer',
              textAlign: 'center',
              outline: theme => `2px solid ${inviteType === 2 ? theme.palette.primary.main : theme.palette.divider}`,
              bgcolor: theme =>
                inviteType == 2 ? theme.palette.primary.lightOpacity : theme.palette.background.default,
              borderRadius: '8px',
              '&:hover': { outlineColor: theme => theme.palette.primary.main }
            }}
            onClick={() => dispatch(setInviteType(2))}
          >
            <Box component={'img'} src='/images/KickStarter/SMS.png' sx={{ width: 'auto', height: '18rem', pt: 4 }} />
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '1.2rem',
                p: 4,
                borderTop: theme => `1px solid ${theme.palette.divider}`
              }}
            >
              SMS Invite
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          pt: 4,
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <LoadingButton
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
          onClick={() => {
            dispatch(setActiveStep(0))
            dispatch(setDefaultSteps())
            dispatch(setIsList(false))
          }}
        >
          Back
        </LoadingButton>
        <LoadingButton
          variant='contained'
          disabled={!AppUtils.checkValue(inviteType)}
          onClick={() => {
            dispatch(setActiveStep(1))
            dispatch(setDoneSteps({ index: 0, isDone: true }))
          }}
        >
          Next
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default InviteType
