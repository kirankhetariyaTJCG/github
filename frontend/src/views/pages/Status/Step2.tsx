// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
  setStep: (step: number) => void
}

const Step2 = (props: Props) => {
  // Props
  const { setStep } = props

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
        <Box
          sx={{
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: '6px',
            p: 4,
            mr: { sm: 2.5 },
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>One worry less for you</Typography>
          <Typography sx={{ fontWeight: 500, my: 4 }}>
            Get a new sales optimized website and take these issues off your mind.
          </Typography>
          <LoadingButton
            fullWidth
            size='large'
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={() => setStep(3)}
          >
            Learn More
          </LoadingButton>
        </Box>
        <Box
          sx={{
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: '6px',
            p: 4,
            ml: { sm: 2.5 },
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column'
          }}
        >
          <Typography sx={{ fontWeight: 700 }}>Troubleshoot these 15 issues</Typography>
          <Typography sx={{ fontWeight: 500, my: 4 }}>
            Send your webmaster the performance issues found on your website.
          </Typography>
          <LoadingButton fullWidth size='large' variant='contained' onClick={() => setStep(4)}>
            Contact Webmaster
          </LoadingButton>
        </Box>
      </Box>
    </>
  )
}

export default Step2
