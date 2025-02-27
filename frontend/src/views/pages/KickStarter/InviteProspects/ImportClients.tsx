// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Collapse from '@mui/material/Collapse'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useDropzone } from 'react-dropzone'
import { useDispatch } from 'react-redux'

// Custom Imports
import ClientsList from './ClientsList'

// Store Imports
import { setActiveStep, setDoneSteps } from '@/redux-store/InviteProspects'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'

const ImportClients = () => {
  // State
  const [file, setFile] = useState<any>(null)
  const [list, setList] = useState<string>('')
  const [preview, setPreview] = useState<boolean>(false)

  // Hooks
  const dispatch = useDispatch()

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: Constants.CSV_TYPE,
    onDrop: (acceptedFiles: any) =>
      acceptedFiles.forEach((file: File) => {
        setFile(file)
        setList(file?.name)
      })
  })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '-webkit-fill-available',
        justifyContent: 'space-between'
      }}
    >
      {!preview && (
        <Box sx={{ overflow: 'auto', height: '-webkit-fill-available', display: 'flex', width: '100%' }}>
          <Box sx={{ width: '45rem', p: 4, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>Upload your CSV file</Typography>
              <LoadingButton size='small' sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}>
                Download Sample .CSV File
              </LoadingButton>
            </Box>
            <Typography sx={{ fontWeight: 500, py: 4, fontSize: '1rem' }}>
              Export your existing clients from your current systems, save the file in CSV format, and upload it here.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'column',
                px: { md: 6, lg: 18 }
              }}
            >
              <Box
                {...getRootProps()}
                sx={{
                  border: theme => `2px dashed ${theme.palette.divider}`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  height: '12rem',
                  p: 4,
                  cursor: 'pointer'
                }}
              >
                <input {...getInputProps()} />
                <Box
                  component={Icon}
                  icon={'line-md:uploading-loop'}
                  sx={{ color: theme => theme.palette.primary.main }}
                  fontSize={40}
                />
                <Typography sx={{ mt: 2, fontWeight: 600, fontSize: '1rem' }}>
                  Drag your file here or browse for a file to upload
                </Typography>
              </Box>
              <TextField
                sx={{ my: 4 }}
                fullWidth
                label={'Name Your List'}
                value={list}
                onChange={(e: any) => setList(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon={'akar-icons:file'} />
                    </InputAdornment>
                  )
                }}
              />
              <Box sx={{ textAlign: 'center' }}>
                <LoadingButton
                  sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                  disabled={!AppUtils.checkValue(file)}
                  onClick={() => AppUtils.checkValue(file) && setPreview(true)}
                >
                  Preview
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <Collapse in={preview}>
        <ClientsList />
      </Collapse>

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
            if (!preview) {
              dispatch(setActiveStep(1))
              dispatch(setDoneSteps({ index: 1, isDone: false }))
            } else setPreview(false)
          }}
        >
          Back
        </LoadingButton>
        <LoadingButton
          variant='contained'
          onClick={() => {
            dispatch(setActiveStep(3))
            dispatch(setDoneSteps({ index: 2, isDone: true }))
          }}
        >
          Next
        </LoadingButton>
      </Box>
    </Box>
  )
}

export default ImportClients
