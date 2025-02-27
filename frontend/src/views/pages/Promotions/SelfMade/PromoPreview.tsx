// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

const PromoPreview = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

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
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Free delivery</Typography>
        <IconButton onClick={() => setOpen({ open: false, row: {} })} sx={{ fontSize: 25 }}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
        <Box
          sx={{
            position: 'relative',
            width: '30rem',
            height: '13rem',
            backgroundImage: `url(${AppUtils.checkValue(row?.promotion_image) ? UrlHelper.imgPath + row?.promotion_image : '/images/Burger.jpg'})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            borderRadius: '6px',
            overflow: 'hidden',
            mb: 4
          }}
        >
          <Box sx={{ p: 4 }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', mb: 2, wordWrap: 'break-word' }}>
              {row?.name}
            </Typography>
            <Typography sx={{ color: '#fff', fontWeight: 500, wordWrap: 'break-word' }}>
              {row?.description}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: theme => theme.palette.primary.main,
              borderRadius: '6px',
              boxShadow: theme => theme.shadows[3],
              color: '#fff',
              fontWeight: 500,
              py: 3,
              px: 4,
              position: 'absolute',
              bottom: '1rem',
              right: '1rem'
            }}
          >
            Get It Now
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>What the clients get</Typography>
        <Box component='ul' sx={{ pl: 5.5, mb: 4 }}>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            30% korting op de bezorgkosten
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Conditions</Typography>
        <Box component='ul' sx={{ pl: 5.5, mb: 4 }}>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Éen aanbieding per bestelling
          </Box>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Totale Prijs: groter of gelijk aan US$ 150,00
          </Box>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Betaalmethode: Contant,Kaart in persoon,Kaart via telefoon
          </Box>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Nog nooit gebruikt
          </Box>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Besteltijd: Zon 10:00-20:00
          </Box>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Besteldatum: is later of gelijk aan 2024-07-29
          </Box>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Besteldatum is later dan of gelijk aan 2024-07-31
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Who gets the promo deal</Typography>
        <Box component='ul' sx={{ pl: 5.5, mb: 4 }}>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Nog nooit gebruikt
          </Box>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Weergavetijd: Zon 10:00-20:00
          </Box>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Toon datum: groter of gelijk aan 2024-07-29
          </Box>
          <Box component='li' sx={{ '&::marker': { color: theme => theme.palette.text.secondary } }}>
            Toon datum: minder of gelijk aan 2024-07-31
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default PromoPreview
