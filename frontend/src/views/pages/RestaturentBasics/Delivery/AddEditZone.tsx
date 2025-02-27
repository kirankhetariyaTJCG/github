// React Imports
import { useState } from 'react'

// MUI Imoprts
import { Box, InputAdornment, LoadingButton, TextField, Button, ButtonGroup, Grid, Typography } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import CsColorPicker from '@/@core/components/CsColorPicker'

// Store Imports
import { updateZoneArr, setReloadKey } from '@/redux-store/Delivery'
import { editDeliveryZone } from '@/redux-store/Delivery/Action'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Values {
  zoneType: number
  color: string
  name: string
  minimumOrder: number
  deliveryFee: number
}

const AddEditZone = (props: { item?: any }) => {
  // Props
  const { item } = props

  // State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // Hooks
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const loading = useSelector((state: any) => state.delivery.loading)
  const dispatch = useDispatch()

  const values: Values = {
    zoneType: item?.zone_type || 1,
    color: item?.color || '',
    name: item?.name || 'Zone',
    minimumOrder: item?.minimum_order ?? 0,
    deliveryFee: item?.delivery_fee ?? 0,
  }

  const schema = yup.object().shape({
    color: yup.string().required(ErrorConstants.COLOR_ERROR),
    name: yup.string().required(ErrorConstants.NAME_ERROR)
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    onSubmit: (value: Values) => {
      const payload = {
        id: item?._id,
        color: value?.color,
        delivery_fee: value?.deliveryFee,
        minimum_order: value?.minimumOrder,
        name: value?.name,
        restaurant_id: restaurant?._id,
        shape_json: item?.shape_json,
        zone_type: value?.zoneType,
      }
      dispatch(editDeliveryZone(payload))
      dispatch(setReloadKey())
    }
  })

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value.replace(/[^0-9]/g, ''));
    formik.setFieldValue(field, value);
  };

  const handleZoneType = (type: number) => {
    dispatch(updateZoneArr({ _id: item?._id, isDraw: true, zone_type: type }))
    formik.setFieldValue('zoneType', type)
  }

  return (
    <>
      <Box sx={{ mt: 2, py: 2, px: 3, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'end', my: 4 }}>
          <ButtonGroup size='small' sx={{ border: theme => `1px solid ${theme.palette.divider}`, width: '100%' }}>
            <Button
              fullWidth
              variant={formik.values.zoneType === 1 ? 'contained' : 'outlined'}
              onClick={() => handleZoneType(1)}
            >
              Circle
            </Button>
            <Button
              fullWidth
              variant={formik.values.zoneType === 2 ? 'contained' : 'outlined'}
              onClick={() => handleZoneType(2)}
            >
              Shape
            </Button>
          </ButtonGroup>
        </Box>
        <Grid container rowSpacing={5}>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <Typography>Color:</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              value={formik.values.color}
              name='color'
              size='small'
              onChange={formik.handleChange}
              error={formik.touched.color && Boolean(formik.errors.color)}
              helperText={formik.touched.color && formik.errors.color}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Box
                      sx={{
                        height: '1.2rem',
                        width: '1.2rem',
                        bgcolor: formik.values.color,
                        borderRadius: '0.3125rem',
                        border: theme => `1px solid ${theme.palette.divider}`,
                        cursor: 'pointer'
                      }}
                      onClick={(event: any) => setAnchorEl(event.currentTarget)}
                    >
                      &nbsp;
                    </Box>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <Typography>Name:</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size='small'
              fullWidth
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <Typography>Minimum Amount:</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size='small'
              fullWidth
              name='minimumOrder'
              value={formik.values.minimumOrder}
              onChange={handleChange('minimumOrder')}
              error={formik.touched.minimumOrder && Boolean(formik.errors.minimumOrder)}
              helperText={formik.touched.minimumOrder && formik.errors.minimumOrder}
              InputProps={{ endAdornment: <InputAdornment position='end'>USD</InputAdornment> }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <Typography>Delivery Fee:</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size='small'
              fullWidth
              name='deliveryFee'
              value={formik.values.deliveryFee}
              onChange={handleChange('deliveryFee')}
              error={formik.touched.deliveryFee && Boolean(formik.errors.deliveryFee)}
              helperText={formik.touched.deliveryFee && formik.errors.deliveryFee}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography>USD</Typography>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}></Box>
          <LoadingButton
            variant='contained'
            loading={loading}
            loadingPosition='start'
            startIcon={loading ? <>&nbsp;</> : <></>}
            onClick={() => formik.handleSubmit()}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>

      <CsColorPicker
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        showHex={false}
        handleClose={() => setAnchorEl(null)}
        color={formik.values.color}
        showSwatch={false}
        onChange={(e: any) => formik.setFieldValue('color', e)}
      />
    </>
  )
}

export default AddEditZone
