// Third Party Imports
import moment from 'moment'

// Custom Imports
import CsTable from '@/@core/components/CsTable'

const Table = (props: any) => {
  const { row } = props
  const columns = [
    {
      flex: 1,
      minWidth: 250,
      sortable: false,
      field: 'date',
      headerName: 'Date',
      renderCell: ({ row }: any) => {
        const { createAt } = row
        return createAt ? moment(createAt).format('DD/MM/YYYY') : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'time_slot',
      headerName: 'Time Slot',
      renderCell: ({ row }: any) => {
        const { time_slot } = row
        return time_slot ? moment(time_slot, 'HH:mm:ss').format('hh:mm A') : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'total_persons',
      headerName: 'Total Persons',
      renderCell: ({ row }: any) => {
        const { total_persons } = row
        return total_persons ? total_persons : 'N/A'
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
        return total_revenue ? `$${total_revenue.toFixed(2)}` : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'status',
      headerName: 'Reservation Status',
      renderCell: ({ row }: any) => {
        const { status } = row
        return status ? status : 'N/A'
      }
    }
  ]

  return (
    <>
      <CsTable
        columns={columns}
        pageSize={10}
        loading={false}
        rows={row}
        rowCount={row.length}
        src={'/images/NoTableReservation.svg'}
        noDataText={'No Table reservations are found.'}
      />
    </>
  )
}

export default Table
