// MUI Imports
import { Box, Grid, FormControlLabel, Checkbox, Typography } from '@/Helper/MUIImports'

// Third Party Imports
import { useSelector } from 'react-redux'

// Icon Imports
import Icon from '@/@core/components/Icon'

const MarkedItems = ({ tagIds, setTagIds }: { tagIds: any[], setTagIds: (tagsIds: any[]) => void }) => {

    // Hooks
    const tags = useSelector((state: any) => state.category.tags)

    return (
        <Box>
            <Grid container>
                {Array.isArray(tags) &&
                    tags?.length > 0 &&
                    tags?.map((tag: any, index: number) => {
                        return (
                            <Grid key={index} item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={tagIds.some((selectedTag: any) => selectedTag?._id === tag?._id)}
                                            onChange={(e: any) => e.target.checked ? setTagIds([...tagIds, { ...tag }]) : setTagIds(tagIds.filter((val: any) => val?._id !== tag?._id))}
                                        />
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography sx={{ fontWeight: 500, mr: 2 }}>{tag?.tag_name}</Typography>
                                            <Box
                                                component={Icon}
                                                icon={tag?.icon_image}
                                                fontSize={20}
                                                sx={{ color: theme => theme.palette.text.secondary }}
                                            />
                                        </Box>
                                    }
                                />
                            </Grid>
                        )
                    })}
            </Grid>
        </Box>
    )
}

export default MarkedItems