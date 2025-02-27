// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { DialogProps } from '@/types'

const AddAccount = (props: DialogProps) => {
  // State
  const { open, setOpen } = props

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
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Integration</Typography>
        <IconButton onClick={() => setOpen(false)}>
          <Icon icon={'gg:close-o'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '40rem' } }}>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 500, my: 4 }}>
          Do you already have an <span style={{ fontWeight: 700 }}>active</span> account with Shipday?
        </Typography>
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
        <LoadingButton sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }} onClick={() => setOpen(false)}>
          No
        </LoadingButton>
        <LoadingButton variant='contained' onClick={() => setOpen(false)}>
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AddAccount
