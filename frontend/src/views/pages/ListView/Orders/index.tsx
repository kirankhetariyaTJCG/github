'use client'

// React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'

// MUI Imports
import { Box, Chip, IconButton, Typography, Card, Tooltip, InputAdornment, TextField, FormControl, InputLabel, Select, MenuItem } from '@/Helper/MUIImports'

// Third Party Imports
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'lodash'

// Custom Imports
import CsTable from '@/@core/components/CsTable'
import CsDatePicker from '@/@core/components/CsDatePicker'
import OrderDetails from './OrderDetails'

// Store Imports
import { getOrderById, getOrders } from '@/redux-store/Reports/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const statusType: any = {
  0: { label: 'Init', color: 'default' },
  1: { label: 'Pending', color: 'warning' },
  2: { label: 'Confirmed', color: 'primary' },
  3: { label: 'Shipped', color: 'info' },
  4: { label: 'Delivered', color: 'success' },
  5: { label: 'Cancelled', color: 'error' },
  6: { label: 'Refunded', color: 'info' },
}

export const orderType: any = {
  1: 'Pickup',
  2: 'Delivery',
  3: 'Table Reservation',
  4: 'Pre-order',
}

export const paymentOptions: any = {
  6: 'Cash',
  9: 'Cart at pickup counter',
  1: 'Credit / Debit Card',
  8: 'On call card details',
}

