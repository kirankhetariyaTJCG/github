// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'

// MUI Imports
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import LoadingButton from '@mui/lab/LoadingButton'

// Custom Imports
import CsSelect from '@/@core/components/CsSelect'
import EmailPreview from '../KickStarter/InviteProspects/EmailPreview'

// Icon Imports
import Icon from '@/@core/components/Icon'

interface Props {
  item: any
  setIsStart: (isStart: boolean) => void
}

const AddCampaign = (props: Props) => {
  // Vars
  const opt1 = [
    {
      label: '15% OFF, yours for the taking',
      value: '1',
      text1: 'Enjoy 15% OFF your next purchase!',
      text2: 'This offer is exclusive and available for a limited time. Don’t miss out!',
      button_text: 'Claim Your 15% OFF'
    },
    {
      label: 'Online payment discount',
      value: '2',
      text1: 'Pay online and get an additional discount!',
      text2: 'Secure your order now and enjoy instant savings by choosing online payment.',
      button_text: 'Avail Online Discount'
    }
  ]

  const opt2 = [
    {
      label: '20% OFF, yours for the taking',
      value: '1',
      text1: "Don't miss out on our exclusive 20% discount!",
      text2: 'Use the code at checkout and enjoy the savings.',
      button_text: 'Redeem 20% OFF'
    },
    {
      label: '15% OFF, yours for the taking',
      value: '2',
      text1: 'Grab a 15% discount, just for you!',
      text2: 'Apply the promo code during your next purchase.',
      button_text: 'Redeem 15% OFF'
    },
    {
      label: 'Online payment discount',
      value: '3',
      text1: 'Save more with online payments.',
      text2: 'Get a special discount when you pay online.',
      button_text: 'Use Online Payment Discount'
    }
  ]

  const opt3 = [
    {
      label: `It's not too late to complete your order`,
      value: '1',
      text1: 'John, you left some items in the cart',
      text2: '',
      button_text: 'RESUME YOUR ORDER'
    }
  ]

  // Props
  const { item, setIsStart } = props

  // State
  const [value, setValue] = useState<string>('1')
  const [isexpand, setIsExpand] = useState<number | null>(null)
  const [options, setOptions] = useState<any[]>([])

  // Hooks
  const router = useRouter()

  useEffect(() => {
    setOptions(item.index === 0 ? opt1 : item?.index === 1 ? opt2 : item?.index === 2 ? opt3 : [])
  }, [item?.index])

  return (
    <Box sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px' }}>
      <Grid container spacing={4} sx={{ width: '100%', m: 0 }}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontWeight: 600 }}>From:</Typography>
              <Typography sx={{ ml: 2 }}>Pizzaholic</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ fontWeight: 600 }}>Subject:</Typography>
              <Typography sx={{ ml: 2 }}>Zin in iets … lekkers?</Typography>
            </Box>
            <Divider sx={{ mt: 2 }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'auto',
              height: 'calc(100vh - 15rem)'
            }}
          >
            <EmailPreview
              data={{
                promotion: item?.index === 2 ? options[0].label : options.find(z => z.value === value)?.label || '',
                text_1: item?.index === 2 ? options[0].text1 : options.find(z => z.value === value)?.text1 || '',
                text_2: item?.index === 2 ? options[0].text2 : options.find(z => z.value === value)?.text2 || '',
                button_text:
                  item?.index === 2 ? options[0].button_text : options.find(z => z.value === value)?.button_text || ''
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ borderLeft: theme => `1px solid ${theme.palette.divider}` }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, pr: 4 }}>
              <IconButton
                sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                color='primary'
                onClick={() => setIsStart(false)}
              >
                <Icon icon={'ion:arrow-back-outline'} />
              </IconButton>
              <LoadingButton variant='contained'>Start Campaign</LoadingButton>
            </Box>
            <Box>
              <Typography sx={{ fontSize: '1.2rem', fontWeight: 700 }}>{item?.title}</Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 500 }}>Audience: {item?.heading}</Typography>
            </Box>
            <Divider sx={{ mt: 4 }} />
          </Box>
          <Box sx={{ p: 4, overflow: 'auto', height: 'calc(100vh - 17rem)' }}>
            <Typography>
              {item?.index === 0
                ? 'Segmentation & communication logic: 7 days after using this online ordering system to place their first order, your customers will receive a message with the promotion below.'
                : item?.index === 1
                ? 'Segmentation & communication logic: the oldest 60% of the clients that have placed an online order in the last 180 days will receive a series of emails as detailed below. The message sequence stops as soon as they place a new order.'
                : 'Segmentation & communication logic: clients that start an order but don’t finalize it will receive approximately one hour later a follow up email to remind them about completing their order.'}
            </Typography>
            {item?.index >= 1 && (
              <Typography sx={{ mt: 4 }}>
                {item?.index === 1
                  ? 'For a successful campaign, we recommend you to give higher discounts for clients who haven’t ordered for longer periods of time.'
                  : 'Use abandoned cart emails to bring them back & encourage them to finish placing their order.'}
              </Typography>
            )}
            {item?.index === 0 && (
              <>
                <CsSelect
                  sx={{ mt: 6 }}
                  label={'Hours'}
                  name='hours'
                  value={value}
                  onChange={(e: any) => setValue(e.target.value)}
                  options={options}
                />
                <Box sx={{ display: 'flex', justifyContent: 'end', my: 2 }}>
                  <Typography
                    color={'primary'}
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => router.push('/marketing-tools/promotions/self-made')}
                  >
                    Add Promotion
                  </Typography>
                </Box>
                <Box sx={{ py: 2, px: 4, bgcolor: theme => theme.palette.info.lightOpacity }}>
                  <Typography>The email will share the same image & title as the selected promotion.</Typography>
                </Box>
              </>
            )}
            {item?.index === 1 && (
              <Box sx={{ my: 4 }}>
                {Array.from({ length: 5 }, (_, index: number) => {
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
                      <AccordionSummary>
                        <Typography sx={{ fontWeight: '600 !important', fontSize: '1rem' }}>
                          Message #{index + 1}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <CsSelect
                          sx={{ my: 6 }}
                          label={'Promotion'}
                          name='promotions'
                          value={value}
                          onChange={(e: any) => setValue(e.target.value)}
                          options={options}
                        />
                        <Typography>The email will share the same image & title as the selected promotion.</Typography>
                      </AccordionDetails>
                    </Accordion>
                  )
                })}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddCampaign
