// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useSelector } from 'react-redux'

// Custom Imports
import Restrictions from './Restrictions'
import Plan from './Plan'

// Icon Imports
import Icon from '@/@core/components/Icon'

interface Props {
  setActiveItem: (activeItem: any) => void
  setHeadline: (title: string) => void
}

const DealType = (props: Props) => {
  // Props
  const { setActiveItem, setHeadline } = props

  // State
  const [isRes, setIsRes] = useState<boolean>(false)
  const [plan, setPlan] = useState<boolean>(false)

  // Hooks
  const dealType = useSelector((state: any) => state.self_made.deal_type)

  const onNextClick = (item: any) => {
    if (item?.isLocked) {
      setPlan(true)
    } else {
      setActiveItem(item)
      setHeadline(item?.title)
    }
  }

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4 }}>
          <Typography>You can apply various rules & restrictions to each promo deal</Typography>
          <LoadingButton
            size='small'
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity, ml: 2 }}
            onClick={() => setIsRes(true)}
          >
            Learn More
          </LoadingButton>
        </Box>
        <Box sx={{ mt: 6 }}>
          {Array.isArray(dealType) &&
            dealType?.length > 0 &&
            dealType?.map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: theme => `2px dashed ${theme.palette.divider}`,
                    borderRadius: '8px',
                    mb: 4,
                    px: 4,
                    py: 2,
                    gap: 4
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, width: { xs: '100%', sm: '80%' } }}>
                    <Box
                      sx={{
                        bgcolor: theme => theme.palette.primary.lightOpacity,
                        p: 2,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box
                        component={Icon}
                        icon={item?.icon}
                        fontSize={25}
                        sx={{ color: theme => theme.palette.primary.main }}
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>{item?.title}</Typography>
                        {item?.isLocked && (
                          <Box
                            component={Icon}
                            icon={'ic:twotone-lock'}
                            sx={{ color: theme => theme.palette.warning.main }}
                            fontSize={20}
                          />
                        )}
                      </Box>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>{item?.desc}</Typography>
                    </Box>
                  </Box>
                  <LoadingButton
                    sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                    onClick={() => onNextClick(item)}
                    size='small'
                  >
                    {item?.isLocked ? 'View Details' : 'Next'}
                  </LoadingButton>
                </Box>
              )
            })}
        </Box>
      </Box>

      {isRes && <Restrictions open={isRes} setOpen={setIsRes} />}

      {plan && <Plan open={plan} setOpen={setPlan} />}
    </>
  )
}

export default DealType
