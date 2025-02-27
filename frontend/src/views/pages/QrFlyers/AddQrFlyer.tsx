// React Imports
import { ReactElement, Ref, forwardRef, useEffect, useState } from 'react'

// MUI Imports
import type { SlideProps } from '@mui/material/Slide'
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, LoadingButton, Typography, IconButton, Slide, Grid } from '@/Helper/MUIImports'

// Third Party Imports
import QRCode from 'react-qr-code'
import { useDispatch, useSelector } from 'react-redux'

// Store Imports
import { editQrFlyer } from '@/redux-store/QrFlyers/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import UrlHelper from '@/Helper/Url'
import { string } from 'yup'

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const AddQrFlyer = (props: ModelProps & { restaurant_id: string }) => {
  // Props
  const { open, setOpen, row, restaurant_id } = props

  // State
  const [bg_color, setBgColor] = useState<string>(row?.flyer_bg ?? '#FF5733')
  const arr = [
    { label: 'Open the camera on your phone', icon: 'fluent:scan-camera-24-filled' },
    { label: 'Aim it at the QR code', icon: 'streamline:phone-qr' },
    { label: 'Add item to cart & place order', icon: 'tdesign:mobile-list' }
  ]
  const color = ['#FF5733', 'rgb(127, 189, 57)', 'rgb(250, 114, 104)', 'rgb(102, 108, 255)']

  // Hooks
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.qr_code.loading)

  return (
    <Dialog open={open} fullScreen TransitionComponent={Transition}>
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
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Add Qr Flyer</Typography>
        <IconButton onClick={() => setOpen({ open: false, row: {} })} sx={{ fontSize: 25 }}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
        <Grid container columnSpacing={6} sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} sm={6} sx={{ overflow: 'auto', height: 'calc(100vh - 11.2rem)' }}>
            <Box sx={{ p: 4, width: { xs: 'auto', lg: '35rem' }, mx: 'auto' }}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  p: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: bg_color
                }}
              >
                <Box sx={{ border: '2px dashed #fff', p: 4, position: 'relative', zIndex: 2 }}>
                  <Box
                    sx={{
                      p: 4,
                      bgcolor: '#fff',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography
                      sx={{
                        textTransform: 'uppercase',
                        fontStyle: 'italic',
                        fontWeight: 700,
                        mb: 4,
                        fontSize: '2.5rem',
                        color: bg_color,
                        textAlign: 'center'
                      }}
                    >
                      Scan for menu & order
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: bg_color,
                        borderRadius: '8px',
                        width: 'max-content',
                        my: 6,
                        display: 'flex'
                      }}
                    >
                      <Box sx={{ p: 2, display: 'flex', bgcolor: '#fff', borderRadius: '6px' }}>
                        <QRCode id='QR-Code' value={UrlHelper.menuLink.replace('{id}', restaurant_id)} bgColor={'#fff'} fgColor={'#000'} size={200} />
                      </Box>
                    </Box>
                    <Typography sx={{ my: 4, fontWeight: 600, fontSize: '1.5rem' }}>How To Order</Typography>
                    <Grid container spacing={4}>
                      {Array.isArray(arr) &&
                        arr?.length > 0 &&
                        arr?.map((item: any, index: number) => {
                          return (
                            <Grid
                              item
                              xs={4}
                              key={index}
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                              }}
                            >
                              <Box component={Icon} icon={item?.icon} sx={{ color: bg_color, fontSize: 45 }} />
                              <Typography sx={{ mt: 2, fontWeight: 500 }}>{item?.label}</Typography>
                            </Grid>
                          )
                        })}
                    </Grid>
                  </Box>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '-0.25rem',
                    left: '-1.4375rem',
                    width: '200%',
                    height: '50%',
                    backgroundColor: '#000',
                    transform: 'rotate(-10deg)'
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ borderLeft: theme => `1px solid ${theme.palette.divider}` }}>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>Color</Typography>
              <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
                {Array.isArray(color) &&
                  color?.length > 0 &&
                  color?.map((item: string, index: number) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          p: 1,
                          border: item === bg_color ? `2px solid ${bg_color}` : 'none',
                          borderRadius: '50%',
                          mr: 2
                        }}
                      >
                        <LoadingButton
                          sx={{
                            bgcolor: `${item} !important`,
                            borderRadius: '50%',
                            p: 2,
                            minWidth: '1.5rem',
                            height: '1.5rem'
                          }}
                          onClick={() => setBgColor(item)}
                        >
                          &nbsp;
                        </LoadingButton>
                      </Box>
                    )
                  })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          pt: '1rem !important'
        }}
      >
        <LoadingButton
          size='large'
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
          disabled={loading}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          size='large'
          variant='contained'
          loading={loading}
          loadingPosition='start'
          startIcon={loading ? <>&nbsp;</> : <></>}
          onClick={() => {
            dispatch(editQrFlyer({ id: row?._id, flyer_bg: bg_color }))
            setOpen({ open: false, row: {} })
          }}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AddQrFlyer
