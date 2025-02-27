// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import { Box, Typography, TextField, LoadingButton, IconButton, Grid } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'

// Custom Imports
const CsEditor = dynamic(() => import('@/@core/components/CsEditor'), { ssr: false })
import CsAutocomplete from '@/@core/components/CsAutocomplete'
import AddImage from './AddImage'
import CsDelete from '@/@core/components/CsDelete'

// Store Imports
import { editSection } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { SectionProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import UrlHelper from '@/Helper/Url'

interface Values {
  galleryType: any
  title: string
  description: string
  images: { src: string; title: string }[]
}

const options = [
  { value: 1, title: 'Food' },
  { value: 2, title: 'Team' },
  { value: 3, title: 'Restaurant (Inside & Outside)' },
  { value: 4, title: 'Other' }
]

const Gallery = ({ onDelete, section, onCancel }: SectionProps) => {
  // State
  const [isAddImg, setIsAddImg] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })
  const [desc, setDesc] = useState<string>('')

  // Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length > 0) {
      formik.setFieldValue('galleryType', section?.galleryType ? section?.galleryType : null)
      formik.setFieldValue('title', section?.title ? section?.title : '')
      formik.setFieldValue('description', section?.description ? section?.description : '')
      formik.setFieldValue('images', section?.images ? section?.images : '')
      setDesc(section?.description)
    }
  }, [section])

  const handleClose = () => {
    formik.resetForm()
    onCancel && onCancel()
  }

  const initalValues: Values = {
    galleryType: null,
    title: '',
    description: '',
    images: []
  }

  const formik = useFormik({
    initialValues: initalValues,
    validationSchema: yup.object().shape({ title: yup.string().required(ErrorConstants.TITLE_ERROR) }),
    onSubmit: (values: Values) => {
      dispatch(editSection({ ...values, description: desc, id: section?.id }))
      handleClose()
    }
  })

  const onSave = (data: { title: string; src: string }) => {
    setIsAddImg({ open: false, row: {} })
    if (isAddImg?.row && Object?.keys(isAddImg?.row)?.length > 0) {
      formik.setFieldValue(
        'images',
        formik.values.images?.map((item: any) => (item?._id === isAddImg?.row?._id ? { ...item, ...data } : item))
      )
    } else {
      formik.setFieldValue('images', [...formik.values.images, { ...data, _id: AppUtils.randomId() }])
    }
  }

  const handleChage = (_: any, value: any) => {
    formik.setFieldValue('galleryType', value)
    formik.setFieldValue('title', value ? value?.title : '')
  }

  const handleDelete = () => {
    formik.setFieldValue(
      'images',
      formik.values.images?.filter((item: any) => item?._id !== isDelete?.id)
    )
    setIsDelete({ open: false, id: '' })
  }

  return (
    <>
      <CsAutocomplete
        sx={{ mb: 4 }}
        label={'Gallery Type'}
        placeholder='Select Gallery Type'
        options={options}
        isOptionEqualToValue={(option: any, value: any) => option.value === value?.value}
        multiple={false}
        getOptionLabel={(option: any) => option?.title || ''}
        value={formik.values.galleryType}
        onChange={handleChage}
        error={formik.touched.galleryType && Boolean(formik.errors.galleryType)}
        helperText={formik.touched.galleryType && formik.errors.galleryType && String(formik.errors.galleryType)}
      />
      <TextField
        sx={{ mb: 4 }}
        fullWidth
        label='Gallery Title'
        placeholder='Enter Gallery Title'
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
        />
      </Box>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 4,
            borderBottom: theme =>
              Array.isArray(formik.values.images) && formik.values.images?.length > 0
                ? `1px solid ${theme.palette.divider}`
                : 'none'
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '1.25rem' }}>Images</Typography>
          <LoadingButton
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={() => setIsAddImg({ open: true, row: {} })}
          >
            Add Image
          </LoadingButton>
        </Box>
        {Array.isArray(formik.values.images) && formik.values.images?.length > 0 && (
          <Grid container spacing={4} sx={{ mb: 4, mt: 0 }}>
            {formik.values.images?.map((image: any, index: number) => {
              return (
                <Grid key={index} item xs={12} sm={3}>
                  <Box
                    sx={{
                      bgcolor: theme => theme.palette.customColors.bodyBg,
                      borderRadius: '8px',
                      boxShadow: theme => theme.shadows[2],
                      backgroundImage: `url(${UrlHelper.imgPath}${image?.src?.replace(/\\/g, "/")})`,
                      backgroundSize: 'cover',
                      height: '10rem',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'end'
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '8ch'
                        }}
                      >
                        {image?.title ? image?.title : 'Title'}
                      </Typography>
                      <Box>
                        <IconButton sx={{ p: 1 }} color='info' onClick={() => setIsAddImg({ open: true, row: image })}>
                          <Icon icon={'mdi:image-edit-outline'} />
                        </IconButton>
                        <IconButton
                          sx={{ p: 1 }}
                          color='error'
                          onClick={() => setIsDelete({ open: true, id: image?._id })}
                        >
                          <Icon icon={'icon-park-twotone:delete-one'} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        )}
      </Box>
      <Box
        sx={{
          borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          pt: '1rem !important',
          justifyContent: 'space-between'
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
            onClick={handleClose}
          >
            Cancel
          </LoadingButton>
          <LoadingButton size='large' variant='contained' onClick={() => formik.handleSubmit()}>
            Save
          </LoadingButton>
        </Box>
      </Box>

      <AddImage
        open={isAddImg?.open}
        setOpen={setIsAddImg}
        row={isAddImg?.row}
        onSave={onSave}
      />

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '' })}
        label='Image'
        handleDelete={handleDelete}
      />
    </>
  )
}

export default Gallery
