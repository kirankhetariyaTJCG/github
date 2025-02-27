'use client'

// MUI Imports
import { DataGrid, gridPageCountSelector, useGridApiContext, useGridSelector, GridPagination } from '@mui/x-data-grid'
import MuiPagination from '@mui/material/Pagination'
import { TablePaginationProps } from '@mui/material/TablePagination'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
  rows: any[]
  columns: any[]
  rowCount?: number
  pageSize?: number
  loading?: boolean
  onPageChange?: (data: { page: number; pageSize: number }) => void
  src?: string
  noDataText?: string
  rowHeight?: number
}

const CsTable = (props: Props) => {
  // Props
  const { rows, columns, rowCount, pageSize, loading, onPageChange, src, noDataText, rowHeight } = props

  const Pagination = ({
    page,
    onPageChange,
    className
  }: Pick<TablePaginationProps, 'page' | 'onPageChange' | 'className'>) => {
    const apiRef = useGridApiContext()
    const pageCount = useGridSelector(apiRef, gridPageCountSelector)

    return (
      <MuiPagination
        color='primary'
        className={className}
        size='small'
        count={pageCount}
        disabled={loading}
        page={page + 1}
        onChange={(event, newPage) => onPageChange(event as any, newPage - 1)}
      />
    )
  }

  function CustomPagination(props: any) {
    return <GridPagination ActionsComponent={Pagination} {...props} />
  }

  return (
    <>
      {Array.isArray(rows) && rows?.length > 0 ? (
        <Box
          sx={{
            '& .MuiDataGrid-main': { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' },
            '& .MuiDataGrid-virtualScroller': { borderRadius: '0 !important' },
            '& .MuiDataGrid-columnHeader': {
              outline: 'none !important',
              display: 'flex',
              alignItems: 'center',
              p: '1.25rem'
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 600,
              letterSpacing: '0.17px',
              textTransform: 'uppercase',
              color: theme => theme.palette.secondary.light
            },
            '& .MuiDataGrid-columnHeaderTitleContainer': {
              justifyContent: 'start !important'
            },
            '& .MuiDataGrid-cell': {
              outline: 'none !important',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'start !important',
              fontSize: '0.875rem',
              fontWeight: '400',
              p: '1.25rem'
            },
            '& .MuiDataGrid-columnSeparator': { visibility: 'visible !important' },
            '& .MuiDataGrid-scrollbar': { position: 'relative !important' },
            '& .MuiDataGrid-filler': { display: 'none' }
          }}
        >
          <DataGrid
            sx={{
              border: theme => `1px solid ${theme.palette.divider}`,
              margin: { xs: 2, sm: 4, md: 4 },
              borderRadius: '10px !important',
              '& .mui-yrdy0g-MuiDataGrid-columnHeaderRow': { borderRadius: '0' },
              '& .mui-1pmk00y-MuiDataGrid-columnHeaders': { borderRadius: '0' }
            }}
            rows={rows ?? []}
            autoHeight
            rowHeight={rowHeight}
            columns={columns}
            disableRowSelectionOnClick={true}
            disableColumnResize={true}
            pagination
            slots={{ pagination: CustomPagination }}
            rowCount={rowCount}
            pageSizeOptions={[10]}
            loading={loading}
            paginationMode='server'
            onPaginationModelChange={onPageChange}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pageSize || 10,
                  page: 0
                }
              }
            }}
            disableColumnFilter
            disableColumnMenu
            getRowId={(row: any) => row._id}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: { xs: 'calc(100% - 9.8rem)', sm: 'calc(100% - 4.5rem)' },
            p: 4
          }}
        >
          {src && noDataText ? (
            <>
              <Box component={'img'} src={src} sx={{ width: { xs: '14rem', sm: '20rem' }, height: { sm: '20rem' } }} />
              <Typography sx={{ fontWeight: 500, fontSize: '1.3rem', mt: 2 }}>{noDataText}</Typography>
            </>
          ) : (
            <Typography sx={{ fontSize: '2rem', fontWeight: 600 }}>No Data Found</Typography>
          )}
        </Box>
      )}
    </>
  )
}

export default CsTable
