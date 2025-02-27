// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography, IconButton, Collapse, LoadingButton, Checkbox, FormControlLabel, TextField } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'
import ItemSettings from './ItemSettings'

// Store Imports
import { editItem, getAllergens, getNutritionalValues, getTags } from '@/redux-store/Category/Action'
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
    const [active, setActive] = useState<number | null>(null)
    const [category, setCategory] = useState<any>(null)
    const [hideInstructions, setHideInstructions] = useState<boolean>(false)
    const [isInternal, setIsInternal] = useState<boolean>(false)
    const [internal, setInternal] = useState<string>('')
    const [isManage, setIsManage] = useState<{ open: boolean; row: any }>({ open: false, row: {} })

    // Hooks
    const loading = useSelector((state: any) => state.category.loading)
    const { restaurant } = useSelector((state: any) => state.restaurant)
    const categoryList = useSelector((state: any) => state.payments.taxtion.taxCategory)
    const dispatch = useDispatch()

    useEffect(() => {
        !loading && setOpen({ open: false, row: {} })
    }, [loading])

    useEffect(() => {
        if (AppUtils.checkValue(row) && Object?.keys(row)?.length > 0) {
            setHideInstructions(row?.hide_instructions)
            setIsInternal(AppUtils.checkValue(row?.menu_item_kitchen_internal_name))
            setInternal(row?.menu_item_kitchen_internal_name ?? '')
            setCategory(row?.tax_category_id ? row?.tax_category_id : null)
        }
    }, [row])

    useEffect(() => {
        if (AppUtils.checkValue(restaurant?.menu_id)) {
            dispatch(getTaxCategories({ restaurant_id: restaurant?._id }))
            dispatch(getTags({ showActive: true }))
            dispatch(getAllergens({ menu_id: restaurant?.menu_id, type: 1 }))
            dispatch(getNutritionalValues({ menu_id: restaurant?.menu_id, type: 2 }))
        }
    }, [restaurant?.menu_id])

    const handleChange = (e: any) => {
        setIsInternal(e.target.checked)
        !e.target.checked && setInternal('')
    }

    const settings = [
        {
            label: 'Item Settings',
            component: <>
                <Typography sx={{ fontWeight: 500, mb: 2, fontSize: "0.85rem" }}>Customize your item by selecting nutritional values, allergens, additives, ingredients, and options like hot, vegan, and more.</Typography>
                <LoadingButton
                    sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                    onClick={() => setIsManage({ open: true, row: row })}
                >
                    Manage
                </LoadingButton>
            </>
        },
        {
            label: 'Taxation Categories',
            component: <>
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
        },
        {
            label: 'Special Instructions',
            component: <>
                <FormControlLabel
                    control={<Checkbox checked={hideInstructions} onChange={() => setHideInstructions(!hideInstructions)} />} label='Hide the "Special Instructions" input field.' />
                <FormControlLabel
                    control={<Checkbox checked={isInternal} onChange={handleChange} />} label='Display the internal name on kitchen tickets.' />
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
        },
    ]

    const handleSave = () => {
        const payload = {
            hide_instructions: hideInstructions,
            menu_item_kitchen_internal_name: internal,
            tax_category_id: category?._id,
            id: row?._id,
        }
        dispatch(editItem(payload))
        setActive(null)
    }

    const handleClose = () => {
        setOpen({ open: false, row: {} })
        setActive(null)
    }

    return (
        <>
            <Dialog maxWidth='md' open={open} onClose={() => setOpen({ open: false, row: {} })}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
                        px: 4,
                        py: 3
                    }}>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Settigns</Typography>
                    <IconButton onClick={handleClose}>
                        <Icon icon={'ic:round-close'} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '30rem' } }}>
                    <Box>
                        {
                            Array.isArray(settings) && settings?.length > 0 &&
                            settings?.map((setting: any, index: number) => {
                                return (
                                    <Box key={index}
                                        sx={{
                                            borderRadius: '8px',
                                            border: theme => `1px solid ${theme.palette.divider}`,
                                            mb: 4,
                                            userSelect: 'none',
                                            cursor: 'pointer'
                                        }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                px: 4,
                                                py: 2,
                                                borderBottom: theme =>
                                                    active === index ? `1px solid ${theme.palette.divider}` : 'none'
                                            }}
                                            onClick={() => index === active ? setActive(null) : setActive(index)}
                                        >
                                            <Typography sx={{ fontWeight: 600 }}>
                                                {setting?.label}
                                            </Typography>
                                            <IconButton
                                                sx={{ p: 1 }}
                                                onClick={() =>
                                                    index === active
                                                        ? setActive(null) : setActive(index)
                                                }>
                                                <Icon icon={'icon-park-outline:down'}
                                                    style={{
                                                        transition: 'all 0.2s ease-in-out',
                                                        transform: index === active ? 'rotate(180deg)' : 'none'
                                                    }} />
                                            </IconButton>
                                        </Box>
                                        <Collapse in={index === active}>
                                            <Box sx={{ p: 4 }}>
                                                {setting?.component}
                                            </Box>
                                        </Collapse>
                                    </Box>
                                )
                            })
                        }
                    </Box>
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
                        disabled={loading}
                        onClick={handleClose}
                    >
                        Cancel
                    </LoadingButton>
                    <LoadingButton
                        variant='contained'
                        onClick={handleSave}
                        loading={loading}
                        loadingPosition='start'
                        startIcon={loading ? <>&nbsp;</> : <></>}
                    >
                        Save
                    </LoadingButton>
                </DialogActions>
            </Dialog>

            <ItemSettings open={isManage?.open} setOpen={setIsManage} data={isManage?.row} />
        </>
    )
}

export default Settings