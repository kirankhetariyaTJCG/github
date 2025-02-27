'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, Typography, IconButton, Chip, Tooltip, Card } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import AddEditFee from './AddEditFee'
import CsDelete from '@/@core/components/CsDelete'

// Store Imports
import { deleteServiceFees, changeServiceStatus, getServiceFees } from '@/redux-store/ServiceFee/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const FeesView = () => {
  // State
  const [isAdd, setIsAdd] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })
  const listItems = [
    "Sent mail",
    "Cash discounts",
    "Surcharge for public holidays",
    "Other service fees"
  ];

  // Hooks
  const restaurant = useSelector((state: any) => state.restaurant.restaurant)
  const feesData = useSelector((state: any) => state.fees.service_fees)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?._id)) {
      dispatch(getServiceFees({ restaurant_id: restaurant?._id }))
    }
  }, [restaurant?._id])

  const handleDelete = () => {
    dispatch(deleteServiceFees(isDelete?.id))
    setIsDelete({ open: false, id: '' })
  }

  return (
    <>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card sx={{ width: { xs: '100%', lg: '65%' } }}>
          <Box
            sx={{
              p: 4,
              borderBottom: theme => `1px solid ${theme.palette.divider}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Service Fees</Typography>
            <LoadingButton variant='contained' onClick={() => setIsAdd({ open: true, row: {} })}>
              Add Fee
            </LoadingButton>
          </Box>
          {
            feesData?.length === 0 ?
              <Box sx={{ m: 4, p: 3, border: theme => `0px solid ${theme.palette.secondary.main}`, borderRadius: 1 }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
                  Here you can add extra lines to your customer’s bill. Use this to set up:
                </Typography>
                <Box sx={{ mt: 4 }}>
                  {Array.isArray(listItems) && listItems?.length > 0 &&
                    listItems?.map((item, index: number) => {
                      return (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                          <Box
                            component={Icon}
                            icon={'icon-park-solid:correct'}
                            sx={{ color: theme => theme.palette.success.main, fontSize: 20 }}
                          />
                          <Typography sx={{ fontWeight: 500 }}>{item}</Typography>
                        </Box>
                      )
                    })
                  }
                </Box>
              </Box> :
              <Box sx={{ p: 4 }}>
                {Array.isArray(feesData) && feesData?.length > 0 &&
                  feesData?.map((fee: any, index: number) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 4,
                          bgcolor: theme => theme.palette.secondary.lightOpacity,
                          mb: 4,
                          borderRadius: '8px',
                          px: 4,
                          py: 2
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 600,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            width: '10rem'
                          }}>
                          {fee?.fee_name ?? 'N/A'}
                        </Typography>
                        <Typography sx={{ fontWeight: 600, width: '3rem', textAlign: 'center' }}>
                          {fee?.charge && fee?.charge_type ? `${fee?.charge}${fee?.charge_type === '1' ? '%' : '$'}` : 'N/A'}
                        </Typography>
                        <Box sx={{ width: '5rem', textAlign: 'center' }}>
                          <Chip
                            variant='filled'
                            size='small'
                            label={fee?.is_active ? 'Active' : 'Inactive'}
                            color={fee?.is_active ? 'success' : 'error'}
                            clickable
                            onClick={() => dispatch(changeServiceStatus({ id: fee?._id, is_active: !fee?.is_active }))}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Tooltip title='Edit' arrow>
                            <IconButton color='success' onClick={() => setIsAdd({ open: true, row: fee })}>
                              <Icon icon={'bx:edit'} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Delete' arrow>
                            <IconButton color='error' onClick={() => setIsDelete({ open: true, id: fee?._id })}>
                              <Icon icon={'icon-park-twotone:delete-one'} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    )
                  })
                }
              </Box>
          }
        </Card>

        {isAdd?.open && <AddEditFee open={isAdd?.open} setOpen={setIsAdd} row={isAdd?.row} />}

        <CsDelete
          open={isDelete?.open}
          onClose={() => setIsDelete({ open: false, id: '' })}
          label='Service Fee'
          handleDelete={handleDelete}
        />
      </Box>
    </>
  )
}

export default FeesView
