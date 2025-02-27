// React Imports
import { useEffect } from 'react'

// MUI Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'
import { Box, LoadingButton, Typography, TextField, InputAdornment, } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import AppUtils from '@/Helper/AppUtils'

interface Ranges {
    min: string,
    max: string,
    prefix: string,
    is_char: boolean
}

const SubTypeRanges = ({ handleSave, row }: { handleSave: (ranges: Ranges) => void, row: any }) => {

    const initialValues: Ranges = { is_char: false, max: '', min: '', prefix: '' }

    const schema = yup.object().shape({
        max: yup.string().required(ErrorConstants.TO_VALUE_ERROR)
            .test('is-greater', 'To must be greater than From', function (max) {
                return max > this.parent.min;
            }),
        min: yup.string().required(ErrorConstants.FROM_VALUE_ERROR),
        prefix: yup.string().required(ErrorConstants.PREFIX_ERROR)
    })

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: schema,
        onSubmit: (value: Ranges) => handleSave(value)
    })

    useEffect(() => {
        if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
            formik.setFieldValue('prefix', row?.prefix)
            formik.setFieldValue('min', row?.min)
            formik.setFieldValue('max', row?.max)
        }
    }, [row])

    return (
        <Box component={'form'} onSubmit={formik.handleSubmit} noValidate>
            <TextField
                fullWidth
                label='Prefix (optional, eg. Suite)'
                placeholder='Enter Prefix'
                name='prefix'
                value={formik.values.prefix}
                onChange={formik.handleChange}
                error={formik.touched.prefix && Boolean(formik.errors.prefix)}
                helperText={formik.touched.prefix && formik.errors.prefix}
                inputProps={{ maxLength: 16 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <Typography>{formik.values.prefix?.length} / 16</Typography>
                        </InputAdornment>
                    )
                }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 4 }}>
                <TextField
                    sx={{ width: '100%' }}
                    fullWidth
                    name='min'
                    value={formik.values.min}
                    onChange={formik.handleChange}
                    error={formik.touched.min && Boolean(formik.errors.min)}
                    helperText={formik.touched.min && formik.errors.min}
                    InputProps={{ startAdornment: <InputAdornment position='start'>From</InputAdornment> }}
                />
                <TextField
                    sx={{ width: '100%' }}
                    fullWidth
                    name='max'
                    value={formik.values.max}
                    onChange={formik.handleChange}
                    error={formik.touched.max && Boolean(formik.errors.max)}
                    helperText={formik.touched.max && formik.errors.max}
                    InputProps={{ startAdornment: <InputAdornment position='start'>To</InputAdornment> }}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 4 }}>
                <LoadingButton variant='contained' type='submit'>
                    Save
                </LoadingButton>
                <LoadingButton sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}>
                    Cancel
                </LoadingButton>
            </Box>
        </Box>
    )
}

export default SubTypeRanges