// React Imports
import { useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, TextField, Typography, Collapse, FormControlLabel, Switch, InputAdornment } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// Store Imports
import { editSection } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import Constants from '@/Helper/Constants'

interface Links {
  checked: boolean
  value: string
  label: string
}

interface Values {
  description: string
  getInTouchDesc: string
  links: Links[]
  isCopyRight: boolean
  copyRight: string
}

const FooterView = ({ section, onCancel }: { section: any, onCancel: () => void }) => {

  // Hooks
  const restaurant = useSelector((state: any) => state.website.website.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length > 0) {
      formik.setFieldValue('description', section?.description ?? '')
      formik.setFieldValue('getInTouchDesc', section?.getInTouchDesc ?? '')
      formik.setFieldValue('links', section?.links ?? formik.values.links)
      formik.setFieldValue('isCopyRight', section?.isCopyRight ?? false)
      formik.setFieldValue('copyRight', section?.copyRight ?? '')
    }
  }, [section])

  const defaultVlaues: Values = {
    description: '',
    getInTouchDesc: '',
    links: [
      { checked: true, value: '', label: 'Facebook' },
      { checked: true, value: '', label: 'Instagram' },
      { checked: true, value: '', label: 'Twitter' },
      { checked: true, value: '', label: 'LinkedIn' }
    ],
    isCopyRight: false,
    copyRight: ''
  }

  const schema = yup.object().shape({
    description: yup.string().required(ErrorConstants.DESCRIPTION_ERROR),
    getInTouchDesc: yup.string().required(ErrorConstants.DESCRIPTION_ERROR),
    copyRight: yup.string().test((val, context) => {
      const isCopyRight = context.parent.isCopyRight
      if (isCopyRight && !AppUtils.checkValue(val)) {
        return context.createError({ message: ErrorConstants.TEXT_ERROR })
      } else return true
    }),
    links: yup.array().of(
      yup.object().shape({
        checked: yup.boolean(),
        value: yup.string().test((val: any, context) => {
          const isLink = context.parent.checked
          if (isLink && !AppUtils.checkValue(val)) {
            return context.createError({ message: ErrorConstants.URL_ERROR })
          } else if (AppUtils.checkValue(val) && !Constants.URL_REGEX.test(val)) {
            return context.createError({ message: ErrorConstants.VALID_URL_ERROR })
          } else return true
        }),
      })
    ),
  })

  const formik: any = useFormik({
    initialValues: defaultVlaues,
    validationSchema: schema,
    onSubmit: (values: Values) => {
      dispatch(editSection({ id: section?.id, ...values }))
      onCancel()
    }
  })

  const handleSwitchChange = (index: number, checked: boolean) => {
    formik.setFieldValue(
      'links',
      formik.values.links?.map((val: Links, i: number) =>
        i === index
          ? { ...val, checked: !checked, value: !checked ? '' : val.value }
          : val
      )
    )
  }

  return (
    <>
      <Box>
        <TextField
          fullWidth
          label='Description'
          placeholder='Enter Description'
          multiline
          minRows={3}
          name='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Box sx={{ my: 4 }}>
          {Array.isArray(formik.values.links) &&
            formik.values.links?.length > 0 &&
            formik.values.links?.map((link: Links, index: number) => {
              const linkError = formik.errors.links?.[index]?.value;
              const linkTouched = formik.touched.links?.[index]?.value;

              return (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 3 }}>
                  <Box>
                    <FormControlLabel
                      sx={{ width: '8rem' }}
                      control={
                        <Switch
                          checked={link?.checked}
                          onChange={() => handleSwitchChange(index, link?.checked)}
                        />
                      }
                      label={link?.label}
                    />
                  </Box>
                  <TextField
                    disabled={!link?.checked}
                    fullWidth
                    size="small"
                    label={`${link?.label} Link`}
                    placeholder={`Enter ${link?.label} Link`}
                    value={link?.value}
                    onChange={(e: any) =>
                      link?.checked &&
                      formik.setFieldValue(
                        'links',
                        formik.values.links?.map((val: Links, i: number) =>
                          i === index ? { ...val, value: e.target.value } : val
                        )
                      )
                    }
                    error={Boolean(linkTouched && linkError)}
                    helperText={linkTouched && linkError ? linkError : ''}
                  />
                </Box>
              )
            })}
        </Box>
        <TextField
          sx={{ mb: 4 }}
          fullWidth
          label='Get In Touch Description'
          placeholder='Enter Get In Touch Description'
          multiline
          minRows={3}
          name='getInTouchDesc'
          value={formik.values.getInTouchDesc}
          onChange={formik.handleChange}
          error={formik.touched.getInTouchDesc && Boolean(formik.errors.getInTouchDesc)}
          helperText={formik.touched.getInTouchDesc && formik.errors.getInTouchDesc}
        />
        <FormControlLabel
          control={
            <Switch
              checked={formik.values.isCopyRight}
              onChange={(e: any) => formik.setFieldValue('isCopyRight', e.target.checked)}
            />
          }
          label={'CopyRight'}
        />
        <Collapse in={formik.values.isCopyRight}>
          <TextField
            sx={{ my: 4 }}
            fullWidth
            label='CopyRight'
            placeholder='Enter CopyRight'
            name='copyRight'
            value={formik.values.copyRight}
            onChange={formik.handleChange}
            error={formik.touched.copyRight && Boolean(formik.errors.copyRight)}
            helperText={formik.touched.copyRight && formik.errors.copyRight}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start' sx={{ color: theme => theme.palette.text.secondary }}>
                  <Typography sx={{ fontWeight: 500, mr: 1 }}>CopyRight </Typography>
                  <Icon icon={'mingcute:copyright-line'} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='start' sx={{ color: theme => theme.palette.text.secondary }}>
                  <Typography sx={{ fontWeight: 500 }}>{restaurant?.name}</Typography>
                </InputAdornment>
              ),
            }}
          />
        </Collapse>
      </Box>
      <Box sx={{ pt: 4, borderTop: theme => `1px solid ${theme.palette.divider}`, textAlign: 'end' }}>
        <LoadingButton variant='contained' onClick={() => formik.handleSubmit()}>
          Save
        </LoadingButton>
      </Box>
    </>
  )
}

export default FooterView
