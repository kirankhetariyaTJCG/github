// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import moment from 'moment'
import { useDispatch } from 'react-redux'

// Custom Imports
import CsTable from '@/@core/components/CsTable'

// Store Imports
import { setActiveStep, setDefaultSteps, setIsList } from '@/redux-store/InviteProspects'

// Icon Imports
import Icon from '@/@core/components/Icon'

const ProspectsList = () => {
  // Hooks
  const dispatch = useDispatch()

  const rows: any = [
    {
      _id: 1,
      invitation_type: 1,
      file_name: 'AllClients',
      scheduled_for: new Date(),
      imported: 0,
      sent: 0
    },
    {
      _id: 2,
      invitation_type: 2,
      file_name: 'AllClients',
      scheduled_for: new Date(),
      imported: 100,
      sent: 100
    },
    {
      _id: 3,
      invitation_type: 2,
      file_name: 'AllClients',
      scheduled_for: new Date(),
      imported: 50,
      sent: 10
    }
  ]

  const columns = [
    {
      field: 'invitation_type',
      headerName: 'Invitation Type',
      flex: 1,
      minWidth: 180,
      sortable: false,
      renderCell: ({ row }: any) => {
        const { invitation_type } = row

        return invitation_type ? (invitation_type === 1 ? 'Email' : 'SMS') : 'N/A'
      }
    },
    {
      field: 'file_name',
      headerName: 'File Name',
      flex: 1,
      minWidth: 180,
      sortable: false,
      renderCell: ({ row }: any) => {
        const { file_name } = row

        return file_name ? file_name : 'N/A'
      }
    },
    {
      field: 'scheduled_for',
      headerName: 'Scheduled For',
      flex: 1,
      minWidth: 100,
      sortable: false,
      renderCell: ({ row }: any) => {
        const { scheduled_for } = row

        return scheduled_for ? moment(scheduled_for).format('DD-MM-YYYY HH:MM A') : 'N/A'
      }
    },
    {
      field: 'imported',
      headerName: 'Imported',
      flex: 0.5,
      minWidth: 30,
      sortable: false,
      renderCell: ({ row }: any) => {
        const { imported } = row

        return imported ? imported : 0
      }
    },
    {
      field: 'sent',
      headerName: 'sent',
      flex: 0.5,
      minWidth: 20,
      sortable: false,
      renderCell: ({ row }: any) => {
        const { sent } = row

        return sent ? sent : 0
      }
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
    <Card sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          p: 4,
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Invite Prospects</Typography>
        <LoadingButton
          variant='contained'
          onClick={() => {
            dispatch(setDefaultSteps())
            dispatch(setIsList(true))
            dispatch(setActiveStep(0))
          }}
        >
          Create New Invitation
        </LoadingButton>
      </Box>
      <CsTable
        columns={columns}
        pageSize={5}
        loading={false}
        rows={rows ?? []}
        rowCount={rows?.length}
        src={'/images/NoClients.svg'}
        noDataText={'No Clients are found.'}
      />
    </Card>
  )
}

export default ProspectsList
