'use client'

// React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'

// MUI Imports
import { Box, Typography, Tooltip, IconButton, Card, TextField } from '@/Helper/MUIImports'

// Third Party Import
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash';

// Custom Import
import CsTable from '@/@core/components/CsTable'

// Store Imports
import { getCategoriesReports } from '@/redux-store/Reports/Action'

// Icon Import
import Icon from '@/@core/components/Icon'

const CategoryView = () => {

  // State
  const [pages, setPages] = useState<number>(1)
  const [search, setSearch] = useState<string>('')

  // Hooks
  const categories = useSelector((state: any) => state.reports.categories)
  const recordCount = useSelector((state: any) => state.reports.total_categories)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  const getData = useCallback((searchValue: string) => {
    dispatch(getCategoriesReports({
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
      const getFieldValue = (category: any, field: any) => {
        if (field === 'total_revenue') {
          return category[field] ? `$${category[field]}/-` : 'N/A'
        }
        return category[field] !== undefined ? category[field] : 'N/A'
      }

      const csvRows = categories.map((category: any) =>
        columns.map(col => getFieldValue(category, col.field)).join(',')
      )
      const csvContent = [headers.join(','), ...csvRows].join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', 'categories.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error generating CSV file for categories:', error)
    }
  }

  const columns = [
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
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 4
        }}
      >
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Categories</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
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
        rows={categories ?? []}
        rowCount={recordCount ?? 0}
        src={'/images/NoSalesData.svg'}
        noDataText={'No Category data are found.'}
        onPageChange={(data: { page: number; pageSize: number }) => setPages(data?.page + 1)}
      />
    </Card>
  )
}

export default CategoryView
