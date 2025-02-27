// MUI Imports
import { Box, Grid, Dialog, IconButton, Typography, DialogTitle, DialogContent } from '@/Helper/MUIImports'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { DialogProps } from '@/types'

const Restrictions = (props: DialogProps) => {
  // Props
  const { open, setOpen } = props

  const arr = [
    {
      icon: 'iconamoon:clock-duotone',
      title: 'Happy Hour',
      desc: 'allow the benefit to be available (or be shown) only on certain week days or hourly plans'
    },
    {
      icon: 'basil:map-location-outline',
      title: 'Delivery Area',
      desc: 'allow the benefit to be available (or to be different) depending on delivery areas or pick-up mode'
    },
    {
      icon: 'mdi:cart-discount',
      title: 'Cart Value',
      desc: 'allow the benefit to be available (or to be different) depending on certain total cart value or range'
    },
    {
      icon: 'fluent:money-hand-20-regular',
      title: 'Payment',
      desc: 'allow the benefit to be available (or to be different) depending on the chosen payment method'
    },
    {
      icon: 'material-symbols:calendar-month-outline',
      title: 'Expiration',
      desc: 'allow the benefit to be available only until a certain date'
    },
    {
      icon: 'flowbite:users-group-outline',
      title: 'Client Type',
      desc: 'allow the benefit to be available only for certain types of clients'
    },
    {
      icon: 'mingcute:heartbeat-line',
      title: 'Frequency',
      desc: 'allow the benefit to be available only once per client'
    },
    {
      icon: 'heroicons:arrows-pointing-in-20-solid',
      title: 'Exclusivity',
      desc: 'allow the benefit to cummulate on top of other promo deal benefits arising from other promo deals (if the client is eligible) or make it redeemable only stand-alone'
    }
  ]

  return (
    <Dialog maxWidth='md' open={open}>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
          bgcolor: theme => theme.palette.customColors.bodyBg,
          px: 4,
          py: 3
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
          You can apply rules and restrictions to any promo deal, for example:
        </Typography>
        <IconButton onClick={() => setOpen(false)} sx={{ fontSize: 25 }}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
        {Array.isArray(arr) &&
          arr?.length > 0 &&
          arr?.map((item: any, index: number) => {
            return (
              <Grid
                container
                key={index}
                sx={{
                  mb: 4,
                  border: theme => `1px solid ${theme.palette.divider}`,
                  px: 4,
                  py: 2,
                  borderRadius: '8px'
                }}
              >
                <Grid item xs={0.5}>
                  <Box
                    component={Icon}
                    icon={item?.icon}
                    fontSize={30}
                    sx={{ color: theme => theme.palette.primary.main }}
                  />
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'start' }}>
                  <Typography sx={{ fontWeight: 700, mx: 4 }}>{item?.title}</Typography>
                </Grid>
                <Grid item xs={9.5}>
                  <Typography sx={{ fontWeight: 500 }}>{item?.desc}</Typography>
                </Grid>
              </Grid>
            )
          })}
      </DialogContent>
    </Dialog>
  )
}

export default Restrictions
