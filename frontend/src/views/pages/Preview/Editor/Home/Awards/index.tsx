// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, Typography, Grid, IconButton } from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch } from 'react-redux'

// Custom Imports
import AddImage from './AddImage'
import CsDelete from '@/@core/components/CsDelete'

// Store Imports
import { editSection } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { SectionProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

const Awards = ({ onDelete, section }: SectionProps) => {
  // State
  const [isAddImg, setIsAddImg] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })
  const [awards, setAwards] = useState<any[]>([])

  // Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length > 0) {
      setAwards(section?.sections ?? [])
    }
  }, [section])

  const handleSave = (data: any) => {
    setAwards(data)
    dispatch(editSection({ id: section?.id, sections: data }))
  }

  const handleDelete = () => {
    handleSave(awards?.filter((item: any) => item?._id !== isDelete?.id))
    setIsDelete({ open: false, id: '' })
  }

  const onSave = (data: { title: string; src: string }) => {
    setIsAddImg({ open: false, row: {} })
    isAddImg?.row && Object?.keys(isAddImg?.row)?.length > 0
      ? handleSave(awards?.map((item: any) => (item?._id === isAddImg?.row?._id ? { ...data } : item)))
      : handleSave([...awards, { ...data, _id: AppUtils.randomId() }])

  }

  return (
    <>
      <Box>
        {Array.isArray(awards) && awards?.length > 0 && (
          <Grid container spacing={4} sx={{ mb: 4, mt: 0 }}>
            {awards?.map((award: any, index: number) => {
              return (
                <Grid key={index} item xs={12} sm={3}>
                  <Box
                    sx={{
                      bgcolor: theme => theme.palette.customColors.bodyBg,
                      borderRadius: '8px',
                      boxShadow: theme => theme.shadows[2],
                      backgroundImage: `url(${UrlHelper.imgPath}${award?.src?.replace(/\\/g, "/")})`,
                      backgroundSize: 'cover',
                      height: '10rem',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'end'
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          width: '8ch'
                        }}
                      >
                        {award?.title ? award?.title : 'Title'}
                      </Typography>
                      <Box>
                        <IconButton sx={{ p: 1 }} color='info' onClick={() => setIsAddImg({ open: true, row: award })}>
                          <Icon icon={'mdi:image-edit-outline'} />
                        </IconButton>
                        <IconButton
                          sx={{ p: 1 }}
                          color='error'
                          onClick={() => setIsDelete({ open: true, id: award?._id })}
                        >
                          <Icon icon={'icon-park-twotone:delete-one'} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <LoadingButton variant='contained' onClick={onDelete}>
            <Icon icon={'ic:twotone-delete'} style={{ fontSize: 20, marginRight: 6 }} />
            Delete
          </LoadingButton>
          <LoadingButton
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={() => setIsAddImg({ open: true, row: {} })}
          >
            Add Award / Badge
          </LoadingButton>
        </Box>
      </Box>

      <AddImage
        open={isAddImg?.open}
        setOpen={setIsAddImg}
        row={isAddImg?.row}
        onSave={onSave}
      />

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '' })}
        label='Award'
        handleDelete={handleDelete}
      />
    </>
  )
}

export default Awards
