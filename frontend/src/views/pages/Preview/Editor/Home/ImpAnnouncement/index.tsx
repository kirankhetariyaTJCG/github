// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import { Box, TextField, LoadingButton } from '@/Helper/MUIImports'

// Third party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'

// Custom Imports
const CsEditor = dynamic(() => import('@/@core/components/CsEditor'), { ssr: false })

// Store Imports
import { editSection } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { EditorCommonTypes, SectionProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const ImpAnnouncement = ({ onDelete, section, onCancel }: SectionProps) => {
  // State
  const [desc, setDesc] = useState<string>('')

  // Hooks
  const dispatch = useDispatch()

  const defaultValues: EditorCommonTypes = { title: '', desc: '' }

  const schema = yup.object({ title: yup.string().required('Please enter title') })

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: schema,
    onSubmit: (values: EditorCommonTypes) => {
      dispatch(editSection({ id: section?.id, description: desc, title: values?.title }))
      handleReset()
    }
  })

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length > 0) {
      formik.setFieldValue('title', section?.title ?? '')
      formik.setFieldValue('description', section?.description ?? '')
      setDesc(section?.description ?? '')
    }
  }, [section])

  const handleReset = () => {
    formik.resetForm()
    onCancel && onCancel()
    setDesc('')
  }

  return (
    <>
      <TextField
        sx={{ mb: 4 }}
        fullWidth
        label='Title'
        placeholder='Enter Title'
        name='title'
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <Box sx={{ mb: 4 }}>
        <CsEditor
          label='Description'
          height={200}
          value={desc}
          setValue={setDesc}
          toolbar={true}
          formik={formik}
          fieldName='desc'
          isTemplate={true}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
          pt: 4
        }}
      >
        <LoadingButton variant='contained' onClick={onDelete}>
          <Icon icon={'ic:twotone-delete'} style={{ fontSize: 20, marginRight: 6 }} />
          Delete
        </LoadingButton>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <LoadingButton
            size='large'
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={handleReset}
          >
            Cancel
          </LoadingButton>
          <LoadingButton size='large' variant='contained' onClick={() => formik.handleSubmit()}>
            Save
          </LoadingButton>
        </Box>
      </Box>
    </>
  )
}

export default ImpAnnouncement
