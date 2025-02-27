// React Imports
import { useEffect } from 'react'

// MUI Imports
import { styled } from '@mui/material'
import type { DialogProps } from '@/types'
import { Box, LoadingButton, Dialog, DialogTitle, Typography, IconButton, DialogContent, Paper } from '@/Helper/MUIImports'

// Third party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Store Imports
import { addSection } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import { DEFAULT_WEBSITE_SECTION_DATA } from '@/Helper/Constants/WebsiteEditor'
import AppUtils from '@/Helper/AppUtils'

const StyledPaper = styled(Paper)({ maxHeight: 200, overflow: 'auto' })

const options: { type: string, name: string }[] = [
  { type: 'PROMOTION', name: 'Special Offers' },
  { type: 'ABOUT', name: 'About' },
  { type: 'OPENING_HOURS', name: 'Opening hours' },
  { type: 'ANNOUNCEMENT', name: 'Announcement' },
  { type: 'DELIVERY_ZONE', name: 'Delivery Zones' },
  { type: 'GALLERY', name: 'Gallery' },
  { type: 'JOBS', name: 'Jobs' },
  { type: 'AWARDS', name: 'Awards & Badges' },
  { type: 'PORTALS', name: 'Review Portals' },
  { type: 'SOCIAL_MEDIA', name: 'Social Media' },
  { type: 'CERTIFICATES', name: 'Certificates' },
  { type: 'IMPORTANT_ANNOUNCEMENT', name: 'Important Announcement' },
  { type: 'VIDEO', name: 'Video' },
  { type: 'ARTICLE', name: 'Article' }
]

const AddSection = (props: DialogProps) => {
  // Props
  const { open, setOpen } = props

  // Hooks
  const sections = useSelector((state: any) => state.website.website.temp_section)
  const dispatch = useDispatch()
  const filteredOptions = sections
    ? options.filter(option => !(sections.some((section: any) => section.type === option.type) && option.type !== "GALLERY"))
    : [];

  useEffect(() => {
    if (Array.isArray(filteredOptions) && filteredOptions?.length > 0) {
      formik.setFieldValue('value', filteredOptions[0])
    }
  }, [open])

  const formik = useFormik({
    initialValues: { value: null },
    validationSchema: yup.object().shape({ value: yup.mixed().required('Please select section') }),
    onSubmit: (values: { value: any }) => {
      dispatch(addSection({ id: AppUtils.randomId(), type: values?.value?.type, ...DEFAULT_WEBSITE_SECTION_DATA[values?.value?.type] }))
      handleClose()
    },
  })

  const handleClose = () => {
    setOpen(false)
    formik.resetForm()
  }

  return (
    <Dialog open={open} maxWidth='md'>
      <DialogTitle
        sx={{
          px: 4,
          py: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Add Section</Typography>
        <IconButton onClick={handleClose}>
          <Icon icon={'mdi:close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, pt: '1rem !important', width: '30rem' }}>
        <Box component={'form'} noValidate onSubmit={formik.handleSubmit}>
          <CsAutocomplete
            sx={{ mb: 4, p: 4 }}
            autoFocus={true}
            PaperComponent={props => <StyledPaper {...props} />}
            label='Select Section'
            placeholder='Select Section'
            options={filteredOptions}
            isOptionEqualToValue={(option: any, value: any) => option.type === value.type}
            multiple={false}
            getOptionLabel={(option: any) => option?.name || ''}
            value={formik.values.value}
            onChange={(e: any, value: any) => formik.setFieldValue('value', value)}
            error={formik.touched.value && Boolean(formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
          />
          <Box
            sx={{
              p: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: theme => `1px solid ${theme.palette.divider}`
            }}
          >
            <LoadingButton sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }} onClick={handleClose}>
              Cancel
            </LoadingButton>
            <LoadingButton variant='contained' type='submit'>
              Save
            </LoadingButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default AddSection
