// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const NotAuthorized = () => {
  return (
    <Box className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
      <Box className='flex items-center flex-col text-center gap-10'>
        <Box className='flex flex-col gap-2 is-[90vw] sm:is-[unset]'>
          <Typography className='text-8xl font-medium' color='text.primary'>
            401
          </Typography>
          <Typography variant='h4'>You are not authorized! 🔐</Typography>
          <Typography>You don&#39;t have permission to access this page. Go Home!</Typography>
        </Box>
        <Box
          component={'img'}
          alt='error-illustration'
          src='/images/illustrations/characters/6.png'
          className='object-cover bs-[400px] md:bs-[450px] lg:bs-[500px]'
        />
        <Button href='/' component={Link} variant='contained'>
          Back to Home
        </Button>
      </Box>
      <img src={'/images/pages/misc-mask-4-light.png'} className='absolute bottom-0 z-[-1] is-full max-md:hidden' />
    </Box>
  )
}

export default NotAuthorized
