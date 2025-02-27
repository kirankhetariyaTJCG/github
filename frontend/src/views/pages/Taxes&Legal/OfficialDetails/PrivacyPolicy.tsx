// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, LoadingButton, Typography } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'

// Custom Imports
import CsEditor from '@/@core/components/CsEditor'
import TemplateDialog from './TemplateDialog'

// Store Imports
import { editRestaurantDetail } from '@/redux-store/Restaurant/Action'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'

const PrivacyPolicy = () => {
  // State
  const [policy, setPolicy] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  // Hooks
  const dispatch = useDispatch()
  const { restaurant, loading } = useSelector((state: any) => state.restaurant)


  const handleSave = () => {
    dispatch(editRestaurantDetail({
      data: { id: restaurant?._id, company: { ...restaurant?.company, custom_privacy: policy } },
      old_restaurant_data: restaurant
    }))
  }

  useEffect(() => {
    if (AppUtils.checkValue(restaurant) && Object?.keys(restaurant)?.length > 0) {
      setPolicy(restaurant?.company?.custom_privacy)
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
          width: '45rem',
          p: 4,
          border: theme => `1px solid ${theme.palette.divider}`,
          borderRadius: '10px'
        }}
      >
        <Typography sx={{ mb: 2, fontWeight: 500 }}>
          You need to have a privacy policy when operating online.
        </Typography>
        <CsEditor fieldName='name' height={300} value={policy} setValue={setPolicy} toolbar={true} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
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

      <TemplateDialog open={open} setOpen={setOpen} setTerms={setPolicy} label='Privacy Policy' />
    </Box>
  )
}

export default PrivacyPolicy
