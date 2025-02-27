
// Third Party Imports
import moment from 'moment'

// Custom Imports
import CsTable from '@/@core/components/CsTable'

const Table = (props: any) => {
  const { row } = props

  const columns = [
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'date',
      headerName: 'Date',
      renderCell: ({ row }: { row: any }) => moment(row.date).format('MMMM D, YYYY'),
    },
    {
      flex: 1,
      minWidth: 200,
      sortable: false,
      field: 'availableData',
      headerName: 'Available Data',
      renderCell: ({ row }: { row: any }) => row.availableData !== null ? `$${row.availableData}` : 'N/A',
    },
  ];

  return (
    <CsTable
      columns={columns}
      pageSize={5}
      loading={false}
      rows={row ?? []}
      rowCount={row?.length}
      src={'/images/NoPromotion.svg'}
      noDataText={'No Promotions stats are found.'}
    />
  )
}

export default Table
