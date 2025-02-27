'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Collapse from '@mui/material/Collapse'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Imports
import Step2 from './Step2'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const PromoView = () => {
  // State
  const [isView, setIsView] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [values, setValues] = useState<any>(null)

  // Hooks
  const router = useRouter()

  return (
    <>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ width: '35rem' }}>
          <Box sx={{ p: 4, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
            <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>First Buy Promo</Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 4,
                borderBottom: theme => `1px solid ${theme.palette.divider}`,
                pb: 4
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                Would you like to offer a discount for the first online purchase?
              </Typography>

              <Switch checked={isView} onChange={(e: any) => setIsView(e.target.checked)} />
            </Box>
            <Collapse in={!AppUtils.checkValue(values)}>
              <Collapse in={isView}>
                <Box sx={{ textAlign: 'center', pt: 4 }}>
                  <LoadingButton variant='contained' onClick={() => setIsOpen(true)}>
                    Create First Buy Promo
                  </LoadingButton>
                </Box>
              </Collapse>
              <Collapse in={!isView}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    component={'img'}
                    src='/images/Kickstarter/enough_sales.svg'
                    sx={{ width: '16rem', height: 'auto' }}
                  />
                  <Typography sx={{ fontWeight: 500, mt: 2, fontSize: '1.1rem' }}>
                    Looks like you have enough sales for now
                  </Typography>
                </Box>
              </Collapse>
            </Collapse>
          </Box>

          <Collapse in={AppUtils.checkValue(values)}>
            <Box sx={{ px: 4, pb: 4 }}>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, pb: 4 }}>
                Well done! Your first order promotion is live
              </Typography>
              <Box
                sx={{
                  mb: 4,
                  position: 'relative',
                  width: '100%',
                  height: '15rem',
                  backgroundImage: `url(${values?.image})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}
              >
                <Box sx={{ p: 4 }}>
                  <Typography
                    sx={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', mb: 2, wordWrap: 'break-word' }}
                  >
                    {values?.headline}
                  </Typography>
                  <Typography sx={{ color: '#fff', fontWeight: 500, wordWrap: 'break-word' }}>
                    {values?.desc}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    py: 1,
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0,
                    left: 0
                  }}
                >
                  <Icon icon={'icon-park-outline:up-c'} fontSize={15} color='#fff' />
                  <Typography sx={{ ml: 1, fontWeight: 500, fontSize: '0.8rem', color: '#fff' }}>
                    Learn more (Deal applied automatically)
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'center', pt: 4, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
                <LoadingButton
                  sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                  onClick={() => router.push('/marketing-tools/promotions/pre-made')}
                >
                  Manage Promotions
                </LoadingButton>
              </Box>
            </Box>
          </Collapse>
        </Card>
      </Box>
      <Step2 isOpen={isOpen} setIsOpen={setIsOpen} setValues={setValues} />
    </>
  )
}

export default PromoView
