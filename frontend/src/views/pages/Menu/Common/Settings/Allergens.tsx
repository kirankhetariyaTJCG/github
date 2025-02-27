// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, Grid, LoadingButton, TextField, FormControlLabel, Checkbox, IconButton, Collapse } from '@/Helper/MUIImports'

// Third Party Imports
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import CsDelete from '@/@core/components/CsDelete'

// Store Imports
import { addAllergens, editAllergens, deleteAllergens } from '@/redux-store/Category/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import ErrorConstants from '@/Helper/Constants/ErrorConstants'

interface Props { allergenIds: string[], setAllergenIds: (id: string[]) => void }

const Allergens = ({ allergenIds, setAllergenIds }: Props) => {
    // State
    const [isAdd, setIsAdd] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
    const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })

    // Hooks
    const dispatch = useDispatch()
    const allergens = useSelector((state: any) => state.category.allergens)
    const loading = useSelector((state: any) => state.category.extraLoading)
    const { restaurant } = useSelector((state: any) => state.restaurant)

    useEffect(() => {
        !loading && handleReset()
    }, [loading])

    const handleReset = () => {
        setIsAdd({ open: false, row: {} })
        setIsDelete({ open: false, id: '' })
    }

    const handleDelete = () => {
        dispatch(deleteAllergens(isDelete?.id))
        setAllergenIds(allergenIds?.filter((item: any) => item !== isDelete?.id))
    }

    const Form = () => {
        const formik = useFormik({
            initialValues: { label: isAdd?.row?.name ? isAdd?.row?.name : '' },
            validationSchema: yup.object().shape({ label: yup.string().required(ErrorConstants.NAME_ERROR) }),
            onSubmit: (value: { label: string }) => {
                const payload = {
                    type: 1,
                    is_default: false,
                    menu_id: restaurant?.menu_id,
                    name: value?.label
                }
                Object.keys(isAdd?.row).length > 0
                    ? dispatch(editAllergens({ ...payload, id: isAdd?.row?._id }))
                    : dispatch(addAllergens(payload))
            }
        })

        const handleCancel = () => {
            formik.resetForm()
            setIsAdd({ open: false, row: {} })
        }

        useEffect(() => {
            !loading && formik.resetForm()
        }, [loading])

        return (
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={4} component={'form'} noValidate onSubmit={formik.handleSubmit}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            size='small'
                            fullWidth
                            label='Allergen Name'
                            placeholder='Enter Allergen name'
                            name='label'
                            value={formik.values.label}
                            onChange={formik.handleChange}
                            error={formik.touched.label && Boolean(formik.errors.label)}
                            helperText={formik.touched.label && formik.errors.label && String(formik.errors.label)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <LoadingButton
                            sx={{ py: 2.25 }}
                            fullWidth
                            variant='outlined'
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            Cancel
                        </LoadingButton>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <LoadingButton
                            sx={{ py: 2.25 }}
                            fullWidth
                            variant='contained'
                            type='submit'
                            loading={loading}
                            loadingPosition='start'
                            startIcon={loading ? <>&nbsp;</> : <></>}
                        >
                            Save
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <>
            <Grid container columnSpacing={4}>
                {Array.isArray(allergens) &&
                    allergens?.length > 0 &&
                    allergens?.map((allergen: any, index: number) => {
                        return (
                            <Grid key={index} item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <FormControlLabel
                                        disabled={isAdd?.open && isAdd?.row?._id === allergen?._id}
                                        control={
                                            <Checkbox
                                                checked={allergenIds?.includes(allergen?._id)}
                                                onChange={(e: any) =>
                                                    setAllergenIds(e.target.checked
                                                        ? [...allergenIds, allergen._id]
                                                        : allergenIds.filter(id => id !== allergen._id))

                                                }
                                            />
                                        }
                                        sx={{ '& > span': { fontWeight: 500 } }}
                                        label={allergen?.name}
                                    />
                                    {!allergen?.is_default && (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton
                                                size='small'
                                                disabled={isAdd?.open && isAdd?.row?._id === allergen?._id}
                                                onClick={() => setIsDelete({ open: true, id: allergen?._id })}
                                            >
                                                <Icon icon={'mingcute:delete-line'} />
                                            </IconButton>
                                            <IconButton
                                                size='small'
                                                disabled={isAdd?.open && isAdd?.row?._id === allergen?._id}
                                                onClick={() => setIsAdd({ open: true, row: allergen })}
                                            >
                                                <Icon icon={'iconamoon:edit-duotone'} />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        )
                    })}
            </Grid>
            <Collapse in={!isAdd?.open}>
                <LoadingButton
                    sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, my: 2 }}
                    onClick={() => setIsAdd({ open: true, row: {} })}
                >
                    Add Allergen
                </LoadingButton>
            </Collapse>
            {isAdd?.open && <Form />}

            <CsDelete
                open={isDelete?.open}
                onClose={() => setIsDelete({ open: false, id: '' })}
                loading={loading}
                label='Allergen'
                handleDelete={handleDelete}
            />
        </>
    )
}

export default Allergens