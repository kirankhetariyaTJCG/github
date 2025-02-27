// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// Custom Imports
import CsTable from '@/@core/components/CsTable'

// Icon Imports
import Icon from '@/@core/components/Icon'

const ClientsList = () => {
  let customers: any = []
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 180,
      sortable: false
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 180,
      sortable: false
    },
    {
      field: 'phone_number',
      headerName: 'Phone Number',
      flex: 1,
      minWidth: 150,
      sortable: false
    },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      minWidth: 10,
      renderCell: () => {
        return (
          <IconButton color='error'>
            <Icon icon={'ic:twotone-delete'} />
          </IconButton>
        )
      }
    }
  ]

  return (
    <Box sx={{ overflow: 'auto', height: '-webkit-fill-available', width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4, width: '100%', p: 4 }}>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            p: 4,
            borderRadius: '8px',
            bgcolor: theme => theme.palette.primary.lightOpacity
          }}
        >
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: theme => theme.palette.primary.main }}>
            50
          </Typography>
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, color: theme => theme.palette.primary.main }}>
            Total
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            p: 4,
            borderRadius: '8px',
            bgcolor: theme => theme.palette.primary.lightOpacity
          }}
        >
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: theme => theme.palette.primary.main }}>
            45
          </Typography>
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, color: theme => theme.palette.primary.main }}>
            Imported
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            p: 4,
            borderRadius: '8px',
            bgcolor: theme => theme.palette.primary.lightOpacity
          }}
        >
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: theme => theme.palette.primary.main }}>
            5
          </Typography>
          <Typography sx={{ fontSize: '1rem', fontWeight: 400, color: theme => theme.palette.primary.main }}>
            Not Imported
          </Typography>
        </Box>
      </Box>
      <Box sx={{ overflow: 'auto', height: 'calc(100vh - 22rem)' }}>
        <CsTable
          columns={columns}
          pageSize={5}
          loading={false}
          rows={customers ?? []}
          rowCount={customers?.length}
          src={'/images/NoClients.svg'}
          noDataText={'No Clients are found.'}
        />
      </Box>
    </Box>
  )
}

export default ClientsList
