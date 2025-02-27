'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify'

// Custom Imports
import CsDelete from '@/@core/components/CsDelete'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import Constants from '@/Helper/Constants'

const UploadFile = () => {
  // State
  const [files, setFiles] = useState<any[]>([])
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: number }>({ open: false, id: 0 })

  const Dropzone = () => {
    const { getRootProps, getInputProps } = useDropzone({
      maxSize: Constants.PDF_SIZE,
      accept: {
        // Pending for discussion
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc', '.dot'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        'application/zip': ['.zip'],
        'text/plain': ['.txt']
      },
      onDrop: (acceptedFiles: File[]) => setFiles([...files, ...acceptedFiles]),
      onDropRejected: () => toast.error('Please upload files smaller than 10MB.')
    })

    return (
      <LoadingButton
        {...getRootProps()}
        sx={{
          width: '100%',
          border: theme => `2px dashed ${theme.palette.divider}`,
          px: 4,
          py: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          borderRadius: '6px'
        }}
      >
        <input {...getInputProps()} />
        <Box
          component={Icon}
          icon={'line-md:uploading-loop'}
          fontSize={50}
          sx={{ mb: 4, color: theme => theme.palette.primary.main }}
        />
        <Typography>
          <Typography
            component={'span'}
            sx={{
              fontWeight: 700,
              textDecoration: 'underline',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'none' }
            }}
          >
            Browse{' '}
          </Typography>
          or drag a file here
        </Typography>
        <Typography sx={{ fontSize: '0.8rem' }}>10MB Max File Size</Typography>
      </LoadingButton>
    )
  }

  return (
    <>
      <Box>
        <Typography sx={{ fontWeight: 700 }}>Upload your files</Typography>
        <Typography sx={{ my: 4 }}>This service has a $40.00 fee per request.</Typography>
        <Box
          sx={{
            borderLeft: theme => `2px solid ${theme.palette.warning.main}`,
            bgcolor: theme => theme.palette.warning.lightOpacity,
            p: 4
          }}
        >
          <Typography sx={{ fontSize: '0.8rem' }}>
            We accept all files format but those that allow us to copy & paste the text will significantly decrease the
            time until your menu will be uploaded.
          </Typography>
        </Box>
        <Box sx={{ mt: 6 }}>
          <Dropzone />
        </Box>
        <Box sx={{ mt: 4 }}>
          {Array.isArray(files) && files?.length > 0 && (
            <Box>
              <Typography sx={{ fontWeight: 700, mb: 2 }}>Uploaded Files:</Typography>
              {files?.map((item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: theme => `1px solid ${theme.palette.divider}`,
                      borderRadius: '6px',
                      p: 2,
                      mb: 4
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box component={Icon} icon={'ant-design:file-twotone'} fontSize={30} />
                      <Box sx={{ ml: 2 }}>
                        <Typography sx={{ fontSize: '1rem' }}>{item?.name}</Typography>
                        <Typography sx={{ fontSize: '0.8rem' }}>{AppUtils.getFileSize(item?.size)}</Typography>
                      </Box>
                    </Box>
                    <IconButton color='error' size='large' onClick={() => setIsDelete({ open: true, id: index })}>
                      <Icon icon={'mingcute:delete-2-line'} />
                    </IconButton>
                  </Box>
                )
              })}
            </Box>
          )}
        </Box>
      </Box>

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: 0 })}
        label='File'
        handleDelete={() => {
          setFiles(files?.filter((val: any, i: number) => i !== isDelete?.id))
          setIsDelete({ open: false, id: 0 })
        }}
      />
    </>
  )
}

export default UploadFile
