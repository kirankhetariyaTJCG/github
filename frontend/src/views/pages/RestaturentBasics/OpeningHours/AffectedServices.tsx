// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import {
  Box, LoadingButton, Typography, Select, MenuItem,
  IconButton, Collapse, Button, ButtonGroup, Grid, FormControl,
} from '@/Helper/MUIImports'

// Third Party Imports
import type { FormikProps } from "formik";
import type { Value } from "./Holiday";
import moment from "moment";

// Custom Imports
import CsTimePicker from '@/@core/components/TimePicker'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helepr Imports
import AppUtils from '@/Helper/AppUtils'
import useDidMount from '@/@core/hooks/useDidmount';

interface Props {
  formik: FormikProps<Value>
  options: string[]
  isFormShow: { type: string, show: boolean }
}

const AffectedServices = (props: Props) => {

  // Props
  const { formik, options, isFormShow } = props;

  // State
  const [isAdd, setIsAdd] = useState<{ open: boolean; row: any }>({ open: false, row: {} })

  // Hooks
  useEffect(() => {
    if (isFormShow?.type === "ADD") {
      setIsAdd({ open: true, row: {} })
    }
  }, [isFormShow?.type])

  useDidMount(() => {
    if (formik?.values?.intervals?.length === 0) {
      setIsAdd({ open: true, row: {} })
    }
  }, [formik?.values?.intervals])

  // Nested Component start
  const Form = () => {

    // State
    const [toggle, setToggle] = useState<number>(2)
    const [type, setType] = useState<string>('All services')
    const [optionsCopy, setOptionsCopy] = useState<string[]>(options)
    const [hours, setHours] = useState<any[]>([{ start_time: new Date(), end_time: new Date(), _id: AppUtils.randomId() }])


    // Hooks
    useEffect(() => {
      if (Object?.keys(isAdd?.row)?.length > 0) {
        setType(isAdd?.row?.type)
        setOptionsCopy([isAdd?.row?.type, ...optionsCopy])
        const newhours = isAdd?.row?.hours
        const updatedHours = newhours?.map((hour: any) => ({
          ...hour,
          start_time: new Date(hour?.start_time),
          end_time: new Date(hour?.end_time),
        }));
        setHours([...updatedHours])
        if (isAdd?.row?.hours?.length > 0) {
          setToggle(1);

        }
      }
    }, [])

    // Helper Functions
    const handleClose = () => {
      setType('All services')
      setHours([])
      setToggle(1)
      setIsAdd({ open: false, row: {} })
    }

    const handleOpen = () => {
      setToggle(1)
      if (hours?.length === 0) {
        setHours([{ start_time: new Date(), end_time: new Date(), _id: AppUtils.randomId() }])
      }
    }

    const saveHandler = () => {
      if (type === "All services") {
        const newHours = toggle === 2 ? [] : hours;
        if (Object?.keys(isAdd?.row)?.length > 0) {
          formik.setFieldValue('intervals', [
            {
              ...isAdd?.row,
              type: type,
              hours: toggle === 2 ? [] : newHours
            },
          ]);
        } else {
          formik.setFieldValue('intervals', [
            {
              type: type,
              hours: newHours,
              _id: AppUtils.randomId(),
            },
          ]);
        }
        handleClose();
      }
      else {
        const newHours = toggle === 2 ? [] : hours
        Object?.keys(isAdd?.row)?.length > 0
          ? formik.setFieldValue('intervals', formik?.values?.intervals?.map((item: any) => item?._id === isAdd?.row?._id ? { ...item, type: type, hours: newHours } : item))
          : formik.setFieldValue('intervals', [...formik?.values?.intervals, { type: type, hours: newHours, _id: AppUtils.randomId() }])
        handleClose()
      }
    }

    return (
      <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px', p: 4, mb: 3 }}>
        <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <Select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                MenuProps={{ style: { maxHeight: 250 } }}
              >
                {Array.isArray(optionsCopy) &&
                  optionsCopy?.length > 0 &&
                  optionsCopy?.map((item: any, index: number) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    )
                  })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ButtonGroup
              fullWidth
              sx={{ mb: { xs: 2, sm: 0 }, border: theme => `1px solid ${theme.palette.divider}` }}
            >
              <Button
                variant={toggle === 1 ? 'contained' : 'outlined'}
                color='success'
                sx={{ border: 'none !important' }}
                onClick={handleOpen}
              >
                Opened
              </Button>
              <Button
                variant={toggle === 2 ? 'contained' : 'outlined'}
                color='error'
                sx={{ border: 'none !important' }}
                onClick={() => setToggle(2)}
              >
                Closed
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Collapse in={toggle === 1}>
          <Grid item xs={12} sx={{ mt: 4 }}>
            {Array.isArray(hours) &&
              hours?.length > 0 &&
              hours?.map((item: any, index: number) => {
                return (
                  <Grid container key={index} spacing={1} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={hours?.length > 1 ? 5.5 : 6}>
                      <CsTimePicker
                        InputProps={{ readOnly: true }}
                        size='medium'
                        label='Select Start Time'
                        placeholderText='Select Start Time'
                        selected={item?.start_time}
                        onChange={(date: any) =>
                          setHours(hours?.map((val: any, i: number) =>
                            i === index ? { ...val, start_time: date } : { ...val })
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={formik?.values?.intervals?.length > 1 ? 5.5 : 6}>
                      <CsTimePicker
                        InputProps={{ readOnly: true }}
                        size='medium'
                        label='Select End Time'
                        placeholderText='Select End Time'
                        selected={item?.end_time}
                        onChange={(date: any) => setHours(hours?.map((val: any, i: number) =>
                          i === index ? { ...val, end_time: date } : { ...val }))}
                        minTime={
                          item?.start_time
                            ? moment(item?.start_time)
                              .add(15, 'minutes')
                              .toDate()
                            : moment().startOf('day').toDate()
                        }
                        maxTime={moment().endOf('day').toDate()}
                      />
                    </Grid>
                    {hours?.length > 1 && (
                      <Grid item xs={12} sm={0.5}>
                        <IconButton color='error'
                          onClick={() => setHours(hours?.filter((hour: any) => hour?._id !== item?._id))}
                        >
                          <Icon icon={'mingcute:delete-3-line'} />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                )
              })}
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
              size='small'
              onClick={() => setHours([...hours, { start_time: new Date(), end_time: new Date(), _id: AppUtils.randomId() }])}
            >
              Add hours
            </LoadingButton>
          </Grid>
        </Collapse>
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 4 }}>
          <LoadingButton
            size='large'
            sx={{ mt: { xs: 2.5, sm: 0 }, mr: { sm: 2.5 } }}
            variant='contained'
            onClick={saveHandler}
          >
            Save
          </LoadingButton>
          <LoadingButton
            size='large'
            sx={{ mb: { xs: 2.5, sm: 0 }, ml: { sm: 2.5 } }}
            variant='outlined'
            onClick={handleClose}
          >
            Cancel
          </LoadingButton>
        </Grid>
      </Box>
    )
  }
  //Nested Component End

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "26px" }}>
        {Array.isArray(formik?.values?.intervals) &&
          formik?.values?.intervals?.length > 0 &&
          formik?.values?.intervals?.map((interval: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ width: "70%" }}>
                  <Typography>{interval?.type}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <Box>
                    {interval?.hours && interval?.hours?.length > 0
                      ? interval?.hours?.map((time: any, i: number) => {
                        return (
                          <Box key={i}>
                            {moment(String(time?.start_time)).format('hh:mm A')} - {moment(
                              String(time?.end_time)
                            ).format('hh:mm A')}
                          </Box>
                        )
                      })
                      : <Typography>Closed</Typography>
                    }
                  </Box>
                  <Box>
                    <IconButton color='success' onClick={() => setIsAdd({ open: true, row: interval })}>
                      <Icon icon={'bx:edit'} />
                    </IconButton>
                    <IconButton
                      color='error'
                      onClick={() => formik.setFieldValue('intervals', formik?.values?.intervals?.filter((item: any) => item?._id !== interval?._id))}
                    >
                      <Icon icon={'ic:twotone-delete-outline'} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )
          })}
      </Box>
      {(isAdd?.open) && <Form />}

      {(!isAdd?.open && (formik?.values?.intervals[0]?.type !== 'All services')) &&
        <Typography
          sx={{
            fontWeight: 500,
            color: theme => theme.palette.error.main, textDecoration: 'underline',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={() => setIsAdd({ open: true, row: {} })}
        >
          Add service
        </Typography>
      }
    </Box>
  )
}
export default AffectedServices;