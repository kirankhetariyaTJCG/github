'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'
import CsTable from '@/@core/components/CsTable'
import AddIntegration from './AddIntegration'

// Icon Imports
import Icon from '@/@core/components/Icon'

const YourIntegrationsView = () => {
  // State
  const [isAdd, setIsAdd] = useState<{ open: boolean; row: any }>({ open: false, row: {} })

  const rows: any = []
  const columns = [
    {
      flex: 1,
      minWidth: 200,
      sortable: false,
      field: 'story_name',
      headerName: 'STORIES TITLE',
      renderCell: ({ row }: any) => {
        const { story_name } = row
        return <Typography>{story_name ? story_name : 'N/A'}</Typography>
      }
    }
  ]

  return (
    <>
      <Card sx={{ width: '100%', height: '100%' }}>
        <Box sx={{ p: 4, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Your Integrations</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              mt: 2
            }}
          >
            <CsTextField
              sx={{ width: 'calc(100% - 12rem)' }}
              fullWidth
              placeholder='Search'
              StartIcon={<Icon icon={'ic:round-search'} />}
            />
            <LoadingButton variant='contained' onClick={() => setIsAdd({ open: true, row: {} })}>
              Add Integration
            </LoadingButton>
          </Box>
        </Box>
        <CsTable
          columns={columns}
          pageSize={10}
          loading={false}
          rows={rows ?? []}
          rowCount={rows?.length}
          src={'/images/NoIntegrations.svg'}
          noDataText={'No Integrations are found.'}
        />
      </Card>

      {isAdd?.open && <AddIntegration open={isAdd?.open} setOpen={setIsAdd} row={isAdd?.row} />}
    </>
  )
}

export default YourIntegrationsView
