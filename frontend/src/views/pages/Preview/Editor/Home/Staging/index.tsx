// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, IconButton, Typography, Collapse } from '@/Helper/MUIImports'

// Third Party Imports
import { useDispatch } from 'react-redux'

// Custom Imports
import AddEditStage from './AddEditStage'

// Store Imports
import { editSection } from '@/redux-store/Website'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const StagingView = ({ section }: { section: any }) => {

  // State
  const [sections, setSections] = useState<any[]>([])

  // Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    if (AppUtils.checkValue(section) && Object?.keys(section)?.length > 0) {
      setSections(section?.sections)
    }
  }, [section])

  const handleSave = (data: any[], isToggle: boolean) => {
    setSections(data)
    !isToggle && dispatch(editSection({ id: section?.id, sections: data }))
  }

  return (
    <>
      <Box>
        {Array.isArray(sections) &&
          sections?.length > 0 &&
          sections?.map((heroSection: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{ border: theme => `1px solid ${theme.palette.divider}`, borderRadius: '8px', mb: 4 }}
              >
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: theme => (heroSection?.isOpen ? `1px solid ${theme.palette.divider}` : 'none')
                  }}
                >
                  <Typography sx={{ fontWeight: 600, pl: 2 }}>{heroSection?.pageTitle}</Typography>
                  <IconButton
                    sx={{ p: 1 }}
                    onClick={() => setSections(prev => prev?.map((item: any) => item?._id === heroSection?._id ? { ...item, isOpen: !item?.isOpen } : { ...item, isOpen: false }))}
                  >
                    <Icon
                      icon={'icon-park-outline:down'}
                      style={{
                        transition: 'all 0.2s ease-in-out',
                        transform: heroSection?.isOpen ? 'rotate(180deg)' : 'none'
                      }}
                    />
                  </IconButton>
                </Box>
                <Collapse in={heroSection?.isOpen}>
                  <AddEditStage row={heroSection} handleSave={handleSave} sections={sections} />
                </Collapse>
              </Box>
            )
          })}
      </Box>
    </>
  )
}

export default StagingView
