// MUI Imports
import { Dialog, DialogContent, Typography, LoadingButton, Box, DialogActions } from '@/Helper/MUIImports'

// Icon Imports
import Icon from '@/@core/components/Icon'

const Alert = (props: { open: boolean, handleDelete: () => void, onClose: () => void, loading: boolean }) => {

    // Props
    const { open, handleDelete, onClose, loading } = props

    return (
        <Dialog open={open} maxWidth='md'>
            <DialogContent sx={{ textAlign: 'center' }}>
                <Box sx={{ mb: 4, '& svg': { mb: 2, color: 'warning.main' } }}>
                    <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
                </Box>
                <Typography>Please save your updated service hours.</Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
                <LoadingButton
                    variant='outlined'
                    size='large'
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </LoadingButton>
                <LoadingButton
                    variant='contained'
                    size='large'
                    onClick={handleDelete}
                    loading={loading}
                    loadingPosition='start'
                    startIcon={loading ? <>&nbsp;</> : <></>}
                >
                    Save Changes
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default Alert