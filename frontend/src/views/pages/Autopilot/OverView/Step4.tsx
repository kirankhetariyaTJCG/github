// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'

// Icon Imports
import Icon from '@/@core/components/Icon'

interface Props {
  setIsView: (step: boolean) => void
  isView: boolean
}

const Step4 = (props: Props) => {
  // Props
  const { isView, setIsView } = props

  return (
    <>
      <Box sx={{ p: 6, width: { sm: '42rem' }, mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 500 }}>Do you want to activate Autopilot Selling?</Typography>
          <Switch checked={isView} onChange={() => setIsView(!isView)} />
        </Box>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4 }}>
          <Box>
            <Typography sx={{ mb: 2 }}>Activate Autopilot Selling and our pre-engineered campaigns will:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component={Icon} icon={'line-md:check-all'} sx={{ color: theme => theme.palette.success.main }} />{' '}
              <Typography sx={{ ml: 2 }}>Engage with new customers</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component={Icon} icon={'line-md:check-all'} sx={{ color: theme => theme.palette.success.main }} />{' '}
              <Typography sx={{ ml: 2 }}>Create repeat buyers and</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component={Icon} icon={'line-md:check-all'} sx={{ color: theme => theme.palette.success.main }} />{' '}
              <Typography sx={{ ml: 2 }}>Bring customers back before they are gone.</Typography>
            </Box>
          </Box>
          <Box component={'img'} src='/images/Autopilot/Autopilot.svg' sx={{ width: '20rem', height: '20rem' }} />
        </Box>
      </Box>
    </>
  )
}

export default Step4
