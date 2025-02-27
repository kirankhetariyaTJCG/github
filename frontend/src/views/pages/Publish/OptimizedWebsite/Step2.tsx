// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'

// Icon Imports
import Icon from '@/@core/components/Icon'

const Step2 = () => {
  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component={Icon}
            icon={'streamline:check-square-solid'}
            fontSize={45}
            sx={{ color: theme => theme.palette.success.main }}
          />
          <Typography sx={{ fontWeight: 700, ml: 4, fontSize: '1rem' }}>Website generation finished</Typography>
        </Box>
        <Divider sx={{ my: 8 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <LoadingButton size='large' variant='contained'>
            View & Edit Website
          </LoadingButton>
        </Box>
      </Box>
    </>
  )
}

export default Step2
