// MUI Imports
import type { StepIconProps } from '@mui/material/StepIcon'
import Box from '@mui/material/Box'

// Icon Imports
import Icon from '@/@core/components/Icon'

const StepperCustomDot = (props: StepIconProps) => {
  // Props
  const { active, completed, error } = props

  const styles = {
    inlineSize: '20px',
    blockSize: '20px',
    borderWidth: '3px',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderColor: 'var(--mui-palette-primary-lightOpacity)'
  }

  if (error) {
    return (
      <Box
        component={Icon}
        icon={'mingcute:alert-fill'}
        sx={{ color: theme => theme.palette.error.main, fontSize: '1.25rem' }}
      />
    )
  } else if (completed) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...styles,
          borderColor: theme => (completed ? theme.palette.primary.main : theme.palette.primary.lightOpacity),
          bgcolor: theme => (completed ? theme.palette.primary.main : theme.palette.primary.lightOpacity)
        }}
      >
        <Box component={Icon} icon={'iconamoon:check-bold'} sx={{ color: '#fff', fontSize: '0.875rem' }} />
      </Box>
    )
  } else {
    return (
      <Box
        sx={[
          styles,
          {
            borderWidth: active ? '5px' : '3px',
            borderColor: theme => (active ? theme.palette.primary.main : theme.palette.primary.lightOpacity),
            bgcolor: theme => theme.palette.background.paper
          }
        ]}
      />
    )
  }
}

export default StepperCustomDot
