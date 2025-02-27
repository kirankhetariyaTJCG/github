// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
  setStep: (step: number) => void
}

const Step4 = (props: Props) => {
  // Props
  const { setStep } = props

  const text =
    '<p><span>Hello&nbsp;</span><span>,</span><br><br><span>I hope you are doing well. I&apos;ve decided to take orders online and table reservations using the GloriaFood online ordering system.</span><br><br><span>I would like to make it available as soon as possible. Could you please publish the &quot;See MENU and Order&quot; and &quot;Table reservation&quot; buttons on our website?</span><br><br><span>Please add the buttons in a prominent and visible area at the top of the main page.</span><br><br><span>Here is a page that contains our personalized&nbsp;</span><a href="#" style="text-align: start;color: lightgreen;font-size: 14px;">HTML code and instructions</a><br><br><span>Thank you,</span><br><span>Adam</span></p>'

  return (
    <Box>
      <Typography sx={{ fontWeight: 700, mb: 4 }}>Preview the email to your webmaster</Typography>
      <Box sx={{ p: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography sx={{ fontWeight: 700 }}>To:</Typography>
          <Box
            sx={{
              px: 2,
              py: 1,
              bgcolor: theme => theme.palette.secondary.lightOpacity,
              borderRadius: '4px',
              fontSize: '0.8rem',
              ml: 9
            }}
          >
            test@gmail.com
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 700 }}>From:</Typography>
          <Box
            sx={{
              px: 2,
              py: 1,
              bgcolor: theme => theme.palette.secondary.lightOpacity,
              borderRadius: '4px',
              fontSize: '0.8rem',
              ml: 4
            }}
          >
            test@gmail.com
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 700, mt: 2 }}>
          Add online ordering + table reservation to my site https://nento.com
        </Typography>
        <Divider sx={{ my: 4 }} />
        <Typography dangerouslySetInnerHTML={{ __html: text }} />
      </Box>
      <LoadingButton size='large' variant='contained' sx={{ mt: 4 }} onClick={() => setStep(1)}>
        Send
      </LoadingButton>
    </Box>
  )
}

export default Step4
