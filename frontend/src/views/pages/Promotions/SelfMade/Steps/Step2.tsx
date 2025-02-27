// MUI Imports
import { Box, Typography, TextField, InputAdornment, FormControlLabel, Checkbox, Collapse } from '@/Helper/MUIImports'

// Third Party Imports
import { FormikProps } from 'formik'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import Constants from '@/Helper/Constants'

// Type Imports
import { Step2Values } from '../AddEditPromo'

const Step2 = (props: { formik: FormikProps<Step2Values> }) => {
  // Props
  const { formik } = props

  return (
    <Box>
      <TextField
        fullWidth
        sx={{ mb: 6 }}
        label={'Discount'}
        placeholder='Enter Discount'
        name='max_discount'
        value={formik.values.max_discount}
        onChange={(e: any) => {
          if (Constants.DISCOUNT_REGEX.test(e.currentTarget.value)) {
            formik.handleChange(e)
          }
        }}
        error={formik.touched.max_discount && Boolean(formik.errors.max_discount)}
        helperText={formik.touched.max_discount && formik.errors.max_discount}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon={'tabler:circle-dashed-percentage'} />
            </InputAdornment>
          )
        }}
      />
      <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Minimum Order Amount</Typography>
      <FormControlLabel
        sx={{ mb: 4 }}
        control={
          <Checkbox
            checked={formik.values.is_minimum}
            onChange={() => {
              formik.setFieldValue('is_minimum', !formik.values.is_minimum)
              formik.values.is_minimum && formik.setFieldValue('usage_maximum', 0)
            }}
          />
        }
        label='Set a maximum order value (recommended)'
      />
      <Collapse in={formik.values.is_minimum}>
        <TextField
          fullWidth
          sx={{ mb: 6 }}
          label={'Minimum Amount'}
          placeholder='Enter Minimum Amount'
          name='usage_maximum'
          value={formik.values.usage_maximum}
          onChange={e => formik.setFieldValue('usage_maximum', Number(e.target.value.replace(Constants.NO_REGEX, '')))}
          error={formik.touched.usage_maximum && Boolean(formik.errors.usage_maximum)}
          helperText={formik.touched.usage_maximum && formik.errors.usage_maximum}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Typography>USD</Typography>
              </InputAdornment>
            )
          }}
        />
      </Collapse>
    </Box>
  )
}

export default Step2
