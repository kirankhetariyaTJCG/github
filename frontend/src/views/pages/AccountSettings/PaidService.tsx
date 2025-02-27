// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import LoadingButton from '@mui/lab/LoadingButton'

const PaidService = () => {
  const arr = [
    {
      module_name: 'Restaurant Basics',
      service_type: 1,
      total_days: 130,
      value: 30,
      remaining_days: 15
    },
    {
      module_name: 'Autopilot',
      service_type: 2,
      total_days: 150,
      value: 50,
      remaining_days: 85
    },
    {
      module_name: 'Menu Setup',
      service_type: 2,
      total_days: 365,
      value: 10,
      remaining_days: 200
    },
    {
      module_name: 'Kickstarter',
      service_type: 1,
      total_days: 100,
      value: 50,
      remaining_days: 50
    },
    {
      module_name: 'Dashboard',
      service_type: 1,
      total_days: 30,
      value: 10,
      remaining_days: 20
    }
  ]

  return (
    <Box sx={{ m: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '1.125rem',
          p: 2,
          borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        Active Services
      </Typography>
      <Box sx={{ overflow: 'auto', height: 'calc(100vh - 14.5rem)' }}>
        {Array.isArray(arr) &&
          arr?.length > 0 &&
          arr?.map((item: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px',
                  bgcolor: theme => theme.palette.customColors.bodyBg,
                  p: 4,
                  m: 4
                }}
              >
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, pb: 2 }}>{item?.module_name}</Typography>
                <Box sx={{ display: 'flex', gap: 4, width: '100%' }}>
                  <Box sx={{ width: '50%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2 }}>
                      <Typography sx={{ fontWeight: 500 }}>{item?.service_type === 1 ? 'Days' : 'Month'}</Typography>
                      <Typography sx={{ fontWeight: 500 }}>
                        {item?.remaining_days} of {item?.total_days} Days
                      </Typography>
                    </Box>
                    <LinearProgress value={item?.value} variant='determinate' />
                    <Typography sx={{ fontSize: '0.8rem', pt: 1 }}>
                      {item?.remaining_days} days remaining until your service requires update
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'end',
                      gap: 4,
                      pt: 2,
                      width: '50%'
                    }}
                  >
                    <LoadingButton variant='contained'>Upgrade</LoadingButton>
                    <LoadingButton variant='outlined' color='error'>
                      Cancel
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

export default PaidService
