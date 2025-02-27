// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Collapse from '@mui/material/Collapse'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useDispatch } from 'react-redux'

// Custom Imports
import CsDatePicker from '@/@core/components/CsDatePicker'

// Store Imports
import { setActiveStep, setDoneSteps, setIsList } from '@/redux-store/InviteProspects'

// Icon Imports
import Icon from '@/@core/components/Icon'

const SendInvitation = () => {
  // State
  const [isSend, setIsSend] = useState<number>(1)
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<Date | null>(null)

  // Hooks
  const dispatch = useDispatch()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '-webkit-fill-available',
        justifyContent: 'space-between',
        width: '100%'
      }}
    >
      <Box
        sx={{
          width: '40rem',
          m: 'auto',
          border: theme => `1px solid ${theme.palette.divider}`,
          borderRadius: '8px',
          p: 4
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>When do you want to send the message to the client?</Typography>
        <RadioGroup value={isSend} onChange={(e: any) => setIsSend(Number(e.target.value))} row>
          <FormControlLabel value={1} control={<Radio />} label='Now' />
          <FormControlLabel value={2} control={<Radio />} label='Schedule for later' />
        </RadioGroup>
        <Collapse in={isSend === 2}>
          <CsDatePicker
            sx={{ mt: 2, width: '20rem' }}
            size='medium'
            selected={date}
            showTimeSelect
            timeIntervals={15}
            timeCaption='Time'
            dateFormat={'dd/mm/yyyy h:mm aa'}
            onChange={(date: any) => setDate(date)}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Icon icon={'ic:twotone-date-range'} />
                </InputAdornment>
              )
            }}
          />
        </Collapse>
        <Box sx={{ bgcolor: theme => theme.palette.warning.lightOpacity, p: 4, borderRadius: '8px', my: 4 }}>
          <Typography sx={{ fontWeight: 600, fontSize: '1.2rem', color: theme => theme.palette.warning.main, pb: 2 }}>
            Important Note:
          </Typography>
          <Typography sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
            Please note that the promotion used in Kickstarter cannot be disabled or deleted for 7 days after the
            messages are sent. This way, your clients have enough time to benefit from the promotion.
          </Typography>
        </Box>
        <Box sx={{ pt: 4, px: 4, borderTop: theme => `1px solid ${theme.palette.divider}`, fontSize: '0.8rem' }}>
          By pressing the "Schedule" button above, the restaurant agrees to send the invitation in the form presented in
          the previous screen and the restaurant agrees with and undertakes to fully respect the information note.
        </Box>
      </Box>
      <Box
        sx={{
          p: 4,
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <LoadingButton
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
          onClick={() => {
            dispatch(setActiveStep(2))
            dispatch(setDoneSteps({ index: 2, isDone: false }))
          }}
        >
          Back
        </LoadingButton>
        <LoadingButton
          variant='contained'
          onClick={() => {
            dispatch(setDoneSteps({ index: 3, isDone: true }))
            dispatch(setIsList(false))
          }}
        >
          Schedule
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default SendInvitation
