'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, Card, Typography, Switch } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const BillingDetailsView = () => {

    // State
    const [billingDetails, setBillingDetails] = useState<boolean>(false)

    // Hooks
    const { restaurant, loading } = useSelector((state: any) => state.restaurant)
    const dispatch = useDispatch()

    useEffect(() => {
        if (AppUtils.checkValue(restaurant) && Object.keys(restaurant)?.length > 0) {
            setBillingDetails(restaurant?.allow_billing_details)
        }
    }, [restaurant])

    const handleNext = () => {
        const data = { id: restaurant?._id, allow_billing_details: billingDetails }
        dispatch(editRestaurantDetail({ data, old_restaurant_data: restaurant }))
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ width: { xs: '100%', lg: '50%' } }}>
                <Box
                    sx={{
                        p: 4,
                        borderBottom: theme => `1px solid ${theme.palette.divider}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}
                >
                    <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Billing details at checkout</Typography>
                    <LoadingButton
                        variant='contained'
                        onClick={handleNext}
                        loading={loading}
                        loadingPosition='start'
                        startIcon={<Icon icon="material-symbols:save" fontSize='5.5rem' />}>
                        Save
                    </LoadingButton>
                </Box>
                <Box sx={{ p: 6, mx: 'auto' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}
                    >
                        <Typography>Would you like to collect billing details during checkout?</Typography>
                        <Switch
                            checked={billingDetails}
                            onChange={() => setBillingDetails(!billingDetails)}
                        />
                    </Box>
                </Box>
            </Card>

        </Box>
    )
}

export default BillingDetailsView