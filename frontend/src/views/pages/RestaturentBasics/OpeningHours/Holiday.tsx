// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, LoadingButton, Typography, Divider, TextField, InputAdornment, Grid } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import AffectedServices from './AffectedServices'
import CsDatePicker from '@/@core/components/CsDatePicker'
import HolidayDisplay from './HolidayDisplay'

// Store Imports
import { managePauseServices } from '@/redux-store/RestaurantsServiceSchedules/Action'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

export interface Value {
  name: string
  start_date: any
  end_date: any
  service_type: string
  hours: any[]
  message: string
  is_opened: boolean
  is_service: boolean
  intervals: any[]
}

const Services = [
  'All services',
  'Opening hours',
  'Pickup service',
  'Delivery service',
  'Table reservation',
  'On premise'
]
interface Props {
  isFormShow: { type: string, show: boolean }
  setIsFormShow: (state: { type: string; show: boolean }) => void
}

const Holiday = (props: Props) => {

  // Props
  const { isFormShow, setIsFormShow } = props;

  // State
  const [formData, setFormData] = useState<any>({});
  const [edit, isEdit] = useState<boolean>(false);

  // Hooks
  const dispatch = useDispatch();
  const { pauseServices } = useSelector((state: any) => state.service_schedules)
  const { restaurant } = useSelector((state: any) => state.restaurant)

  useEffect(() =>
    setIsFormShow({ type: "ADD", show: false })
    , [])

  useEffect(() => {
    if (Object.entries(formData)?.length > 0) {
      formik.setFieldValue("name", formData?.name)
      formik.setFieldValue("start_date", formData?.start_date)
      formik.setFieldValue("end_date", formData?.end_date)
      formik.setFieldValue("message", formData?.message)
      formik.setFieldValue(
        "intervals",
        formData?.intervals?.map((interval: any) => ({
          ...interval,
          hours: interval?.hours?.map((hour: any) => ({
            ...hour,
            start_time: new Date(hour?.start_time).toString(),
            end_time: new Date(hour?.end_time).toString()
          })),
        }))
      );
    }
  }, [formData])

  // Helper Functions
  const convertToUnixTimestamps = () => {
    const updatedIntervals = formik?.values?.intervals?.map(({ _id, hours, ...intervalRest }) => {
      const updatedHours = hours?.map(({ _id, ...hourRest }: any) => {
        return {
          ...hourRest,
          start_time: new Date(hourRest?.start_time).getTime(),
          end_time: new Date(hourRest?.end_time).getTime(),
        };
      });

      return {
        ...intervalRest,
        hours: updatedHours,
      };
    });
    return updatedIntervals;
  };

  //Helper Functions
  const handleEditFormData = (service: any, value: boolean) => {
    setFormData(service);
    isEdit(value)
  };

  const handleCancel = () => {
    formik.resetForm()
    setIsFormShow({ type: "ADD", show: false })
    isEdit(false)
  }

  const values: Value = {
    name: '',
    start_date: null,
    end_date: null,
    service_type: 'All services',
    message: '',
    hours: [],
    is_opened: false,
    is_service: false,
    intervals: []
  }

  const schema = yup.object().shape({
    name: yup.string().required(`${ErrorConstants.NAME_ERROR} for special day / holiday`),
    start_date: yup.mixed().nullable().required(ErrorConstants.DATE_ERROR.replace('{name}', 'start')),
    end_date: yup.mixed().nullable().required(ErrorConstants.DATE_ERROR.replace('{name}', 'end')),
    service_type: yup.string(),
    message: yup.string(),
    hours: yup.array(),
    intervals: yup.array()
  })

  const formik = useFormik({
    initialValues: values,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values: Value) => {
      dispatch(managePauseServices({
        data: {
          restaurant_id: restaurant?._id,
          start_date: new Date(values.start_date).getTime(),
          end_date: new Date(values.end_date).getTime(),
          name: values.name,
          message: values.message,
          type: "temporary",
          intervals: convertToUnixTimestamps(),
          ...(edit && formData._id && { id: formData._id })
        },
        old_pause_services_data: { ...pauseServices }
      }))
      edit && isEdit(false)
      formik.resetForm();
      setIsFormShow({ type: "ADD", show: false })
    }
  })

  const holidayServices = Services.filter(
    (service) => !formik.values.intervals.some((interval: any) => interval.type === service)
  );

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {isFormShow?.show ? (
        <>
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 3,
              pt: 2,
              pb: 2,
            }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TextField
                  sx={{ px: 0.1 }}
                  fullWidth
                  label="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  inputProps={{ maxLength: 25 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography>{formik.values.name?.length} / 25</Typography>
                      </InputAdornment>
                    ),
                  }}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CsDatePicker
                  minDate={new Date()}
                  autoComplete="off"
                  size="medium"
                  label={'Select Start Date'}
                  placeholderText="Select Start Date"
                  name="start_date"
                  selected={formik.values.start_date}
                  onChange={(date: any) => formik.setFieldValue('start_date', date)}
                  error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                  helperText={formik.touched.start_date && formik.errors.start_date}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CsDatePicker
                  autoComplete="off"
                  minDate={formik.values.start_date}
                  size="medium"
                  label={'Select End Date'}
                  placeholderText="Select End Date"
                  name="end_date"
                  selected={formik.values.end_date}
                  onChange={(date: any) => formik.setFieldValue('end_date', date)}
                  error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                  helperText={formik.touched.end_date && formik.errors.end_date}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>Affected services</Typography>
                <AffectedServices options={holidayServices} formik={formik} isFormShow={isFormShow} />
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Notification message (optional)"
                  name="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  error={formik.touched.message && Boolean(formik.errors.message)}
                  helperText={formik.touched.message && formik.errors.message}
                  inputProps={{ maxLength: 200 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography>{formik.values?.message?.length} / 200</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              position: 'sticky',
              bottom: 0,
              background: 'white',
              zIndex: 10,
              p: 4,
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'end',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <LoadingButton
              size="large"
              sx={{ mb: { xs: 2.5, sm: 0 }, mr: { sm: 2.5 } }}
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </LoadingButton>
            <LoadingButton
              disabled={formik.values.intervals?.length > 0 ? false : true}
              size="large"
              sx={{ mt: { xs: 2.5, sm: 0 }, ml: { sm: 2.5 } }}
              variant="contained"
              onClick={() => formik.handleSubmit()}
            >
              {edit ? 'Update' : 'Save'}
            </LoadingButton>
          </Box>
        </>
      ) : (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
          <HolidayDisplay setIsFormShow={setIsFormShow} editFormData={handleEditFormData} />
        </Box>
      )}
    </Box>
  )
}

export default Holiday
