// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import { Box, CircularProgress, IconButton, Typography, Dialog, DialogContent, DialogTitle, Divider } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'

// Custom Imports
const VideoPlayer = dynamic(() => import('@/@core/components/VideoPlayer'), {
    loading: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '16/9' }}>
            <CircularProgress color='primary' />
        </Box>
    )
})

// Icon Import
import Icon from '@/@core/components/Icon'

// Types Imports
import { ModelProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const VideosDialog = ({ open, setOpen, row }: ModelProps) => {
    // Hooks
    const fontType = useSelector((state: any) => state.website.website.fonts)
    const colorData = useSelector((state: any) => state.website.website.color)

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen({ open: false, row: {} })}
                maxWidth='md'
                sx={{ '.MuiPaper-root': { width: '60rem' } }}>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 4, py: 3, borderBottom: theme => `1px solid ${theme.palette.divider}`
                    }}>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: '1.25rem',
                            color: colorData?.main,
                            ...AppUtils.getFontFamily(fontType)
                        }}>
                        {row?.title}
                    </Typography>
                    <IconButton
                        onClick={() => setOpen({ open: false, row: {} })}
                        sx={{ color: colorData?.main, bgcolor: `${colorData?.light} !important` }}>
                        <Icon icon='mdi:close' />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: '1rem !important' }}>
                    <Box
                        sx={{
                            width: '100%', height: '100%',
                            '& #video-player': { width: '100% !important', height: '100% !important' },
                            '& > div > div > iframe': { borderRadius: '8px' }
                        }}
                    >
                        <VideoPlayer
                            style={{ width: '100%', aspectRatio: '16/9' }}
                            url={row?.url}
                            controls={true}
                            onEnded={() => setOpen({ open: false, row: {} })}
                        />
                    </Box>
                    <Divider sx={{ my: 4 }} />
                    <Typography
                        sx={{ fontWeight: 500, fontSize: '0.9rem', ...AppUtils.getFontFamily(fontType) }}
                        dangerouslySetInnerHTML={{ __html: row?.description }}
                    />
                </DialogContent>
            </Dialog>

        </>
    )
}

export default VideosDialog
