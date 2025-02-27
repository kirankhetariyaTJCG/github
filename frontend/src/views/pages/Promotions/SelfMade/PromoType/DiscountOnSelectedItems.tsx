// React Imports
import { useState } from 'react'

// MUI Imports
import { Box, IconButton, FormControl, Select, MenuItem, InputAdornment, Typography, Tooltip, TextField, InputLabel, Collapse } from '@/Helper/MUIImports'

// Third Party Imports
import { FormikProps } from 'formik'
import { useSelector } from 'react-redux'

// Custom Imports
import ItemGroup from './ItemGroup'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Type Imports
import type { Step2Values } from '../AddEditPromo'

// Helper Imports
import Constants from '@/Helper/Constants'

const DiscountOnSelectedItems = (props: { formik: FormikProps<Step2Values>, promo_type: number }) => {

    // Props
    const { formik, promo_type } = props

    // State
    const [isOpen, setIsOpen] = useState<{ open: boolean, row: {}, type: keyof Step2Values }>({ open: false, row: {}, type: 'items' })
    const [selectedItems, setSelectedItems] = useState<number>(formik.values.items?.length)
    const [selectedOtherItems, setSelectedOtherItems] = useState<number>(formik.values.other_items?.length)

    // Hooks
    const categoryData = useSelector((state: any) => state.category.category)

    const onSaveClick = (data: { total: number, items: any[] }) => {
        formik.setFieldValue(isOpen?.type, data?.items)
        isOpen?.type === 'other_items' ? setSelectedOtherItems(data?.total) : setSelectedItems(data?.total)
    }

    const handleChange = (value: any, field: keyof Step2Values) => {
        const newValue = Number(value.replace(Constants.NO_REGEX, ''))
        const cappedValue = Math.min(newValue, 100);
        formik.setFieldValue(field, cappedValue);
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Typography sx={{ fontWeight: 600 }}>Eligible items</Typography>
                <Tooltip title='Select items to apply the discount automatically when added to the cart.' arrow>
                    <IconButton sx={{ p: 0 }}>
                        <Icon icon={'cuida:info-outline'} />
                    </IconButton>
                </Tooltip>
            </Box>
            <TextField
                sx={{ mb: 4 }}
                fullWidth
                label='Items Group 1'
                value={`${selectedItems} Selected`}
                disabled={Array.isArray(categoryData) && categoryData?.length === 0}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                disabled={Array.isArray(categoryData) &&
                                    categoryData?.length === 0}
                                onClick={() => setIsOpen({
                                    open: true,
                                    row: formik.values.items?.length > 0
                                        ? { items: formik.values.items }
                                        : {},
                                    type: 'items'
                                })}
                            >
                                <Icon icon={'bx:edit'} />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                error={formik.touched.items && Boolean(formik.errors.items)}
                helperText={formik.touched.items && formik.errors.items && String(formik.errors.items)}
            />
            {promo_type === 4 &&
                <TextField
                    sx={{ mb: 4 }}
                    fullWidth
                    label='Items Group 2'
                    value={`${selectedOtherItems} Selected`}
                    disabled={Array.isArray(categoryData) && categoryData?.length === 0}
                    InputProps={{
                        readOnly: true,
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    disabled={Array.isArray(categoryData) &&
                                        categoryData?.length === 0}
                                    onClick={() => setIsOpen({
                                        open: true,
                                        row: formik.values.other_items?.length > 0
                                            ? { items: formik.values.other_items }
                                            : {},
                                        type: 'other_items'
                                    })}
                                >
                                    <Icon icon={'bx:edit'} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    error={formik.touched.other_items && Boolean(formik.errors.other_items)}
                    helperText={formik.touched.other_items && formik.errors.other_items && String(formik.errors.other_items)}
                />
            }
            {Array.isArray(categoryData) && categoryData?.length === 0 &&
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box>
                        <Box
                            component={Icon}
                            icon={'mingcute:warning-line'}
                            sx={{ color: theme => theme.palette.secondary.main, fontSize: 20 }} />
                    </Box>
                    <Typography sx={{ fontSize: '0.8rem' }}>
                        There are no items in menu. Please go to the menu and add items.
                    </Typography>
                </Box>}
            <Box>
                <Typography sx={{ fontWeight: 600, mb: 4 }}>Discount:</Typography>
                {promo_type === 2 &&
                    <TextField
                        sx={{ mb: 4 }}
                        fullWidth
                        label='Items Group 1 Discount'
                        value={formik.values.items_discount}
                        onChange={e => handleChange(e.target.value, 'items_discount')}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <Icon icon={'ant-design:percentage-outlined'} />
                                </InputAdornment>
                            )
                        }}
                    />}
                {promo_type === 4 &&
                    <Box>
                        <FormControl fullWidth sx={{ mb: 6 }}>
                            <InputLabel>Discount Type</InputLabel>
                            <Select
                                label='Discount Type'
                                name='discount_type'
                                value={formik.values.discount_type}
                                onChange={(e: any) => formik.setFieldValue('discount_type', e.target.value)}
                            >
                                <MenuItem value={1}>Manually set discounts</MenuItem>
                                <MenuItem value={2}>Automatically set discounts</MenuItem>
                            </Select>
                        </FormControl>
                        <Collapse in={formik.values.discount_type === 1}>
                            <TextField
                                sx={{ mb: 4 }}
                                fullWidth
                                label='Items Group 1'
                                value={formik.values.items_discount}
                                onChange={e => handleChange(e.target.value, 'items_discount')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Icon icon={'ant-design:percentage-outlined'} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                sx={{ mb: 4 }}
                                fullWidth
                                label='Items Group 2'
                                value={formik.values.other_items_discount}
                                onChange={e => handleChange(e.target.value, 'other_items_discount')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Icon icon={'ant-design:percentage-outlined'} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Collapse>
                        <Collapse in={formik.values.discount_type === 2}>
                            <TextField
                                sx={{ mb: 4 }}
                                fullWidth
                                label='Discount for cheapest item'
                                value={formik.values.cheapest_item_discount}
                                onChange={e => handleChange(e.target.value, 'cheapest_item_discount')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Icon icon={'ant-design:percentage-outlined'} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                sx={{ mb: 4 }}
                                fullWidth
                                label='Discount for most expensive item'
                                value={formik.values.expensive_item_discount}
                                onChange={e => handleChange(e.target.value, 'expensive_item_discount')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Icon icon={'ant-design:percentage-outlined'} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Collapse>
                    </Box>
                }
                <FormControl fullWidth sx={{ mb: 6 }}>
                    <Select
                        name='charges'
                        value={formik.values.charges}
                        onChange={(e: any) => formik.setFieldValue('charges', e.target.value)}
                    >
                        <MenuItem value={1}>No extra charges</MenuItem>
                        <MenuItem value={2}>Charge extra for "Choices / Addons"</MenuItem>
                        <MenuItem value={3}>Charge extra for "Choices / Addons" & "Sizes"</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <ItemGroup
                open={isOpen?.open}
                setOpen={setIsOpen}
                row={isOpen?.row}
                onSaveClick={onSaveClick}
            />
        </>
    )
}

export default DiscountOnSelectedItems