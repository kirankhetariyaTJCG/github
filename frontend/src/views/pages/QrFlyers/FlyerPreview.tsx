// React Imports
import { useState } from 'react'

// MUI Imports
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography, IconButton, LoadingButton } from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch } from 'react-redux'

// Store Imports
import { setPdfLink } from '@/redux-store/QrFlyers'
import { generateQrCode } from '@/redux-store/QrFlyers/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import UrlHelper from '@/Helper/Url'
import AppUtils from '@/Helper/AppUtils'

const FlyerPreview = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

  // State
  const [loading, setLoading] = useState<boolean>(false)

  // Hooks
  const dispatch = useDispatch()

  const handleDownload = async () => {
    setLoading(true)
    if (AppUtils.checkValue(row?.is_qr_flyer) && row?.is_qr_flyer) {
      window.open(`${UrlHelper.imgPath}${row?.pdf_url}`, '_blank', 'noopener,noreferrer')
    } else {
      setLoading(true)
      const res = await generateQrCode({ id: row?._id, is_qr_flyer: true })
      if (res?.success && res?.statusCode === 200) {
        dispatch(setPdfLink({ _id: res?.data?._id, ...res?.data }))
        window.open(`${UrlHelper.imgPath}${res?.data?.pdf_url}`, '_blank', 'noopener,noreferrer')
      }
    }
    setLoading(false)
    setOpen({ open: false, row: {} })
  }

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
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>{row?.name ?? 'Flyer'}</Typography>
        <IconButton onClick={() => setOpen({ open: false, row: {} })} sx={{ fontSize: 25 }}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
        <Box
          component={'img'}
          src={`${UrlHelper.imgPath}${row?.flyer_pages[0]?.image}`}
          sx={{ width: '32rem' }}
        />
      </DialogContent>
      <DialogActions
        sx={{ borderTop: theme => `0.0625rem solid ${theme.palette.divider}`, width: '100%', pt: '1rem !important' }}
      >
        <LoadingButton size='large' variant='contained' onClick={handleDownload} loading={loading}>
          Download
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default FlyerPreview
