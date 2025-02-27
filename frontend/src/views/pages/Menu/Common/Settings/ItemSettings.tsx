// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, LoadingButton, Collapse, TextField } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import MarkedItems from './MarkedItems'
import Allergens from './Allergens'
import Nutritional from './Nutritional'

// Store Imports
import { editItem } from '@/redux-store/Category/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Props {
    open: boolean
    setOpen: (state: { open: boolean; row: any }) => void
    data: any
}

const ItemSettings = (props: Props) => {
    // Props
    const { open, setOpen, data } = props

    // State
    const [active, setActive] = useState<number | null>(null)
    const [ingredients, setIngredients] = useState<string>('')
    const [additives, setAdditives] = useState<string>('')
    const [tagIds, setTagIds] = useState<any[]>([])
    const [allergenIds, setAllergenIds] = useState<any[]>([])
    const [nutritionalValuesSize, setNutritionalValuesSize] = useState<string>('1')
    const [nutritionalValues, setNutritionalValues] = useState<any[]>([])

    // Hooks
    const dispatch = useDispatch()
    const loading = useSelector((state: any) => state.category.loading)

    useEffect(() => {
        !loading && setOpen({ open: false, row: {} })
    }, [loading])

    useEffect(() => {
        if (AppUtils.checkValue(data) && Object?.keys(data)?.length > 0) {
            setIngredients(data?.ingredients ?? '')
            setAdditives(data?.additives ?? '')
            setNutritionalValuesSize(data?.nutritional_values_size ?? '1')
            if (AppUtils.checkValue(data?.nutritional_values)) {
                const parsedData = JSON.parse(data?.nutritional_values)
                const nutritionals = parsedData?.map((item: any) => {
                    return {
                        ...item,
                        values: data?.sizes?.map((size: any, i: number) => {
                            return {
                                size_id: size?._id,
                                value: item?.values[i]?.value ? item?.values[i]?.value : ''
                            }
                        })
                    }
                })
                setNutritionalValues(nutritionals)
            } else setNutritionalValues([])
            setTagIds(data?.tags ?? [])
            if (Array.isArray(data?.food_property_id) && data?.food_property_id?.length > 0) {
                setAllergenIds(data?.food_property_id.filter((item: any) => item?.type === 1)
                    .map((item: any) => item?._id) ?? [])
            }
        }
    }, [data])

    const manageArr: any = [
        { label: 'Mark items as', component: <MarkedItems setTagIds={setTagIds} tagIds={tagIds} /> },
        {
            label: 'Ingredients',
            component:
                <TextField
                    sx={{ my: 2 }}
                    label='Eg. 50 g tomatoes, 10ml olive oil'
                    placeholder='Eg. 50 g tomatoes, 10ml olive oil'
                    fullWidth
                    multiline={true}
                    value={ingredients}
                    onChange={(e: any) => setIngredients(e.target.value)}
                    minRows={3}
                />
        },
        { label: 'Allergens', component: <Allergens allergenIds={allergenIds} setAllergenIds={setAllergenIds} /> },
        {
            label: 'Additives',
            component:
                <TextField
                    sx={{ my: 2 }}
                    label='Eg. Preservatives, E621Eg'
                    placeholder='Eg. Preservatives, E621Eg'
                    fullWidth
                    multiline={true}
                    minRows={3}
                    value={additives}
                    onChange={(e: any) => setAdditives(e.target.value)}
                />
        },
        {
            label: 'Nutritional values',
            component:
                <Nutritional
                    data={data}
                    nutritionalValuesSize={nutritionalValuesSize}
                    setNutritionalValuesSize={setNutritionalValuesSize}
                    setNutritionalValues={setNutritionalValues}
                    nutritionalValues={nutritionalValues}
                />
        }
    ]

    const handleSave = () => {
        dispatch(editItem({
            ingredients: ingredients,
            additives: additives,
            tags: tagIds,
            food_property_id: allergenIds,
            id: data?._id,
            nutritional_values_size: nutritionalValuesSize,
            nutritional_values: JSON.stringify(nutritionalValues)
        }))
        setActive(null)
    }

    const handleClose = () => {
        setOpen({ open: false, row: {} })
        setActive(null)
    }

    return (
        <>
            <Dialog open={open} PaperProps={{ sx: { maxWidth: '40rem', width: '100%' } }}>
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
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>{data?.name}</Typography>
                    <IconButton onClick={handleClose} sx={{ fontSize: 25 }}>
                        <Icon icon={'ic:round-close'} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
                    {Array.isArray(manageArr) &&
                        manageArr?.length > 0 &&
                        manageArr?.map((item: any, index: number) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        mb: 4,
                                        border: theme => `1px solid ${theme.palette.divider}`,
                                        borderRadius: '6px',
                                        px: 4,
                                        py: 2,
                                        userSelect: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                        onClick={() => (active === index ? setActive(null) : setActive(index))}
                                    >
                                        <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                            {item.label}
                                        </Typography>
                                        <IconButton sx={{ p: 1 }}>
                                            <Icon icon={'icon-park-outline:down'}
                                                style={{
                                                    transition: 'all 0.2s ease-in-out',
                                                    transform: index === active ? 'rotate(180deg)' : 'none'
                                                }} />
                                        </IconButton>
                                    </Box>
                                    <Collapse in={active === index}>
                                        <Box>{item?.component}</Box>
                                    </Collapse>
                                </Box>
                            )
                        })}
                </DialogContent>
                <DialogActions
                    sx={{
                        borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        pt: '1rem !important'
                    }}
                >
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
        </>
    )
}

export default ItemSettings