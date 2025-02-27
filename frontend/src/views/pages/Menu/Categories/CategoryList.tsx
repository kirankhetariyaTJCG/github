// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { Box, Typography, LoadingButton, Chip, IconButton, Collapse, Tooltip } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import moment from 'moment'

// Custom Imports
import CsDelete from '@/@core/components/CsDelete'
import Sizes from './Size'
import CustomBackdrop from '@/@core/components/CsBackdropLoader'
import Settings from '../Common/Settings'
import Visibility from '../Common/Visibility'
import Availability from '../Common/Availability'
import { initialDays } from '../Common/Visibility'
import AddEditSize from './Size/AddEditSize'

// Store Imports
import { setCategory } from '@/redux-store/Category'
import { changeCategoryPosition, changeItemPosition, deleteCategory, getCategories, deleteItem, duplicateCategory, duplicateItem, deleteSize } from '@/redux-store/Category/Action'
import { getAddons } from '@/redux-store/Addons/Action'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Helper Imports
import AppUtils from '@/Helper/AppUtils'
import UrlHelper from '@/Helper/Url'

interface Props {
  setIsAdd: (state: { open: boolean; row: any }) => void
  setIsItem: (state: { open: boolean; row: any }) => void
}

const DragTypes = {
  1: 'category',
  2: 'items'
}

