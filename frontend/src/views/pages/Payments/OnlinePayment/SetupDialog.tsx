// MUI Imports
import { Dialog, IconButton, Typography, Grid, Divider, LoadingButton } from '@/Helper/MUIImports'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { DialogProps } from '@/types'
import React from 'react';

const paymentMethods = [
  { name: "ApplePay", fee: "Same as card fee", isBold: false },
  { name: "GooglePay", fee: "Same as card fee", isBold: false },
  { name: "IDEAL", fee: "0.29 EUR", isBold: true },
  { name: "Klarna", fee: "0.55 EUR", isBold: true },
  { name: "Sepa Transfer", fee: "0.35 EUR", isBold: true },
];

const SetupDialog = (props: DialogProps) => {
  // Props
  const { open, setOpen } = props

  return (
    <Dialog open={open} onClose={() => setOpen(false)} sx={{ '& .MuiPaper-root': { p: 4 } }}>
      <IconButton sx={{ ml: 'auto', fontSize: 25 }} onClick={() => setOpen(false)}>
        <Icon icon={'ic:round-close'} />
      </IconButton>
      <Typography sx={{ fontSize: '0.8rem', mb: 2 }}>
        <Typography component={'span'} sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
          Our recommendation:{' '}
        </Typography>
        Stripe, a fast & easy start{' '}
        <Typography
          component={'span'}
          sx={{ fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', color: theme => theme.palette.success.main }}
          onClick={() => window.open('https://stripe.com/in', '_blank', 'noopener,noreferrer')}
        >
          Stripe
        </Typography>
        , a fast & easy start
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography>Setup fee:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 700 }}>0.00</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Monthly fee:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 700 }}>Free</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Payout:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 700 }}>
            Daily <Typography component={'span'}>(7 day rolling basis)</Typography>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Application:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 700 }}>
            Online <Typography component={'span'}>(Approval usually within hours)</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: 700 }}>Per transaction fees:</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>Cards:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 700 }}>
            1.4% + 0.25 EUR,{' '}
            <Typography
              component={'span'}
              sx={{ color: theme => theme.palette.success.main, cursor: 'pointer' }}
              onClick={() => window.open('https://stripe.com/nl/pricing', '_blank', 'noopener,noreferrer')}
            >
              view pricing details
            </Typography>
          </Typography>
        </Grid>
        {paymentMethods.map(({ name, fee, isBold }) => (
          <React.Fragment key={name}>
            <Grid item xs={4}>
              <Typography>{name}:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                sx={{
                  fontWeight: isBold ? 700 : undefined,
                  color: !isBold ? (theme) => theme.palette.text.secondary : undefined,
                }}
              >
                {fee}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography>No other hidden interchange, assessment, processor or payout fees.</Typography>
          <LoadingButton
            sx={{ mt: 4, bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={() => window.open('https://stripe.com/in', '_blank', 'noopener,noreferrer')}
          >
            Get Started With Stripe
          </LoadingButton>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default SetupDialog
