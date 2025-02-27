'use client'

// React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'

// MUI Imports
import { Box, IconButton, Typography, Card, Tooltip, TextField, InputAdornment } from '@/Helper/MUIImports'

// Third Party Imports
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'lodash'

// Custom Imports
import CsTable from '@/@core/components/CsTable'
import CsDatePicker from '@/@core/components/CsDatePicker'

// Store Imports
import { getClients } from '@/redux-store/Reports/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

const ClientsView = () => {

  // State
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>(() => {
    const startOfWeek = moment().startOf('week').toDate()
    const endOfWeek = moment().endOf('week').toDate()
    return [startOfWeek, endOfWeek]
  })
  const [startDate, endDate] = dateRange
  const [pages, setPages] = useState<number>(1)
  const [search, setSearch] = useState<string>('')

  // Hooks
  const clients = useSelector((state: any) => state.reports.clients)
  const recordCount = useSelector((state: any) => state.reports.total_clients)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  const getData = useCallback((searchValue: string) => {
    dispatch(getClients({
      restaurant_id: restaurant?._id,
      page: pages,
      limit: 10,
      search: searchValue,
      start_date: moment(startDate).valueOf(),
      end_date: moment(endDate).valueOf()
    }))
  }, [restaurant?._id, endDate, pages])

  const debouncedSearch = useMemo(
    () => debounce((searchValue: string) => getData(searchValue), 500),
    [getData]
  );

  useEffect(() => {
    if (search) {
      debouncedSearch(search);
    }

    return () => {
      debouncedSearch.cancel()
    };
  }, [search, debouncedSearch])

  useEffect(() => {
    debouncedSearch(search)
  }, [search, debouncedSearch])


  const handleDownload = async () => {
    try {
      const headers = columns.map(col => col.headerName).join(',')

      const getFieldValue = (client: any, field: any) => {
        if (field === 'name') return `${client.first_name || 'N/A'} ${client.last_name || 'N/A'}`.trim()
        if (field === 'last_order_date') return client.last_order_date ? moment(client.last_order_date).format('MMM DD, YYYY') : 'N/A'
        if (['total_orders', 'total_spent'].includes(field)) return client[field] || '0'
        return field.includes('.')
          ? field.split('.').reduce((acc: any, key: any) => acc?.[key], client) || 'N/A'
          : client[field] || 'N/A'
      }

      const csvRows = clients.map((client: any) =>
        columns.map(col => getFieldValue(client, col.field)).join(',')
      )
      const csvContent = [headers, ...csvRows].join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'clients.csv'
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error generating CSV file:', error)
    }
  }

  const columns = [
    {
      flex: 1,
      minWidth: 250,
      sortable: false,
      field: 'name',
      headerName: 'NAME',
      renderCell: ({ row }: any) => {
        const { first_name, last_name } = row

        return first_name ? `${first_name} ${last_name}` : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 150,
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
      minWidth: 150,
      sortable: false,
      field: 'phone',
      headerName: 'Phone No',
      renderCell: ({ row }: any) => {
        const { phone, country_code } = row

        return phone && country_code ? `+${country_code} ${phone}` : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'last_order_date',
      headerName: 'Last Order',
      renderCell: ({ row }: any) => {
        const { last_order_date } = row

        return last_order_date ? moment(last_order_date).format('MMM DD, YYYY') : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'total_orders',
      headerName: 'Total Orders',
      renderCell: ({ row }: any) => {
        const { total_orders } = row

        return total_orders ? total_orders : '0'
      }
    },
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'total_spent',
      headerName: 'Total SPENT',
      renderCell: ({ row }: any) => {
        const { total_spent } = row

        return total_spent ? `$${total_spent}/-` : '$0/-'
      }
    },
  ]

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          px: 4,
          py: 2,
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 2, sm: 0 }
        }}
      >
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Clients</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
          <TextField
            size='small'
            fullWidth
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CsDatePicker
            sx={{ my: 2 }}
            placeholderText='Select Date Range'
            size="small"
            selected={startDate}
            onChange={(update: any) => setDateRange(update)}
            startDate={startDate}
            endDate={endDate}
            selectsRange={true}
            dateFormat="dd/MM/yyyy"
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Icon icon={'ic:twotone-date-range'} />
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title='Export' arrow>
            <IconButton
              color='primary'
              disabled={false}
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              onClick={handleDownload}
            >
              <Icon icon={'ph:export-bold'} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <CsTable
        columns={columns}
        pageSize={10}
        loading={false}
        rows={clients ? clients : []}
        rowCount={recordCount ?? 0}
        src={'/images/NoClients.svg'}
        noDataText={'No Clients are found.'}
        onPageChange={(data: { page: number; pageSize: number }) => setPages(data?.page + 1)}
      />
    </Card>
  )
}

export default ClientsView
