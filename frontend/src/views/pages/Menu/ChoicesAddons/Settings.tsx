// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import {
    Dialog, DialogContent, DialogTitle, DialogActions, Typography, LoadingButton,
    IconButton, FormControlLabel, Checkbox, Collapse,
    TextField
} from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'

// Store Imports
import { editChoice, editAddon } from '@/redux-store/Addons/Action'
import { getTaxCategories } from '@/redux-store/Payments/Taxtion/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Type Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const Settings = (props: ModelProps) => {

    // Props
    const { open, setOpen, row } = props

    // State
    const [isInternal, setIsInternal] = useState<boolean>(false)
    const [internal, setInternal] = useState<string>('')
    const [category, setCategory] = useState<any>(null)

    // Hooks
    const dispatch = useDispatch()
    const { restaurant } = useSelector((state: any) => state.restaurant)
    const categoryList = useSelector((state: any) => state.payments.taxtion.taxCategory)
    const loading = useSelector((state: any) => state.addons.loading)

    useEffect(() => {
        if (AppUtils.checkValue(row?.menu_item_kitchen_internal_name)) {
            setIsInternal(true)
            setInternal(row?.menu_item_kitchen_internal_name)
        }
        setCategory(row?.tax_category_id ? row?.tax_category_id : null)
    }, [row])

    useEffect(() => {
        open && dispatch(getTaxCategories({ restaurant_id: restaurant?._id }))
    }, [open])

    useEffect(() => {
        !loading && handleReset()
    }, [loading])

    const handleReset = () => {
        setOpen({ open: false, row: {} })
        setInternal('')
        setIsInternal(false)
    };

    const handleChange = (e: any) => {
        setIsInternal(e.target.checked)
        !e.target.checked && setInternal('')
    }

    const handleSave = () => {
        if (row?.type === 1) {
            dispatch(editChoice({ menu_item_kitchen_internal_name: internal, id: row?._id }))
        } else {
            dispatch(editAddon({ tax_category_id: category?._id, id: row?._id }))
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
                    px: 4,
                    py: 3
                }}
            >
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
                    Special Instructions
                </Typography>
                <IconButton onClick={handleReset} sx={{ fontSize: 25 }}>
                    <Icon icon={'ic:round-close'} />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 4, pt: '1rem !important', width: { xs: '100%', sm: '35rem' } }}>
                {row?.type === 1 && <> <FormControlLabel
                    control={
                        <Checkbox
                            checked={isInternal}
                            onChange={handleChange}
                        />
                    }
                    label='Display the internal name on kitchen tickets'
                />
                    <Collapse in={isInternal} sx={{ pl: 6 }}>
                        <TextField
                            sx={{ mt: 2 }}
                            fullWidth
                            label='Internal Name'
                            placeholder='Enter Internal Name'
                            value={internal}
                            onChange={(e: any) => setInternal(e.target.value)}
                        />
                    </Collapse>
                </>
                }
                {row?.type === 2 &&
                    <>
                        <CsAutocomplete
                            sx={{ mb: 2 }}
                            label={'Tax Categories'}
                            options={categoryList}
                            isOptionEqualToValue={(option: any, value: any) => option._id === value._id}
                            multiple={false}
                            getOptionLabel={(option: any) => option?.name || ''}
                            value={category}
                            onChange={(e: any, value: any) => setCategory(value)}

                        />
                        <Typography sx={{ fontWeight: 500, fontSize: "0.85rem" }}>
                            Add additional tax categories in the "Dashboard" under "Menu" → "Taxation Categories".
                        </Typography>
                    </>
                }
            </DialogContent>
            <DialogActions
                sx={{
                    borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    pt: '1rem !important',
                    justifyContent: 'space-between'
                }}>
                <LoadingButton
                    sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                    onClick={handleReset}
                    disabled={loading}
                >
                    Cancel
                </LoadingButton>
                <LoadingButton
                    variant='contained'
                    onClick={handleSave}
                    loading={loading}
                    loadingPosition='start'
                    startIcon={loading ? <>&nbsp;</> : <></>}>
                    Save
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default Settings