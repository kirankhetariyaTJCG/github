// React Imports
import React from 'react'
import type { ReactElement } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Third Party Imports
import moment from 'moment'

// Icon Imports
import Icon from '../Icon'

interface Props {
  topBarColor?: string
  JSXContent: ReactElement
  boxSx?: any
  textColor?: string
}

const CsMobileFrame = (props: Props) => {
  // Props
  const { JSXContent, topBarColor, boxSx, textColor } = props

  return (
    <>
      <Box
        sx={{
          border: `12px solid #000`,
          borderRadius: '30px',
          width: '375px',
          height: '667px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          overflow: 'auto',
          ...boxSx
        }}
      >
        <Box
          sx={{
            height: 'auto',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            bgcolor: topBarColor ? topBarColor : 'transparent',
            py: 1
          }}
        >
          <Typography
            sx={{
              fontSize: '0.8rem',
              ml: '0.5rem',
              cursor: 'default',
              fontWeight: 500,
              textShadow: '0px 1px #000',
              color: theme => (textColor ? textColor : theme.palette.text.primary)
            }}
          >
            {moment().format('hh:mm a')}
          </Typography>

          <Box sx={{ width: '6rem', height: '1.5rem', bgcolor: '#000', borderRadius: '0rem 0rem 1rem 1rem', mt: -1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              component={Icon}
              icon={'mdi:signal'}
              sx={{ color: theme => (textColor ? textColor : theme.palette.text.primary) }}
              fontSize={'1rem'}
            />
            <Box
              component={Icon}
              icon={'gg:battery'}
              sx={{ color: theme => (textColor ? textColor : theme.palette.text.primary) }}
              fontSize={'1.3rem'}
            />
          </Box>
        </Box>
        {JSXContent}
      </Box>
    </>
  )
}

export default CsMobileFrame
