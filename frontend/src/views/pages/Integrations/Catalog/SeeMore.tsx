// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'

// Icon Imports
import Icon from '@/@core/components/Icon'

interface Props {
  open: boolean
  setOpen: (state: { open: boolean; data: any }) => void
  data: any
}

const SeeMore = (props: Props) => {
  // State
  const { open, setOpen, data } = props

  return (
    <Dialog open={open} maxWidth='md'>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
          px: 4,
          py: 3
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Integration details</Typography>
        <IconButton onClick={() => setOpen({ open: false, data: {} })}>
          <Icon icon={'gg:close-o'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '40rem' } }}>
        <Box component={'img'} src={`/images/Catalog/${data?.src}`} sx={{ maxWidth: '100%', height: '3.75rem' }} />
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 500, my: 4 }}>{data?.desc}</Typography>
      </DialogContent>
      <DialogActions
        sx={{
          borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          pt: '1rem !important',
          justifyContent: 'space-between'
        }}
      >
        <LoadingButton
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
          onClick={() => setOpen({ open: false, data: {} })}
        >
          Cancel
        </LoadingButton>
        <LoadingButton variant='contained' onClick={() => setOpen({ open: false, data: {} })}>
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default SeeMore
