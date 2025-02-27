// Third Party Imports
import moment from 'moment'

// Custom Imports
import CsTable from '@/@core/components/CsTable'

const Table = (props: any) => {
  const { row } = props
  const columns = [
    {
      flex: 1,
      maxWidth: 150,
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
      minWidth: 150,
      sortable: false,
      field: 'total_revenue',
      headerName: 'Total Revenue (US$)',
      renderCell: ({ row }: any) => {
        const { total_revenue } = row
        return total_revenue ? total_revenue : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'change',
      headerName: 'Change (%)',
      renderCell: ({ row }: any) => {
        const { change } = row
        return change ? `${change}%` : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
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
      minWidth: 100,
      sortable: false,
      field: 'subtotal',
      headerName: 'Subtotal (US$)',
      renderCell: ({ row }: any) => {
        const { subtotal } = row
        return subtotal ? subtotal : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'tax',
      headerName: 'Tax (US$)',
      renderCell: ({ row }: any) => {
        const { tax } = row
        return tax ? tax : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'delivery_fee',
      headerName: 'Delivery Fee (US$)',
      renderCell: ({ row }: any) => {
        const { delivery_fee } = row
        return delivery_fee ? delivery_fee : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'total',
      headerName: 'Total (US$)',
      renderCell: ({ row }: any) => {
        const { total } = row
        return total ? total : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'payment_type',
      headerName: 'Payment Type',
      renderCell: ({ row }: any) => {
        const { payment_type } = row
        return payment_type ? payment_type : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'order_type',
      headerName: 'Order Type',
      renderCell: ({ row }: any) => {
        const { order_type } = row
        return order_type ? order_type : 'N/A'
      }
    }
  ]

  return (
    <>
      <CsTable
        columns={columns}
        pageSize={10}
        loading={false}
        rows={row ?? []}
        rowCount={row?.length}
        src={'/images/NoSummary.svg'}
        noDataText={'No Sales summary are found.'}
      />
    </>
  )
}

export default Table
