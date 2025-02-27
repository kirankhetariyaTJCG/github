// React Imports
import React, { useState } from 'react'

// MUI Imports
import { Box, Grid, TextField, LoadingButton, Typography, IconButton, Collapse, Radio, RadioGroup, FormControlLabel } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux'

// Custom Imports
import CsDelete from '@/@core/components/CsDelete'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Props {
    data: any
    nutritionalValuesSize: string
    setNutritionalValuesSize: (nutritionalValuesSize: string) => void,
    nutritionalValues: any[]
    setNutritionalValues: (nutritionalValues: any[]) => void
}

const Nutritional = (props: Props) => {
    // Props
    const { data, nutritionalValuesSize, setNutritionalValuesSize, nutritionalValues, setNutritionalValues } = props

    // State
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })

    // Hooks
    const { restaurant } = useSelector((state: any) => state.restaurant)

    const handleReset = () => {
        setIsAdd(false)
        setIsDelete({ open: false, id: '' })
    }

    const handleDelete = () => {
        setNutritionalValues(nutritionalValues?.filter((item: any) => item?._id !== isDelete?.id))
        setIsDelete({ open: false, id: '' })
    }

    const Form = () => {
        const formik = useFormik({
            initialValues: { label: '' },
            validationSchema: yup.object().shape({ label: yup.string().required(ErrorConstants.NAME_ERROR) }),
            onSubmit: (value: { label: string }) => {
                const payload = {
                    type: 2,
                    is_default: false,
                    menu_id: restaurant?.menu_id,
                    name: value?.label,
                    values: data?.sizes && data?.sizes?.length > 0
                        ? data?.sizes?.map((size: any) => {
                            return {
                                size_id: size?._id,
                                value: ''
                            }
                        })
                        : []
                }
                setNutritionalValues([...nutritionalValues, { ...payload }])
                handleReset()
            }
        })

        const handleClose = () => {
            setIsAdd(false)
            formik.resetForm()
        }

        return (
            <Box sx={{ pt: 2 }}>
                <Grid container spacing={4} component={'form'} noValidate onSubmit={formik.handleSubmit}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            size='small'
                            label='Nutritional Name'
                            placeholder='Enter Nutritional name'
                            name='label'
                            value={formik.values.label}
                            onChange={formik.handleChange}
                            error={formik.touched.label && Boolean(formik.errors.label)}
                            helperText={formik.touched.label && formik.errors.label}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <LoadingButton
                            sx={{ py: 2.25 }}
                            fullWidth
                            variant='outlined'
                            onClick={handleClose}
                        >
                            Cancel
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <LoadingButton sx={{ py: 2.25 }} fullWidth variant='contained' type='submit'>
                            Save
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <>
            <RadioGroup row value={nutritionalValuesSize} onChange={e => setNutritionalValuesSize(e.target.value)}>
                <FormControlLabel value={1} control={<Radio />} label='Per Serving' />
                <FormControlLabel value={2} control={<Radio />} label='Per 100g' />
            </RadioGroup>
            <Box sx={{ my: 2 }}>
                <Grid container spacing={4}>
                    {Array.isArray(nutritionalValues) &&
                        nutritionalValues?.length > 0 &&
                        nutritionalValues.map((nutritional: any, index: number) => (
                            <React.Fragment key={index}>
                                <Grid item xs={3}>
                                    <Box sx={{ height: '50px', display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Typography>{nutritional?.name}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={9}
                                    sx={{
                                        overflow: 'auto',
                                        '&::-webkit-scrollbar': { display: 'none' },
                                        '-ms-overflow-style': 'none',
                                        'scrollbar-width': 'none'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {Array.isArray(nutritional?.values) &&
                                                nutritional?.values?.length > 0 &&
                                                nutritional?.values.map((val: any, i: number) => (
                                                    <Box key={i} sx={{ px: 2 }}>
                                                        <TextField
                                                            label={data?.sizes ? data?.sizes[i]?.name : ''}
                                                            value={val?.value}
                                                            size="small"
                                                            sx={{ width: '6rem' }}
                                                            onChange={(e: any) => {
                                                                setNutritionalValues(
                                                                    nutritionalValues?.map((newVal: any, newI: number) =>
                                                                        newI === index
                                                                            ? {
                                                                                ...newVal,
                                                                                values: nutritional?.values?.map((value: any, newI: number) =>
                                                                                    newI === i ? { ...value, value: e.target.value } : { ...value }
                                                                                ),
                                                                            }
                                                                            : { ...newVal }
                                                                    )
                                                                );
                                                            }}
                                                        />
                                                    </Box>
                                                ))}
                                        </Box>
                                        {!nutritional?.is_default && (
                                            <IconButton sx={{ px: 2 }} onClick={() => setIsDelete({ open: true, id: nutritional?._id })}>
                                                <Icon icon={'ic:outline-delete'} />
                                            </IconButton>
                                        )}
                                    </Box>
                                </Grid>
                            </React.Fragment>
                        ))}
                </Grid>

                <Collapse in={!isAdd}>
                    <LoadingButton
                        sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, my: 2 }}
                        onClick={() => setIsAdd(true)}
                    >
                        Add Nutritional
                    </LoadingButton>
                </Collapse>
                <Collapse in={isAdd}>
                    <Form />
                </Collapse>
            </Box>

            <CsDelete
                open={isDelete?.open}
                onClose={() => setIsDelete({ open: false, id: '' })}
                label='Nutritional'
                handleDelete={handleDelete}
            />
        </>
    )
}

export default Nutritional