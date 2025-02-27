// ** React Import
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

// ** Third Party Import
import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy'


const VideoPlayer = (props: ReactPlayerProps) => {

    // Props
    const { url } = props

    return (
        <React.Suspense
            fallback={
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        height: '100%'
                    }}
                >
                    <CircularProgress color='primary' />
                    <Typography sx={{ mt: '0.5rem' }}>Loading...</Typography>
                </Box>
            }
        >
            <ReactPlayer
                {...props}
                id='video-player'
                url={url}
                onProgress={props?.onTimeUpdate}
                fallback={
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                        }}
                    >
                        <CircularProgress color='primary' />
                        <Typography sx={{ mt: '0.5rem' }}>Loading...</Typography>
                    </Box>
                }
            />
        </React.Suspense>
    )
}

export default VideoPlayer
