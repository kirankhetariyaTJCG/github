// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import { Box, FormControlLabel, Checkbox, Dialog, DialogActions, LoadingButton, IconButton, Collapse } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { Step2Values } from '../AddEditPromo'

interface Props {
    open: boolean
    setOpen: (data: { open: boolean, row: {}, type: keyof Step2Values }) => void
    row?: any
    onSaveClick: (data: { total: number, items: any[] }) => void
}

const ItemGroup = (props: Props) => {

    // Props
    const { open, setOpen, row, onSaveClick } = props

    // Hooks
    const categoryData = useSelector((state: any) => state.category.category)
    const loading = useSelector((state: any) => state.self_made.loading)

    useEffect(() => {
        if (Object?.keys(row)?.length > 0) {
            setCategories(
                categoryData.map((category: any) => {
                    const updatedItems = category.items.map((item: any) => {
                        const apiItem = row?.items.find((api: any) => api.items === item._id);

                        if (apiItem) {
                            const sizesChecked = item.sizes.map((size: any) => ({
                                ...size,
                                checked: apiItem.sizes.includes(size._id),
                            }));

                            const allSizesChecked = sizesChecked.every((size: any) => size.checked);
                            const someSizesChecked = sizesChecked.some((size: any) => size.checked);

                            return {
                                ...item,
                                checked: allSizesChecked,
                                indeterminate: someSizesChecked && !allSizesChecked,
                                sizes: sizesChecked,
                            };
                        }

                        return { ...item, checked: false, indeterminate: false };
                    });

                    const allItemsChecked = updatedItems.every((item: any) => item.checked);
                    const someItemsChecked = updatedItems.some(
                        (item: any) => item.checked || item.indeterminate
                    );

                    return {
                        ...category,
                        checked: allItemsChecked,
                        indeterminate: someItemsChecked && !allItemsChecked,
                        items: updatedItems,
                    };
                })
            );
        }
    }, [row]);

    // State
    const [categories, setCategories] = useState(categoryData.map((category: any) => ({
        ...category,
        checked: false,
        indeterminate: false,
        items: category.items.map((item: any) => ({
            ...item,
            checked: false,
            indeterminate: false,
            sizes: item.sizes.map((size: any) => ({
                ...size,
                checked: false
            }))
        }))
    })))
    const [activeCategory, setActiveCategory] = useState<number[]>([])
    const [activeItem, setActiveItem] = useState<number[]>([])

    const handleClose = () => {
        setOpen({ open: false, row: {}, type: 'items' })
        setCategories(categoryData.map((category: any) => ({
            ...category,
            checked: false,
            indeterminate: false,
            items: category.items.map((item: any) => ({
                ...item,
                checked: false,
                indeterminate: false,
                sizes: item.sizes.map((size: any) => ({
                    ...size,
                    checked: false
                }))
            }))
        })))
    }

    const handleCategoryChange = (categoryIndex: number, checked: boolean) => {
        const updatedState = [...categories];
        const category = updatedState[categoryIndex];

        category.checked = checked;
        category.indeterminate = false;
        category.items.forEach((item: any) => {
            item.checked = checked;
            item.indeterminate = false;
            item.sizes.forEach((size: any) => (size.checked = checked));
        });

        setCategories(updatedState);
    };

    const handleItemChange = (categoryIndex: number, itemIndex: number, checked: boolean) => {
        const updatedState = [...categories];
        const category = updatedState[categoryIndex];
        const item = category.items[itemIndex];
        item.checked = checked;
        item.indeterminate = false;
        item.sizes.forEach((size: any) => size.checked = checked)
        category.checked = category.items.every((it: any) => it.checked);
        category.indeterminate = category.items.some((it: any) => it.indeterminate || it.checked) && !category.checked;

        setCategories(updatedState);
    };

    const handleSizeChange = (categoryIndex: number, itemIndex: number, sizeIndex: number, checked: boolean) => {
        const newCategories = [...categories]
        const category = newCategories[categoryIndex]
        const item = category.items[itemIndex]
        item.sizes[sizeIndex].checked = checked
        item.checked = item.sizes.every((size: any) => size.checked)
        item.indeterminate = item.sizes.some((size: any) => size.checked) && !item.checked
        category.checked = category.items.every((it: any) => it.checked)
        category.indeterminate = category.items.some((it: any) => it.indeterminate || it.checked) && !category.checked

        setCategories(newCategories)
    }

    const handleSave = () => {
        let selectedItemCount = 0;
        const payload = categories.reduce((acc: any[], category: any) => {
            category.items.forEach((item: any) => {
                if (item.checked) {
                    selectedItemCount++;
                    const sizeIds = item.sizes
                        .filter((size: any) => size.checked)
                        .map((size: any) => size._id);

                    const itemData: any = { items: item._id };
                    if (sizeIds.length > 0) {
                        itemData.sizes = sizeIds;
                    }
                    acc.push(itemData);
                }
            });
            return acc;
        }, []);

        onSaveClick({ items: payload, total: selectedItemCount })
        handleClose()
    };

    return (
        <Dialog open={open} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', p: 4 }}>
                {Array.isArray(categories) && categories?.length > 0 &&
                    categories?.map((category, categoryI: number) => {
                        return (
                            <Box key={categoryI} sx={{
                                display: 'flex', flexDirection: 'column',
                                px: 2,
                                py: 2,
                                border: theme => `1px solid ${theme.palette.divider}`,
                                borderRadius: '10px',
                                mb: 4
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <FormControlLabel
                                        sx={{ m: 0 }}
                                        control={
                                            <Checkbox
                                                checked={category.checked}
                                                indeterminate={category.indeterminate}
                                                onChange={e => handleCategoryChange(categoryI, e.target.checked)}
                                            />
                                        }
                                        label={category?.name}
                                    />
                                    <IconButton
                                        size='small'
                                        onClick={() => activeCategory.includes(categoryI)
                                            ? setActiveCategory(prev => prev?.filter((item: any) => item !== categoryI))
                                            : setActiveCategory([...activeCategory, categoryI])
                                        }
                                    >
                                        <Icon
                                            icon={'icon-park-outline:down'}
                                            style={{
                                                transition: 'all 0.2s ease-in-out',
                                                transform: activeCategory.includes(categoryI) ? 'rotate(180deg)' : 'none'
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                                <Collapse in={activeCategory.includes(categoryI)}>
                                    <Box sx={{ pl: 6 }}>
                                        {Array.isArray(category?.items) && category?.items?.length > 0 &&
                                            category?.items?.map((item: any, itemI: number) => {
                                                return (
                                                    <Box key={itemI} sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'centert', gap: 1 }}>
                                                            <FormControlLabel
                                                                sx={{ m: 0 }}
                                                                control={
                                                                    <Checkbox
                                                                        checked={item.checked}
                                                                        indeterminate={item.indeterminate}
                                                                        onChange={e => handleItemChange(categoryI, itemI, e.target.checked)}
                                                                    />
                                                                }
                                                                label={item?.name}
                                                            />
                                                            {Array.isArray(item?.sizes) && item?.sizes?.length > 0 &&
                                                                <IconButton
                                                                    size='small'
                                                                    onClick={() => activeItem.includes(itemI)
                                                                        ? setActiveItem(prev => prev?.filter((val: any) => val !== itemI))
                                                                        : setActiveItem([...activeItem, itemI])
                                                                    }
                                                                >
                                                                    <Icon
                                                                        icon={'icon-park-outline:down'}
                                                                        style={{
                                                                            transition: 'all 0.2s ease-in-out',
                                                                            transform: activeItem.includes(itemI) ? 'rotate(180deg)' : 'none'
                                                                        }}
                                                                    />
                                                                </IconButton>
                                                            }
                                                        </Box>
                                                        <Collapse in={activeItem.includes(itemI)}>
                                                            <Box sx={{ pl: 6 }}>
                                                                {Array.isArray(item?.sizes) && item?.sizes?.length > 0 &&
                                                                    item?.sizes?.map((size: any, sizeI: number) => {
                                                                        return (
                                                                            <Box key={sizeI} sx={{ display: 'flex', flexDirection: 'column' }}>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            checked={size.checked}
                                                                                            onChange={e => handleSizeChange(categoryI, itemI, sizeI, e.target.checked)}
                                                                                        />
                                                                                    }
                                                                                    label={size?.name}
                                                                                />
                                                                            </Box>
                                                                        )
                                                                    })
                                                                }
                                                            </Box>
                                                        </Collapse>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                </Collapse>
                            </Box>
                        )
                    })
                }
            </Box>
            <DialogActions
                sx={{
                    borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    pt: '1rem !important',
                    p: 4,
                    justifyContent: 'space-between'
                }}>
                <LoadingButton
                    sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                    disabled={loading}
                    onClick={handleClose}
                >
                    Cancel
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
            </DialogActions>
        </Dialog>
    )
}

export default ItemGroup