const CategoryList = (props: Props) => {
  // Props
  const { setIsAdd, setIsItem } = props

  // State
  const [isDelete, setIsDelete] = useState<{ open: boolean; id: any; type: number }>({ open: false, id: '', type: 1 })
  const [isSize, setIsSize] = useState<{ open: boolean; row: any; item: any }>({ open: false, row: {}, item: {} })
  const [isVisible, setIsVisible] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [settings, setSettings] = useState<{ open: boolean; row: any }>({ open: false, row: {} })
  const [toggleCategory, setToggleCategory] = useState<string | null>(null)
  const [isAvailable, setIsAvailable] = useState<{ open: boolean, row: {} }>({ open: false, row: {} })
  const [toggleItem, setToggleItem] = useState<string | null>(null)

  // Hooks
  const categoryData = useSelector((state: any) => state.category.category)
  const loading = useSelector((state: any) => state.category.loading)
  const { restaurant } = useSelector((state: any) => state.restaurant)
  const dispatch = useDispatch()

  useEffect(() => {
    !loading && setIsDelete({ open: false, id: {}, type: 1 })
  }, [loading])

  useEffect(() => {
    if (AppUtils.checkValue(restaurant?.menu_id)) {
      dispatch(getCategories({ menu_id: restaurant?.menu_id }))
      dispatch(getAddons({ menu_id: restaurant?.menu_id }))
    }
  }, [restaurant?.menu_id])


  const handleOnDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === DragTypes[1]) {
      const reorderCategories = AppUtils.reorderList(categoryData, source.index, destination.index);
      dispatch(setCategory(reorderCategories))

      return dispatch(changeCategoryPosition({
        menu_id: restaurant?.menu_id,
        categories: reorderCategories,
        oldCategories: categoryData
      }))
    }

    if (type === DragTypes[2]) {
      let reorderItems: any[] = []
      const categoryId = source.droppableId.replace('items-', '');
      const updatedCategories = categoryData.map((category: any) => {
        if (category._id === categoryId) {
          reorderItems = AppUtils.reorderList(category.items, source.index, destination.index);

          return { ...category, items: reorderItems, };
        }

        return category;
      });

      dispatch(setCategory(updatedCategories))

      return dispatch(changeItemPosition({
        category_id: categoryId,
        items: reorderItems,
        oldItems: categoryData?.find((item: any) => item?._id === categoryId ? item : item)?.items
      }))
    }
  };


  const handleDelete = () => {
    if (isDelete?.type === 1) {
      dispatch(deleteCategory(isDelete?.id))
    } else if (isDelete?.type === 2) {
      dispatch(deleteItem({ category_id: isDelete?.id?.category_id, id: isDelete?.id?._id }))
    } else {
      dispatch(deleteSize({
        category_id: isDelete?.id?.category_id,
        item_id: isDelete?.id?.item_id,
        id: isDelete?.id?._id
      }))
    }

  }

  const getChipLabel = (item: any) => {
    const isAllFieldsNull = !item.hidden_until &&
      !item.active_begin && !item.active_days && !item.active_end &&
      !item.active_exact_from && !item.active_exact_until;

    if (!isAllFieldsNull) {
      if (item.is_active) {
        if (AppUtils.checkValue(item?.active_begin) && AppUtils.checkValue(item?.active_end) && AppUtils.checkValue(item?.active_days)) {
          const activeDayLabels = item?.active_days?.map((dayIndex: number) => {
            return initialDays[dayIndex - 1]?.label.slice(0, 3);
          }).join(', ')
          return `Show Only on ${activeDayLabels} ${moment.unix(item?.active_begin).format('hh:mm A')} - ${moment.unix(item?.active_end).format('hh:mm A')}`
        }
        if (AppUtils.checkValue(item?.active_exact_from) && AppUtils.checkValue(item?.active_exact_until)) {
          return `From ${moment.unix(item?.active_exact_from).format('MMM DD, YYYY HH:mm A')}  To ${moment.unix(item?.active_exact_until).format('MMM DD, YYYY HH:mm A')}`
        }
      } else {
        if (AppUtils.checkValue(item?.hidden_until)) {
          return `Hidden Until ${moment.unix(item?.hidden_until).format('MMM DD, YYYY hh:mm A')}`
        } else return 'Hidden From Menu'
      }
    }
  }

  const getOutOfStockLabel = (item: any) => {
    if (item?.out_of_stock) {
      if (AppUtils.checkValue(item?.out_of_stock_next_day)) {
        return `Out of Stock - ${moment(item?.out_of_stock_next_day).format('HH:mm, D MMM')}`;
      } else if (AppUtils.checkValue(item?.out_of_stock_until)) {
        return `Out of Stock - ${moment.unix(item?.out_of_stock_until).format('HH:mm, D MMM')}`
      } return 'Out Of Stock'
    }
  }

  return (
    <>
      <CustomBackdrop open={loading} />
      <Box>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId='category' type='category'>
            {provided => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {Array.isArray(categoryData) &&
                  categoryData.length > 0 &&
                  categoryData.map((category: any, index: number) => (
                    <Draggable key={category?._id} draggableId={`category-${category?._id}`} index={index}>
                      {provided => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{
                            boxShadow: theme => theme.shadows[2],
                            mx: 4,
                            mt: 3,
                            mb: 2,
                            borderRadius: '8px',
                            border: theme => `1px solid ${theme.palette.divider}`
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              py: 2,
                              px: 4,
                              borderBottom: theme =>
                                category?._id === toggleCategory && Array.isArray(category?.items) && category?.items.length > 0
                                  ? `1px solid ${theme.palette.divider}`
                                  : 'none'
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <IconButton {...provided.dragHandleProps}>
                                <Icon icon={'icon-park-outline:drag'} />
                              </IconButton>
                              {AppUtils.checkValue(category?.image) ? (
                                <Box
                                  component={'img'}
                                  src={`${UrlHelper.imgPath}${category?.image}`}
                                  sx={{ width: 90, height: 90, objectFit: 'cover', borderRadius: '8px' }}
                                />
                              ) : (
                                <Box
                                  component={Icon}
                                  icon={'fa-regular:image'}
                                  sx={{ color: theme => theme.palette.secondary.light, fontSize: 70 }}
                                />
                              )}
                              <Box>
                                {AppUtils.checkValue(category?.is_active) &&
                                  <Chip
                                    label={getChipLabel(category)}
                                    size='small'
                                    color='warning'
                                    sx={{
                                      height: '22px',
                                      fontSize: '0.7rem',
                                      color: theme => theme.palette.text.primary,
                                      lineHeight: 2
                                    }}
                                  />
                                }
                                <Typography sx={{ fontWeight: 600, fontSize: '1rem', my: 1 }}>
                                  {category?.name}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontWeight: 400,
                                    fontSize: '0.8rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: { xs: '20ch', sm: '30ch', md: '50ch' },
                                    mb: 1
                                  }}
                                >
                                  {category?.description}
                                </Typography>
                                {Array.isArray(category?.addons) && category?.addons?.length > 0 && (
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {category?.addons?.map((val: any, i: number) => (
                                      <Chip key={i} size='small' label={val?.name} />
                                    ))}
                                  </Box>
                                )}
                              </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {Array.isArray(category?.items) && category?.items.length > 0 && (
                                <IconButton
                                  onClick={() => toggleCategory === category?._id
                                    ? setToggleCategory(null) : setToggleCategory(category?._id)}
                                >
                                  <Icon
                                    icon={'icon-park-outline:down'}
                                    style={{
                                      transition: 'all 0.2s ease-in-out',
                                      transform: category?._id === toggleCategory ? 'rotate(180deg)' : 'none'
                                    }}
                                  />
                                </IconButton>
                              )}
                              <Tooltip title='Add Item' arrow>
                                <IconButton onClick={() => setIsItem({ open: true, row: {} })}>
                                  <Icon icon={'icon-park-outline:add-one'} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Visibility' arrow>
                                <IconButton onClick={() => setIsVisible({ open: true, row: { ...category, type: 1 } })}>
                                  <Icon icon={'gg:eye'} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Duplicate' arrow>
                                <IconButton onClick={() =>
                                  dispatch(duplicateCategory({ id: category?._id, type: 1 }))
                                }>
                                  <Icon icon={'heroicons-outline:duplicate'} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Edit' arrow>
                                <IconButton onClick={() => setIsAdd({ open: true, row: category })}>
                                  <Icon icon={'bx:edit'} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title='Delete' arrow>
                                <IconButton onClick={() => setIsDelete({ open: true, id: category?._id, type: 1 })}>
                                  <Icon icon={'ic:twotone-delete'} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                          <Collapse in={category?._id === toggleCategory && Array.isArray(category?.items) && category?.items.length > 0}>
                            <Box sx={{ m: 4 }}>
                              <Droppable droppableId={`items-${category?._id}`} type={`items`}>
                                {provided => (
                                  <Box ref={provided.innerRef} {...provided.droppableProps}>
                                    {category?.items?.map((item: any, i: number) => (
                                      <Draggable key={item?._id} draggableId={`val-${item?._id}`} index={i}>
                                        {provided => (
                                          <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            sx={{
                                              border: theme => `1px solid ${theme.palette.divider}`,
                                              borderRadius: '8px',
                                              mb: 4,
                                              '&:hover .price': { display: 'none' },
                                              '&:hover .btn': { display: 'flex' }
                                            }}
                                          >
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                py: 2,
                                                px: 4,
                                                borderBottom: theme =>
                                                  item?._id === toggleItem ? `1px solid ${theme.palette.divider}` : 'none'
                                              }}
                                            >
                                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <IconButton {...provided.dragHandleProps}>
                                                  <Icon icon={'icon-park-outline:drag'} />
                                                </IconButton>
                                                {AppUtils.checkValue(item?.image) ? (
                                                  <Box
                                                    component={'img'}
                                                    src={`${UrlHelper.imgPath}${item?.image}`}
                                                    sx={{
                                                      width: 90,
                                                      height: 90,
                                                      objectFit: 'cover',
                                                      borderRadius: '8px'
                                                    }}
                                                  />
                                                ) : (
                                                  <Box
                                                    component={Icon}
                                                    icon={'fa-regular:image'}
                                                    sx={{ color: theme => theme.palette.secondary.light, fontSize: 70 }}
                                                  />
                                                )}
                                                <Box>
                                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {AppUtils.checkValue(item?.is_active) &&
                                                      <Chip
                                                        label={getChipLabel(item)}
                                                        size='small'
                                                        color='warning'
                                                        sx={{
                                                          height: '22px',
                                                          fontSize: '0.7rem',
                                                          color: theme => theme.palette.text.primary,
                                                          lineHeight: 2
                                                        }}
                                                      />
                                                    }
                                                    {AppUtils.checkValue(item?.out_of_stock) && item?.out_of_stock &&
                                                      <Chip
                                                        label={getOutOfStockLabel(item)}
                                                        size='small'
                                                        color='error'
                                                        sx={{
                                                          height: '22px',
                                                          fontSize: '0.7rem',
                                                          color: '#fff',
                                                          lineHeight: 2
                                                        }} />
                                                    }
                                                    {AppUtils.checkValue(item?.menu_item_order_types) && Array.isArray(item?.menu_item_order_types) &&
                                                      item?.menu_item_order_types?.length > 0 &&
                                                      <Chip
                                                        label={item?.menu_item_order_types.join(', ')}
                                                        size='small'
                                                        color='secondary'
                                                        sx={{
                                                          height: '22px',
                                                          fontSize: '0.7rem',
                                                          lineHeight: 2
                                                        }} />
                                                    }
                                                  </Box>
                                                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                                    <Typography sx={{ fontWeight: 600, fontSize: '1rem' }}>
                                                      {item?.name}
                                                    </Typography>
                                                    {AppUtils.checkValue(item?.tags) && Array.isArray(item?.tags) && item?.tags?.length > 0 &&
                                                      item?.tags?.map((tag: any, tagI: number) => {
                                                        return (
                                                          <Tooltip key={tagI} title={tag?.tag_name} arrow>
                                                            <IconButton sx={{ p: 0 }} color='secondary'>
                                                              <Icon icon={tag?.icon_image} />
                                                            </IconButton>
                                                          </Tooltip>
                                                        )
                                                      })
                                                    }
                                                  </Box>
                                                  <Typography
                                                    sx={{
                                                      fontWeight: 400,
                                                      fontSize: '0.8rem',
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis',
                                                      whiteSpace: 'nowrap',
                                                      width: { xs: '20ch', sm: '30ch', md: '50ch' }
                                                    }}
                                                  >
                                                    {item?.description}
                                                  </Typography>
                                                  {Array.isArray(item?.addons) && item?.addons?.length > 0 && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                      {item?.addons?.map((val: any, i: number) => (
                                                        <Chip key={i} size='small' label={val?.name} />
                                                      ))}
                                                    </Box>
                                                  )}
                                                </Box>
                                              </Box>
                                              <Typography
                                                className='price'
                                                sx={{ fontWeight: 600 }}
                                              >
                                                $ {item?.price ? item?.price : 0}/-
                                              </Typography>
                                              <Box
                                                className='btn'
                                                sx={{ display: 'none', alignItems: 'center' }}
                                              >
                                                {Array.isArray(item?.sizes) && item?.sizes.length > 0 &&
                                                  <IconButton
                                                    onClick={() =>
                                                      item?._id === toggleItem
                                                        ? setToggleItem(null) : setToggleItem(item?._id)
                                                    }
                                                  >
                                                    <Icon
                                                      icon={'icon-park-outline:down'}
                                                      style={{
                                                        transition: 'all 0.2s ease-in-out',
                                                        transform: toggleItem === item?._id ? 'rotate(180deg)' : 'none'
                                                      }}
                                                    />
                                                  </IconButton>}
                                                <Tooltip title='Add Size' arrow>
                                                  <IconButton onClick={() => setIsSize({ open: true, row: {}, item: item })}>
                                                    <Icon icon={'icon-park-outline:add-one'} />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Settings' arrow>
                                                  <IconButton onClick={() => setSettings({ open: true, row: item })}>
                                                    <Icon icon={'ic:outline-settings'} />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Availability' arrow>
                                                  <IconButton onClick={() => setIsAvailable({ open: true, row: item })}>
                                                    <Icon icon={'ic:outline-event-available'} />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Visibility' arrow>
                                                  <IconButton onClick={() => setIsVisible({ open: true, row: { ...item, type: 2 } })}>
                                                    <Icon icon={'gg:eye'} />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Duplicate' arrow>
                                                  <IconButton onClick={() =>
                                                    dispatch(duplicateItem({ id: item?._id, type: 2, parentKey: 'category_id' }))
                                                  }>
                                                    <Icon icon={'heroicons-outline:duplicate'} />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Edit' arrow>
                                                  <IconButton onClick={() => setIsItem({ open: true, row: item })}>
                                                    <Icon icon={'bx:edit'} />
                                                  </IconButton>
                                                </Tooltip>
                                                <Tooltip title='Delete' arrow>
                                                  <IconButton
                                                    onClick={() =>
                                                      setIsDelete({
                                                        open: true,
                                                        id: { category_id: item?.category_id, _id: item?._id },
                                                        type: 2
                                                      })
                                                    }
                                                  >
                                                    <Icon icon={'ic:twotone-delete'} />
                                                  </IconButton>
                                                </Tooltip>
                                              </Box>
                                            </Box>
                                            <Collapse in={toggleItem === item?._id}>
                                              {Array.isArray(item?.sizes) && item?.sizes?.length > 0 &&
                                                <Sizes
                                                  item={item}
                                                  setIsAdd={setIsSize}
                                                  setIsDelete={setIsDelete}
                                                />
                                              }
                                            </Collapse>
                                          </Box>
                                        )}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    <LoadingButton
                                      sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                                      onClick={() => setIsItem({ open: true, row: {} })}
                                    >
                                      Add Item
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
                {Array.isArray(categoryData) && categoryData?.length === 0 && (
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
                    <Box component={'img'} src='/images/NoCategory.svg' sx={{ width: '100%', height: '20rem' }} />
                    <Typography sx={{ fontWeight: 600, fontSize: '1.1rem', mt: 2 }}>
                      No Categories are available!
                    </Typography>
                  </Box>
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

      <Visibility open={isVisible?.open} setOpen={setIsVisible} row={isVisible?.row} />

      <Availability open={isAvailable?.open} setOpen={setIsAvailable} row={isAvailable?.row} type={1} />

      <Settings open={settings?.open} setOpen={setSettings} row={settings?.row} />

      <AddEditSize isAdd={isSize} setIsAdd={setIsSize} />

      <CsDelete
        open={isDelete?.open}
        onClose={() => setIsDelete({ open: false, id: {}, type: 1 })}
        label={isDelete?.type === 1 ? 'Category' : 'Item'}
        loading={loading}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default CategoryList
