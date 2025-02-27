// React Imports
import { useRef, useState } from 'react'

// MUI Imports
import { Dialog, DialogTitle, DialogContent, DialogActions, LoadingButton, Button, ButtonGroup, Typography, IconButton, Box, Grid } from '@/Helper/MUIImports'

// Third party Imports
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'

// Store Imports
import { setPdfLink } from '@/redux-store/QrFlyers'
import { generateQrCode } from '@/redux-store/QrFlyers/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

const QrPreview = (props: ModelProps & { restaurant_id: string }) => {
  // Props
  const { open, setOpen, row, restaurant_id } = props

  // State
  const [loading, setLoading] = useState<boolean>(false)
  const [isView, setIsView] = useState<boolean>(true)
  const arr = [
    { label: 'Open the camera on your phone', icon: 'fluent:scan-camera-24-filled' },
    { label: 'Aim it at the QR code', icon: 'streamline:phone-qr' },
    { label: 'Add item to cart & place order', icon: 'tdesign:mobile-list' }
  ]
  const link = UrlHelper.menuLink.replace('{id}', restaurant_id)

  // Hooks
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const templateRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const download = async () => {

    // if (isView) {
    //   const svg = qrCodeRef.current?.querySelector('svg')
    //   if (svg) {
    //     const svgData = new XMLSerializer().serializeToString(svg)
    //     const canvas = document.createElement('canvas')
    //     const { width, height } = svg.getBoundingClientRect()
    //     const padding = 50
    //     canvas.width = width + 2 * padding
    //     canvas.height = height + 2 * padding

    //     const ctx = canvas.getContext('2d')
    //     if (ctx) {
    //       const drawRoundedRect = (
    //         ctx: CanvasRenderingContext2D,
    //         x: number,
    //         y: number,
    //         width: number,
    //         height: number,
    //         radius: number
    //       ) => {
    //         ctx.beginPath()
    //         ctx.moveTo(x + radius, y)
    //         ctx.lineTo(x + width - radius, y)
    //         ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    //         ctx.lineTo(x + width, y + height - radius)
    //         ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    //         ctx.lineTo(x + radius, y + height)
    //         ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    //         ctx.lineTo(x, y + radius)
    //         ctx.quadraticCurveTo(x, y, x + radius, y)
    //         ctx.closePath()
    //       }

    //       const img = new Image()
    //       img.onload = () => {
    //         ctx.fillStyle = '#fff'
    //         drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, 10)
    //         ctx.fill()
    //         ctx.drawImage(img, padding, padding, width, height)
    //         const pngFile = canvas.toDataURL('image/png')
    //         const link = document.createElement('a')
    //         link.href = pngFile
    //         link.download = `${row?.name}.png`
    //         link.click()
    //         setLoading(false)
    //       }

    //       img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    //     } else {
    //       setLoading(false)
    //     }
    //   } else {
    //     setLoading(false)
    //   }
    // } else {
    //   const element = templateRef.current
    //   if (!element) {
    //     setLoading(false)
    //     return
    //   }

    //   try {
    //     const canvas = await html2canvas(element, { backgroundColor: null })
    //     const imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    //     const link = document.createElement('a')
    //     link.href = imgURI
    //     link.download = `${row?.name}.png`
    //     link.click()
    //   } catch (error) {
    //     console.error('Error generating image:', error)
    //   } finally {
    //     setLoading(false)
    //   }
    // }

    if (AppUtils.checkValue(row?.is_qr_code) && row?.is_qr_code) {
      window.open(`${UrlHelper.imgPath}${row?.qr_code_pdf_url}`, '_blank', 'noopener,noreferrer')
    } else {
      setLoading(true)
      const res = await generateQrCode({ id: row?._id, is_qr_code: true })
      if (res?.success && res?.statusCode === 200) {
        dispatch(setPdfLink({ _id: res?.data?._id, ...res?.data }))
        window.open(`${UrlHelper.imgPath}${res?.data?.qr_code_pdf_url}`, '_blank', 'noopener,noreferrer')
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
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>{row?.name}</Typography>
        <IconButton onClick={() => setOpen({ open: false, row: {} })} sx={{ fontSize: 25 }}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important', width: '45rem' }}>
        {AppUtils.checkValue(row?.flyer_bg) && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <ButtonGroup sx={{ mb: { xs: 2, sm: 0 }, bgcolor: theme => theme.palette.primary.lightOpacity }}>
              <Button
                variant={isView ? 'contained' : 'outlined'}
                color='primary'
                sx={{ border: 'none !important' }}
                onClick={() => setIsView(true)}
              >
                QR Code
              </Button>
              <Button
                variant={!isView ? 'contained' : 'outlined'}
                color='primary'
                sx={{ border: 'none !important' }}
                onClick={() => setIsView(false)}
              >
                QR Flyer
              </Button>
            </ButtonGroup>
          </Box>
        )}
        <Box
          sx={{ overflow: 'auto', height: 'auto', px: 4 }}
        >
          {isView &&
            <>
              <Box
                ref={qrCodeRef}
                sx={{
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 4,
                  width: 'max-content',
                  mx: 'auto'
                }}
              >
                <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: '6px' }}>
                  <QRCode id='QR-Code' value={link} bgColor={'#fff'} fgColor={'#000'} size={220} />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 2 }}>
                <CsTextField
                  sx={{ width: '100%' }}
                  fullWidth
                  placeholder='Item Image'
                  InputProps={{ readOnly: true }}
                  value={link}
                />
                <LoadingButton
                  sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, width: '8rem', py: 2.5 }}
                  onClick={() => navigator.clipboard
                    .writeText(link)
                    .then(() => toast.success('Link Copied to clipboard'))
                    .catch(() => toast.error('Faild to copy link'))}
                >
                  Copy Link
                </LoadingButton>
              </Box>
            </>
          }
          {!isView &&
            <Box
              ref={templateRef}
              sx={{ p: 4, width: { xs: 'auto', lg: '35rem' }, mx: 'auto', borderRadius: 2, bgcolor: '#fff' }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  p: 4,
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: row?.flyer_bg
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
                        color: row?.flyer_bg,
                        textAlign: 'center'
                      }}
                    >
                      Scan for menu & order
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: row?.flyer_bg,
                        borderRadius: '8px',
                        width: 'max-content',
                        my: 6,
                        display: 'flex'
                      }}
                    >
                      <Box sx={{ p: 2, display: 'flex', bgcolor: '#fff', borderRadius: '6px' }}>
                        <QRCode id='QR-Code' value={link} bgColor={'#fff'} fgColor={'#000'} size={200} />
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
                              <Box component={Icon} icon={item?.icon} sx={{ color: row?.flyer_bg, fontSize: 45 }} />
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
          }
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ borderTop: theme => `0.0625rem solid ${theme.palette.divider}`, width: '100%', pt: '1rem !important' }}
      >
        <LoadingButton size='large' variant='contained' onClick={download} loading={loading}>
          Download
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default QrPreview
