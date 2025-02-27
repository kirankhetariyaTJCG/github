// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, Typography, IconButton, LoadingButton } from '@/Helper/MUIImports'

// Third Party Imports
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useDispatch } from 'react-redux'

// Custom Imports
import CsDelete from '@/@core/components/CsDelete'
import AddEditPortal from './AddEditPortal'

// Store Imports
import { editSection } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import { SectionProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const ReviewPortals = ({ onDelete, section }: SectionProps) => {
  // State
  const [isAdd, setIsAdd] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string }>({ open: false, id: '' })
  const [portals, setPortals] = useState<any[]>([])

  // Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length > 0) {
      setPortals(section?.sections ?? [])
    }
  }, [section])

  const handleSave = (data: any) => {
    setPortals(data)
    dispatch(editSection({ id: section?.id, sections: data }))
  }

  const handleDelete = () => {
    handleSave(portals?.filter((item: any) => item?._id !== isDelete?.id))
    setIsDelete({ open: false, id: '' })
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    const sourceIndex = result.source.index
    const destIndex = result.destination.index
    const items: any = AppUtils.reorderList(portals, sourceIndex, destIndex)
    handleSave(items)
  }


  return (
    <>
      <Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'droppableSections'}>
            {provided => (
              <Box ref={provided.innerRef}>
                {Array.isArray(portals) &&
                  portals?.length > 0 &&
                  portals?.map((portal: any, index: number) => {
                    return (
                      <Draggable key={portal?._id} draggableId={portal?._id} index={index}>
                        {provided => (
                          <Box ref={provided.innerRef} {...provided.draggableProps}>
                            <Box
                              key={index}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: 2,
                                mb: 4,
                                border: theme => `1px solid ${theme.palette.divider}`,
                                borderRadius: '8px'
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconButton sx={{ p: 1 }} {...provided.dragHandleProps}>
                                  <Icon icon={'carbon:draggable'} />
                                </IconButton>
                                <Typography sx={{ fontWeight: 600 }}>{portal?.title}</Typography>
                              </Box>
                              <Box>
                                <IconButton color='info' onClick={() => setIsAdd({ open: true, row: portal })}>
                                  <Icon icon={'akar-icons:edit'} />
                                </IconButton>
                                <IconButton color='error' onClick={() => setIsDelete({ open: true, id: portal?._id })}>
                                  <Icon icon={'ic:twotone-delete'} />
                                </IconButton>
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <LoadingButton variant='contained' onClick={onDelete}>
            <Icon icon={'ic:twotone-delete'} style={{ fontSize: 20, marginRight: 6 }} />
            Delete
          </LoadingButton>
          <LoadingButton
            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
            onClick={() => setIsAdd({ open: true, row: {} })}
          >
            Add Portal
          </LoadingButton>
        </Box>
      </Box>

      <AddEditPortal open={isAdd?.open} setOpen={setIsAdd} row={isAdd?.row} handleSave={handleSave} portals={portals} />

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '' })}
        label='Review Portal'
        handleDelete={handleDelete}
      />
    </>
  )
}

export default ReviewPortals
