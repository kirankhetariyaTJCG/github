// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { DialogProps } from '@/types'

const Instruction = (props: DialogProps) => {
  // Props
  const { open, setOpen } = props

  const arr = [
    {
      label: (
        <Typography>
          On your computer, sign in to&nbsp;
          <Typography
            component={'span'}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => window.open('https://www.google.com/business/', '_blank', 'noopener,noreferrer')}
          >
            Google My Business
          </Typography>
        </Typography>
      ),
      desc: (
        <Typography>(If you have multiple locations, select the one pertaining to this restaurant account.)</Typography>
      )
    },
    {
      label: (
        <Typography>
          In the menu on the left, click&nbsp;
          <Typography component={'span'} sx={{ fontWeight: 700 }}>
            Users
          </Typography>
        </Typography>
      ),
      src: 'GoogleBusiness.png'
    },
    {
      label: (
        <Typography>
          At the top right of the popup, click&nbsp;
          <Typography component={'span'} sx={{ fontWeight: 700 }}>
            Add Users
          </Typography>
        </Typography>
      ),
      src: 'AddUser.png'
    },
    {
      label: (
        <Typography>
          Insert&nbsp;
          <Typography component={'span'} sx={{ fontWeight: 700 }}>
            5172812114 <Icon icon={'solar:document-text-linear'} fontSize={15} style={{ marginLeft: '0.5rem' }} />
          </Typography>
        </Typography>
      ),
      desc: <Typography>(The name FoodBooking will show. Click on it.)</Typography>,
      src: 'AddNewUser.png'
    },
    {
      label: (
        <Typography>
          Select &nbsp;
          <Typography component={'span'} sx={{ fontWeight: 700 }}>
            Manager
          </Typography>
          &nbsp; Role
        </Typography>
      ),
      src: 'AddRole.png'
    },
    {
      label: (
        <Typography>
          Click&nbsp;
          <Typography component={'span'} sx={{ fontWeight: 700 }}>
            Invite
          </Typography>
        </Typography>
      )
    }
  ]

  return (
    <Dialog open={open} maxWidth='md'>
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
          px: 4,
          py: 3
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
          How to add managers to your business listing
        </Typography>
        <IconButton onClick={() => setOpen(false)} sx={{ fontSize: 25 }}>
          <Icon icon={'ic:round-close'} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
        <Typography sx={{ fontWeight: 500, mb: 2 }}>
          Managers can edit all the business information on your listing, but unlike owners, they don’t have the
          authority to add/remove other users.
        </Typography>
        <Typography sx={{ fontWeight: 700, mb: 2 }}>
          Follow these steps to add a new Manager user to your listing
        </Typography>
        <Box sx={{ my: 4 }}>
          {Array.isArray(arr) &&
            arr?.length > 0 &&
            arr?.map((item: any, index: number) => {
              return (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {index + 1}.&nbsp; {item?.label}
                  </Box>
                  {item?.desc && <Box sx={{ mb: 2 }}>{item?.desc}</Box>}
                  {item?.src && (
                    <Box
                      component={'img'}
                      src={`/images/Setup/${item?.src}`}
                      sx={{ width: index === 2 ? '39.875rem' : 'auto', height: index === 2 ? '12rem' : '15rem' }}
                    />
                  )}
                </Box>
              )
            })}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default Instruction
