'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Imports
import CsAutocomplete from '@/@core/components/CsAutocomplete'
import CsTextField from '@/@core/components/CsTextField'
import SeeMore from './SeeMore'
import AddAccount from './AddAccount'

// Icon Imports
import Icon from '@/@core/components/Icon'

interface Item {
  src: string
  desc: string
}

const CatalogView = () => {
  // State
  const [type, setType] = useState<{ label: string; value: number }>({ label: 'All', value: 1 })
  const [val, setVal] = useState<string>('')
  const [isSee, setIsSee] = useState<{ open: boolean; data: any }>({ open: false, data: {} })
  const [isAdd, setIsAdd] = useState<boolean>(false)

  const arr: Item[] = [
    {
      src: 'Clover.svg',
      desc: "With free monthly plans, this integration automatically sends the restaurant's online orders to your Clover POS. The integration eliminates..."
    },
    {
      src: 'GTM.svg',
      desc: 'Google Tag Manager is a free tool that enables you to install, store, and manage marketing tags without modifying website code.'
    },
    {
      src: 'Orderload.svg',
      desc: 'Orderlord is a system for restaurants and chains to manage, dispatch and route orders. It also tracks drivers and delights customers by...'
    },
    {
      src: 'Otter.svg',
      desc: 'Otter POS (tablet and printer) is integrated with this online ordering solution ensuring you have all orders in one system, and that digital...'
    },
    {
      src: 'Shipday.svg',
      desc: 'Shipday (previously QuestTag), offers a free restaurant delivery management software with Mobile Apps for drivers and real-time tracking for...'
    },
    {
      src: 'Simphony.svg',
      desc: 'Restaurants that are already using Simphony POS, can take the business to the next level by connecting it with this online ordering system....'
    },
    {
      src: 'Spoonity.svg',
      desc: 'Spoonity payment method : Spoonity provides a turn key mobile solution for restaurants interested in providing food-clients the ability to...'
    },
    {
      src: 'Spoonity.svg',
      desc: 'Spoonity loyalty : Spoonity provides a turn key mobile solution for restaurants interested in providing food-clients the ability to pre-pay,...'
    },
    {
      src: 'Tookan.svg',
      desc: "Tookan equips admin and managers with a bird's eye view of all the business operations and helps in optimizing routes, allocating resources,..."
    }
  ]

  return (
    <>
      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 4
          }}
        >
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>Catalog</Typography>
          <CsTextField
            sx={{ width: '100%' }}
            fullWidth
            placeholder='Search'
            value={val}
            onChange={(e: any) => setVal(e.target.value)}
            StartIcon={<Icon icon={'ic:round-search'} />}
          />
          <CsAutocomplete
            sx={{ width: { xs: '100%', sm: '30rem' } }}
            options={[
              { label: 'All', value: 1 },
              { label: 'Client payment tab', value: 2 },
              { label: 'Post-order rewards collection', value: 3 },
              { label: 'Delivery tracking', value: 4 },
              { label: 'On-demand delivery service', value: 5 },
              { label: 'POS', value: 6 },
              { label: '3rd party tracking', value: 7 }
            ]}
            isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
            multiple={false}
            getOptionLabel={(option: any) => option?.label || ''}
            value={type}
            onChange={(e: any, value: any) => setType(value)}
          />
        </Box>
        <Grid container columnSpacing={4} rowSpacing={4} sx={{ pt: 4, width: '100%', m: 0 }}>
          {Array.isArray(arr) &&
            arr?.length > 0 &&
            arr?.map((item: Item, index: number) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Card sx={{ p: 4 }}>
                    <Box
                      component={'img'}
                      src={`/images/Catalog/${item?.src}`}
                      sx={{ maxWidth: '100%', height: '3.75rem' }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        my: 4,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 3
                      }}
                    >
                      {item?.desc}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 4 }}>
                      <Typography
                        sx={{
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          fontWeight: 500,
                          transition: 'all 0.2s ease-in-out',
                          '&:hover': { textDecoration: 'none', color: theme => theme.palette.primary.main }
                        }}
                        onClick={() => setIsSee({ open: true, data: item })}
                      >
                        See More
                      </Typography>
                      <LoadingButton variant='contained' onClick={() => setIsAdd(true)}>
                        Add
                      </LoadingButton>
                    </Box>
                  </Card>
                </Grid>
              )
            })}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 4 }}>
                <Box component={Icon} icon={'tabler:plus'} sx={{ color: theme => theme.palette.text.secondary }} />
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Custom integration</Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  my: 4,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  WebkitLineClamp: 3
                }}
              >
                If you aim for a more custom setup you may integrate your own specialized tab. You may start by hiring
                your own professional developer and use our API.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end', pt: 4 }}>
                <LoadingButton variant='contained' onClick={() => setIsAdd(true)}>
                  Add
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {isSee?.open && <SeeMore open={isSee?.open} setOpen={setIsSee} data={isSee?.data} />}

      {isAdd && <AddAccount open={isAdd} setOpen={setIsAdd} />}
    </>
  )
}

export default CatalogView
