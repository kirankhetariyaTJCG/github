'use client'

// Next Imports
import { useRouter } from 'next/navigation'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import InputAdornment from '@mui/material/InputAdornment'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import LoadingButton from '@mui/lab/LoadingButton'
import Switch from '@mui/material/Switch'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useTheme } from '@mui/material/styles'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'

const AcceptOrdersView = () => {
  // State
  const [isView, setIsView] = useState<boolean>(false)
  const [isLimit, setIsLimit] = useState<boolean>(false)
  const [states, setStates] = useState({ t1: 0, t2: 0, t3: 0, z1: 0, z2: 0, z3: 0 })
  const arr = [
    {
      label: 'With POS',
      desc: 'You can automatically confirm orders and bypass the order-taking app if you have a POS integration',
      src: 'POS.svg'
    },
    {
      label: 'With printer',
      desc: 'Auto-confirm orders via order-taking app when you have a printer connected',
      src: 'Printer.svg'
    }
  ]

  // Hooks
  const theme = useTheme()
  const router = useRouter()

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: { xs: '100%', lg: '65%' } }}>
        <Box
          sx={{
            p: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Auto Accept Orders</Typography>
          <LoadingButton variant='contained' onClick={() => router.push('/online-ordering/order-widget/service-fees')}>
            Next
          </LoadingButton>
        </Box>
        <Box sx={{ p: 6, width: { sm: '40rem' }, mx: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>Do you want to enable auto-accept orders?</Typography>
            <Switch value={isView} onChange={() => setIsView(!isView)} />
          </Box>
          <Divider sx={{ my: 4 }} />
          <Collapse in={!isView}>
            <Typography sx={{ fontSize: '1.3rem', textAlign: 'center' }}>Two ways to auto-accept orders</Typography>
            <Box sx={{ mt: 2 }}>
              {Array.isArray(arr) &&
                arr?.length > 0 &&
                arr?.map((item: any, index: number) => {
                  return (
                    <Box key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: 4
                        }}
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', mb: 2 }}>{item?.label}</Typography>
                          <Typography sx={{ fontWeight: 500 }}>{item?.desc}</Typography>
                        </Box>
                        <Box
                          component={'img'}
                          src={`/images/OrderWidget/${item?.src}`}
                          sx={{ width: { sm: '50%' }, height: 'auto' }}
                        />
                      </Box>
                      {index === 0 && <Divider sx={{ my: 6 }} />}
                    </Box>
                  )
                })}
            </Box>
          </Collapse>
          <Collapse in={isView}>
            <Accordion
              sx={{
                mb: 4,
                boxShadow: 'none !important',
                border: theme => `1px solid ${theme.palette.divider}`,
                borderRadius: '6px !important',
                '&:before': { bgcolor: 'transparent' },
              }}
            >
              <AccordionSummary>
                <Typography
                  sx={{ fontWeight: '700 !important', color: theme => `${theme.palette.text.secondary} !important` }}
                >
                  Default fulfilment time
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                  <Typography>Pickup:</Typography>
                  <CsTextField
                    value={states.t1}
                    name='t1'
                    type={'number'}
                    onChange={(e) => setStates((p: any) => ({ ...p, t1: e.target.value }))}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Typography>min</Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                  <Typography>Dine-in:</Typography>
                  <CsTextField
                    value={states.t2}
                    name='t2'
                    type={'number'}
                    onChange={(e) => setStates((p: any) => ({ ...p, t2: e.target.value }))}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Typography>min</Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <FormControlLabel
                  control={<Checkbox checked={isLimit} onChange={() => setIsLimit(!isLimit)} />}
                  label='Limit pickup orders'
                />
                {isLimit &&
                  <Box pl={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                      <Typography>Zone 1:</Typography>
                      <CsTextField
                        value={states.z1}
                        name='z1'
                        type={'number'}
                        onChange={(e) => setStates((p: any) => ({ ...p, z1: e.target.value }))}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Typography>min</Typography>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                      <Typography>Zone 2:</Typography>
                      <CsTextField
                        value={states.z2}
                        name='z2'
                        type={'number'}
                        onChange={(e) => setStates((p: any) => ({ ...p, z2: e.target.value }))}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Typography>min</Typography>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                      <Typography>Zone 3:</Typography>
                      <CsTextField
                        value={states.z3}
                        name='z3'
                        type={'number'}
                        onChange={(e) => setStates((p: any) => ({ ...p, z3: e.target.value }))}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Typography>min</Typography>
                            </InputAdornment>
                          )
                        }}
                      />
                    </Box>
                  </Box>}

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                  <Typography>On premise:</Typography>
                  <CsTextField
                    value={states.t3}
                    name='t3'
                    type={'number'}
                    onChange={(e) => setStates((p: any) => ({ ...p, t3: e.target.value }))}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Typography>min</Typography>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            <Tooltip
              title={
                <>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 2 }}>
                    How this works for scheduled orders and table reservations
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', mb: 2 }}>
                    The fulfillment time for scheduled orders / table reservations will be as requested by your client.
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem' }}>
                    You can control the number of incoming orders from{' '}
                    <span style={{ fontWeight: 700 }}> Online ordering → Ordering widget → Limit scheduled orders</span>
                  </Typography>
                </>
              }
              arrow
              componentsProps={{
                arrow: { sx: { color: '#fff' } },
                tooltip: { sx: { bgcolor: '#fff', boxShadow: theme.shadows[10], p: 4 } }
              }}
            >
              <Typography
                sx={{
                  mt: 6,
                  textDecoration: 'underline',
                  fontWeight: 600,
                  cursor: 'poointer',
                  '&:hover': { textDecoration: 'none' }
                }}
              >
                How this works for scheduled orders and table reservations
              </Typography>
            </Tooltip>
          </Collapse>
        </Box>
      </Card>
    </Box>
  )
}

export default AcceptOrdersView
