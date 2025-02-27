// MUI Imports
import { Box, LoadingButton, Typography, Container, Divider, Avatar } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from "react-redux"

// Icon Imports
import Icon from "@/@core/components/Icon"

// Helper Imports
import AppUtils from "@/Helper/AppUtils"

const OrderAhead = () => {

    // Hooks
    const colorData = useSelector((state: any) => state.website.website.color)
    const fontType = useSelector((state: any) => state.website.website.fonts)
    const orderCards = [
        {
            src: 'order-book.jpg',
            desc: `<p>With our new&nbsp;<strong>"Table Reservations"</strong>&nbsp;&amp;&nbsp;<strong>"Order Ahead"</strong>&nbsp;functions, you save precious hours on restaurant waiting times.</p><p>You now have the chance to order your favorite meal before arriving at the restaurant.</p><p>Skip playing the waiting game for a table and for your food when you&rsquo;re at your hungriest.</p>`,
            btnText: 'Book A Table & Start Ordering'
        },
        {
            src: 'order-later.jpg',
            desc: `<p>We&rsquo;re very proud of our&nbsp;<strong>"Order for later"</strong>&nbsp;function, because it gives YOU the chance to order your food in advance and&nbsp;<strong>have it ready</strong>&nbsp;<strong>at any time of your choosing</strong>.</p><p>You're in complete control of your order. Could it get any better than this?</p>`,
            btnText: 'Order For Later'
        },
    ]

    return (
        <Container maxWidth='md' sx={{ textAlign: 'center', mb: 16 }}>
            <Box component={Icon} icon={'hugeicons:menu-restaurant'} sx={{ color: colorData?.main, fontSize: 45, mb: 4 }} />
            <Typography variant="h3"
                sx={{
                    fontWeight: 600,
                    color: colorData?.main,
                    ...AppUtils.getFontFamily(fontType)
                }}>
                Be In Complete Control Of Your 5 Star Dining Experience
            </Typography>
            <Divider sx={{ bgcolor: colorData?.main, width: '6rem', mx: 'auto', my: 8 }} />
            <Typography
                sx={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: '#4D4D4D',
                    ...AppUtils.getFontFamily(fontType)
                }}>
                You told us your problems. We listened. We’re cutting through the old ways and we’re constantly searching for brand new ways to innovate your restaurant experience. So it can all get a whole lot easier. Faster. And above all, convenient.
            </Typography>
            <Box sx={{ width: '100%', gap: 6, display: 'flex', alignItems: 'stretch', mt: 8, }}>
                {Array.isArray(orderCards) && orderCards?.length > 0 && orderCards?.map((card: any, index: number) => {
                    return (
                        <Box key={index}
                            sx={{
                                display: 'flex',
                                textAlign: 'left',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                border: theme => `1px solid ${theme.palette.divider}`,
                                borderRadius: '8px',
                                p: 4,
                                width: '50%',
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': { boxShadow: theme => theme.shadows[3] }
                            }}>
                            <Avatar
                                variant="rounded"
                                src={`images/preview/${card?.src}`}
                                sx={{ width: '100%', height: '12rem' }}
                            />
                            <Typography
                                sx={{
                                    fontWeight: 500, my: 6,
                                    ...AppUtils.getFontFamily(fontType)
                                }}
                                dangerouslySetInnerHTML={{ __html: card?.desc }}
                            />
                            <LoadingButton
                                size="large"
                                fullWidth variant="contained"
                                sx={{ ...AppUtils.getFontFamily(fontType), bgcolor: `${colorData?.main} !important` }}
                            >
                                {card?.btnText}
                            </LoadingButton>
                        </Box>
                    )
                })}
            </Box>
        </Container>
    )
}

export default OrderAhead