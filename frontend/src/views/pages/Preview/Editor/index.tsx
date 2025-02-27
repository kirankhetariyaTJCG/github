'use client'

// React Imports
import { forwardRef, useEffect, useState } from 'react'
import type { ReactElement, Ref, } from 'react'

// Next Imports
import { useSearchParams } from 'next/navigation'

// MUI Imports
import { Box, Slide, LoadingButton, Typography, IconButton, Dialog, DialogTitle, Collapse, DialogContent, Switch } from '@/Helper/MUIImports'
import type { SlideProps } from '@mui/material/Slide'

// Third Party Imports
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import LogoView from './Home/Logo'
import StagingView from './Home/Staging'
import SpacialOffersView from './Home/SpecialOffers'
import AboutView from './Home/About'
import Announcement from './Home/Announcement'
import OpeningHours from './Home/OpeningHours'
import Delivery from './Home/Delivery'
import FooterView from './Home/Footer'
import AddSection from './AddSection'
import Gallery from './Home/Gallery'
import Jobs from './Home/Jobs'
import Awards from './Home/Awards'
import ReviewPortals from './Home/ReviewPortals'
import SocialMedia from './Home/SocialMedia'
import Certificates from './Home/Certificates'
import ImpAnnouncement from './Home/ImpAnnouncement'
import Video from './Home/Video'
import Article from './Home/Article'
import CsDelete from '@/@core/components/CsDelete'

