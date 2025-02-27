// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, IconButton, Typography, Avatar, LoadingButton } from '@/Helper/MUIImports'

// Custom Imports
import CsDelete from '@/@core/components/CsDelete'

// Third Party Imports
import { useDispatch } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'

// Custom Imports
import AddEditAnnouncement from './AddEditAnnouncement'

// Store Imports
import { editSection } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

//Types Imports
import { SectionProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

const Announcement = ({ onDelete, section }: SectionProps) => {
  // State
  const [isAdd, setIsAdd] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })
  const [sections, setSections] = useState<any[]>([])

  // Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length > 0) {
      setSections(section?.sections ?? [])
    }
  }, [section])

  const handleSave = (data: any) => {
    setSections(data)
    dispatch(editSection({ id: section?.id, sections: data }))
  }

  const handleDelete = () => {
    handleSave(sections?.filter((item: any) => item?._id !== isDelete?.id))
    setIsDelete({ open: false, id: '' })
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    const sourceIndex = result.source.index
    const destIndex = result.destination.index
    const items: any = AppUtils.reorderList(sections, sourceIndex, destIndex)
    handleSave(items)
  }

  return (
    <>
      <Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'droppableSections'}>
            {provided => (
              <Box ref={provided.innerRef}>
                {Array.isArray(sections) &&
                  sections?.length > 0 &&
                  sections?.map((announcement: any, index: number) => {
                    return (
                      <Draggable key={announcement?._id} draggableId={announcement?._id} index={index}>
                        {provided => (
                          <Box ref={provided.innerRef} {...provided.draggableProps}>
                            <Box key={index} sx={{ mb: 4 }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: 2,
                                  px: 4,
                                  py: 2,
                                  border: theme => `2px solid ${theme.palette.divider}`,
                                  borderRadius: '8px'
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <IconButton sx={{ p: 1 }} {...provided.dragHandleProps}>
                                    <Icon icon={'akar-icons:drag-vertical'} />
                                  </IconButton>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar src={`${UrlHelper.imgPath}${announcement?.img}`} variant='rounded' sx={{ width: 50, height: 50 }} />
                                    <Box>
                                      <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                        {announcement?.title}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <IconButton color='info' onClick={() => setIsAdd({ open: true, row: announcement })}>
                                    <Icon icon={'bx:edit'} />
                                  </IconButton>
                                  <IconButton
                                    color='error'
                                    onClick={() => setIsDelete({ open: true, id: announcement?._id })}
                                  >
                                    <Icon icon={'ic:twotone-delete'} />
                                  </IconButton>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    )
                  })}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <LoadingButton variant='contained' onClick={onDelete}>
          <Icon icon={'ic:twotone-delete'} style={{ fontSize: 20, marginRight: 6 }} />
          Delete
        </LoadingButton>
        <LoadingButton
          sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
          onClick={() => setIsAdd({ open: true, row: {} })}
        >
          Add Announcement
        </LoadingButton>
      </Box>

      <AddEditAnnouncement open={isAdd?.open} setOpen={setIsAdd} row={isAdd?.row} handleSave={handleSave} sections={sections} />

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '' })}
        label='Announcement'
        handleDelete={handleDelete}
      />
    </>
  )
}

export default Announcement
