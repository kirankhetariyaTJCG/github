// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// Icon Imports
import Icon from '@/@core/components/Icon'

interface Props {
  heading: string
  bg_color: string
}

const Template = (props: Props) => {
  // Props
  const { heading, bg_color } = props

  const arr = [
    {
      label: (
        <Typography>
          Visit <span style={{ fontWeight: 'bold' }}>1roos.com</span>
        </Typography>
      ),
      icon: 'pepicons-pop:smartphone-home-button'
    },
    {
      label: (
        <Typography>
          Click on <span style={{ fontWeight: 'bold' }}>"Table Reservation"</span>& specify party size
        </Typography>
      ),
      icon: 'tdesign:gesture-click'
    },
    {
      label: (
        <Typography>
          open the menu & <span style={{ fontWeight: 'bold' }}>order</span>your food
        </Typography>
      ),
      icon: 'icon-park-solid:check-one'
    }
  ]

  return (
    <Box sx={{ m: 4, overflow: 'auto' }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          p: 4,
          position: 'relative',
          overflow: 'hidden',
          bgcolor: bg_color
        }}
      >
        <Box sx={{ border: '2px dashed #fff', p: 4, position: 'relative', zIndex: 2 }}>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', mt: 4, mb: 6, textAlign: 'center' }}>
            {heading}
          </Typography>
          <Box sx={{ p: 4, bgcolor: '#fff', borderRadius: '8px' }}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 700,
                mb: 4,
                fontSize: '1.8rem',
                color: bg_color,
                textAlign: 'center'
              }}
            >
              Pre-order food to save time
            </Typography>
            <Box>
              {Array.isArray(arr) &&
                arr?.length > 0 &&
                arr?.map((item: any, index: number) => {
                  return (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, width: '100%' }}>
                      <Box sx={{ width: '12%' }}>
                        <Box component={Icon} icon={item?.icon} sx={{ color: bg_color, fontSize: 35 }} />
                      </Box>
                      <Box sx={{ width: '88%' }}>{item?.label}</Box>
                    </Box>
                  )
                })}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '-0.25rem',
            left: '-1.4375rem',
            width: '200%',
            height: '50%',
            backgroundColor: '#000',
            transform: 'rotate(-10deg)'
          }}
        />
      </Box>
    </Box>
  )
}

export default Template
