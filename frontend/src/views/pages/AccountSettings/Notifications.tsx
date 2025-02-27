'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import IconButton from '@mui/material/IconButton'
import Accordion from '@mui/material/Accordion'
import TextField from '@mui/material/TextField'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import LoadingButton from '@mui/lab/LoadingButton'
import { useTheme } from '@mui/material/styles'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'
import CsDelete from '@/@core/components/CsDelete'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const switchArr = [
  {
    label: 'Delivery confirmed',
    checked: true,
    tooltip:
      'This email contains detailed order information will be sent to the specified email address right after each order gets accepted using the orders taking app on the assigned smartphone or tablet.'
  },
  {
    label: 'Pickup confirmed',
    checked: true,
    tooltip:
      'This email contains detailed order information will be sent to the specified email address right after each order gets accepted using the orders taking app on the assigned smartphone or tablet'
  },
  {
    label: 'Table reservation confirmed',
    checked: true,
    tooltip:
      'This email contains detailed table reservation information will be sent to the specified email address right after each table reservation gets accepted using the orders taking app on the assigned smartphone or tablet.'
  },
  {
    label: 'Order ahead confirmed',
    checked: true,
    tooltip:
      'This email contains detailed order ahead information will be sent to the specified email address right after each order gets accepted using the orders taking app on the assigned smartphone or tablet.'
  },
  {
    label: 'Dine-In confirmed',
    checked: true,
    tooltip:
      'This email contains detailed dine-in information will be sent to the specified email address right after each order gets accepted using the orders taking app on the assigned smartphone or tablet.'
  },
  {
    label: 'Delivery confirmed (text only)',
    checked: true,
    tooltip:
      'This is a text only version which consumes less paper / toner but does not print the map view and other graphical elements associated with the order. This is a friendly format for narrow paper rolls used by many thermal printers. This email contains detailed order information will be sent right after each order gets accepted using the orders taking app on the assigned smartphone or tablet.'
  },
  {
    label: 'Pickup confirmed (text only)',
    checked: true,
    tooltip:
      'This is a text only version which consumes less paper / toner but does not print the map view and other graphical elements associated with the order. This is a friendly format for narrow paper rolls used by many thermal printers. This email contains detailed order information will be sent right after each order gets accepted using the orders taking app on the assigned smartphone or tablet.'
  },
  {
    label: 'Table reservation confirmed (text only)',
    checked: true,
    tooltip:
      'This is a text only version which consumes less paper / toner but does not print the map view and other graphical elements associated with the table reservation. This is a friendly format for narrow paper rolls used by many thermal printers. This email contains detailed table reservation information will be sent right after each order gets accepted using the orders taking app on the assigned smartphone or tablet.'
  },
  {
    label: 'Order ahead confirmed (text only)',
    checked: true,
    tooltip:
      'This is a text only version which consumes less paper / toner but does not print the map view and other graphical elements associated with the order ahead. This is a friendly format for narrow paper rolls used by many thermal printers. This email contains detailed order ahead information will be sent right after each order gets accepted using the orders taking app on the assigned smartphone or tablet.'
  },
  {
    label: 'Dine-In confirmed (text only)',
    checked: true,
    tooltip:
      'This is a text only version which consumes less paper / toner but does not print the map view and other graphical elements associated with the order ahead. This is a friendly format for narrow paper rolls used by many thermal printers. This email contains detailed dine-in information will be sent right after each order gets accepted using the orders taking app on the assigned smartphone or tablet.'
  },
  {
    label: 'Order rejected',
    checked: true,
    tooltip: 'A notification email will be sent to the specified email address right after you reject an order.'
  },
  {
    label: 'Order Missed',
    checked: true,
    tooltip:
      'A notification email will be sent to the specified email address when an order got missed (no one confirmed the order within 3 minutes).'
  },
  {
    label: 'Order not placed',
    checked: true,
    tooltip:
      'A notification email will be sent to the specified email address when an order cannot be pushed to the order accepting app on your smartphone / tablet. This is usually the result of an unstable internet connection.'
  },
  {
    label: 'Order placed',
    checked: true,
    tooltip: 'A notification email will be sent to the specified email address when an order is placed.'
  },
  {
    label: 'Order canceled',
    checked: true,
    tooltip: 'A notification email will be sent to the specified email address when an order is canceled.'
  },
  {
    label: 'Low battery',
    checked: true,
    tooltip:
      'An alert email will be sent to the specified email address when the order taking smartphone or tablet is down to 15% battery.'
  },
  {
    label: 'Bad internet connectivity',
    checked: true,
    tooltip:
      'An alert email will be sent to the specified email address when the order taking smartphone or tablet has lost the internet connection for more than 20 minutes.'
  },
  {
    label: 'End of day report',
    checked: true,
    tooltip: 'This email contains a report with restaurant statistics from the previous day.'
  },
  {
    label: 'End of day report (text only)',
    checked: true,
    tooltip: 'This is a text version of email that contains a report with restaurant statistics from the previous day.'
  },
  {
    label: 'End of month report',
    checked: true,
    tooltip: 'This email contains a report with restaurant statistics from the previous month.'
  },
  {
    label: 'End of month report (text only)',
    checked: true,
    tooltip:
      'This is a text version of email that contains a report with restaurant statistics from the previous month.'
  }
]

