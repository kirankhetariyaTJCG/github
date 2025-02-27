'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, Card, Divider, IconButton, InputAdornment, LoadingButton, TextField, Typography } from '@/Helper/MUIImports'

// Third Party Imports
import QRCode from 'react-qr-code'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { getLoginHistory, sendAppLink } from '@/redux-store/OrderTakingApp/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const OrderTakingApp = () => {

    // State
    const [step, setStep] = useState<number>(1)
    const [toggle, setToggle] = useState<boolean>(false)
    const [timeSince, setTimeSince] = useState('')
    const [email, setEmail] = useState('')
    const [isFetching, setIsFetching] = useState(true)

    // Hooks
    const dispatch = useDispatch()
    const { restaurant } = useSelector((state: any) => state.restaurant)
    const loginHistory = useSelector((state: any) => state.takingOrder.takingOrder)
    const loading = useSelector((state: any) => state.takingOrder.loading)

    useEffect(() => {
        if (AppUtils.checkValue(loginHistory) && Object?.keys(loginHistory)?.length > 0) {
            setStep(4)
        }
    }, [loginHistory])

    useEffect(() => {
        if (AppUtils.checkValue(loginHistory?.last_seen_at)) {
            const updateTime = () => {
                const now = moment()
                const duration = moment.duration(now.diff(moment.unix(loginHistory?.last_seen_at)))
                const timeString = `${duration.days()} Days ${duration.hours()} Hours ${duration.minutes()} Minutes ${duration.seconds()} Seconds ago`
                setTimeSince(timeString)
            }

            const interval = setInterval(updateTime, 1000)
            updateTime()

            return () => clearInterval(interval)
        }
    }, [loginHistory?.last_seen_at])

    useEffect(() => {
        if (AppUtils.checkValue(restaurant?._id) && isFetching) {
            const fetchLoginHistory = () => dispatch(getLoginHistory({ restaurant_id: restaurant._id }))

            fetchLoginHistory()
            const interval = setInterval(fetchLoginHistory, 30000)
            return () => clearInterval(interval)
        }
    }, [restaurant?._id, isFetching])


    const handleSave = async () => {
        if (step === 2) {
            const res = await sendAppLink({ email: email })
            res?.success && res?.statusCode && setIsFetching(false)
        } else {
            setStep(step + 1)
        }
    }

    const details = [
        { label: 'Device:', value: loginHistory?.name ?? 'N/A' },
        { label: 'OS Version:', value: loginHistory?.os_version ?? 'N/A' },
        { label: 'Device ID:', value: loginHistory?.app ?? 'N/A' },
        { label: 'App version:', value: loginHistory?.app_version ?? 'N/A' },
    ]

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ width: '45rem' }}>
                <Box
                    sx={{
                        p: 4,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {step > 1 && step < 4 && (
                            <IconButton
                                color='primary'
                                sx={{ mr: 4, bgcolor: theme => theme.palette.primary.lightOpacity }}
                                onClick={() => setStep(step - 1)}
                            >
                                <Icon icon={'ion:arrow-back-outline'} />
                            </IconButton>
                        )}
                        <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>App Installation</Typography>
                    </Box>
                    {step !== 4 &&
                        <LoadingButton
                            variant='contained'
                            sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
                            disabled={step === 2 && !AppUtils.checkValue(email) && toggle}
                            loading={loading}
                            loadingPosition='start'
                            startIcon={<Icon icon="material-symbols:save" />}
                            onClick={handleSave}
                        >
                            Save
                        </LoadingButton>
                    }
                </Box>
                <Box sx={{ p: 6, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
                    {step === 1 &&
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 4,
                        }}>
                            <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                                <Typography sx={{ my: 4, fontSize: '1.2rem', fontWeight: 500 }}>
                                    Turn your device into a powerful order-receiving machine and streamline your business!
                                </Typography>
                                <Box>
                                    <Typography sx={{ mb: 2 }}>Requirements:</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        <Box sx={{ width: '11rem', gap: 2, display: 'flex', alignItems: 'center', fontSize: '1rem', fontWeight: 500 }}>
                                            <Icon icon={'mdi:apple'} fontSize={35} />
                                            Apple iOS 15+
                                        </Box>
                                        <Box sx={{ width: '11rem', gap: 2, display: 'flex', alignItems: 'center', fontSize: '1rem', fontWeight: 500 }}>
                                            <Box
                                                component={'img'}
                                                src='/images/OrderTake/PlayStore.svg'
                                                sx={{ width: '2rem', height: '2rem', ml: 1 }}
                                            />
                                            Android 8.0+
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                                <Box
                                    component={'img'}
                                    src='/images/OrderTake/OrderApp.png'
                                    sx={{ width: '100%', height: 'auto' }}
                                />
                            </Box>
                        </Box>
                    }
                    {step === 2 &&
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                                <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                                    {toggle
                                        ? <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
                                            Receive the app link directly in your inbox via email.
                                        </Typography>
                                        : <>
                                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Scan The QR Code</Typography>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 500, my: 2 }}>
                                                Use your phone's camera to scan the QR code and get started.
                                            </Typography>
                                        </>}
                                    {toggle
                                        ? <TextField
                                            placeholder='Enter Email'
                                            sx={{ my: 4 }}
                                            value={email}
                                            onChange={(e: any) => setEmail(e.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <Icon icon={'garden:email-fill-16'} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        : <Box sx={{ p: 3, border: `2px solid #000`, borderRadius: '8px', width: 'max-content', my: 4, display: 'flex' }}>
                                            <QRCode id='QR-Code' value={'10'} bgColor={'#fff'} fgColor={'#000'} size={150} />
                                        </Box>
                                    }
                                </Box>
                                <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                                    <Box
                                        component={'img'}
                                        src={`/images/OrderTake/${toggle ? 'Inbox' : 'Scan'}.png`}
                                        sx={{ width: '100%', height: 'auto' }}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ borderTop: theme => `1px solid ${theme.palette.divider}`, pt: 4 }}>
                                <LoadingButton
                                    size='small'
                                    sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                                    onClick={() => setToggle(!toggle)}
                                >
                                    I want to {toggle ? 'scan QR' : 'use Email'} instead
                                </LoadingButton>
                            </Box>
                        </Box>
                    }
                    {step === 3 &&
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                                <Box sx={{ width: { xs: '100%', sm: '45%' } }}>
                                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, mb: 4 }}>
                                        Start the app & login:
                                    </Typography>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography sx={{ fontWeight: 400 }}>
                                            Username:
                                        </Typography>
                                        <Typography sx={{ fontWeight: 700 }}>
                                            {restaurant?.user?.email}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 400 }}>
                                            Password:
                                        </Typography>
                                        <Typography sx={{ fontWeight: 700 }}>
                                            Enter the password you created during sign-up
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                                    <Box
                                        component={'img'}
                                        src={`/images/OrderTake/Login.png`}
                                        sx={{ width: '100%', height: 'auto' }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    }
                    {step === 4 &&
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 4 }}>
                                <Box
                                    component={Icon}
                                    icon={'material-symbols:check-box-rounded'}
                                    sx={{ color: theme => theme.palette.success.main, fontSize: 40 }}
                                />
                                <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>The app has been successfully connected.</Typography>
                            </Box>
                            <Box sx={{ pt: 4, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
                                <Box>
                                    {Array.isArray(details) && details?.length > 0 &&
                                        details?.map((detail, index: number) => {
                                            return (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 4,
                                                        mb: 3
                                                    }}
                                                >
                                                    <Typography sx={{ fontWeight: 500, fontSize: '1rem', width: { xs: 'auto', sm: '8rem' } }}>
                                                        {detail?.label}
                                                    </Typography>
                                                    <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>
                                                        {detail?.value}
                                                    </Typography>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                    <Typography sx={{ fontWeight: 500, mb: 1 }}>Last verified successful app connection:</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>{timeSince}</Typography>
                                </Box>
                                <Divider sx={{ my: 4 }} />
                                <LoadingButton onClick={() => setStep(1)}>Pair with another device</LoadingButton>
                            </Box>
                        </Box>
                    }
                </Box>
            </Card>
        </Box>
    )
}

export default OrderTakingApp