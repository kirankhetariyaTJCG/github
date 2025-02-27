// MUI Imports
import { Dialog, DialogTitle, DialogContent, Box, Typography, IconButton, Divider, DialogActions } from '@/Helper/MUIImports'

// Third Party Imports
import moment from 'moment'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { ModelProps } from '@/types'
import { orderType, paymentOptions } from '.'

const OrderDetails = (props: ModelProps) => {

    // Props 
    const { open, setOpen, row } = props

    const formatAddress = (address: {
        city?: string;
        street?: string;
        zipcode?: string;
        neighbourhood?: string;
        block?: string;
        intercom?: string;
        floor?: string;
        apartment?: string;
    }) => {
        if (!address) return '';

        const parts = [
            address.street,
            address.neighbourhood,
            address.block,
            address.city,
            address.zipcode,
            address.floor ? `Floor: ${address.floor}` : '',
            address.apartment ? `Apartment: ${address.apartment}` : '',
            address.intercom ? `Intercom: ${address.intercom}` : '',
        ];

        return parts.filter((part) => part?.trim()).join(', ');
    }

    const clientDetails = [
        { label: 'Order ID:', value: `${row?.order_id}`, },
        { label: 'Name:', value: `${row?.customer?.first_name} ${row?.customer?.last_name}`, },
        { label: 'Email:', value: row?.customer?.email, },
        { label: 'Phone No:', value: `+${row?.customer?.country_code} ${row?.customer?.phone}`, },
        { label: 'Order Type:', value: orderType[row?.order_type], },
        { label: 'Payment Method:', value: paymentOptions[row?.payment_method], },
        {
            label: 'Placed At:',
            value: `${moment(row?.order_date).format('MMM DD, YYYY')} ${moment(row?.order_date).format('hh:mm a')}`,
        },
        {
            label: 'Fulfillment Time:',
            value: `${moment(row?.available_date).format('MMM DD, YYYY')} ${moment(row?.available_time).format('hh:mm a')}`,
        },
        { label: 'Delivery Address:', value: formatAddress(row?.billing_details?.address), },
    ];

    return (
        <Dialog open={open} maxWidth='md'>
            <DialogTitle sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
                px: 4,
                py: 2
            }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
                    Order Details
                </Typography>
                <IconButton onClick={() => setOpen({ open: false, row: {} })} sx={{ fontSize: 25 }}>
                    <Icon icon={'ic:round-close'} />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 4, pt: '1rem !important', width: { xs: '100%', sm: '50rem' } }}>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Box
                        sx={{
                            border: theme => `1px solid ${theme.palette.divider}`,
                            borderRadius: '10px',
                            overflow: 'hidden',
                            width: { xs: '100%', sm: '50%' }
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: theme => theme.palette.primary.lighterOpacity,
                                px: 4,
                                py: 2,
                                borderBottom: theme => `1px solid ${theme.palette.divider}`
                            }}
                        >
                            <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: theme => theme.palette.primary.main }}>
                                Client Details
                            </Typography>
                        </Box>
                        <Box sx={{ p: 4 }}>
                            {Array.isArray(clientDetails) && clientDetails?.length > 0 &&
                                clientDetails?.map((details: any, index: number) => {
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                mb: 2
                                            }}
                                        >
                                            <Typography
                                                sx={{ fontWeight: 500, width: '50%', fontSize: '0.9rem' }}>
                                                {details?.label}
                                            </Typography>
                                            <Typography
                                                sx={{ fontWeight: 400, width: '50%', fontSize: '0.9rem' }}>
                                                {details?.value}
                                            </Typography>
                                        </Box>

                                    )
                                })
                            }
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            border: theme => `1px solid ${theme.palette.divider}`,
                            borderRadius: '10px',
                            overflow: 'hidden',
                            width: { xs: '100%', sm: '50%' }
                        }}
                    >
                        <Box sx={{ bgcolor: theme => theme.palette.primary.lighterOpacity, px: 4, py: 2, borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
                            <Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: theme => theme.palette.primary.main }}>
                                Items Details
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '88.5%' }}>
                            <Box sx={{ p: 4 }}>
                                <Box>
                                    {Array.isArray(row?.items) && row?.items?.length > 0 &&
                                        row?.items?.map((item: any, index: number) => {

                                            const basePrice = item?.size_id
                                                ? item.size_id.price
                                                : item.menu_item_id.price

                                            return (
                                                <Box key={index}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            mt: 2
                                                        }}
                                                    >
                                                        <Typography variant='body1' sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
                                                            {item?.menu_item_id?.name} {item?.size_id && Object?.keys(item?.size_id)?.length > 0 && `(${item?.size_id?.name})`}  x {item?.quantity}
                                                        </Typography>
                                                        <Typography sx={{ fontWeight: 600, color: '#000', fontSize: '0.9rem' }}>
                                                            ${(basePrice ?? 0).toFixed(2)}/-
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ pt: 2 }}>
                                                        {Array.isArray(item?.choices_array) && item?.choices_array?.length > 0 &&
                                                            item?.choices_array?.map((choice: any, choiceI: number) => {
                                                                return (
                                                                    <Box
                                                                        key={choiceI}
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'space-between'
                                                                        }}
                                                                    >
                                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                            <Icon icon={'bi:dot'} />
                                                                            <Typography
                                                                                sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                                                                                {choice?.name}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Typography sx={{ fontWeight: 600, color: '#000', fontSize: '0.8rem' }}>
                                                                            ${choice?.price ? choice?.price.toFixed(2) : "0.00"}/-
                                                                        </Typography>
                                                                    </Box>
                                                                )
                                                            })
                                                        }
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontSize: '0.9rem', color: '#000', fontWeight: 500 }}>
                                        Sub Total
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#000' }}>
                                        ${Array.isArray(row?.items) && row?.items?.reduce((subtotal: number, item: any) => {
                                            const basePrice = item?.size_id
                                                ? item.size_id.price
                                                : item.menu_item_id.price

                                            const choicesPrice = item?.choices_array?.reduce((sum: number, choice: any) => sum + (choice?.price || 0), 0)

                                            const totalItemPrice = basePrice + choicesPrice

                                            return subtotal + (totalItemPrice * item.quantity)
                                        }, 0).toFixed(2)}/-
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{ fontSize: '0.9rem', color: '#000', fontWeight: 500 }}>
                                        Taxes
                                    </Typography>
                                    <Box>
                                        {Array.isArray(row?.taxes) && row?.taxes?.length > 0 &&
                                            row?.taxes?.map((tax: any, index: number) => {
                                                return (
                                                    <Box
                                                        key={index}
                                                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <Icon icon={'bi:dot'} />
                                                            <Typography
                                                                sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                                                                {tax?.name} ({tax?.rate}%)
                                                            </Typography>
                                                        </Box>
                                                        <Typography sx={{ fontWeight: 600, color: '#000', fontSize: '0.9rem' }}>
                                                            ${tax?.amount.toFixed(2)}/-
                                                        </Typography>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderTop: theme => `1px solid ${theme.palette.divider}`,
                                    px: 4,
                                    py: 2
                                }}
                            >
                                <Typography sx={{ fontSize: '1rem', color: '#000', fontWeight: 600 }}>
                                    Grand Total
                                </Typography>
                                <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: theme => theme.palette.success.dark }}>
                                    ${(() => {
                                        const subtotal = Array.isArray(row?.items) && row?.items?.reduce((subtotal: number, item: any) => {
                                            const basePrice = item?.size_id
                                                ? item?.size_id?.price
                                                : item?.menu_item_id?.price

                                            const choicesPrice = item?.choices_array?.reduce((sum: number, choice: any) => sum + (choice?.price || 0), 0)

                                            const totalItemPrice = basePrice + choicesPrice

                                            return subtotal + (totalItemPrice * item.quantity)
                                        }, 0) || 0

                                        const totalTax = Array.isArray(row?.taxes) && row?.taxes?.reduce((sum: number, tax: any) => sum + (tax?.amount || 0), 0) || 0

                                        return (subtotal + totalTax).toFixed(2)
                                    })()}/-
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default OrderDetails