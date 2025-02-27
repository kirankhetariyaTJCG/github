// Created By Ayush.N

// ** Mui Import
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// ** Third party Imports
import ReactColorPicker from '@super-effective/react-color-picker'

interface Props {
  open: boolean
  handleClose: () => void
  onChange: (e: any) => void
  anchorEl: null | HTMLElement
  showHex: boolean
  color: string
  showSwatch: boolean
}

const CsColorPicker = (props: Props) => {
  // Props
  const { open, handleClose, onChange, anchorEl, showHex, color, showSwatch } = props

  return (
    <>
      <Menu
        id='basic-menu'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        sx={{
          '& .MuiMenu-paper': { borderRadius: '1rem', p: 2 },
          div: {
            borderRadius: '1rem',
            li: {
              padding: 0,
              '&:hover': { bgcolor: 'transparent !important' },
              div: { bgcolor: 'transparent' }
            }
          }
        }}
      >
        <MenuItem disableRipple sx={{ height: '15rem', width: '15rem' }}>
          <ReactColorPicker showHex={showHex} color={color} showSwatch={showSwatch} onChange={onChange} />
        </MenuItem>
      </Menu>
    </>
  )
}

export default CsColorPicker
