// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import LinearProgress from '@mui/material/LinearProgress'
import { useTheme } from '@mui/material/styles'

// Custom Imports
import Clients from './Clients'

// Icon Imports
import Icon from '@/@core/components/Icon'

const Ranking = () => {
  const theme = useTheme()
  const stats = '8.14k'
  const title = 'Visitors'
  const trend = 'negative'
  const trendNumber = '15.6%'
  const chipColor = 'primary'
  const chipText = `Year of ${new Date().getFullYear()}`
  const src = '/images/illustrations/characters/10.png'

  return (
    <>
      {/* <Card sx={{ mb: 5, p: 4, '&:hover': { '& .Btn': { opacity: 1 } } ,position: 'relative'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CustomAvatar color='warning' skin='light' variant='rounded'>
              <Icon icon={'solar:user-id-linear'} />
            </CustomAvatar>
            <Typography sx={{ fontWeight: 500, fontSize: '1.3rem', ml: 2 }}>200</Typography>
          </Box>
          <IconButton
            color='warning'
            className='Btn'
            sx={{
              bgcolor: theme => theme.palette.warning.lightOpacity,
              opacity: 0,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <Icon icon={'grommet-icons:share-rounded'} />
          </IconButton>
        </Box>
        <BgLayerChart color={theme.palette.warning.main} arr={[30, 90, 120, 150, 125, 165, 150, 235, 215, 185, 275, 285, 370]} />
        <Typography sx={{ fontWeight: 600, fontSize: '1.3rem', mb: 2 }}>
          Website Visitors
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>Last 7 Days</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '1.2rem', color: theme => theme.palette.warning.main }}>
              25%
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>Last 3 Years</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: '1.2rem', color: theme => theme.palette.warning.main }}>
              20,000
            </Typography>
          </Box>
        </Box>
      </Card> */}

      <Card className='relative' sx={{ mb: 6, '&:hover .Btn': { opacity: 1 } }}>
        <CardContent>
          <Grid container>
            <Grid item xs={7} className='flex flex-col justify-between gap-5'>
              <Box className='flex flex-rows items-center gap-2'>
                <Typography className='text-nowrap' fontSize={'1.3rem'} fontWeight={800}>
                  {title}
                </Typography>
                <IconButton
                  color='primary'
                  className='Btn'
                  sx={{
                    bgcolor: theme.palette.primary.lightOpacity,
                    opacity: 0,
                    ml: 2,
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <Icon icon={'grommet-icons:share-rounded'} />
                </IconButton>
              </Box>
              <Chip
                size='small'
                variant='tonal'
                label={chipText}
                color={chipColor}
                sx={{ width: 'fit-content', px: 2, mt: -2 }}
              />
              <div className='flex flex-wrap items-center gap-x-2'>
                <Typography variant='h4'>{stats}</Typography>
                <Typography color={trend === 'negative' ? 'error.main' : 'success.main'}>
                  {`${trend === 'negative' ? '-' : '+'}${trendNumber}`}
                </Typography>
              </div>
            </Grid>
            <img src={src} alt={title} className='absolute block-end-0 inline-end-5 self-end bs-[130px] is-auto' />
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ p: 4, '&:hover .Btn': { opacity: 1 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', ml: 2 }}>Google ranking</Typography>
          <IconButton
            color='primary'
            className='Btn'
            sx={{
              bgcolor: theme => theme.palette.primary.lightOpacity,
              opacity: 0,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <Icon icon={'grommet-icons:share-rounded'} />
          </IconButton>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: 500, mb: 1 }}>Pizzaholic</Typography>
          <LinearProgress variant='determinate' color='primary' value={70} sx={{ mb: 2 }} />

          <Typography sx={{ fontWeight: 500, mb: 1 }}>Pizzaholic Amsterdam</Typography>
          <LinearProgress variant='determinate' color='success' value={50} sx={{ mb: 2 }} />

          <Typography sx={{ fontWeight: 500, mb: 1 }}>Pizzaholic Menu</Typography>
          <LinearProgress variant='determinate' color='secondary' value={85} sx={{ mb: 2 }} />
        </Box>
      </Card>
      <Clients />
    </>
  )
}

export default Ranking
