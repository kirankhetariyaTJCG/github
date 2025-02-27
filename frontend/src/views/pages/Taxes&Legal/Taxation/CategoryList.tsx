// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import AddEditTaxCategory from './AddEditTaxCategory'
import CsDelete from '@/@core/components/CsDelete'

// Store Imports
import { deleteTaxCategory, getTaxCategories } from '@/redux-store/Payments/Taxtion/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Props {
  isAdd: { open: boolean; row: any }
  setIsAdd: (state: { open: boolean; row: any }) => void
}

const CategoryList = (props: Props) => {
  // Props
  const { isAdd, setIsAdd } = props

  // State
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })

  // Hooks
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const categoryList = useSelector((state: any) => state.payments.taxtion.taxCategory)
  const loading = useSelector((state: any) => state.payments.taxtion.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loading) {
      setIsDelete({ open: false, id: '' })
    }
  }, [loading])

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?._id)) {
      dispatch(getTaxCategories({ restaurant_id: restaurant?._id }))
    }
  }, [restaurant?._id])

  return (
    <>
      <Grid container spacing={4}>
        {Array.isArray(categoryList) &&
          categoryList?.length > 0 &&
          categoryList?.map((item: any, index: number) => {
            return (
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  key={index}
                  sx={{ mb: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: theme => `1px solid ${theme.palette.divider}`,
                      py: 2,
                      px: 4
                    }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>{item?.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <IconButton
                        size='small'
                        color='info'
                        sx={{ bgcolor: theme => theme.palette.info.lightOpacity }}
                        onClick={() => setIsAdd({ open: true, row: item })}
                      >
                        <Icon icon={'icon-park-twotone:edit-two'} />
                      </IconButton>
                      {categoryList?.length > 1 && (
                        <IconButton
                          size='small'
                          color='error'
                          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                          onClick={() => setIsDelete({ open: true, id: item?._id })}
                        >
                          <Icon icon={'mdi:delete-outline'} />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 3 }}>
                      <Typography sx={{ fontWeight: 500 }}>Pickup</Typography>
                      <Typography sx={{ fontWeight: 500 }}>{item?.tax_rate?.rate_pickup ? item?.tax_rate?.rate_pickup : 0}%</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 3,
                        borderTop: theme => `1px solid ${theme.palette.divider}`,
                        borderBottom: theme => `1px solid ${theme.palette.divider}`
                      }}
                    >
                      <Typography sx={{ fontWeight: 500 }}>Delivery</Typography>
                      <Typography sx={{ fontWeight: 500 }}>{item?.tax_rate?.rate_delivery ? item?.tax_rate?.rate_delivery : 0}%</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 3 }}>
                      <Typography sx={{ fontWeight: 500 }}>Dine In</Typography>
                      <Typography sx={{ fontWeight: 500 }}>{
                        item?.tax_rate?.rate_preserve
                          ? item?.tax_rate?.rate_preserve
                          : 0}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            )
          })}
      </Grid>

      <AddEditTaxCategory open={isAdd?.open} setOpen={setIsAdd} row={isAdd?.row} />

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '' })}
        loading={loading}
        label='Tax Category'
        handleDelete={() => dispatch(deleteTaxCategory(isDelete?.id))}
      />
    </>
  )
}

export default CategoryList
