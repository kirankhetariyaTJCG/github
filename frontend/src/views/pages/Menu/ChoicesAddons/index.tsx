'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, Typography, LoadingButton, Card } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { deleteAddon, deleteChoice } from '@/redux-store/Addons/Action'

// Custom Imports
import AddEditAddon from './AddEditAddon'
import AddEditChoice from './AddEditChoice'
import CsDelete from '@/@core/components/CsDelete'
import AddonsList from './AddonsList'

const ChoicesView = () => {
  // States
  const [isAdd, setIsAdd] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isChoice, setIsChoice] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: any; type: number }>({
    open: false,
    id: {},
    type: 1
  })

  // Hooks
  const addonData = useSelector((state: any) => state.addons.addons)
  const isLoading = useSelector((state: any) => state.addons.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    !isLoading && setIsDelete({ open: false, id: {}, type: 1 })
  }, [isLoading])

  const handleDelete = () => {
    isDelete?.type === 1
      ? dispatch(deleteAddon(isDelete?.id))
      : dispatch(deleteChoice({ addon_id: isDelete?.id?.addon_id, id: isDelete?.id?._id }))
  }

  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 4,
          borderBottom: theme => `1px solid ${theme.palette.divider}`,
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Choices & Addons</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
          <LoadingButton
            variant='contained'
            onClick={() => addonData?.length > 0 && setIsChoice({ open: true, row: {} })}
            disabled={addonData?.length === 0}
          >
            Add Choices
          </LoadingButton>
          <LoadingButton variant='contained' onClick={() => setIsAdd({ open: true, row: {} })}>
            Add Addons
          </LoadingButton>
        </Box>
      </Box>

      <AddonsList setIsAdd={setIsAdd} setIsChoice={setIsChoice} setIsDelete={setIsDelete} />

      <AddEditAddon open={isAdd?.open} setOpen={setIsAdd} row={isAdd?.row} />

      <AddEditChoice open={isChoice?.open} setOpen={setIsChoice} row={isChoice?.row} />

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: {}, type: 1 })}
        label={isDelete?.type === 1 ? 'Addon' : 'Choice'}
        loading={isLoading}
        handleDelete={handleDelete}
      />
    </Card>
  )
}

export default ChoicesView
