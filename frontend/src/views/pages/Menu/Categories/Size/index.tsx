// MUI Imports
import { Box, Typography, Chip, Grid, IconButton } from '@/Helper/MUIImports'

// Icon Imports
import Icon from '@/@core/components/Icon'

interface Props {
  item: any
  setIsAdd: (state: { open: boolean, row: any, item: any }) => void
  setIsDelete: (state: { open: boolean; id: any; type: number }) => void
}

const Sizes = (props: Props) => {
  // Props
  const { item, setIsAdd, setIsDelete } = props

  return (
    <Box sx={{ border: theme => `2px dashed ${theme.palette.divider}`, borderRadius: '8px', p: 4, m: 4 }}>
      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: '1rem', mb: 2 }}>Sizes</Typography>
        {item?.sizes?.map((size: any, index: number) => {
          return (
            <Grid
              container
              key={index}
              sx={{
                mb: 4,
                px: 4,
                py: 2,
                border: theme => `2px solid ${theme.palette.divider}`,
                borderRadius: '8px',
                '&:hover .button': { display: 'flex' },
                '&:hover .ammount': { display: 'none' }
              }}
            >
              <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontWeight: 500 }}>{size?.name}</Typography>
                {size?.is_pre_select &&
                  <Icon icon={'icon-park-twotone:check-one'} fontSize={15} />
                }
              </Grid>
              <Grid item xs={7} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Array.isArray(size?.addons) && size?.addons?.length > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    {size?.addons?.map((val: any, i: number) => (
                      <Chip key={i} size='small' label={val?.name} />
                    ))}
                  </Box>
                )}
              </Grid>
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <Typography className='ammount' sx={{ fontWeight: 500, py: 1.5 }}>
                  $ {size?.price ?? 0}/-
                </Typography>
                <Box className='button' sx={{ display: 'none', alignItems: 'center' }}>
                  <IconButton size='small' onClick={() => setIsAdd({ open: true, row: size, item: item })}>
                    <Icon icon={'bx:edit'} />
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={() =>
                      setIsDelete({
                        open: true,
                        id: {
                          category_id: item?.category_id,
                          item_id: item?._id,
                          _id: size?._id
                        },
                        type: 3
                      })}
                  >
                    <Icon icon={'mi:delete'} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          )
        })}
      </Box>
    </Box>
  )
}

export default Sizes