const OrdersView = () => {

  // State
  const [orderDetails, setOrderDetails] = useState<{ open: boolean, row: any }>({ open: false, row: {} })
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>(() => {
    const startOfWeek = moment().startOf('week').toDate()
    const endOfWeek = moment().endOf('week').toDate()
    return [startOfWeek, endOfWeek]
  })
  const [startDate, endDate] = dateRange
  const [pages, setPages] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<number>(1)

  // Hooks
  const orders = useSelector((state: any) => state.reports.orders)
  const recordCount = useSelector((state: any) => state.reports.record_count)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  const getData = useCallback((searchValue: string) => {
    dispatch(getOrders({
      restaurant_id: restaurant?._id,
      page: pages,
      limit: 10,
      search: searchValue,
      start_date: moment(startDate).startOf('day').valueOf(),
      end_date: moment(endDate).endOf('day').valueOf(),
      order_status: Number(status) === 0 ? null : Number(status)
    }))
  }, [restaurant?._id, endDate, pages, status])

  const debouncedSearch = useMemo(
    () => debounce((searchValue: string) => getData(searchValue), 500),
    [getData]
  );

  useEffect(() => {
    if (search) {
      debouncedSearch(search)
    }

    return () => { debouncedSearch.cancel() }
  }, [search, debouncedSearch])

  useEffect(() => {
    debouncedSearch(search)
  }, [search, debouncedSearch])

  const handleDownload = async () => {
    try {
      const headers = columns.filter(col => col.field !== 'actions').map(col => col.headerName)
      const getFieldValue = (order: any, field: any) => {
        let value = field.includes('.') ? field.split('.').reduce((acc: any, key: any) => acc ? acc[key] : undefined, order) : order[field]

        if (field === 'name') return order.customer_info?.first_name && order.customer_info?.last_name ? `${order.customer_info?.first_name} ${order.customer_info.last_name}` : 'N/A'
        if (field === 'items') return order.items ? order.items.length : 'N/A'
        if (field === 'order_type') return orderType[order.order_type] || 'N/A'
        if (field === 'payment_method_string') return order.payment_method_string || 'N/A'
        if (field === 'order_status') return statusType[order.order_status]?.label || 'N/A'
        if (['order_date', 'available_date'].includes(field)) return value ? moment(value).format('MMM DD, YYYY hh:mm a') : 'N/A'
        if (['sub_total', 'total_price', 'total_discount_value', 'taxes'].includes(field)) {
          if (Array.isArray(value)) {
            const totalTax = value.reduce((sum, tax) => sum + (tax.amount || 0), 0)
            return `$${totalTax.toFixed(2)}/-`
          }
          return value ? `$${value.toFixed(2)}/-` : '$0/-'
        }

        return value !== undefined ? value : 'N/A'
      }

      const csvRows = orders.map((order: any) => columns
        .filter(col => col.field !== 'actions')
        .map(col => getFieldValue(order, col.field))
        .join(',')
      )
      const csvContent = [headers.join(','), ...csvRows].join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', 'orders.csv')
      document.body.appendChild(link)
      link.click();
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error generating CSV file:', error)
    }
  }

  const getOrderDetails = async (id: string) => {
    const res = await getOrderById({ id: id })
    res?.success && res?.statusCode === 200 && setOrderDetails({ open: true, row: res?.data })
  }

  const columns = [
    {
      flex: 1,
      minWidth: 250,
      sortable: false,
      field: 'name',
      headerName: 'CUSTOMER NAME',
      renderCell: ({ row }: any) => {
        const { customer_info } = row

        return customer_info?.first_name ? `${customer_info?.first_name} ${customer_info?.last_name}` : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 200,
      sortable: false,
      field: 'order_date',
      headerName: 'Order Date/Time',
      renderCell: ({ row }: any) => {
        const { order_date } = row

        return order_date ? `${moment(order_date).format('MMM DD, YYYY')} ${moment(order_date).format('hh:mm a')}` : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 200,
      sortable: false,
      field: 'available_date',
      headerName: 'Fulfillment Time',
      renderCell: ({ row }: any) => {
        const { available_date, available_time } = row

        return available_date && available_time ? `${moment(available_date).format('MMM DD, YYYY')} ${moment(available_time).format('hh:mm a')}` : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 70,
      sortable: false,
      field: 'items',
      headerName: 'ITEMS',
      renderCell: ({ row }: any) => {
        const { items } = row

        return items ? items?.length : 0
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'sub_total',
      headerName: 'SUB TOTAL',
      renderCell: ({ row }: any) => {
        const { sub_total } = row

        return sub_total ? `$${sub_total.toFixed(2)}/-` : '$0/-'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'taxes',
      headerName: 'TOTAL TAX',
      renderCell: ({ row }: any) => {
        const totalTax = row?.taxes?.length > 0 ? row?.taxes?.reduce((sum: number, tax: any) => sum + (tax.amount || 0), 0) || 0 : 0

        return `$${totalTax.toFixed(2)}/-`
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'total_discount_value',
      headerName: 'DISCOUNT',
      renderCell: ({ row }: any) => {
        const { total_discount_value } = row

        return total_discount_value ? `$${total_discount_value.toFixed(2)}/-` : '$0/-'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'total_price',
      headerName: 'TOTAL',
      renderCell: ({ row }: any) => {
        const { total_price } = row

        return total_price ? `$${total_price.toFixed(2)}/-` : '$0/-'
      }
    },
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'order_type',
      headerName: 'Order Type',
      renderCell: ({ row }: any) => {
        const { order_type } = row

        return order_type ? orderType[order_type] : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 150,
      sortable: false,
      field: 'payment_method_string',
      headerName: 'Payment Method',
      renderCell: ({ row }: any) => {
        const { payment_method_string } = row

        return payment_method_string ? payment_method_string : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 100,
      sortable: false,
      field: 'order_status',
      headerName: 'Status',
      renderCell: ({ row }: any) => {
        const { order_status }: any = row

        return (
          <>
            {AppUtils.checkValue(order_status) ?
              <Chip
                variant='filled'
                size='small'
                label={statusType[order_status]?.label}
                color={statusType[order_status]?.color}
              /> : 'N/A'
            }
          </>
        )
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: ({ row }: any) => {
        return (
          <Tooltip title='View Order Details' arrow>
            <IconButton onClick={() => getOrderDetails(row?._id)}>
              <Icon icon={'uil:bill'} />
            </IconButton>
          </Tooltip>
        )
      }
    }
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
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Orders</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
          <FormControl fullWidth>
            <Select
              size='small'
              value={status}
              onChange={(e: any) => setStatus(e.target.value)}
            >
              {Object.entries(statusType).map(([key, { label }]: any) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small"
            fullWidth
            placeholder="Search..."
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
              )
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
        rows={orders ? orders : []}
        rowCount={recordCount ?? 0}
        src={'/images/NoOrders.svg'}
        noDataText={'No Orders are found.'}
        onPageChange={(data: { page: number; pageSize: number }) => setPages(data?.page + 1)}
      />

      <OrderDetails open={orderDetails?.open} setOpen={setOrderDetails} row={orderDetails?.row} />
    </Card>
  )
}

export default OrdersView
