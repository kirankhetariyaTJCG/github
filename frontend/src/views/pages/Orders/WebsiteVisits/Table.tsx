// Third Party Imports
import moment from 'moment'

// Custom Imports
import CsTable from '@/@core/components/CsTable'

const Table = (props: any) => {
  const { type, row } = props
  const columns = [
    {
      flex: 1,
      minWidth: 250,
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
      headerName: 'Total revenue (US$) / Previous period',
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
      headerName: 'Change',
      renderCell: ({ row }: any) => {
        const { change } = row
        return change ? `${change}%` : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'visit',
      headerName: 'Visit',
      renderCell: ({ row }: any) => {
        const { visit } = row
        return visit ? visit : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'affilate',
      headerName: 'Affiliate',
      renderCell: ({ row }: any) => {
        const { affilate } = row
        return affilate ? affilate : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'direct',
      headerName: 'Direct',
      renderCell: ({ row }: any) => {
        const { direct } = row
        return direct ? direct : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }: any) => {
        const { email } = row
        return email ? email : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'inside_web',
      headerName: 'Inside Web',
      renderCell: ({ row }: any) => {
        const { inside_web } = row
        return inside_web ? inside_web : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'organic',
      headerName: 'Organic',
      renderCell: ({ row }: any) => {
        const { organic } = row
        return organic ? organic : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'paid_ads',
      headerName: 'Paid Ads',
      renderCell: ({ row }: any) => {
        const { paid_ads } = row
        return paid_ads ? paid_ads : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'social_media',
      headerName: 'Social Media',
      renderCell: ({ row }: any) => {
        const { social_media } = row
        return social_media ? social_media : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'referral',
      headerName: 'Referral',
      renderCell: ({ row }: any) => {
        const { referral } = row
        return referral ? referral : 'N/A'
      }
    }
  ]

  return (
    <CsTable
      columns={columns.filter(c => (type == 1 ? c.field !== 'visit' : c.field === 'visit' || c.field === 'date'))}
      pageSize={5}
      loading={false}
      rows={row ?? []}
      rowCount={row?.length}
      src={'/images/NoWebsiteVisit.svg'}
      noDataText={'No Website visits are found.'}
    />
  )
}

export default Table
