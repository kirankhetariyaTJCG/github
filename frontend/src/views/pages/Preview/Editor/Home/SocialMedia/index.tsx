// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import { Box, TextField, InputAdornment, Grid, LoadingButton } from '@/Helper/MUIImports'

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
import type { SectionProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Values {
  instagramLink: string
  pinterestLink: string
  youtubeLink: string
  facebookLink: string
  twitterLink: string
  tiktokLink: string
  linkedinLink: string
  description: string
}

const SocialMedia = ({ onDelete, section, onCancel }: SectionProps) => {
  // State
  const [desc, setDesc] = useState<string>('')

  // Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length) {
      formik.setFieldValue('instagramLink', section?.instagramLink ?? '')
      formik.setFieldValue('pinterestLink', section?.pinterestLink ?? '')
      formik.setFieldValue('youtubeLink', section?.youtubeLink ?? '')
      formik.setFieldValue('facebookLink', section?.facebookLink ?? '')
      formik.setFieldValue('twitterLink', section?.twitterLink ?? '')
      formik.setFieldValue('tiktokLink', section?.tiktokLink ?? '')
      formik.setFieldValue('linkedinLink', section?.linkedinLink ?? '')
      formik.setFieldValue('description', section?.description ?? '')
      setDesc(section?.description)
    }
  }, [section])

  const defaultValues: Values = {
    instagramLink: '',
    pinterestLink: '',
    youtubeLink: '',
    facebookLink: '',
    twitterLink: '',
    tiktokLink: '',
    linkedinLink: '',
    description: ''
  }

  const createSocialLinkSchema = (platform: string) =>
    yup
      .string()
      .required(ErrorConstants.LINK_ERROR.replace('{name}', platform))
      .url(ErrorConstants.VALID_URL_ERROR)

  const schema = yup.object({
    instagramLink: createSocialLinkSchema('instagram'),
    pinterestLink: createSocialLinkSchema('pinterest'),
    youtubeLink: createSocialLinkSchema('youtube'),
    facebookLink: createSocialLinkSchema('facebook'),
    twitterLink: createSocialLinkSchema('x'),
    tiktokLink: createSocialLinkSchema('tiktok'),
    linkedinLink: createSocialLinkSchema('linkedin'),
  })


  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: schema,
    onSubmit: (values: Values) => {
      dispatch(editSection({ id: section?.id, ...values, description: desc }))
      handleReset()
    }
  })

  const handleReset = () => {
    formik.resetForm()
    onCancel && onCancel()
    setDesc('')
  }

  const getInputProps = (icon: string) => ({
    endAdornment: (
      <InputAdornment position="end">
        <Icon icon={icon} />
      </InputAdornment>
    )
  })

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Facebook Link'
            placeholder='Enter Facebook Link'
            name='facebookLink'
            value={formik.values.facebookLink}
            onChange={formik.handleChange}
            error={formik.touched.facebookLink && Boolean(formik.errors.facebookLink)}
            helperText={formik.touched.facebookLink && formik.errors.facebookLink}
            InputProps={getInputProps('fa6-brands:facebook')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Twitter Link'
            placeholder='Enter Twitter Link'
            name='twitterLink'
            value={formik.values.twitterLink}
            onChange={formik.handleChange}
            error={formik.touched.twitterLink && Boolean(formik.errors.twitterLink)}
            helperText={formik.touched.twitterLink && formik.errors.twitterLink}
            InputProps={getInputProps('ri:twitter-x-line')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Pinterest Link'
            placeholder='Enter Pinterest Link'
            name='pinterestLink'
            value={formik.values.pinterestLink}
            onChange={formik.handleChange}
            error={formik.touched.pinterestLink && Boolean(formik.errors.pinterestLink)}
            helperText={formik.touched.pinterestLink && formik.errors.pinterestLink}
            InputProps={getInputProps('simple-icons:pinterest')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Youtube Link'
            placeholder='Enter Youtube Link'
            name='youtubeLink'
            value={formik.values.youtubeLink}
            onChange={formik.handleChange}
            error={formik.touched.youtubeLink && Boolean(formik.errors.youtubeLink)}
            helperText={formik.touched.youtubeLink && formik.errors.youtubeLink}
            InputProps={getInputProps('uil:youtube')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Instagram Link'
            placeholder='Enter Instagram Link'
            name='instagramLink'
            value={formik.values.instagramLink}
            onChange={formik.handleChange}
            error={formik.touched.instagramLink && Boolean(formik.errors.instagramLink)}
            helperText={formik.touched.instagramLink && formik.errors.instagramLink}
            InputProps={getInputProps('bi:instagram')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Tik Tok Link'
            placeholder='Enter Tik Tok Link'
            name='tiktokLink'
            value={formik.values.tiktokLink}
            onChange={formik.handleChange}
            error={formik.touched.tiktokLink && Boolean(formik.errors.tiktokLink)}
            helperText={formik.touched.tiktokLink && formik.errors.tiktokLink}
            InputProps={getInputProps('cib:tiktok')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Linkedin Link'
            placeholder='Enter Linkedin Link'
            name='linkedinLink'
            value={formik.values.linkedinLink}
            onChange={formik.handleChange}
            error={formik.touched.linkedinLink && Boolean(formik.errors.linkedinLink)}
            helperText={formik.touched.linkedinLink && formik.errors.linkedinLink}
            InputProps={getInputProps('uiw:linkedin')}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mb: 4 }}>
            <CsEditor
              label='Description'
              height={200}
              value={desc}
              setValue={setDesc}
              toolbar={true}
              formik={formik}
              fieldName='description'
              isTemplate={true}
            />
          </Box>
        </Grid>
      </Grid>
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

export default SocialMedia
