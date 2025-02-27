// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, LoadingButton, Typography } from '@/Helper/MUIImports'

// Custom Imports
import CsEditor from '@/@core/components/CsEditor'
import TemplateDialog from './TemplateDialog'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const TermsAndCondition = () => {
  // State
  const [terms, setTerms] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  // Hooks
  const dispatch = useDispatch()
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)

  const handleSave = () => {
    dispatch(editRestaurantDetail({
      data:{ id: restaurant?._id, company: {...restaurant?.company, custom_terms: terms}},
      old_restaurant_data: restaurant
    }))
  }

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object?.keys(restaurant)?.length > 0) {
      setTerms(restaurant?.company?.custom_terms)
    }
  }, [restaurant])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '-webkit-fill-available',
        width: '100%'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          border: theme => `1px solid ${theme.palette.divider}`,
          borderRadius: '10px',
          width: '45rem'
        }}
      >
        <Typography sx={{ mb: 2, fontWeight: 500 }}>
          You need to have a policy (general terms & conditions) when accepting orders online.
        </Typography>
        <CsEditor height={300} value={terms} setValue={setTerms} toolbar={true} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            pt: 4
          }}
        >
          <LoadingButton variant='outlined' disabled={loading} onClick={() => setOpen(true)}>
            Create From Template
          </LoadingButton>
          <LoadingButton
            variant='contained'
            onClick={handleSave}
            loading={loading}
            loadingPosition='start'
            startIcon={loading ? <>&nbsp;</> : <></>}
          >
            Save
          </LoadingButton>
        </Box>
      </Box>

      <TemplateDialog open={open} setOpen={setOpen} setTerms={setTerms} label='Terms & Conditions' />
    </Box>
  )
}

export default TermsAndCondition
