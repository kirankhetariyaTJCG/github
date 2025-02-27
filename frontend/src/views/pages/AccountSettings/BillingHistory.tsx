// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'

// Third Party Imports
import moment from 'moment'

// Custom Imports
import CsTable from '@/@core/components/CsTable'

// Icon Imports
import Icon from '@/@core/components/Icon'

const BillingHistory = () => {
  // State
  const [value, setValue] = useState<number>(0)

  const row: any = [
    {
      module_name: 'AutoPilot',
      status: true,
      total: 1000,
      created_at: new Date(),
      _id: 1
    },
    {
      module_name: 'Restaurent Basics',
      status: true,
      total: 3000,
      created_at: new Date(),
      _id: 2
    },
    {
      module_name: 'Menu',
      status: true,
      total: 3000,
      created_at: new Date(),
      _id: 3
    },
    {
      module_name: 'Kickstarter',
      status: false,
      total: 3000,
      created_at: new Date(),
      _id: 4
    },
    {
      module_name: 'Promotions',
      status: false,
      total: 3000,
      created_at: new Date(),
      _id: 5
    },
    {
      module_name: 'Dashboard',
      status: true,
      total: 3000,
      created_at: new Date(),
      _id: 6
    }
  ]
  const columns = [
    {
      flex: 1,
      minWidth: 250,
      sortable: false,
      field: 'module_name',
      headerName: 'MODULE',
      renderCell: ({ row }: any) => {
        const { module_name } = row

        return module_name ? module_name : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'created_at',
      headerName: 'ISSUED DATE',
      renderCell: ({ row }: any) => {
        const { created_at } = row

        return created_at ? moment(created_at).format('DD/MM/YY') : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'total',
      headerName: 'TOTAL AMOUNT',
      renderCell: ({ row }: any) => {
        const { total } = row

        return total ? `$${total}/-` : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'status',
      headerName: 'STATUS',
      renderCell: ({ row }: any) => {
        const { status } = row

        return (
          <Chip label={status ? 'Paid' : 'Unpaid'} color={status ? 'success' : 'error'} variant='tonal' size='small' />
        )
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: () => {
        return (
          <>
            <Tooltip title='View Invoice' arrow>
              <IconButton color='info'>
                <Icon icon={'la:file-invoice-dollar'} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Download Invoice' arrow>
              <IconButton color='primary'>
                <Icon icon={'line-md:downloading-loop'} />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    }
  ]

  return (
    <Box sx={{ m: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Billing History</Typography>
        <FormControl sx={{ width: '10rem' }}>
          <Select size='small' value={value} onChange={(e: any) => setValue(e.target.value)}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>Paid</MenuItem>
            <MenuItem value={2}>Unpaid</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ overflow: 'auto', height: 'calc(100vh - 16rem)' }}>
        <CsTable
          columns={columns}
          pageSize={10}
          loading={false}
          rows={row ?? []}
          rowCount={row?.length}
          src={'/images/NoPaidService.svg'}
          noDataText={"You don't have any bills"}
        />
      </Box>
    </Box>
  )
}

export default BillingHistory