const Notifications = () => {
  // State
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })
  const [email, setEmail] = useState<string>('')
  const [isexpand, setIsExpand] = useState<number | null>(null)
  const [arr, setArr] = useState<any[]>([
    { email: 'gogec41620@padvn.com', isLock: true, language: 'english', isNew: false, switch: switchArr }
  ])

  // Hooks
  const theme = useTheme()

  return (
    <>
      <Box sx={{ height: 'calc(100vh - 9.5rem)', overflow: 'auto' }}>
        <Box sx={{ p: 6, width: { sm: '40rem' }, mx: 'auto' }}>
          <Typography sx={{ fontWeight: 500 }}>Settings for restaurant staff</Typography>
          <Box sx={{ my: 2 }}>
            {Array.isArray(arr) &&
              arr?.length > 0 &&
              arr?.map((item: any, index: number) => {
                return (
                  <Box key={index}>
                    <Collapse in={!item?.isNew}>
                      <Accordion
                        expanded={isexpand === index}
                        onChange={() => (isexpand === index ? setIsExpand(null) : setIsExpand(index))}
                        sx={{
                          mb: 4,
                          boxShadow: 'none',
                          border: theme => `1px solid ${theme.palette.divider}`,
                          borderRadius: '6px !important',
                          '&:before': { bgcolor: 'transparent' }
                        }}
                      >
                        <AccordionSummary>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              width: '100%'
                            }}
                          >
                            <Typography sx={{ fontWeight: '600 !important', fontSize: '1rem' }}>
                              {item?.email}
                            </Typography>
                            {item?.isLock ? (
                              <Tooltip
                                title={
                                  <>
                                    <Typography sx={{ mb: 2, fontWeight: 700 }}>Account email address</Typography>
                                    <Typography>
                                      Your account email address can not be deleted from here. You can however add new
                                      email addresses and distribute notifications among them as you like.
                                    </Typography>
                                  </>
                                }
                                arrow
                                componentsProps={{
                                  arrow: { sx: { color: '#fff' } },
                                  tooltip: { sx: { bgcolor: '#fff', boxShadow: theme.shadows[10], p: 4 } }
                                }}
                              >
                                <IconButton sx={{ mr: 2 }}>
                                  <Icon icon={'mdi:email-lock-outline'} />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Switch />
                            )}
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          {Array.isArray(item?.switch) &&
                            item?.switch?.length > 0 &&
                            item?.switch?.map((val: any, i: number) => {
                              return (
                                <Box key={i}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <Typography sx={{ fontWeight: 500 }}>{val?.label}</Typography>
                                      <Tooltip
                                        title={
                                          <>
                                            <Typography sx={{ fontSize: '0.8rem', mb: 2, fontWeight: 700 }}>
                                              {val?.label}
                                            </Typography>
                                            <Typography sx={{ fontSize: '0.8rem' }}>{val?.tooltip}</Typography>
                                          </>
                                        }
                                        arrow
                                        componentsProps={{
                                          arrow: { sx: { color: '#fff' } },
                                          tooltip: { sx: { bgcolor: '#fff', boxShadow: theme.shadows[10], p: 4 } }
                                        }}
                                      >
                                        <IconButton size='small' sx={{ p: 0, fontSize: 18 }}>
                                          <Icon icon={'akar-icons:info'} />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                    <Switch
                                      checked={val?.checked}
                                      onChange={() => {
                                        setArr(
                                          arr?.map((value: any, mainI: number) =>
                                            mainI === index
                                              ? {
                                                  ...value,
                                                  switch: item?.switch?.map((value: any, subI: number) =>
                                                    subI === i ? { ...value, checked: !val?.checked } : { ...value }
                                                  )
                                                }
                                              : { ...value }
                                          )
                                        )
                                      }}
                                    />
                                  </Box>
                                  {(i === 4 || i === 9 || i === 14 || i === 16 || i === 20) && (
                                    <Divider sx={{ my: 2 }} />
                                  )}
                                </Box>
                              )
                            })}
                          <LoadingButton
                            sx={{ bgcolor: theme.palette.primary.lightOpacity, mt: 2 }}
                            onClick={() => setIsDelete({ open: true, id: item?._id })}
                          >
                            Delete Email
                          </LoadingButton>
                        </AccordionDetails>
                      </Accordion>
                    </Collapse>
                    <Collapse in={item?.isNew}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: '6px',
                          p: 4
                        }}
                      >
                        <TextField
                          fullWidth
                          label='Email'
                          placeholder='Enter Email'
                          value={email}
                          onChange={(e: any) => setEmail(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', gap: 4 }}>
                          <LoadingButton
                            sx={{ bgcolor: theme.palette.primary.lightOpacity }}
                            onClick={() => setArr(arr?.filter((val: any, i: number) => i !== index))}
                          >
                            Cancel
                          </LoadingButton>
                          <LoadingButton
                            variant='contained'
                            disabled={!AppUtils.checkValue(email)}
                            onClick={() =>
                              setArr(
                                arr?.map((val: any, i: number) =>
                                  i === index ? { ...val, email: email, isNew: false } : { ...val }
                                )
                              )
                            }
                          >
                            Save
                          </LoadingButton>
                        </Box>
                      </Box>
                    </Collapse>
                  </Box>
                )
              })}
          </Box>
          <LoadingButton
            size='large'
            sx={{ bgcolor: theme.palette.primary.lightOpacity }}
            disabled={arr[arr?.length - 1]?.isNew}
            onClick={() => {
              !arr[arr?.length - 1]?.isNew &&
                setArr([
                  ...arr,
                  { email: email, language: 'english', switch: switchArr, isNew: true, _id: AppUtils.randomId() }
                ])
            }}
          >
            Add New Email
          </LoadingButton>
          <Divider sx={{ my: 4 }} />
          <Typography sx={{ fontWeight: 500 }}>Settings for your food clients</Typography>
          <Accordion
            sx={{
              mt: 4,
              boxShadow: 'none',
              border: theme => `1px solid ${theme.palette.divider}`,
              borderRadius: '6px !important',
              '&:before': { bgcolor: 'transparent' }
            }}
          >
            <AccordionSummary>
              <Typography sx={{ fontWeight: '600 !important', fontSize: '1rem' }}>Client's email address</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 500 }}>Pickup order ready</Typography>
                <Switch />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 500 }}>Delivery order ready</Typography>
                <Switch />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 500 }}>Dine-in order ready</Typography>
                <Switch />
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '' })}
        label='Group'
        handleDelete={() => {
          setArr(arr?.filter((item: any) => item?._id !== isDelete?.id))
          setIsDelete({ open: false, id: '' })
        }}
      />
    </>
  )
}

export default Notifications
