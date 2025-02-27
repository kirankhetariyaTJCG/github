'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, Tooltip, IconButton, Typography, Card } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'
import QRCode from 'react-qr-code'

// Custom Imports
import CsTable from '@/@core/components/CsTable'
import AddEditQr from './AddEditQr'
import CsDelete from '@/@core/components/CsDelete'
import FlyerPreview from './FlyerPreview'
import QrPreview from './QrPreview'
import SendQr from './SendQr'
import AddEditFlyer from './AddEditFlyer'
import AddQrFlyer from './AddQrFlyer'

// Store Imports
import { getQrFlyers, deleteQrFlyer } from '@/redux-store/QrFlyers/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

const titelTypes: any = {
  1: "Dine in",
  2: "Room service",
  3: "Seat delivery",
  4: "Suite delivery",
  5: "Sunbeds",
  6: "Other",
  7: "Pickup & consume here"
}

const QrFlyersView = () => {
  // State
  const [open, setOpen] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [flyer, setFlyer] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isQrPre, setQrPre] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [flyerPre, setFlyerPre] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })
  const [isSend, setIsSend] = useState<boolean>(false)
  const [isQrTemp, setIsQrTemp] = useState<{ open: boolean; row: any }>({ open: false, row: {} })

  // Hooks
  const qrFlyers = useSelector((state: any) => state.qr_code.qr_flyers)
  const loading = useSelector((state: any) => state.qr_code.is_loading)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?._id)) {
      dispatch(getQrFlyers({ restaurant_id: restaurant?._id }))
    }
  }, [restaurant?._id])

  const handleDelete = () => {
    dispatch(deleteQrFlyer(isDelete?.id))
    setIsDelete({ open: false, id: '' })
  }

  const columns = [
    {
      flex: 0.7,
      minWidth: 180,
      sortable: false,
      field: 'qr_name',
      headerName: 'QR Code & Flyer',
      renderCell: ({ row }: any) => {
        return (
          <>
            {Array.isArray(row?.flyer_pages) && row?.flyer_pages?.length > 0 ?
              <Box
                component={'img'}
                src={`${UrlHelper.imgPath}${row?.flyer_pages[0]?.image}`}
                sx={{ width: '100px' }} />
              : <Box
                sx={{
                  p: 2,
                  border: theme => `2px dashed ${theme.palette.primary.main}`,
                  bgcolor: theme => theme.palette.primary.lightOpacity,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <QRCode
                  id='QR-Code'
                  value={UrlHelper.menuLink.replace('{id}', restaurant?._id)}
                  bgColor={'#fff'}
                  fgColor={'#000'}
                  size={80}
                />
              </Box>
            }
          </>
        )
      }
    },
    {
      flex: 1.3,
      minWidth: 300,
      sortable: false,
      field: 'name',
      headerName: 'Name',
      renderCell: ({ row }: any) => {
        return Array.isArray(row?.flyer_pages) && row?.flyer_pages?.length > 0 ? row?.flyer_pages[0]?.headline : row?.name ? row?.name : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 130,
      sortable: false,
      field: 'title',
      headerName: 'Promotion / Service, Used for',
      renderCell: ({ row }: any) => {
        return AppUtils.checkValue(row?.title_type) ? titelTypes[row?.title_type] : 'N/A'
      }
    },
    {
      flex: 0.8,
      minWidth: 180,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => {
        return (
          <>
            <Tooltip title='Edit' arrow>
              <IconButton onClick={() => Array.isArray(row?.flyer_pages) && row?.flyer_pages?.length > 0 ? setFlyer({ open: true, row: row }) : setOpen({ open: true, row: row })}>
                <Icon icon={'bx:edit'} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Preview' arrow>
              <IconButton
                onClick={() => Array.isArray(row?.flyer_pages) && row?.flyer_pages?.length > 0 ? setFlyerPre({ open: true, row: row }) : setQrPre({ open: true, row: row })}
              >
                <Icon icon={'uil:qrcode-scan'} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Send Mail' arrow>
              <IconButton onClick={() => setIsSend(true)}>
                <Icon icon={'icon-park-outline:send-one'} />
              </IconButton>
            </Tooltip>
            {row?.name &&
              <Tooltip title='Add Flyer' arrow>
                <IconButton onClick={() => setIsQrTemp({ open: true, row: row })}>
                  <Icon icon={'icon-park-twotone:page-template'} />
                </IconButton>
              </Tooltip>
            }
            <Tooltip title='Delete' arrow>
              <IconButton onClick={() => setIsDelete({ open: true, id: row?._id })}>
                <Icon icon={'mingcute:delete-2-line'} />
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
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 500 }}>QR Codes</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <LoadingButton variant='contained' onClick={() => setOpen({ open: true, row: {} })}>
              Add Qr Code
            </LoadingButton>
            <LoadingButton variant='contained' onClick={() => setFlyer({ open: true, row: {} })}>
              Add Flyer
            </LoadingButton>
          </Box>
        </Box>
        <CsTable
          columns={columns}
          pageSize={10}
          rowHeight={150}
          loading={loading}
          rows={qrFlyers ?? []}
          rowCount={qrFlyers?.length}
          src={'/images/NoQrFlyer.svg'}
          noDataText={'No qr codes are found'}
        />
      </Card>

      <AddEditQr open={open?.open} setOpen={setOpen} row={open?.row} />

      <AddEditFlyer open={flyer?.open} setOpen={setFlyer} row={flyer?.row} />

      {isQrPre?.open && <QrPreview open={isQrPre?.open} setOpen={setQrPre} row={isQrPre?.row} restaurant_id={restaurant?._id} />}

      {flyerPre?.open && <FlyerPreview open={flyerPre?.open} setOpen={setFlyerPre} row={flyerPre?.row} />}

      {isQrTemp?.open && <AddQrFlyer open={isQrTemp?.open} setOpen={setIsQrTemp} row={isQrTemp?.row} restaurant_id={restaurant?._id} />}

      {isSend && <SendQr open={isSend} setOpen={setIsSend} />}

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '' })}
        label='QR Code'
        loading={loading}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default QrFlyersView
