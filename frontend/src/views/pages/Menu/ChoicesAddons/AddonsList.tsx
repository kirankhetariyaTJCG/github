// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, LoadingButton, Typography, Tooltip, IconButton, Collapse } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

// Custom Imports
import CustomBackdrop from '@/@core/components/CsBackdropLoader'
import Settings from './Settings'

// Store Imports
import { changeAddonPosition, changeChoicePosition, getAddons, duplicateAddon, duplicateChoice } from '@/redux-store/Addons/Action'
import { setAddons } from '@/redux-store/Addons'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

interface Props {
  setIsAdd: (state: { open: boolean; row: any }) => void
  setIsChoice: (state: { open: boolean; row: any }) => void
  setIsDelete: (state: { open: boolean; id: any; type: number }) => void
}

const DragTypes = {
  1: 'addons',
  2: 'choices'
}

const AddonsList = (props: Props) => {
  // Props
  const { setIsAdd, setIsChoice, setIsDelete } = props

  // State
  const [toggleAddon, setToggleAddon] = useState<any[]>([])
  const [isSettings, setIsSettings] = useState<{ open: boolean, row: any }>({ open: false, row: {} })

  // Hooks
  const addonsData = useSelector((state: any) => state.addons.addons)
  const loading = useSelector((state: any) => state.addons.loading)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  const handleOnDragEnd = (result: any) => {
    const { source, destination, type } = result

    if (!destination) return;

    if (type === DragTypes[1]) {
      const reorderedAddons = AppUtils.reorderList(addonsData, source.index, destination.index)
      dispatch(setAddons(reorderedAddons))

      return dispatch(changeAddonPosition({
        menu_id: restaurant?.menu_id,
        addons: reorderedAddons,
        oldAddons: addonsData
      }))
    }

    if (type === DragTypes[2]) {
      let reorderedChoices: any[] = []
      const addonId = source.droppableId.replace('choices-', '')
      const updatedAddons = addonsData.map((addon: any) => {
        if (addon._id === addonId) {
          reorderedChoices = AppUtils.reorderList(addon.choices, source.index, destination.index)

          return { ...addon, choices: reorderedChoices }
        }

        return addon
      })

      dispatch(setAddons(updatedAddons))

      return dispatch(changeChoicePosition({
        addon_id: addonId,
        choices: reorderedChoices,
        oldChoices: addonsData?.find((item: any) => item?._id === addonId ? item : item)?.choices
      }))
    }
  }

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?.menu_id)) {
      dispatch(getAddons({ menu_id: restaurant?.menu_id }))
    }
  }, [restaurant?._id])

  return (
    <>
      <CustomBackdrop open={loading} />
      <Box sx={{ overflow: 'auto', height: 'calc(100vh - 10rem)' }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='addons' type='addons'>
            {provided => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {Array.isArray(addonsData) &&
                  addonsData.length > 0 &&
                  addonsData.map((addon: any, index: number) => (
                    <Draggable key={addon?._id} draggableId={`addon-${addon?._id}`} index={index}>
                      {provided => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{ boxShadow: theme => theme.shadows[2], mx: 4, mt: 3, mb: 2, borderRadius: '8px' }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              py: 2,
                              px: 4,
                              borderBottom: theme =>
                                toggleAddon === addon?._id && Array.isArray(addon?.choices) && addon?.choices.length > 0
                                  ? `1px solid ${theme.palette.divider}`
                                  : 'none'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <IconButton {...provided.dragHandleProps}>
                                <Icon icon={'icon-park-outline:drag'} />
                              </IconButton>
                              <Typography sx={{ fontWeight: 500 }}>{addon?.name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {Array.isArray(addon?.choices) && addon?.choices?.length > 0 && (
                                <IconButton
                                  onClick={() =>
                                    setToggleAddon((prev) =>
                                      prev.includes(addon._id)
                                        ? prev.filter((id) => id !== addon?._id)
                                        : [...prev, addon?._id]
                                    )
                                  }
                                >
                                  <Icon
                                    icon={'icon-park-outline:down'}
                                    style={{
                                      transition: 'all 0.2s ease-in-out',
                                      transform: toggleAddon.includes(addon._id) ? 'rotate(180deg)' : 'none'
                                    }}
                                  />
                                </IconButton>
                              )}
                              <Tooltip title='Add Choice' arrow>
                                <IconButton onClick={() => setIsChoice({ open: true, row: {} })}>
                                  <Icon icon={'icon-park-outline:add-one'} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Duplicate' arrow>
                                <IconButton onClick={() => dispatch(duplicateAddon({ id: addon?._id, type: 3 }))}>
                                  <Icon icon={'heroicons-outline:duplicate'} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Settings' arrow>
                                <IconButton onClick={() => setIsSettings({ open: true, row: { ...addon, type: 2 } })}>
                                  <Icon icon={'ic:outline-settings'} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Edit' arrow>
                                <IconButton onClick={() => setIsAdd({ open: true, row: addon })}>
                                  <Icon icon={'bx:edit'} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Delete' arrow>
                                <IconButton
                                  onClick={() => setIsDelete({ open: true, id: addon?._id, type: 1 })}
                                >
                                  <Icon icon={'ic:twotone-delete'} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                          <Collapse in={toggleAddon.includes(addon?._id)}>
                            <Box sx={{ m: 4 }}>
                              <Droppable droppableId={`choices-${addon?._id}`} type={`choices`}>
                                {provided => (
                                  <Box ref={provided.innerRef} {...provided.droppableProps}>
                                    {Array.isArray(addon?.choices) &&
                                      addon?.choices?.length > 0 &&
                                      addon?.choices.map((choice: any, i: number) => (
                                        <Draggable key={choice?._id} draggableId={`choice-${choice?._id}`} index={i}>
                                          {provided => (
                                            <Box
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                py: 2,
                                                px: 4,
                                                border: theme => `2px solid ${theme.palette.divider}`,
                                                borderRadius: '8px',
                                                mb: 4,
                                                '&:hover .price': { display: 'none' },
                                                '&:hover .btn': { display: 'flex' }
                                              }}
                                            >
                                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <IconButton {...provided.dragHandleProps}>
                                                  <Icon icon={'icon-park-outline:drag'} />
                                                </IconButton>
                                                <Typography sx={{ fontWeight: 500 }}>{choice?.name}</Typography>
                                              </Box>
                                              <Box className='price' sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                {choice?.is_pre_selected &&
                                                  <Box
                                                    component={Icon}
                                                    icon={'icon-park-solid:check-one'}
                                                    fontSize={18}
                                                    sx={{ color: theme => theme.palette.secondary.main }}
                                                  />
                                                }
                                                <Typography sx={{ fontWeight: 600 }}>
                                                  $ {choice?.price ? choice?.price : 0}/-
                                                </Typography>
                                              </Box>
                                              <Box className='btn' sx={{ display: 'none', alignItems: 'center' }}>
                                                <Tooltip title='Duplicate' arrow>
                                                  <IconButton onClick={() =>
                                                    dispatch(duplicateChoice({ id: choice?._id, type: 4, parentKey: 'addon_id' }))
                                                  }>
                                                    <Icon icon={'heroicons-outline:duplicate'} />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Settings' arrow>
                                                  <IconButton onClick={() => setIsSettings({ open: true, row: { ...choice, type: 1 } })}>
                                                    <Icon icon={'ic:outline-settings'} />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Edit' arrow>
                                                  <IconButton onClick={() => setIsChoice({ open: true, row: choice })}>
                                                    <Icon icon={'bx:edit'} />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Delete' arrow>
                                                  <IconButton
                                                    onClick={() =>
                                                      setIsDelete({
                                                        open: true,
                                                        id: { addon_id: addon?._id, _id: choice?._id },
                                                        type: 2
                                                      })
                                                    }
                                                  >
                                                    <Icon icon={'ic:twotone-delete'} />
                                                  </IconButton>
                                                </Tooltip>
                                              </Box>
                                            </Box>
                                          )}
                                        </Draggable>
                                      ))}
                                    {provided.placeholder}
                                    <LoadingButton
                                      sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                                      onClick={() => setIsChoice({ open: true, row: {} })}
                                    >
                                      Add Choice
                                    </LoadingButton>
                                  </Box>
                                )}
                              </Droppable>
                            </Box>
                          </Collapse>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                {Array.isArray(addonsData) && addonsData?.length === 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 'calc(100vh - 10rem)',
                      flexDirection: 'column',
                      textAlign: 'center'
                    }}
                  >
                    <Box component={'img'} src='/images/NoChoice.svg' sx={{ width: '100%', height: '20rem' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', mt: 2 }}>
                      No Addons & Choices are available!
                    </Typography>
                  </Box>
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

      <Settings open={isSettings?.open} setOpen={setIsSettings} row={isSettings?.row} />
    </>
  )
}

export default AddonsList
