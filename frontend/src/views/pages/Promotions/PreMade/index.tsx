'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports

// import PromoPreview from '../SelfMade/PromoPreview'

import EditPreMade from './EditPreMade'
import CsTable from '@/@core/components/CsTable'

// Store Imports
import { is_loading, pre_made, setStatus } from '@/redux-store/PreMade'

// Icon Imports
import Icon from '@/@core/components/Icon'

const PreMadeView = () => {
  // State
  const [open, setOpen] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  // const [promoPreview, setPromoPreview] = useState<boolean>(false)

  // Hooks
  const preMade = useSelector(pre_made)
  const dispatch = useDispatch()
  const loading = useSelector(is_loading)

  const columns = [
    {
      flex: 1,
      minWidth: 250,
      sortable: false,
      field: 'headline',
      headerName: 'NAME',
      renderCell: ({ row }: any) => {
        const { headline } = row

        return headline ? headline : 'N/A'
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
      minWidth: 280,
      sortable: false,
      field: 'created_for',
      headerName: 'Created For',
      renderCell: () => {
        return (
          <Box>
            <Typography sx={{ fontWeight: 500 }}>Autopilot</Typography>
            <Typography>Campaign: Re-engage clients</Typography>
          </Box>
        )
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }: any) => {
        const { status } = row

        return (
          <Chip
            variant='filled'
            size='small'
            label={status ? 'Active' : 'Inactive'}
            color={status ? 'success' : 'error'}
            clickable
            onClick={() => dispatch(setStatus(row?._id))}
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
            <Tooltip title='Preview' arrow>
              <IconButton>
                <Icon icon={'solar:eye-scan-linear'} />
              </IconButton>
            </Tooltip>
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
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 500 }}>Pre-Made Promos</Typography>
        </Box>
        <CsTable
          columns={columns}
          pageSize={5}
          rowHeight={60}
          loading={loading}
          rows={preMade ?? []}
          rowCount={preMade?.length}
          src={'/images/NoPromotions.svg'}
          noDataText={'No Promotions Found'}
        />
      </Card>

      <EditPreMade open={open?.open} setOpen={setOpen} row={open?.row} />

      {/* {promoPreview && <PromoPreview open={promoPreview} setOpen={setPromoPreview} />} */}
    </>
  )
}

export default PreMadeView
