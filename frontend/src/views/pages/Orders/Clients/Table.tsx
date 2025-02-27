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
      field: 'new_clients',
      headerName: 'New Clients',
      renderCell: ({ row }: any) => {
        const { new_clients } = row

        return new_clients ? new_clients : '0'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'existing_clients',
      headerName: 'Existing Clients',
      renderCell: ({ row }: any) => {
        const { existing_clients } = row

        return existing_clients ? existing_clients : '0'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'total',
      headerName: 'Total',
      renderCell: ({ row }: any) => {
        const { new_clients, existing_clients } = row
        const total = (new_clients || 0) + (existing_clients || 0)
        return total ? total : '0'
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
        src={'/images/NoClients.svg'}
        noDataText={'No Clients are found.'}
      />
    </>
  )
}

export default Table
