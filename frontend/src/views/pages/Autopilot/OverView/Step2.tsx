// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

interface Props {
  step: number
}

const Step2 = (props: Props) => {
  // Props
  const { step } = props

  return (
    <>
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          height: '100%',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }}>
          {step === 2 ? 'Pre-built Campaigns that Drive Sales' : 'Smart selling based on purchasing history'}
        </Typography>
        <Grid container spacing={6} sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} sm={5}>
            <Box
              component={'img'}
              src={step === 2 ? '/images/Autopilot/EmailCampaigns2.png' : '/images/Autopilot/PurchaseHistory.svg'}
              sx={{
                width: '100%',
                height: 'auto',
                ...(step === 2 && { p: 2, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: 1 })
              }}
            />
          </Grid>
          <Grid item xs={12} sm={7} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            {step === 2 ? (
              <Typography sx={{ mb: 2 }}>
                We’ve created a number of success-proven email campaigns to increase your clients’ engagement and{' '}
                <Typography sx={{ fontWeight: 700 }} component={'span'}>
                  {' '}
                  drive repeat business.
                </Typography>
              </Typography>
            ) : (
              <Typography sx={{ mb: 2 }}>
                The Autopilot constantly{' '}
                <Typography component={'span'} sx={{ fontWeight: 700 }}>
                  segments
                </Typography>{' '}
                your customers to deliver the{' '}
                <Typography component={'span'} sx={{ fontWeight: 700 }}>
                  most relevant campaign
                </Typography>{' '}
                for their purchasing history.
              </Typography>
            )}
            <Typography sx={{ fontStyle: 'italic' }}>Triple benefit: save time, money & effort</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Step2