// Store Imports
import { setSections, deleteSection, setShowSection } from '@/redux-store/Website'
import { editWebsiteData } from '@/redux-store/Website/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { DialogProps } from '@/types'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import { SECTION_NAME, DEFAULT_SECTIONS } from '@/Helper/Constants/WebsiteEditor'

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const EditorMode = (props: DialogProps) => {
  // Props
  const { open, setOpen } = props

  // State
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: string; label: string }>({
    open: false,
    id: '',
    label: ''
  })
  const [addSection, setAddSection] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<null | number>(null)

  // Hooks
  const tempSection = useSelector((state: any) => state.website.website.temp_section)
  const sections = useSelector((state: any) => state.website.website.sections)
  const website = useSelector((state: any) => state.website.website)
  const loading = useSelector((state: any) => state.website.loading)
  const dispatch = useDispatch()
  const params = useSearchParams()
  const restaurant_id = params.get('restaurant_id')

  useEffect(() => {
    !loading && setOpen(false)
  }, [loading])

  const getSection = (section: any) => {
    const onDelete = () => setIsDelete({ open: true, id: section?.id, label: section?.label })
    const passData = AppUtils.checkValue(activeSection) ? section : {}

    switch (section?.type) {
      case SECTION_NAME.PROMOTION:
        return <SpacialOffersView onDelete={onDelete} />
      case SECTION_NAME.ABOUT:
        return <AboutView onDelete={onDelete} onCancel={() => setActiveSection(null)} section={passData} />
      case SECTION_NAME.OPENING_HOURS:
        return <OpeningHours onDelete={onDelete} />
      case SECTION_NAME.ANNOUNCEMENT:
        return <Announcement onDelete={onDelete} section={passData} />
      case SECTION_NAME.DELIVERY_ZONE:
        return <Delivery onCancel={() => setActiveSection(null)} section={passData} />
      case SECTION_NAME.GALLERY:
        return <Gallery onDelete={onDelete} onCancel={() => setActiveSection(null)} section={passData} />
      case SECTION_NAME.JOBS:
        return <Jobs onDelete={onDelete} section={passData} />
      case SECTION_NAME.AWARDS:
        return <Awards onDelete={onDelete} section={passData} />
      case SECTION_NAME.PORTALS:
        return <ReviewPortals onDelete={onDelete} section={passData} />
      case SECTION_NAME.SOCIAL_MEDIA:
        return <SocialMedia onDelete={onDelete} onCancel={() => setActiveSection(null)} section={passData} />
      case SECTION_NAME.CERTIFICATES:
        return <Certificates onDelete={onDelete} section={passData} />
      case SECTION_NAME.IMPORTANT_ANNOUNCEMENT:
        return <ImpAnnouncement onDelete={onDelete} onCancel={() => setActiveSection(null)} section={passData} />
      case SECTION_NAME.VIDEO:
        return <Video onDelete={onDelete} section={passData} />
      case SECTION_NAME.ARTICLE:
        return <Article onDelete={onDelete} section={passData} />
      default:
        return null
    }
  }

  const getDefaultSection = (section: any) => {
    const passData = AppUtils.checkValue(activeSection) ? section : {}
    switch (section?.type) {
      case SECTION_NAME.LOGO:
        return <LogoView section={passData} onCancel={() => setActiveSection(null)} />
      case SECTION_NAME.STAGING:
        return <StagingView section={passData} />
      case SECTION_NAME.FOOTER:
        return <FooterView section={passData} onCancel={() => setActiveSection(null)} />
      default:
        return null
    }
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    const sourceIndex = result.source.index
    const destIndex = result.destination.index
    const items: any = AppUtils.reorderList(tempSection, sourceIndex, destIndex)
    dispatch(setSections(items))
  }

  const handleSave = () => {
    dispatch(editWebsiteData({
      restaurant_id: restaurant_id,
      id: website?._id,
      website_sections: JSON.stringify(tempSection)
    }))
    setOpen(false)
    setActiveSection(null)
  }

  const handleClose = () => {
    if (JSON.stringify(tempSection) !== JSON.stringify(sections)) {
      alert("Please save your changes!");
    } else {
      setOpen(false)
      setActiveSection(null)
    }
  }

  const handleDelete = () => {
    dispatch(deleteSection(isDelete?.id))
    setIsDelete({ open: false, id: '', label: '' })
  }

  const sectionView = (section: any, index: number) => {
    return (
      <Box
        key={index}
        sx={{ border: theme => `2px solid ${theme.palette.divider}`, borderRadius: '8px', mb: 4 }}
      >
        <Box
          sx={{
            px: 4,
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            borderBottom: theme =>
              activeSection === index ? `2px solid ${theme.palette.divider}` : 'none'
          }}
          onClick={() => (activeSection === index ? setActiveSection(null) : setActiveSection(index))}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: 500, width: '-webkit-fill-available' }}>
            {section?.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton sx={{ p: 1 }} disabled>
              <Icon icon='bx:lock' />
            </IconButton>
            <IconButton
              sx={{
                transform: activeSection === index ? 'rotate(180deg)' : 'none',
                transition: 'all 0.3s',
                p: 1
              }}
              onClick={() => (activeSection === index ? setActiveSection(null) : setActiveSection(index))}
            >
              <Icon icon='icon-park-outline:down' />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={activeSection === index}>
          <Box sx={{ p: 4 }}>{getDefaultSection(section)}</Box>
        </Collapse>
      </Box>
    )
  }

  return (
    <>
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 4,
            py: 2,
            justifyContent: 'space-between',
            borderBottom: theme => `1px solid ${theme.palette.divider}`
          }}
        >
          <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Editor Mode</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <LoadingButton variant='contained' onClick={handleSave}>
              Save
            </LoadingButton>
            <IconButton onClick={handleClose}>
              <Icon icon={'mdi:close'} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: '1rem !important' }}>
          <Box sx={{ width: { md: '50rem' }, mx: 'auto' }}>
            {Array.isArray(tempSection) &&
              tempSection?.length > 0 &&
              tempSection.map((section: any, index: number) => {
                if (DEFAULT_SECTIONS.includes(section?.type)) {
                  return sectionView(section, index)
                }
              })}
            <Box
              sx={{ px: 4, pt: 4, mt: 4, border: theme => `2px dashed ${theme.palette.divider}`, borderRadius: '8px', mb: 4 }}
            >
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'droppableSections'}>
                  {provided => (
                    <Box ref={provided.innerRef}>
                      {Array.isArray(tempSection) &&
                        tempSection?.length > 0 &&
                        tempSection?.map((section: any, index: number) => {
                          if (!DEFAULT_SECTIONS.includes(section?.type) && section?.type !== SECTION_NAME.FOOTER) {
                            return (
                              <Draggable key={section?.id} draggableId={section?.id} index={index}>
                                {provided => (
                                  <Box ref={provided.innerRef} {...provided.draggableProps}>
                                    <Box
                                      key={index}
                                      sx={{
                                        mb: 4,
                                        border: theme => `2px solid ${theme.palette.divider}`,
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        userSelect: 'none'
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          px: 2,
                                          py: 2,
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          borderBottom: theme =>
                                            activeSection === index ? `2px solid ${theme.palette.divider}` : 'none'
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            width: '-webkit-fill-available'
                                          }}
                                          onClick={() =>
                                            activeSection === index ? setActiveSection(null) : setActiveSection(index)
                                          }
                                        >
                                          <IconButton sx={{ p: 1 }} {...provided.dragHandleProps}>
                                            <Icon icon={'carbon:draggable'} />
                                          </IconButton>
                                          <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
                                            {section?.title}
                                          </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <Switch
                                            checked={section?.isActive}
                                            onChange={() => dispatch(setShowSection(section?.id))}
                                          />
                                          <IconButton
                                            sx={{
                                              transform: activeSection === index ? 'rotate(180deg)' : 'none',
                                              transition: 'all 0.3s',
                                              p: 1
                                            }}
                                            onClick={() =>
                                              activeSection === index ? setActiveSection(null) : setActiveSection(index)
                                            }
                                          >
                                            <Icon icon='icon-park-outline:down' />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                      <Collapse in={activeSection === index}>
                                        <Box sx={{ p: 4 }}>{getSection(section)}</Box>
                                      </Collapse>
                                    </Box>
                                  </Box>
                                )}
                              </Draggable>
                            )
                          }
                        })}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
              {/* {tempSection?.length !== 17 && ( */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <LoadingButton
                  variant='contained'
                  size='large'
                  startIcon={<Icon icon={'ic:round-add'} />}
                  onClick={() => setAddSection(true)}
                >
                  Add section
                </LoadingButton>
              </Box>
              {/* )} */}
            </Box>
            {Array.isArray(tempSection) &&
              tempSection?.length > 0 &&
              tempSection.map((section: any, index: number) => {
                if (section?.type === SECTION_NAME.FOOTER) {
                  return sectionView(section, index)
                }
              })}
          </Box>
        </DialogContent>
      </Dialog>

      {addSection && <AddSection open={addSection} setOpen={setAddSection} />}

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: '', label: '' })}
        label={isDelete?.label}
        handleDelete={handleDelete}
      />

    </>
  )
}

export default EditorMode
