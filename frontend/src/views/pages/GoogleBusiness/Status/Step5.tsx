// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
  setStep: (step: number) => void
}

const Step5 = (props: Props) => {
  // Props
  const { setStep } = props

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
        <Typography sx={{ fontWeight: 700, mt: 2 }}>Add user to Google Listing</Typography>
        <Divider sx={{ my: 4 }} />
        <Typography
          dangerouslySetInnerHTML={{
            __html: `<p><span>Hello&nbsp;</span><span placeholder="name">Zone 1</span><span>,</span><br><br><span>I hope you are doing well.</span><br><br><span>I&apos;ve analyzed the Google listing Shreeji Restaurant and found some issues that I would like to fix. An optimized Google listing is important for the website traffic and sales.</span><br><br><span>I need a bit of help from you.</span><br><br><span>Can you please add a new user with management rights to the listing?&nbsp;</span><a href="https://support.google.com/business/answer/3403100" style="text-align: start;color: rgba(var(--bs-info-rgb),var(--bs-text-opacity)) !important;background-color: rgb(255, 255, 255);font-size: 14px;">Here&apos;s how to do it, step by step.</a><br><br><code style="text-align: start;color: rgb(66, 66, 66);background-color: var(--bs-alert-bg);font-size: 0.75rem;border: var(--bs-border-width) solid var(--bs-alert-border-color);border-left: 2px solid rgb(204, 204, 204);">In the name or email address field, insert: <strong>5172812114</strong><br>Select role: <strong>Manager</strong></code><br><br><span>Thank you,</span><br><span>John</span></p>`
          }}
        />
      </Box>
      <LoadingButton size='large' variant='contained' sx={{ mt: 4 }} onClick={() => setStep(1)}>
        Send
      </LoadingButton>
    </Box>
  )
}

export default Step5
