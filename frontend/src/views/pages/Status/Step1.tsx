// React Imports
import { useState } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import LoadingButton from '@mui/lab/LoadingButton'

// Icon Imports
import Icon from '@/@core/components/Icon'

const Step1 = () => {
  // State
  const [isexpand, setIsExpand] = useState<number | null>(null)

  const style = { color: (theme: any) => theme.palette.warning.main, mr: 4 }

  const issueArr = [
    {
      label: 'Content optimization (6 issues)',
      icon: 'icon-park-twotone:caution',
      isDone: false,
      content: (
        <Grid container sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} sm={3}>
            <Typography>Schema.org</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added for opening hours.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added for address.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added to latitude / longitude.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added to menu link.'
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Visitor to order conversion (2 issues)',
      icon: 'icon-park-twotone:caution',
      isDone: false,
      content: (
        <Grid container sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} sm={3}>
            <Typography>Schema.org</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added for opening hours.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added for address.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added to latitude / longitude.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added to menu link.'
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Google Page Speed Test',
      icon: 'icon-park-twotone:check-one',
      isDone: true,
      content: (
        <Grid container sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} sm={3}>
            <Typography>Domain name</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <FormControlLabel
              sx={{ mb: 2 }}
              control={
                <Box
                  component={Icon}
                  icon={'icon-park-twotone:check-one'}
                  sx={{ color: theme => theme.palette.success.main, mr: 4 }}
                />
              }
              label='Your domain is a real domain name. This helps to rank well in search engines.'
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Domain name',
      icon: 'icon-park-twotone:check-one',
      isDone: true,
      content: (
        <Grid container sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} sm={3}>
            <Typography>Domain name</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <FormControlLabel
              sx={{ mb: 2 }}
              control={
                <Box
                  component={Icon}
                  icon={'icon-park-twotone:check-one'}
                  sx={{ color: theme => theme.palette.success.main, mr: 4 }}
                />
              }
              label='Your domain is a real domain name. This helps to rank well in search engines.'
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Security',
      icon: 'icon-park-twotone:check-one',
      isDone: true,
      content: (
        <Grid container sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} sm={3}>
            <Typography>Domain name</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <FormControlLabel
              sx={{ mb: 2 }}
              control={
                <Box
                  component={Icon}
                  icon={'icon-park-twotone:check-one'}
                  sx={{ color: theme => theme.palette.success.main, mr: 4 }}
                />
              }
              label='Your domain is a real domain name. This helps to rank well in search engines.'
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Structured data (4 issues)',
      icon: 'icon-park-twotone:caution',
      isDone: false,
      content: (
        <Grid container sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} sm={3}>
            <Typography>Schema.org</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added for opening hours.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added for address.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added to latitude / longitude.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added to menu link.'
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Social media and local listings (3 issues)',
      icon: 'icon-park-twotone:caution',
      isDone: false,
      content: (
        <Grid container sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} sm={3}>
            <Typography>Schema.org</Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added for opening hours.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added for address.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added to latitude / longitude.'
            />
            <FormControlLabel
              sx={{ mb: 2 }}
              control={<Box component={Icon} icon={'icon-park-twotone:caution'} sx={style} />}
              label='Schema.org should be added to menu link.'
            />
          </Grid>
        </Grid>
      )
    }
  ]

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          component={Icon}
          icon={'line-md:speedometer-loop'}
          fontSize={60}
          sx={{ color: theme => theme.palette.primary.main }}
        />
        <Box sx={{ ml: 4 }}>
          <Typography sx={{ fontWeight: 700, mb: 2 }}>
            15 issues found. Your website needs immediate attention!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 4 }}>nento.com</Typography>
            <LoadingButton size='small' color='success' sx={{ py: 1 }}>
              Re-scan
            </LoadingButton>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box sx={{ my: 4 }}>
        {Array.isArray(issueArr) &&
          issueArr?.length > 0 &&
          issueArr?.map((item: any, index: number) => {
            return (
              <Accordion
                key={index}
                expanded={isexpand === index}
                onChange={() => (isexpand === index ? setIsExpand(null) : setIsExpand(index))}
                sx={{
                  mb: 4,
                  boxShadow: 'none',
                  border: theme => `1px solid ${theme.palette.divider}`,
                  borderRadius: '6px !important',
                  '&:before': { bgcolor: 'transparent' }
                }}
              >
                <AccordionSummary sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    component={Icon}
                    icon={item?.icon}
                    sx={{ color: theme => (item?.isDone ? theme.palette.success.main : theme.palette.warning.main) }}
                  />
                  <Typography sx={{ fontWeight: '600 !important', fontSize: '1rem', ml: 2 }}>{item?.label}</Typography>
                </AccordionSummary>
                <AccordionDetails>{item?.content}</AccordionDetails>
              </Accordion>
            )
          })}
      </Box>
    </>
  )
}

export default Step1
