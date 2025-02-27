'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Type Imports
import type { Mode } from '@core/types'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

const NotFound = ({ mode }: { mode: Mode }) => {
  // Vars
  const darkImg = '/images/pages/misc-mask-1-dark.png'
  const lightImg = '/images/pages/misc-mask-1-light.png'

  // Hooks
  const miscBackground = useImageVariant(mode, lightImg, darkImg)
  const router = useRouter()

  return (
    <Box className='flex items-center justify-center relative overflow-x-hidden' sx={{ height: '100%' }}>
      <Box className='flex items-center flex-col text-center gap-10'>
        <Box className='flex flex-col gap-2 is-[90vw] sm:is-[unset]'>
          <Typography sx={{ fontWeight: 600, fontSize: '4rem', lineHeight: 1 }} color='text.primary'>
            404
          </Typography>
          <Typography sx={{ fontWeight: 600 }}>Page Not Found ⚠️</Typography>
          <Typography sx={{ fontWeight: 500 }}>We couldn&#39;t find the page you are looking for.</Typography>
        </Box>
        <Box
          component={'img'}
          alt='error-illustration'
          src='/images/illustrations/characters/3.png'
          className='object-contain'
          sx={{ width: 350, height: 350 }}
        />
        <Button size='large' variant='contained' onClick={() => router.replace('/setup/restaurant/details')}>
          Back to Home
        </Button>
      </Box>
      <img src={miscBackground} className='absolute bottom-0 z-[-1] is-full max-md:hidden' />
    </Box>
  )
}

export default NotFound
