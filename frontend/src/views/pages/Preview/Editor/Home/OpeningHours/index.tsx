// MUI Imports
import { Box, Typography, LoadingButton } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'
import moment from 'moment'

// Icon Imports
import Icon from '@/@core/components/Icon'

const weekNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const OpeningHours = ({ onDelete }: { onDelete: () => void }) => {

  // Hooks
  const serviceScheduleData = useSelector((state: any) => state.service_schedules.serviceSchedules);

  return (
    <Box>
      <Box
        sx={{
          borderLeft: theme => `2px solid ${theme.palette.primary.main}`,
          borderRadius: '0 4px 4px 0',
          p: 2,
          bgcolor: theme => theme.palette.primary.lightOpacity
        }}
      >
        This information is automatically pulled from the Setup section in the web admin panel.
      </Box>
      <Box sx={{ my: 4 }}>
        {Array.isArray(serviceScheduleData[0]?.hours) &&
          serviceScheduleData[0]?.hours?.length > 0 &&
          serviceScheduleData[0]?.hours?.map((hour: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px',
                  p: 2
                }}
              >
                <Typography sx={{ fontWeight: 500, fontSize: { xs: '0.9rem', sm: '1rem' } }}>{weekNames[hour?.day]}</Typography>
                <Box>
                  {Array.isArray(hour?.hours) && hour?.hours.length > 0 &&
                    hour?.hours.map((hour: any, hourIndex: number) => (
                      <Typography
                        key={hourIndex}
                        sx={{
                          fontWeight: 500,
                          fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                      >
                        {hour?.start_time
                          ? moment(hour?.start_time).format('hh:mm A')
                          : '--:--'}
                        {' - '}
                        {hour?.end_time
                          ? moment(hour?.end_time).format('hh:mm A')
                          : '--:--'}
                      </Typography>
                    ))
                  }
                </Box>
              </Box>
            )
          })}
      </Box>
      <LoadingButton variant='contained' onClick={onDelete}>
        <Icon icon={'ic:twotone-delete'} style={{ fontSize: 20, marginRight: 6 }} />
        Delete
      </LoadingButton>
    </Box>
  )
}

export default OpeningHours
