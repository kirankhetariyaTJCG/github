'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import LoadingButton from '@mui/lab/LoadingButton'

// Third Party Imports
import { useSelector } from 'react-redux'

// Custom Imports
import AddEditCategory from './AddEditCategory'
import AddEditItem from './AddEditItem'
import CategoryList from './CategoryList'

const CategoryView = () => {
  // States
  const [isAdd, setIsAdd] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [isItem, setIsItem] = useState<{ open: boolean; row: any }>({ open: false, row: {} })

  // Hooks
  const categoryData = useSelector((state: any) => state.category.category)

  return (
    <>
      <Card sx={{ width: '100%', height: '100%' }}>
        <Box
          sx={{
            p: 4,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600 }}>Categories</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
            <LoadingButton
              variant='contained'
              disabled={categoryData?.length === 0}
              onClick={() => categoryData?.length > 0 && setIsItem({ open: true, row: {} })}
            >
              Add Items
            </LoadingButton>
            <LoadingButton variant='contained' onClick={() => setIsAdd({ open: true, row: {} })}>
              Add Category
            </LoadingButton>
          </Box>
        </Box>
        <CategoryList setIsAdd={setIsAdd} setIsItem={setIsItem} />
      </Card>

      <AddEditCategory open={isAdd?.open} setOpen={setIsAdd} row={isAdd?.row} />
      <AddEditItem open={isItem?.open} setOpen={setIsItem} row={isItem?.row} />
    </>
  )
}

export default CategoryView
