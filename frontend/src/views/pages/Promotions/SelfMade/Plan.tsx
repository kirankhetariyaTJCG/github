// MUI Imports
import { Box, Dialog, DialogTitle, DialogContent, Typography, LoadingButton, IconButton } from '@/Helper/MUIImports'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { DialogProps } from '@/types'

const Plan = (props: DialogProps) => {
  // Props
  const { open, setOpen } = props

  return (
    <Dialog open={open} maxWidth='md'>
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
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Choose Your Plan</Typography>
        <IconButton onClick={() => setOpen(false)} sx={{ fontSize: 25 }}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 4 }}>
          <Box
            sx={{
              border: theme => `1px solid ${theme.palette.divider}`,
              borderRadius: '8px',
              p: 4,
              width: { sm: '50%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Typography sx={{ fontWeight: 700, textAlign: 'center' }}>Basic Promo Deal Plan</Typography>
            <Box sx={{ my: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component={Icon}
                  icon={'line-md:check-all'}
                  fontSize={20}
                  sx={{ color: theme => theme.palette.success.main }}
                />
                <Typography sx={{ ml: 2 }}>Access to basic promotions</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component={Icon}
                  icon={'line-md:check-all'}
                  fontSize={20}
                  sx={{ color: theme => theme.palette.success.main }}
                />
                <Typography sx={{ ml: 2 }}>1 active promotions at a time</Typography>
              </Box>
            </Box>
            <LoadingButton disabled={true} variant='contained' size='large' fullWidth>
              Current Plan
            </LoadingButton>
          </Box>
          <Box
            sx={{
              border: theme => `1px solid ${theme.palette.divider}`,
              borderRadius: '8px',
              p: 4,
              width: { sm: '50%' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Typography sx={{ fontWeight: 700, textAlign: 'center' }}>Advanced Promo Deal Plan</Typography>
            <Box sx={{ my: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component={Icon}
                  icon={'line-md:check-all'}
                  fontSize={20}
                  sx={{ color: theme => theme.palette.success.main }}
                />
                <Typography sx={{ ml: 2 }}>Access to all promotions</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component={Icon}
                  icon={'line-md:check-all'}
                  fontSize={20}
                  sx={{ color: theme => theme.palette.success.main }}
                />
                <Typography sx={{ ml: 2 }}>Unlimited active promotions simultaneously</Typography>
              </Box>
            </Box>
            <LoadingButton variant='contained' size='large' fullWidth onClick={() => setOpen(false)}>
              Active Now
            </LoadingButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default Plan
