'use client'

import Icon from '@/@core/components/Icon'
// MUI Imports
import { Box, Card, IconButton, InputAdornment, LoadingButton, TextField, Typography } from '@/Helper/MUIImports'
import LinearProgress from '@mui/material/LinearProgress'
import { useRef, useState } from 'react'

const AlertCall = () => {

    // State
    const [playing, setPlaying] = useState<boolean>(false)
    const [progress, setProgress] = useState(0)
    const audioRef = useRef<any>(null)

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (playing) {
                // Pause and reset the audio
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setProgress(0);
            } else {
                // Play the audio
                audioRef.current.play();
            }
            setPlaying(!playing);
        }
    };

    const updateProgress = () => {
        if (audioRef.current) {
            const { currentTime, duration } = audioRef.current;
            setProgress((currentTime / duration) * 100);
        }
    };

    const handleEnded = () => {
        setPlaying(false);
        setProgress(0); // Reset progress when the audio ends
    };

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
                        <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Alert Call</Typography>
                    </Box>
                    <LoadingButton
                        variant='contained'
                        sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}

                    >
                        Save
                    </LoadingButton>
                </Box>
                <Box sx={{ p: 6, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                        <Box sx={{ width: { xs: '100%', sm: '65%' } }}>
                            <Typography sx={{ fontWeight: 400, fontSize: '1.2rem', fontStyle: 'italic' }}>
                                Receive an alert call if an order fails to reach the order-taking app in real time.
                            </Typography>
                            <Box
                                sx={{
                                    my: 4,
                                    border: (theme) => `1px solid ${theme.palette.divider}`,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4
                                }}
                            >
                                <Box sx={{ borderRight: theme => `1px solid ${theme.palette.divider}`, p: 4 }}>
                                    <IconButton
                                        color="primary"
                                        onClick={togglePlayPause}
                                        sx={{ bgcolor: (theme) => theme.palette.primary.lightOpacity }}
                                    >
                                        <Icon icon={playing ? 'stash:square-solid' : 'iconoir:play-solid'} />
                                    </IconButton>
                                </Box>
                                <Box sx={{ width: '100%', p: 4 }}>
                                    <Typography sx={{ fontWeight: 500, fontSize: '1.1rem' }}>Play Notification</Typography>
                                    <LinearProgress variant="determinate" value={progress} sx={{ my: 2 }} />
                                    <audio
                                        ref={audioRef}
                                        src="/images/OrderTake/SampleAudio.mp3"
                                        onTimeUpdate={updateProgress}
                                        onEnded={handleEnded}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ pt: 4 }}>
                                <Typography sx={{ fontWeight: 700 }}>
                                    Enter the phone number of the restaurant's ordering supervisor:
                                </Typography>
                                <TextField
                                    sx={{ mt: 2 }}
                                    placeholder='Enter Phone Number'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <Icon icon={'mingcute:phone-fill'} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: { xs: '100%', sm: '35%' } }}>
                            <Box
                                component={'img'}
                                src='/images/OrderTake/PhoneCall.png'
                                sx={{ width: '100%', height: 'auto' }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default AlertCall