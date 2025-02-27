// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Icon Imports
import Icon from '../Icon'

interface Props {
  open: boolean
  label?: string
  loading?: boolean
  handleDelete: () => void
  onClose: () => void
}

const CsDelete = (props: Props) => {
  // Props
  const { open, onClose, handleDelete, label, loading } = props

  return (
    <>
      <Dialog fullWidth open={open} onClose={onClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ mb: 4, maxWidth: '85%', textAlign: 'center', '& svg': { mb: 2, color: 'warning.main' } }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography variant='h4' sx={{ color: 'text.secondary' }}>
                Are you sure?
              </Typography>
            </Box>
            <Typography>You won't be able to revert {label}!</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <LoadingButton
            variant='contained'
            size='large'
            onClick={handleDelete}
            sx={{ mr: 2.5 }}
            loading={loading}
            loadingPosition='start'
            startIcon={loading ? <>&nbsp;</> : <></>}
          >
            Delete
          </LoadingButton>
          <LoadingButton
            variant='outlined'
            size='large'
            color='secondary'
            onClick={onClose}
            sx={{ ml: 2.5 }}
            disabled={loading}
          >
            Cancel
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CsDelete
