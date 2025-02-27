'use client'

// MUI Imports
import TextField, { TextFieldProps } from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'

const CsTextField = (props: TextFieldProps & { StartIcon?: any; fieldSx?: any; inputSx?: any; isAlign?: boolean }) => {
  // Props
  const { StartIcon, sx, error, helperText, fieldSx, disabled, inputSx, isAlign, ...restProps } = props

  return (
    <Box sx={sx}>
      <Box
        sx={{
          ...fieldSx,
          outlineWidth: '1px',
          outlineStyle: 'solid',
          outlineColor: theme => (error ? theme.palette.error.main : theme.palette.customColors.inputBorder),
          '&:hover': {
            outlineColor: theme =>
              error
                ? theme.palette.error.main
                : disabled
                ? theme.palette.customColors.inputBorder
                : theme.palette.secondary.dark
          },
          borderRadius: '8px',
          display: 'flex',
          alignItems: isAlign ? 'start' : 'center',
          '&:focus-within': {
            outlineWidth: disabled ? '1px' : '2px',
            outlineColor: theme =>
              error
                ? theme.palette.error.main
                : disabled
                ? theme.palette.customColors.inputBorder
                : theme.palette.primary.main
            // '& .MuiFormLabel-root': {
            //   position: 'absolute',
            //   top: '-3px',
            //   left: '-5px'
            // }
          }
        }}
      >
        {StartIcon && <Box sx={{ pl: 3, lineHeight: '0.5', pt: isAlign ? 3 : 0 }}>{StartIcon}</Box>}
        <TextField
          {...restProps}
          disabled={disabled}
          error={false}
          autoComplete='off'
          helperText={''}
          sx={{
            ...inputSx,
            '& > div > fieldset': {
              border: 'none !important'
            },
            '& .MuiInputLabel-root': {
              bgcolor: theme => theme.palette.background.paper,
              px: 1,
              // lineHeight: 1.2,
              color: theme => (error ? theme.palette.error.main : theme.palette.text.secondary)
            }
            // '& .Mui-focused': {
            //   color: theme => (error ? theme.palette.error.main : theme.palette.text.primary)
            // }
          }}
          size='small'
        />
      </Box>
      {error && <FormHelperText sx={{ color: theme => theme.palette.error.main }}>{helperText}</FormHelperText>}
    </Box>
  )
}

export default CsTextField
