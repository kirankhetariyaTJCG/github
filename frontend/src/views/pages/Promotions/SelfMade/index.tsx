'use client'

// React Imports
import { useState, useEffect, useCallback } from 'react'

// MUI Imports
import { Box, Card, LoadingButton, Typography, IconButton, Tooltip, Chip } from '@/Helper/MUIImports'

// Third Party Imports
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import CsTable from '@/@core/components/CsTable'
import AddEditPromo from './AddEditPromo'
import CsDelete from '@/@core/components/CsDelete'

// import PromoPreview from './PromoPreview'

// Store Imports
import { deleteSelfMade, getSelfMade, editSelfMade, duplicatePromotion } from '@/redux-store/SelfMade/Action'
import { getDeliveryZones } from '@/redux-store/Delivery/Action'
import { getCategories } from '@/redux-store/Category/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const SelfMadeView = () => {
  // State
  const [open, setOpen] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })

  // const [preview, setPreview] = useState<{ open: boolean, row: any }>({ open: false, row: {} })

  const [page, setPage] = useState<number>(1)

  // Hooks
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const selfMade = useSelector((state: any) => state.self_made.self_made)
  const loading = useSelector((state: any) => state.self_made.loading)
  const recordCount = useSelector((state: any) => state.self_made.record_count)
  const dispatch = useDispatch()

  const getData = useCallback((menu_id: string) => {
    dispatch(getSelfMade({ menu_id: menu_id, system: false, page: page, limit: 10 }))
  }, [page])

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?.menu_id)) {
      getData(restaurant?.menu_id)
    }
  }, [restaurant?.menu_id, page])

  useEffect(() => {
    !loading && setIsDelete({ open: false, id: '' })
  }, [loading])

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?._id)) {
      dispatch(getDeliveryZones({ restaurant_id: restaurant?._id }))
      dispatch(getCategories({ menu_id: restaurant?.menu_id }))
    }
  }, [restaurant?._id])

  const columns = [
    {
      flex: 1,
      minWidth: 250,
      sortable: false,
      field: 'name',
      headerName: 'NAME',
      renderCell: ({ row }: any) => {
        const { name } = row

        return name ? name : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'coupon_code',
      headerName: 'COUPON CODE',
      renderCell: ({ row }: any) => {
        const { coupon_code } = row

        return coupon_code ? coupon_code : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'used',
      headerName: 'USED',
      renderCell: ({ row }: any) => {
        const { used } = row

        return used ? used : 0
      }
    },
    {
      flex: 1,
      minWidth: 200,
      sortable: false,
      field: 'createdAt',
      headerName: 'Created',
      renderCell: ({ row }: any) => {
        const { createdAt } = row

        return createdAt ? moment(createdAt).format('MMM DD, YYYY') : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 200,
      sortable: false,
      field: 'associated_with',
      headerName: 'Associated with',
      renderCell: ({ row }: any) => {
        const { associated_with } = row

        return associated_with ? associated_with : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'is_active',
      headerName: 'Status',
      renderCell: ({ row }: any) => {
        const { is_active, _id } = row

        return (
          <Chip
            variant='filled'
            size='small'
            label={is_active ? 'Active' : 'Inactive'}
            color={is_active ? 'success' : 'error'}
            clickable
            onClick={() => dispatch(editSelfMade({ is_active: !is_active, id: _id }))}
          />
        )
      }
    },
    {
      flex: 1,
      minWidth: 180,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => {
        return (
          <>
            <Tooltip title='Edit' arrow>
              <IconButton onClick={() => setOpen({ open: true, row: row })}>
                <Icon icon={'bx:edit'} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete' arrow>
              <IconButton onClick={() => setIsDelete({ open: true, id: row?._id })}>
                <Icon icon={'mingcute:delete-2-line'} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Duplicate' arrow>
              <IconButton
                onClick={() => dispatch(duplicatePromotion({ id: row?._id, type: 5 }))}
              >
                <Icon icon={'material-symbols:control-point-duplicate-outline-rounded'} />
              </IconButton>
            </Tooltip>

            {/* <Tooltip title='Preview' arrow>
              <IconButton onClick={() => setPreview({ open: true, row: row })}>
                <Icon icon={'solar:eye-scan-linear'} />
              </IconButton>
            </Tooltip> */}

          </>
        )
      }
    }
  ]

  return (
    <>
      <Card sx={{ width: '100%', height: '100%' }}>
        <Box
          sx={{
            p: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 500 }}>Self-Made Promos</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' } }}>
            <LoadingButton
              variant='contained'
              sx={{ ml: { sm: 2.5 }, mt: { xs: 2.5, sm: 0 } }}
              onClick={() => setOpen({ open: true, row: {} })}
            >
              Add Promo Deal
            </LoadingButton>
          </Box>
        </Box>
        <Box sx={{ overflow: 'auto', height: 'calc(100dvh - 10rem)' }}>
          <CsTable
            columns={columns}
            pageSize={10}
            loading={loading}
            rows={selfMade ?? []}
            rowCount={recordCount ?? 0}
            src={'/images/NoPromotions.svg'}
            noDataText={'No Promotions Found'}
            onPageChange={(data: { page: number; pageSize: number }) => setPage(data?.page + 1)}
          />
        </Box>
      </Card>

      <AddEditPromo open={open?.open} setOpen={setOpen} row={open?.row} />

      {/* {preview?.open && <PromoPreview open={preview?.open} setOpen={setPreview} row={preview?.row} />} */}

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '' })}
        label='Promotion'
        loading={loading}
        handleDelete={() => dispatch(deleteSelfMade({ id: isDelete?.id, menu_id: restaurant?.menu_id }))}
      />
    </>
  )
}

export default SelfMadeView
