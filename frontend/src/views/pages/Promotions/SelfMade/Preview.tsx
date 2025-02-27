// React Imports
import { useState } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import Collapse from '@mui/material/Collapse'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'

// Custom Imports
import CsTimePicker from '@/@core/components/TimePicker'
import CsDatePicker from '@/@core/components/CsDatePicker'
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { DialogProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface RequiredLengths {
  [key: number]: number
}

const requiredLengths: RequiredLengths = {
  0: 3,
  1: 4,
  2: 13
}

const Preview = (props: DialogProps) => {
  // Props
  const { open, setOpen } = props

  // State
  const [timeType, setTimeType] = useState<number>(1)
  const [clientType, setClientType] = useState<number>(1)
  const [isPre, setIsPre] = useState<boolean>(false)
  const [row, setRow] = useState<any>({})
  const [arr, setArr] = useState([
    {
      label: 'Clients with a certain number of orders',
      list: [],
      isAdd: false
    },
    {
      label: "Client's total order amount",
      list: [],
      isAdd: false
    },
    {
      label: "Client's last order",
      list: [],
      isAdd: false
    }
  ])

  const Form = (props: any) => {
    // Props
    const { index, item } = props

    const formik = useFormik({
      initialValues: {
        type: AppUtils.checkValue(row) ? { label: row?.type, value: row?.type } : null,
        amount: AppUtils.checkValue(row?.amount) ? row?.amount : ''
      },
      validationSchema: yup.object().shape({
        type: yup.mixed().required(ErrorConstants.TYPE_ERROR),
        amount: yup.mixed().required(ErrorConstants.AMOUNT_ERROR)
      }),
      onSubmit: (value: { type: any; amount: string }) => {
        let obj: any = {}
        obj = arr.find((item: any, i: number) => i === index)
        if (Object.keys(row)?.length > 0) {
          obj.list = obj.list?.map((val: any, i: number) =>
            i === row?.index ? { ...val, type: value.type.value, amount: value.amount } : { ...val }
          )
        } else {
          obj.list = [...obj.list, { type: value.type.value, amount: value.amount }]
        }
        setArr(arr.map((item: any, i: number) => (i === index ? { ...item, ...obj, isAdd: false } : { ...item })))
        formik.resetForm()
        setRow({})
      }
    })

    const getArr = () => {
      const options =
        index === 0
          ? [
            { label: 'Total Orders', value: 'Total Orders' },
            { label: 'Total Orders Pickup', value: 'Total Orders Pickup' },
            { label: 'Total Orders Delivery', value: 'Total Orders Delivery' }
          ]
          : index === 1
            ? [
              { label: 'Total Amount', value: 'Total Amount' },
              { label: 'Total Amount Pickup', value: 'Total Amount Pickup' },
              { label: 'Total Amount Delivery', value: 'Total Amount Delivery' },
              { label: 'Average Order Amount', value: 'Average Order Amount' }
            ]
            : [
              { label: 'Last Order Source', value: 'Last Order Source' },
              { label: 'Last Order Status', value: 'Last Order Status' },
              { label: 'Last Order Type', value: 'Last Order Type' },
              { label: 'Last Order Time', value: 'Last Order Time' },
              { label: 'Last Order Payment Method', value: 'Last Order Payment Method' },
              { label: 'Last Order Delivery Area', value: 'Last Order Delivery Area' },
              { label: 'Last Order Outside Delivery', value: 'Last Order Outside Delivery' },
              { label: 'Last Order Amount', value: 'Last Order Amount' },
              { label: 'Last Order Given Tip', value: 'Last Order Given Tip' },
              { label: 'Last Order Items Count', value: 'Last Order Items Count' },
              { label: 'Last Order Items Average', value: 'Last Order Items Average' },
              { label: 'Last Order Options Count', value: 'Last Order Options Count' },
              { label: 'Last Order Options Average', value: 'Last Order Options Average' }
            ]

      const selectedTypes = item?.list?.map((listItem: any) => listItem.type) || []
      return options.filter(option => !selectedTypes.includes(option.value))
    }

    return (
      <Box
        sx={{ p: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px' }}
        component={'form'}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%' }}>
          <CsAutocomplete
            sx={{ width: '100%' }}
            options={getArr()}
            isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
            getOptionLabel={(option: any) => option?.label || ''}
            value={formik.values.type}
            onChange={(e: any, value: any) => formik.setFieldValue('type', value)}
            label={'Type'}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
          />
          <TextField
            sx={{ width: '100%' }}
            fullWidth
            label={'Amount'}
            placeholder='Enter amount'
            name='amount'
            value={formik.values.amount}
            onChange={(e: any) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '')
              formik.handleChange(e)
            }}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4 }}>
          <LoadingButton
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, mr: { sm: 2.5 } }}
            onClick={() => {
              setArr((state: any) =>
                state.map((val: any, i: number) => (i === index ? { ...val, isAdd: false } : { ...val }))
              )
              setRow({})
              formik.resetForm()
            }}
          >
            Cancel
          </LoadingButton>
          <LoadingButton variant='contained' type='submit' sx={{ ml: { sm: 2.5 } }}>
            Save
          </LoadingButton>
        </Box>
      </Box>
    )
  }

  return (
    <Dialog open={open} maxWidth='sm'>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
          bgcolor: theme => theme.palette.customColors.bodyBg,
          px: 4,
          py: 3
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
          Preview your menu with the following criteria
        </Typography>
        <IconButton
          onClick={() => {
            setIsPre(false)
            setOpen(false)
          }}
          sx={{ fontSize: 25 }}
        >
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
        <Collapse in={!isPre}>
          <Box
            sx={{
              display: 'flex',
              p: 4,
              border: theme => `1px solid ${theme.palette.info.main}`,
              borderRadius: '6px',
              bgcolor: theme => theme.palette.info.lightOpacity,
              mb: 4
            }}
          >
            <Box
              component={Icon}
              icon={'akar-icons:info'}
              sx={{ color: theme => theme.palette.text.secondary, fontSize: 30 }}
            />
            <Typography sx={{ ml: 2, fontWeight: 500 }}>
              Promo deals are visible to eligible clients so you can create targeted promo deals for different
              audiences.
            </Typography>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ fontWeight: 700 }}>Time</Typography>
            <RadioGroup value={timeType} onChange={(e: any) => setTimeType(Number(e.target.value))}>
              <FormControlLabel value={1} control={<Radio />} label='Present Time' />
              <FormControlLabel value={2} control={<Radio />} label='As If Date & Time Would Be:' />
            </RadioGroup>
            <Collapse in={timeType === 2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 2 }}>
                <CsDatePicker label='Select Date' placeholderText='Select Date' />
                <CsTimePicker label='Select Time' placeholderText='Select Time' />
              </Box>
            </Collapse>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ fontWeight: 700 }}>Time</Typography>
            <RadioGroup value={clientType} onChange={(e: any) => setClientType(Number(e.target.value))}>
              <FormControlLabel value={1} control={<Radio />} label='As New Client' />
              <FormControlLabel value={2} control={<Radio />} label='As Returning Client' />
            </RadioGroup>
            <Collapse in={clientType === 2}>
              <Box sx={{ mb: 4, mt: 2 }}>
                {Array.isArray(arr) &&
                  arr?.length > 0 &&
                  arr?.map((item: any, index: number) => {
                    return (
                      <Box
                        key={index}
                        sx={{ p: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px', mb: 4 }}
                      >
                        <Typography sx={{ fontWeight: 500 }}>{item?.label}</Typography>
                        <Box sx={{ my: 4 }}>
                          {Array.isArray(item?.list) &&
                            item?.list?.length > 0 &&
                            item?.list?.map((val: any, i: number) => {
                              return (
                                <Box
                                  key={i}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    px: 3,
                                    py: 1,
                                    mb: 4,
                                    border: theme => `1px solid ${theme.palette.divider}`,
                                    borderRadius: '8px',
                                    boxShadow: theme => theme.shadows[2]
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ fontWeight: 700 }}>{val?.type}:</Typography>
                                    <Typography sx={{ fontWeight: 500, ml: 1 }}>{val?.amount}</Typography>
                                  </Box>
                                  <Box>
                                    <IconButton
                                      onClick={() => {
                                        setRow({ ...val, index: i })
                                        setArr((state: any) =>
                                          state.map((val: any, i: number) =>
                                            i === index ? { ...val, isAdd: true } : { ...val }
                                          )
                                        )
                                      }}
                                    >
                                      <Icon icon={'bx:edit'} />
                                    </IconButton>
                                    <IconButton
                                      onClick={() => {
                                        const newArr = item?.list?.filter(
                                          (value: any, subIndex: number) => subIndex !== i
                                        )
                                        setArr((arr: any) =>
                                          arr.map((newVal: any, newIn: number) =>
                                            newIn === index ? { ...newVal, list: newArr } : { ...newVal }
                                          )
                                        )
                                      }}
                                    >
                                      <Icon icon={'mingcute:delete-2-line'} />
                                    </IconButton>
                                  </Box>
                                </Box>
                              )
                            })}
                          <Collapse in={item?.isAdd}>
                            <Form index={index} item={item} />
                          </Collapse>
                        </Box>
                        {arr[index]?.list?.length !== requiredLengths[index] && (
                          <LoadingButton
                            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                            disabled={item?.isAdd}
                            onClick={() => {
                              !item?.isAdd &&
                                setArr((state: any) =>
                                  state.map((val: any, i: number) =>
                                    i === index ? { ...val, isAdd: true } : { ...val }
                                  )
                                )
                            }}
                          >
                            Add
                          </LoadingButton>
                        )}
                      </Box>
                    )
                  })}
              </Box>
            </Collapse>
          </Box>
        </Collapse>
        <Collapse in={isPre}>
          <Box
            component={'iframe'}
            src='https://1roos.com/en/setup/services/delivery'
            sx={{
              width: '100%',
              height: 'calc(100vh - 16rem)',
              border: theme => `1px solid ${theme.palette.divider}`,
              borderRadius: '6px'
            }}
          />
        </Collapse>
      </DialogContent>
      <DialogActions
        sx={{
          borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          pt: '1rem !important',
          justifyContent: 'end'
        }}
      >
        <LoadingButton
          size='large'
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
          onClick={() => (!isPre ? setIsPre(true) : setOpen(false))}
        >
          {isPre ? 'Close' : 'Preview'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default Preview
