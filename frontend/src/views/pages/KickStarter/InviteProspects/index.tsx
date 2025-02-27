'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useDispatch, useSelector } from 'react-redux'

// Custom Imports
import StepperView from './Stepper'
import ProspectsList from './ProspectsList'

// Store Imports
import { setDefaultSteps, is_list, setActiveStep } from '@/redux-store/InviteProspects'

const ProspectsView = () => {
  // State
  const [isView, setIsView] = useState<boolean>(false)
  const [isAdd, setIsAdd] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const html = `<div style="text-align: start;color: rgb(128, 128, 128);font-size: 14px;">By pressing the "Switch" button above, I declare on behalf of the restaurant Pizzaholic that:</div>
<p><br></p>
<div style="text-align: start;color: rgb(128, 128, 128);font-size: 14px;">1. The restaurant has the legal right to send unsolicited communications to its selected clients.</div>
<p><br></p>
<div style="text-align: start;color: rgb(128, 128, 128);font-size: 14px;">2. The restaurant requests and agrees that the processing of the personal data of the selected clients, which will be carried out on behalf of the restaurant, shall be governed by the <a href="#" target="_blank" style="color: rgba(var(--bs-link-color-rgb),var(--bs-link-opacity, 1));">Data Protection Addendum for Invitations</a>.</div>
<p><br></p>
<div style="text-align: start;color: rgb(128, 128, 128);font-size: 14px;">3. The restaurant agrees with the validation of the electronic mail contact data of the restaurant clients as mentioned <a href="#" target="_blank" style="color: rgba(var(--bs-link-color-rgb),var(--bs-link-opacity, 1));">here</a>.</div>`

  // Hooks
  const dispatch = useDispatch()
  const isList = useSelector(is_list)

  useEffect(() => {
    setText(html)
  }, [])

  return (
    <>
      {isAdd && (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card sx={{ width: '35rem' }}>
            <Box sx={{ p: 4 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '1.125rem' }}>Invite Clients To Order Online</Typography>
            </Box>
            <Divider />
            <Box sx={{ p: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pb: 4,
                  borderBottom: theme => `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography sx={{ fontWeight: 500, mr: 2 }}>
                  Want to import offline customers to your online system?
                </Typography>
                <Switch checked={isView} onChange={(e: any) => setIsView(e.target.checked)} />
              </Box>
              <Box sx={{ pt: 4 }}>
                <Collapse in={!isView}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box>
                      <Typography sx={{ mb: 2 }}>Invite offline clients to order online.</Typography>
                      <Typography>
                        Consider clients who walked into your restaurant or ordered by phone and whose data you have
                        collected.
                      </Typography>
                    </Box>
                    <Box
                      component={'img'}
                      src='/images/KickStarter/OrderFood.svg'
                      sx={{ width: '15rem', height: '15rem' }}
                    />
                  </Box>
                </Collapse>
                <Collapse in={isView}>
                  <Box sx={{ p: 4, border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '6px', mb: 4 }}>
                    <Typography dangerouslySetInnerHTML={{ __html: text }} />
                  </Box>
                  <Box sx={{ textAlign: 'center', pt: 4, borderTop: theme => `1px solid ${theme.palette.divider}` }}>
                    <LoadingButton
                      sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                      onClick={() => {
                        setIsAdd(true)
                        dispatch(setDefaultSteps())
                        dispatch(setActiveStep(0))
                      }}
                    >
                      Create Invite Prospects
                    </LoadingButton>
                  </Box>
                </Collapse>
              </Box>
            </Box>
          </Card>
        </Box>
      )}
      {isList && (
        <Box sx={{ width: '100%', height: '100%' }}>
          <StepperView />
        </Box>
      )}
      {!isList && <ProspectsList />}
    </>
  )
}

export default ProspectsView
