// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import {
    Box, Dialog, DialogContent, DialogTitle, DialogActions, Typography, LoadingButton,
    IconButton, FormControlLabel, Checkbox, Radio, RadioGroup, Collapse,
    InputAdornment
} from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'
import CsDatePicker from '@/@core/components/CsDatePicker'

// Store Imports
import { editItem } from '@/redux-store/Category/Action'
import { editChoice } from '@/redux-store/Addons/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

// Type Imports
import { ModelProps } from '@/types'

const Availability = (props: ModelProps & { type: number }) => {

    // Props
    const { open, setOpen, row, type } = props

    // State
    const [outOfStock, setOutOfStock] = useState<boolean>(false)
    const [showFor, setShowFor] = useState<boolean>(false)
    const [value, setValue] = useState<number | null>(null)
    const [orderTypes, setOrderTypes] = useState<string[]>([])
    const [until, setUntil] = useState<Date | null>(null)

    // Hooks
    const dispatch = useDispatch()
    const categoryLoading = useSelector((state: any) => state.category.loading)
    const choiceLoading = useSelector((state: any) => state.addons.loading)
    const loading = type === 1 ? categoryLoading : choiceLoading;

    useEffect(() => {
        if (Object?.keys(row)?.length > 0) {
            setOutOfStock(row?.out_of_stock ?? false)
            setOrderTypes(row?.menu_item_order_types ? row?.menu_item_order_types : [])
            if (AppUtils.checkValue(row?.out_of_stock_next_day)) {
                setValue(1)
            } else if (AppUtils.checkValue(row?.out_of_stock_until)) {
                setValue(2)
            } else setValue(3)
        }
    }, [row])

    useEffect(() => {
        !loading && handleReset()
    }, [loading])

    const handleSave = () => {
        const nextDayTimestamp = moment().add(1, 'days').startOf('day').valueOf();
        const payload = {
            out_of_stock: outOfStock,
            out_of_stock_next_day: value === 1 ? nextDayTimestamp : null,
            out_of_stock_until: value === 2 ? moment(until).unix() : null,
            id: row?._id,
            ...(type === 1 && { menu_item_order_types: orderTypes }),
        }

        const func = type === 1 ? editItem : editChoice
        dispatch(func(payload))
    }

    const handleReset = () => {
        setOpen({ open: false, row: {} })
    };

    const minTime = (value: any) => {
        if (value && new Date(value).toDateString() === new Date().toDateString()) {
            return new Date()
        } else return new Date(0, 0, 0, 0, 0)
    }

    const handleShowFor = (e: any) => {
        setShowFor(e.target.checked)
        if (!e.target.checked) {
            setOrderTypes([])
        }
    }

    const handleChange = (e: any) => {
        setValue(Number(e.target.value));
        if (Number(e.target.value) !== 2) {
            setUntil(null);
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
                    Availability
                </Typography>
                <IconButton onClick={handleReset} sx={{ fontSize: 25 }}>
                    <Icon icon={'ic:round-close'} />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 4, pt: '1rem !important', width: { xs: '100%', sm: '35rem' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 'auto' }}>
                    <FormControlLabel
                        control={<Checkbox
                            checked={outOfStock}
                            onChange={() => setOutOfStock(!outOfStock)}
                        />}
                        label='Out of stock'
                    />
                    <Collapse in={outOfStock} sx={{ pl: 6 }}>
                        <RadioGroup
                            value={value}
                            onChange={handleChange}
                        >
                            <FormControlLabel value={1} control={<Radio />} label='Until Tomorrow' />
                            <FormControlLabel value={2} control={<Radio />} label='Until...' />
                            <Collapse in={value === 2} sx={{ pl: 6 }}>
                                <CsDatePicker
                                    sx={{ my: 2 }}
                                    label='Date & Time'
                                    size="medium"
                                    placeholderText="Select Date & Time"
                                    selected={until}
                                    showTimeSelect
                                    timeIntervals={2}
                                    timeCaption="Time"
                                    dateFormat="dd/MM/yyyy h:mm aa"
                                    minDate={new Date()}
                                    minTime={minTime(until)}
                                    maxTime={new Date(0, 0, 0, 23, 59)}
                                    onChange={(date: any) => setUntil(date)}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Icon icon={'ic:twotone-date-range'} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Collapse>
                            <FormControlLabel value={3} control={<Radio />} label='Undetermined' />
                        </RadioGroup>
                    </Collapse>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showFor}
                                onChange={handleShowFor}
                            />
                        }
                        label='Show only for'
                    />
                    <Collapse in={showFor} sx={{ pl: 6 }}>
                        <CsAutocomplete
                            sx={{ mt: 2 }}
                            label='Select Services'
                            placeholder='Select Services'
                            options={['Pick-Up', 'Order Ahead', 'Delivery', 'Dine-In']}
                            multiple={true}
                            getOptionLabel={(option: any) => option || ''}
                            isOptionEqualToValue={(option: any, value: any) => option === value}
                            value={orderTypes}
                            onChange={(e: any, value: any) => setOrderTypes(value)}
                        />
                    </Collapse>
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

export default Availability