'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent, { CardContentProps } from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import StepperCustomDot from './StepperCustomDot'
import InviteType from './InviteType'
import ImportClients from './ImportClients'
import PreviewInvitation from './PreviewInvitation'
import SendInvitation from './SendInvitation'

// Store Imports
import { active_step, setActiveStep, steps } from '@/redux-store/InviteProspects'

// Styled Components
import StepperWrapper from '@/@core/styles/stepper'

const StepperHeaderContainer = styled(CardContent)<CardContentProps>(({ theme }) => ({
  minWidth: 300,
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const StepperView = () => {
  // Hooks
  const activeStep = useSelector(active_step)
  const stepsData = useSelector(steps)
  const dispatch = useDispatch()

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <InviteType />
      case 1:
        return <PreviewInvitation />
      case 2:
        return <ImportClients />
      case 3:
        return <SendInvitation />
      default:
        return null
    }
  }

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <StepperHeaderContainer>
        <StepperWrapper sx={{ height: '100%', '& .MuiStepLabel-label': { cursor: 'default' } }}>
          <Stepper activeStep={activeStep} orientation='horizontal' sx={{ '&>*:nth-of-type(5)>span': { mb: 0 } }}>
            {Array.isArray(stepsData) &&
              stepsData?.length > 0 &&
              stepsData?.map((step: any, i: number) => {
                return (
                  <Step key={i} completed={step?.isDone}>
                    <StepLabel StepIconComponent={StepperCustomDot}>
                      <Typography sx={{ fontWeight: 500 }}>{step?.title}</Typography>
                    </StepLabel>
                  </Step>
                )
              })}
          </Stepper>
        </StepperWrapper>
      </StepperHeaderContainer>

      <Box sx={{ width: '100%', height: 'calc(100vh - 9.5rem)', overflow: 'auto' }}>{getStepContent(activeStep)}</Box>
    </Card>
  )
}

export default StepperView
