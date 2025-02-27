'use client'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Imports
import CsTable from '@/@core/components/CsTable'

const PaidServiceView = () => {
  const row: any = []
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

        return used ? used : 'N/A'
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
      minWidth: 180,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: any) => {
        return (
          <>
            <LoadingButton>click</LoadingButton>
          </>
        )
      }
    }
  ]

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ p: 4, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
        <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Your Paid Services</Typography>
      </Box>
      <CsTable
        columns={columns}
        pageSize={10}
        loading={false}
        rows={row ?? []}
        rowCount={row?.length}
        src={'/images/NoPaidService.svg'}
        noDataText={"You don't have any active paid services."}
      />
    </Card>
  )
}

export default PaidServiceView
