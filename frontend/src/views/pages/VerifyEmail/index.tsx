'use client'

// Next Imports
import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import { Card, Box, LoadingButton, Typography, CardContent } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { verifyEmail } from '@/redux-store/Auth/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

const VerifyEmail = () => {

    // Hooks
    const dispatch = useDispatch()
    const searchParams = useSearchParams();
    const router = useRouter()
    const { isLoading } = useSelector((state: any) => state.auth)
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const handleVerifyEmail = async () => {
        const res = await verifyEmail({ token: token, email: email }, dispatch)
        if (res?.success && res?.statusCode === 200) {
            router.push("/login");
        }
    }

    return (
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh' }}>
            <Card sx={{ p: 4, width: { xs: '100%', sm: '460px' }, position: 'relative', zIndex: 2 }}>
                <CardContent sx={{ p: 10 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            mb: 5,
                            flexDirection: { xs: "column", sm: "row", md: "row" }
                        }}
                    >
                        <Icon icon={'mdi:email-check'} fontSize={40} />
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontSize: { xs: "1.3rem", sm: "2rem", md: "2rem" },
                                fontWeight: 700,
                            }}
                        >
                            Verify Your Email
                        </Typography>
                    </Box>
                    <Typography sx={{ mb: 6, fontWeight: 300, textAlign: { xs: "center", sm: "left" } }}>
                        Account activation link sent to your email address: <b>{email}</b> Please follow the link inside to continue.
                    </Typography>
                    <Box sx={{ mb: 5 }}>
                        <LoadingButton
                            fullWidth
                            size='large'
                            variant='contained'
                            loading={isLoading}
                            loadingPosition='start'
                            onClick={() => handleVerifyEmail()}
                        >
                            Verify Email
                        </LoadingButton>
                    </Box>
                </CardContent>
            </Card>
            <Box component={'img'}
                src={'/images/pages/auth-v1-mask-3-light.png'}
                sx={{ width: '100%', height: 'auto', position: 'absolute', bottom: '1rem', zIndex: '1', display: { xs: 'none', sm: 'block' } }}
            />
        </Box>
    )
}

export default VerifyEmail;
