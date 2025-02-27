// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import {
    Dialog, DialogContent, DialogActions, DialogTitle, Typography, IconButton, RadioGroup,
    Radio, FormControlLabel, LoadingButton, Collapse, InputAdornment, Box, Chip, Checkbox
} from '@/Helper/MUIImports'

// Third Party Imports
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import CsDatePicker from '@/@core/components/CsDatePicker'

// Store Imports
import { setCategoryVisibility, setItemVisibility } from '@/redux-store/Category/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'
import AppUtils from '@/Helper/AppUtils'

interface Days {
    checked: boolean
    label: string
}

export const initialDays: Days[] = [
    { checked: false, label: 'Monday' },
    { checked: false, label: 'Tuesday' },
    { checked: false, label: 'Wednesday' },
    { checked: false, label: 'Thursday' },
    { checked: false, label: 'Friday' },
    { checked: false, label: 'Saturday' },
    { checked: false, label: 'Sunday' }
]

const Visibility = (props: ModelProps) => {

    // Props
    const { open, setOpen, row } = props

    // State
    const [value, setValue] = useState<number | null>(null)
    const [hideFrom, setHideFrom] = useState<number | null>(null)
    const [show, setShow] = useState<number | null>(null)
    const [hiddenUntil, setHiddenUntil] = useState<Date | null>(null)
    const [activeBegin, setActiveBegin] = useState<Date | null>(null)
    const [activeEnd, setActiveEnd] = useState<Date | null>(null)
    const [days, setDays] = useState<Days[]>(initialDays)
    const [activeExactFrom, setActiveExactFrom] = useState<Date | null>(null)
    const [activeExactUntil, setActiveExactUntil] = useState<Date | null>(null)

    // Hooks
    const dispatch = useDispatch()
    const loading = useSelector((state: any) => state.category.loading)

    useEffect(() => {
        const isAllFieldsNull = !row || !row.is_active && !row.hidden_until &&
            !row.active_begin && !row.active_days && !row.active_end &&
            !row.active_exact_from && !row.active_exact_until;

        if (isAllFieldsNull) {
            setValue(null)
            setShow(null)
            setHideFrom(null)
            setDays(initialDays.map(day => ({ ...day, checked: false })))
            setHiddenUntil(null)
            setActiveBegin(null)
            setActiveEnd(null)
            setActiveExactFrom(null)
            setActiveExactUntil(null)
            return
        }

        setValue(row.is_active ? 2 : 1)
        setShow(row.is_active && row.active_begin && row.active_days && row.active_end ? 1 : 2)
        setHideFrom(row.hidden_until ? 2 : 1)
        setDays(initialDays.map((day, index) => ({
            ...day,
            checked: row?.active_days?.includes(index + 1) || false
        })))
        setHiddenUntil(row.hidden_until ? moment.unix(row.hidden_until).toDate() : null)
        setActiveBegin(row.active_begin ? moment.unix(row.active_begin).toDate() : null)
        setActiveEnd(row.active_end ? moment.unix(row.active_end).toDate() : null)
        setActiveExactFrom(row.active_exact_from ? moment.unix(row.active_exact_from).toDate() : null)
        setActiveExactUntil(row.active_exact_until ? moment.unix(row.active_exact_until).toDate() : null)
    }, [row])

    useEffect(() => {
        !loading && handleReset()
    }, [loading])

    const handleValueChange = (newValue: number) => {
        setValue(newValue === value ? null : newValue)
        setHideFrom(null)
        setShow(null)
        setHiddenUntil(null)
        setActiveBegin(null)
        setDays(initialDays)
        setActiveEnd(null)
        setActiveExactFrom(null)
        setActiveExactUntil(null)
    }

    const handleHideFromChange = (newHideFrom: number) => {
        setHideFrom(hideFrom === newHideFrom ? null : newHideFrom)
        setShow(null)
        setHiddenUntil(null)
    }

    const handleShowChange = (newShow: number) => {
        setShow(newShow === show ? null : newShow)
        setHideFrom(null)
        setActiveBegin(null)
        setDays(initialDays)
        setActiveEnd(null)
        setActiveExactFrom(null)
        setActiveExactUntil(null)
    }

    const handleSave = () => {
        const activeDays = days
            .map((day, index) => (day.checked ? index + 1 : null))
            .filter(day => day !== null)

        const payload = {
            id: row?._id,
            type: row?.type,
            is_active: AppUtils.checkValue(value) ? value === 2 : null,
            active_begin: activeBegin ? moment(activeBegin).unix() : null,
            active_end: activeEnd ? moment(activeEnd).unix() : null,
            active_days: activeDays,
            active_exact_from: activeExactFrom ? moment(activeExactFrom).unix() : null,
            active_exact_until: activeExactUntil ? moment(activeExactUntil).unix() : null,
            hidden_until: hiddenUntil ? moment(hiddenUntil).unix() : null
        }
        row?.type === 1
            ? dispatch(setCategoryVisibility(payload))
            : dispatch(setItemVisibility(payload))
    }

    const handleReset = () => {
        setOpen({ open: false, row: {} })
        setValue(1);
        setShow(1);
        setHideFrom(1);
        setDays(initialDays.map(day => ({ ...day, checked: false })));
        setHiddenUntil(null);
        setActiveBegin(null);
        setActiveEnd(null);
        setActiveExactFrom(null);
        setActiveExactUntil(null);
    };

    const getInputProps = (icon: string) => ({
        readOnly: true,
        endAdornment: (
            <InputAdornment position="end">
                <Icon icon={icon} />
            </InputAdornment>
        ),
    });

    const minTime = (value: any) => {
        if (value && new Date(value).toDateString() === new Date().toDateString()) {
            return new Date()
        } else return new Date(0, 0, 0, 0, 0)
    }

    return (
        <Dialog maxWidth='md' open={open}
            onClose={handleReset}
            sx={{ '.MuiPaper-root': { overflowY: 'unset' } }}>
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
                    px: 4,
                    py: 3
                }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>Visibility</Typography>
                <IconButton onClick={() => setOpen({ open: false, row: {} })}>
                    <Icon icon={'ic:round-close'} />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 4, pt: '1rem !important', width: { sm: '40rem' } }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={value === 1}
                            onChange={() => handleValueChange(1)}
                        />
                    } label='Hide' />
                <Collapse in={value === 1}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', pl: 6 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hideFrom === 1}
                                    onChange={() => handleHideFromChange(1)}
                                />
                            }
                            label='From Menu'
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hideFrom === 2}
                                    onChange={() => handleHideFromChange(2)}
                                />
                            }
                            label='Until...'
                        />
                    </Box>
                    <Collapse in={hideFrom === 2}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, my: 1, pl: 6 }}>
                            <CsDatePicker
                                label='Date & Time'
                                size="medium"
                                placeholderText="Select Date & Time"
                                selected={hiddenUntil}
                                showTimeSelect
                                timeIntervals={1}
                                timeCaption="Time"
                                dateFormat="dd/MM/yyyy h:mm aa"
                                minDate={new Date()}
                                minTime={minTime(hiddenUntil)}
                                maxTime={new Date(0, 0, 0, 23, 59)}
                                onChange={(date: any) => setHiddenUntil(date)}
                                InputProps={getInputProps('ic:twotone-date-range')}
                            />
                        </Box>
                    </Collapse>
                </Collapse>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={value === 2}
                            onChange={() => handleValueChange(2)}
                        />
                    }
                    label='Show'
                />
                <Collapse in={value === 2}>
                    <RadioGroup value={show} onChange={e => handleShowChange(Number(e.target.value))} sx={{ pl: 6 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={show === 1}
                                    onChange={() => handleShowChange(1)}
                                />
                            }
                            label='Only From...'
                        />
                        <Collapse in={show === 1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, my: 1, pl: 6 }}>
                                <CsDatePicker
                                    label='Start Time'
                                    placeholderText='Select Start Time'
                                    showTimeSelect
                                    size='medium'
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption='Time'
                                    dateFormat='h:mm aa'
                                    selected={activeBegin}
                                    onChange={(date: any) => setActiveBegin(date)}
                                    InputProps={getInputProps('mdi:calendar-time')}
                                />
                                <CsDatePicker
                                    label='End Time'
                                    placeholderText='Select End Time'
                                    showTimeSelect
                                    size='medium'
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption='Time'
                                    dateFormat='h:mm aa'
                                    selected={activeEnd}
                                    onChange={(date: any) => setActiveEnd(date)}
                                    InputProps={getInputProps('mdi:calendar-time')}
                                />
                            </Box>
                            <Box
                                sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', pl: 6, gap: 2, my: 2 }}>
                                {Array.isArray(days) && days?.length > 0 &&
                                    days?.map((day: Days, index: number) => {
                                        return (
                                            <Chip
                                                key={index}
                                                label={day?.label}
                                                variant='outlined'
                                                sx={{
                                                    height: '28px',
                                                    color: theme => day?.checked
                                                        ? theme.palette.primary.main
                                                        : theme.palette.text.primary,
                                                    borderColor: theme => day?.checked
                                                        ? theme.palette.primary.main
                                                        : theme.palette.divider
                                                }}
                                                clickable
                                                onClick={() => {
                                                    setDays(prev => prev?.map((item: Days, i: number) =>
                                                        i === index
                                                            ? { ...item, checked: !day?.checked }
                                                            : item))
                                                }}
                                            />
                                        )
                                    })
                                }
                            </Box>
                        </Collapse>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={show === 2}
                                    onChange={() => handleShowChange(2)}
                                />
                            }
                            label='From - Until...'
                        />
                        <Collapse in={show === 2}>
                            <Box sx={{ pl: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Box sx={{ borderRadius: '8px', border: theme => `1px solid ${theme.palette.divider}`, px: 4, pt: 2 }}>
                                    <Typography sx={{ fontWeight: 700, mb: 2 }}>From</Typography>
                                    <CsDatePicker
                                        sx={{ mb: 4 }}
                                        size="medium"
                                        label='Date & Time'
                                        placeholderText="Select Date & Time"
                                        showTimeSelect
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        minDate={new Date()}
                                        minTime={minTime(activeExactFrom)}
                                        maxTime={new Date(0, 0, 0, 23, 59)}
                                        selected={activeExactFrom}
                                        onChange={(date: any) => setActiveExactFrom(date)}
                                        InputProps={getInputProps('ic:twotone-date-range')}
                                    />
                                </Box>
                                <Box
                                    sx={{ borderRadius: '8px', border: theme => `1px solid ${theme.palette.divider}`, px: 4, pt: 2 }}>
                                    <Typography sx={{ fontWeight: 700, mb: 2 }}>Until</Typography>
                                    <CsDatePicker
                                        sx={{ mb: 4 }}
                                        size='medium'
                                        label='Date & Time'
                                        placeholderText='Select Date & Time'
                                        showTimeSelect
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="dd/MM/yyyy h:mm aa"
                                        minDate={new Date()}
                                        minTime={minTime(activeExactUntil)}
                                        maxTime={new Date(0, 0, 0, 23, 59)}
                                        selected={activeExactUntil}
                                        onChange={(date: any) => setActiveExactUntil(date)}
                                        InputProps={getInputProps('ic:twotone-date-range')}
                                    />
                                </Box>
                            </Box>
                        </Collapse>
                    </RadioGroup>
                </Collapse>
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

export default Visibility