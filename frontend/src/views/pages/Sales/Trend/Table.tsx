// MUI Imports
import Box from '@mui/material/Box'

// Third Party Imports
import moment from 'moment'

// Custom Imports
import CsTable from '@/@core/components/CsTable'

const Table = (props: any) => {
  const { row } = props

  const columns = [
    {
      flex: 1,
      minWidth: 170,
      sortable: false,
      field: 'date',
      headerName: 'Date',
      renderCell: ({ row }: any) => {
        const { createAt } = row

        return createAt ? moment(createAt).format('DD-MM-YYYY') : 'N/A'
      }
    },
    {
      flex: 1,
      maxWidth: 170,
      sortable: false,
      field: 'not_sales',
      headerName: 'Not Sales',
      renderCell: ({ row }: any) => {
        const { not_sales } = row

        return not_sales ? not_sales : 'N/A'
      }
    },
    {
      flex: 1,
      maxWidth: 150,
      sortable: false,
      field: 'orders',
      headerName: 'Orders',
      renderCell: ({ row }: any) => {
        const { orders } = row

        return orders ? orders : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 170,
      sortable: false,
      field: 'avg_order_value',
      headerName: 'Avg. Order Value',
      renderCell: ({ row }: any) => {
        const { avg_order_value } = row

        return avg_order_value ? avg_order_value : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 320,
      sortable: false,
      field: 'total_revenue',
      headerName: 'Total revenue (US$) / Previous period',
      renderCell: ({ row }: any) => {
        const { total_revenue } = row

        return total_revenue ? total_revenue : 'N/A'
      }
    },
    {
      flex: 1,
      maxWidth: 120,
      sortable: false,
      field: 'change',
      headerName: 'Change',
      renderCell: ({ row }: any) => {
        const { change } = row

        return change ? `${change}` : 'N/A'
      }
    }
  ]

  return (
    <Box>
      <CsTable
        columns={columns}
        pageSize={5}
        loading={false}
        rows={row ?? []}
        rowCount={row?.length}
        src={'/images/NoSalesData.svg'}
        noDataText={'No Sales data are found.'}
      />
    </Box>
  )
}

export default Table
