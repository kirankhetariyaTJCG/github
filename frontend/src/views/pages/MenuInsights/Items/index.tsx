'use client'

// React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'

// MUI Imports
import { Card, Box, Typography, IconButton, Tooltip, TextField } from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'

// Custom Imports
import CsTable from '@/@core/components/CsTable'

// Store Imports
import { getItemsReports } from '@/redux-store/Reports/Action'

// Icon Import
import Icon from '@/@core/components/Icon'

const ItemsView = () => {

  // State
  const [pages, setPages] = useState<number>(1)
  const [search, setSearch] = useState<string>('')

  // Hooks
  const items = useSelector((state: any) => state.reports.items)
  const recordCount = useSelector((state: any) => state.reports.total_items)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  const getData = useCallback((searchValue: string) => {
    dispatch(getItemsReports({
      restaurant_id: restaurant?._id,
      type: 2,
      page: pages,
      limit: 10,
      search: searchValue
    }))
  }, [restaurant?._id, pages])

  const debouncedSearch = useMemo(
    () => debounce((searchValue: string) => getData(searchValue), 500),
    [getData]
  )

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
      const headers = columns.map(col => col.headerName);
      const getFieldValue = (item: any, field: any) => {
        if (field === 'total_revenue') {
          return item[field] ? `$${item[field]}/-` : 'N/A';
        }
        return item[field] !== undefined ? item[field] : 'N/A';
      };

      const csvRows = items.map((item: any) =>
        columns.map(col => getFieldValue(item, col.field)).join(',')
      )

      const csvContent = [headers.join(','), ...csvRows].join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', 'items.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error generating CSV file for items:', error)
    }
  }

  const columns = [
    {
      flex: 1,
      minWidth: 130,
      sortable: false,
      field: 'name',
      headerName: 'Item',
      renderCell: ({ row }: any) => {
        const { name } = row

        return name ? name : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 130,
      sortable: false,
      field: 'category_name',
      headerName: 'Category',
      renderCell: ({ row }: any) => {
        const { category_name } = row

        return category_name ? category_name : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 130,
      sortable: false,
      field: 'total_orders',
      headerName: 'Total Orders',
      renderCell: ({ row }: any) => {
        const { total_orders } = row

        return total_orders ? total_orders : 'N/A'
      }
    },
    {
      flex: 1,
      minWidth: 130,
      sortable: false,
      field: 'total_revenue',
      headerName: 'Total Revenue',
      renderCell: ({ row }: any) => {
        const { total_revenue } = row

        return total_revenue ? `$${total_revenue}/-` : 'N/A'
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
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Items</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 4,
          }}
        >
          <TextField
            size='small'
            fullWidth
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Tooltip title='Export' arrow>
            <IconButton
              color='primary'
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
        rows={items ?? []}
        rowCount={recordCount}
        src={'/images/NoSalesData.svg'}
        noDataText={'No Item data are found.'}
        onPageChange={(data: { page: number; pageSize: number }) => setPages(data?.page + 1)}
      />
    </Card>
  )
}

export default ItemsView
