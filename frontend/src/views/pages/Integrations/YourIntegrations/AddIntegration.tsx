// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Collapse from '@mui/material/Collapse'
import InputAdornment from '@mui/material/InputAdornment'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useFormik } from 'formik'

// Custom Imports
import CsTextField from '@/@core/components/CsTextField'
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Value {
  template: any
  API_type: any
  protocol: any
  protocol_version: any
  url: string
  master_key: string
  restaurent_token: string
  order_type: any[]
  deliveryzone: number
  is_outside: boolean
  order_status: any[]
  frequency: number
  email: string
}

const AddIntegration = (props: ModelProps) => {
  // Props
  const { open, setOpen, row } = props

  const initialValues: Value = {
    template: null,
    API_type: null,
    protocol: null,
    protocol_version: null,
    url: '',
    master_key: '',
    restaurent_token: '',
    order_type: [
      { label: 'Pickup', checked: false },
      { label: 'Delivery', checked: false },
      { label: 'Table Reservation', checked: false },
      { label: 'Order Ahead', checked: false },
      { label: 'Dine-in', checked: false }
    ],
    deliveryzone: 1,
    is_outside: false,
    order_status: [
      { label: 'Accepted', checked: false },
      { label: 'Rejected', checked: false },
      { label: 'Missed', checked: false },
      { label: 'Pending', checked: false },
      { label: 'Canceled', checked: false }
    ],
    frequency: 1,
    email: ''
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (value: Value) => console.log('Value --> ', value)
  })

  return (
    <Dialog open={open} maxWidth='md'>
      <DialogTitle
        sx={{
          p: 4,
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Custom Integration</Typography>
        <IconButton onClick={() => setOpen({ open: false, row: {} })}>
          <Icon icon={'gg:close-o'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
        <CsAutocomplete
          sx={{ mb: 6 }}
          label={'Template'}
          options={[
            { label: 'Manual', value: 1 },
            { label: 'Push Accepted Orders', value: 2 },
            { label: 'Poll Accepted Orders V2', value: 3 },
            { label: 'TK White Label Delivery Tracking', value: 4 },
            { label: 'TK White Label Delivery Tracking', value: 5 },
            { label: 'Fetch Menu', value: 6 }
          ]}
          isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
          multiple={false}
          getOptionLabel={(option: any) => option?.label || ''}
          value={formik.values.template}
          onChange={(e: any, value: any) => formik.setFieldValue('template', value)}
          error={formik.touched.template && Boolean(formik.errors.template)}
          helperText={formik.touched.template && formik.errors.template && String(formik.errors.template)}
        />
        <CsAutocomplete
          sx={{ mb: 6 }}
          label={'API Type'}
          options={[
            { label: 'Accepted Orders API', value: 1 },
            { label: 'Fetch Menu API', value: 2 },
            { label: 'Payments API', value: 3 }
          ]}
          isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
          multiple={false}
          getOptionLabel={(option: any) => option?.label || ''}
          value={formik.values.API_type}
          onChange={(e: any, value: any) => formik.setFieldValue('API_type', value)}
          error={formik.touched.API_type && Boolean(formik.errors.API_type)}
          helperText={formik.touched.API_type && formik.errors.API_type && String(formik.errors.API_type)}
        />
        <CsAutocomplete
          sx={{ mb: 6 }}
          label={'Protocol'}
          options={[
            { label: 'JSON', value: 1 },
            { label: 'XML', value: 2 }
          ]}
          isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
          multiple={false}
          getOptionLabel={(option: any) => option?.label || ''}
          value={formik.values.protocol}
          onChange={(e: any, value: any) => formik.setFieldValue('protocol', value)}
          error={formik.touched.protocol && Boolean(formik.errors.protocol)}
          helperText={formik.touched.protocol && formik.errors.protocol && String(formik.errors.protocol)}
        />
        <CsAutocomplete
          sx={{ mb: 6 }}
          label={'Protocol Version'}
          options={[
            { label: 'Version 2', value: 2 },
            { label: 'Version 1', value: 1 }
          ]}
          isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
          multiple={false}
          getOptionLabel={(option: any) => option?.label || ''}
          value={formik.values.protocol_version}
          onChange={(e: any, value: any) => formik.setFieldValue('protocol_version', value)}
          error={formik.touched.protocol_version && Boolean(formik.errors.protocol_version)}
          helperText={
            formik.touched.protocol_version && formik.errors.protocol_version && String(formik.errors.protocol_version)
          }
        />
        <CsTextField
          sx={{ width: '100%', mb: 6 }}
          fullWidth
          label='Endpoint URL'
          name='url'
          value={formik.values.url}
          onChange={formik.handleChange}
          error={formik.touched.url && Boolean(formik.errors.url)}
          helperText={formik.touched.url && formik.errors.url}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip title='The endpoint URL on your side used for all calls.' arrow>
                  <IconButton sx={{ p: 0 }}>
                    <Icon icon={'akar-icons:info'} />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 700 }}>Authentication keys</Typography>
          <LoadingButton
            size='small'
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, py: 1 }}
            onClick={() => formik.setFieldValue('master_key', AppUtils.randomId())}
          >
            Generate
          </LoadingButton>
        </Box>
        <CsTextField
          sx={{ width: '100%', mb: 6 }}
          fullWidth
          label={'Master Key'}
          placeholder='Enter Master Key'
          name='master_key'
          value={formik.values.master_key}
          onChange={formik.handleChange}
          error={formik.touched.master_key && Boolean(formik.errors.master_key)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip
                  title='This is a secret token that you provide. We will include this is all transactions. It will help you to distinguish real from fake calls. Although this key is mandatory you may completely ignore it on your side if you don’t need it.'
                  arrow
                >
                  <IconButton sx={{ p: 0 }}>
                    <Icon icon={'akar-icons:info'} />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 700 }}>Custom Fields</Typography>
          <LoadingButton
            size='small'
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, py: 1 }}
            onClick={() => formik.setFieldValue('restaurent_token', AppUtils.randomId())}
          >
            Generate
          </LoadingButton>
        </Box>
        <CsTextField
          sx={{ width: '100%', mb: 6 }}
          fullWidth
          label={'Restaurent Token'}
          placeholder='Enter Restaurent Token'
          name='restaurent_token'
          value={formik.values.restaurent_token}
          onChange={formik.handleChange}
          error={formik.touched.restaurent_token && Boolean(formik.errors.restaurent_token)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Tooltip
                  title="This is a token provided by you or the system you would like to integrate with. It will help you to distinguish between each restaurant location. We'll include it in all calls."
                  arrow
                >
                  <IconButton sx={{ p: 0 }}>
                    <Icon icon={'akar-icons:info'} />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
        />
        <Box sx={{ mb: 6 }}>
          <Typography sx={{ fontWeight: 700, mb: 2 }}>Order Type</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, mb: 2 }}>
            {Array.isArray(formik.values.order_type) &&
              formik.values.order_type?.length > 0 &&
              formik.values.order_type?.map((item: any, index: number) => {
                return (
                  <Box
                    key={index}
                    sx={{ border: theme => `2px solid ${theme.palette.divider}`, borderRadius: '6px', px: 2 }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item?.checked}
                          onChange={() =>
                            formik.setFieldValue(
                              'order_type',
                              formik.values.order_type?.map((val: any, i: number) =>
                                i === index ? { ...val, checked: !item?.checked } : { ...val }
                              )
                            )
                          }
                        />
                      }
                      label={item?.label}
                    />
                  </Box>
                )
              })}
          </Box>
          <RadioGroup
            value={formik.values.deliveryzone}
            onChange={(e: any) => formik.setFieldValue('deliveryzone', Number(e.target.value))}
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label='Default / All delivery zones (best selection for most)'
            />
            <FormControlLabel value={2} control={<Radio />} label='Custom Selection' />
          </RadioGroup>
          <Collapse in={formik.values.deliveryzone === 2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.is_outside}
                  onChange={() => formik.setFieldValue('is_outside', !formik.values.is_outside)}
                />
              }
              label='Orders outside delivery zones'
            />
          </Collapse>
        </Box>
        <Box sx={{ mb: 6 }}>
          <Typography sx={{ fontWeight: 700, mb: 2 }}>Order Status</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
            {Array.isArray(formik.values.order_status) &&
              formik.values.order_status?.length > 0 &&
              formik.values.order_status?.map((item: any, index: number) => {
                return (
                  <Box sx={{ border: theme => `2px solid ${theme.palette.divider}`, borderRadius: '6px', px: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item?.checked}
                          onChange={() =>
                            formik.setFieldValue(
                              'order_status',
                              formik.values.order_status?.map((val: any, i: number) =>
                                i === index ? { ...val, checked: !item?.checked } : { ...val }
                              )
                            )
                          }
                        />
                      }
                      label={item?.label}
                    />
                  </Box>
                )
              })}
          </Box>
        </Box>
        <Box sx={{ mb: 6 }}>
          <Typography sx={{ fontWeight: 700, mb: 2 }}>Frequency</Typography>
          <RadioGroup
            value={formik.values.frequency}
            onChange={(e: any) => formik.setFieldValue('frequency', Number(e.target.value))}
          >
            <FormControlLabel value={1} control={<Radio />} label='Send once, when the order is accepted' />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControlLabel value={2} control={<Radio />} label='Send every time an order is updated' />
              <Tooltip
                title='By checking this option, the API will send updates that are made to an existing order, for example when an order is marked as ready by the restaurant. Make sure the integration system does not consider these updates as new orders.'
                arrow
              >
                <IconButton sx={{ p: 0 }}>
                  <Icon icon={'akar-icons:info'} />
                </IconButton>
              </Tooltip>
            </Box>
          </RadioGroup>
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, mb: 2 }}>API Vendor Contact Email</Typography>
          <CsTextField
            sx={{ width: '100%' }}
            fullWidth
            label={'Email'}
            placeholder='Enter Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip
                    title='Contact email of the API owner. In case food-clients ask to have their personal details forgotten we will send a notification to this email address.'
                    arrow
                  >
                    <IconButton sx={{ p: 0 }}>
                      <Icon icon={'akar-icons:info'} />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 4,
          pt: '1rem !important',
          borderTop: theme => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <LoadingButton
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, mr: { xs: 0, sm: 2.5 }, mb: { xs: 2.5, sm: 0 } }}
          onClick={() => setOpen({ open: false, row: {} })}
        >
          Cancel
        </LoadingButton>
        <LoadingButton
          variant='contained'
          sx={{ ml: { xs: '0 !important', sm: 2.5 }, mt: { xs: 2.5, sm: 0 } }}
          onClick={() => setOpen({ open: false, row: {} })}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default AddIntegration
