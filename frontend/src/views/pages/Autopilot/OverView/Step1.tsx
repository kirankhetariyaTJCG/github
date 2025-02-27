// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Step1 = () => {
  return (
    <>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          height: 'inherit',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, mb: 2 }}>
          Run Your Email Marketing on Autopilot
        </Typography>
        <Typography sx={{ fontWeight: 500 }}>
          So you can make money while focusing on other aspects of your business. Set it up once and earn forever
        </Typography>
        <Box
          component={'img'}
          src='/images/Autopilot/EmailMarketing.svg'
          sx={{ width: '25rem', height: 'auto', my: 2 }}
        />
      </Box>
    </>
  )
}

export default Step1
