// React Imports
import { useState, useRef } from 'react'

// MUI Imports
import {
    LoadingButton, Dialog, DialogActions, DialogContent, DialogTitle,
    Typography, Box, IconButton, Collapse, TabContext, Avatar, Tab
} from '@/Helper/MUIImports'

// Third Party Imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { useDropzone } from 'react-dropzone'

// Custom Imports
import CustomTabList from '@/@core/components/mui/TabList'

// Icon Imports
import Icon from '@/@core/components/Icon'

// Types Imports
import type { DialogProps } from '@/types'

// Style Imports
import 'swiper/swiper-bundle.css'
import 'swiper/css/pagination'

// Helper Imports
import UrlHelper from '@/Helper/Url'
import Constants from '@/Helper/Constants'

const ChangeImage = (props: DialogProps & { setImage: (image: any) => void }) => {
    // Props
    const { open, setOpen, setImage } = props

    // State
    const [value, setValue] = useState<string>('0')
    const [isUpload, setIsUpload] = useState<boolean>(true)
    const [file, setFile] = useState<any>(null)
    const [actImg, setActImg] = useState<any>(null)

    // Hooks
    const swiperRef = useRef<any>(null)

    const { getRootProps, getInputProps } = useDropzone({
        maxSize: Constants.IMAGE_SIZE,
        accept: Constants.IMAGE_TYPE,
        multiple: false,
        onDrop: (acceptedFiles: File[]) => acceptedFiles?.map((file: File) => setFile(file))
    })

    // const tabs = [
    //     {
    //         label: 'Pizza',
    //         slider: [
    //             'https://www.fbgcdn.com/pictures/b6a00ce1-8c68-4350-943c-915348836ca5.jpg',
    //             'https://www.fbgcdn.com/pictures/8a541aa3-2035-4ed9-8502-f6fa05826d86.jpg',
    //             'https://www.fbgcdn.com/pictures/ad59c2f4-8b42-434b-99ed-71d1648dd01f.jpg',
    //             'https://www.fbgcdn.com/pictures/39c6ecd2-9398-4c13-9cb4-3cd4a7d93c6c.jpg',
    //             'https://www.fbgcdn.com/pictures/64e0e8ce-0477-4304-b88f-943835a50224.jpg',
    //             'https://www.fbgcdn.com/pictures/746917bf-278d-4854-b098-7d71d02fe082.jpg',
    //             'https://www.fbgcdn.com/pictures/9af5f957-fde0-436b-b63e-43f0dcdad149.jpg',
    //             'https://www.fbgcdn.com/pictures/52d1cc8a-c5ef-44fa-ac15-b492cdaa3db9.jpg',
    //             'https://www.fbgcdn.com/pictures/5c03370e-8068-4aad-a55e-f2b95f42f66c.jpg',
    //             'https://www.fbgcdn.com/pictures/33435129-9991-4ca3-8f49-cac6ae8981ba.jpg',
    //             'https://www.fbgcdn.com/pictures/1a303861-bdb0-4628-9b30-4f01a0c1fa19.jpg'
    //         ]
    //     },
    //     {
    //         label: 'Burgur',
    //         slider: [
    //             'https://www.fbgcdn.com/pictures/9b6630a0-d528-42e5-98ad-22076f1c1556.jpg',
    //             'https://www.fbgcdn.com/pictures/a19c685d-1728-4f71-89f9-a6795d464b13.jpg',
    //             'https://www.fbgcdn.com/pictures/cdb76feb-df85-48b9-a540-cc17cc8efae3.jpg',
    //             'https://www.fbgcdn.com/pictures/34add1f8-ad66-413e-a9ce-31c257f1dc23.jpg',
    //             'https://www.fbgcdn.com/pictures/5250c3e7-adf7-4847-9e77-4f3e101989e6.jpg',
    //             'https://www.fbgcdn.com/pictures/f24eb0a8-c126-4c46-a629-93d83265dfe0.jpg',
    //             'https://www.fbgcdn.com/pictures/551c0022-549a-4a19-af9c-03eb95b09c99.jpg',
    //             'https://www.fbgcdn.com/pictures/c23b3164-5816-4599-9cb8-4ec44b586874.jpg',
    //             'https://www.fbgcdn.com/pictures/2171a974-8460-4f15-9af1-ccf410115930.jpg',
    //             'https://www.fbgcdn.com/pictures/0d1c87e1-35b8-4c31-8f6d-3e3daaeb718c.jpg',
    //             'https://www.fbgcdn.com/pictures/734e97ea-b706-4e11-90dd-8431b4ed7699.jpg',
    //             'https://www.fbgcdn.com/pictures/b531083e-e382-40fd-b4a7-e5e44fd4aeb8.jpg',
    //             'https://www.fbgcdn.com/pictures/612b2b9a-6fdc-423a-9916-d6257f782afc.jpg',
    //             'https://www.fbgcdn.com/pictures/ba97e2e7-6e64-4923-a4b2-efc18581bbed.jpg'
    //         ]
    //     },
    //     {
    //         label: 'Sandwich',
    //         slider: [
    //             'https://www.fbgcdn.com/pictures/f0a7f087-0375-4be1-8284-cfe49395950b.jpg',
    //             'https://www.fbgcdn.com/pictures/1221b54f-5a56-4b10-8665-046206b33ef2.jpg',
    //             'https://www.fbgcdn.com/pictures/9ff44165-dc5b-4ce8-bab7-585c8116795a.jpg',
    //             'https://www.fbgcdn.com/pictures/60644154-41fa-4f7b-88ad-1a41993ba88d.jpg',
    //             'https://www.fbgcdn.com/pictures/11f6d418-74d2-4994-9430-de529c422d88.jpg',
    //             'https://www.fbgcdn.com/pictures/718158c5-95bd-4a84-8737-f7fad0acc76e.jpg',
    //             'https://www.fbgcdn.com/pictures/449f5ac0-9e0a-4a99-90a3-032242e9a587.jpg'
    //         ]
    //     },
    //     {
    //         label: 'Drink (Can)',
    //         slider: [
    //             'https://www.fbgcdn.com/pictures/adacd686-8cd5-4c1d-94b7-4567361638a1.jpg',
    //             'https://www.fbgcdn.com/pictures/753f19c9-dbbe-40c7-b860-d578e235fbd5.jpg',
    //             'https://www.fbgcdn.com/pictures/11988f8a-0284-4df9-acf6-24e3a7304cbc.jpg',
    //             'https://www.fbgcdn.com/pictures/4ce4b521-18ba-49e6-868c-d083a1eb3238.jpg',
    //             'https://www.fbgcdn.com/pictures/4bfa690a-3757-4292-8ea4-9d6a0ce1f528.jpg',
    //             'https://www.fbgcdn.com/pictures/cf489fc0-a422-44b8-aace-7ddefabaeb67.jpg',
    //             'https://www.fbgcdn.com/pictures/2f67c80a-8d37-45e9-806b-d427f50df79d.jpg',
    //             'https://www.fbgcdn.com/pictures/9aad2fc4-60c0-4875-b4bb-bcfda94032c8.jpg',
    //             'https://www.fbgcdn.com/pictures/4ac5b577-e117-4647-b7db-ac7cd518e895.jpg',
    //             'https://www.fbgcdn.com/pictures/839140f4-0759-421c-85b0-78845c3a3321.jpg',
    //             'https://www.fbgcdn.com/pictures/b7d9b0a8-a514-4a25-aa91-31086f255f18.jpg',
    //             'https://www.fbgcdn.com/pictures/49be3c30-063c-4b10-b967-923cb10fe805.jpg',
    //             'https://www.fbgcdn.com/pictures/09ab25c3-50fd-4494-b04b-e0716b8b4e92.jpg',
    //             'https://www.fbgcdn.com/pictures/5a094265-594d-4590-8b7a-36db663cbc36.jpg'
    //         ]
    //     },
    //     {
    //         label: 'Drink (Bottle)',
    //         slider: [
    //             'https://www.fbgcdn.com/pictures/848e9a82-088e-43a9-87b5-124ca3ea8c8a.jpg',
    //             'https://www.fbgcdn.com/pictures/075502a4-0ebd-426a-b5da-8932aea6d41e.jpg',
    //             'https://www.fbgcdn.com/pictures/b20f8baa-4f42-4e45-b633-6bc6cd606411.jpg',
    //             'https://www.fbgcdn.com/pictures/37558c7b-2233-46b1-a9a4-7c8e9d98c8ee.jpg',
    //             'https://www.fbgcdn.com/pictures/95a54a0b-7740-4a62-82b6-5d8d63b3948b.jpg',
    //             'https://www.fbgcdn.com/pictures/06bdad53-ff68-4b49-9d07-28b8543ef679.jpg'
    //         ]
    //     },
    //     {
    //         label: 'Drink (Glass)',
    //         slider: [
    //             'https://www.fbgcdn.com/pictures/2ef4ed19-a314-4063-becc-51c7a1f73794.jpg',
    //             'https://www.fbgcdn.com/pictures/bd84464e-7e1a-4d96-8e88-3f397e5d6d1e.jpg',
    //             'https://www.fbgcdn.com/pictures/15b34eb5-d0f9-4e15-bbb7-c0accff7d528.jpg',
    //             'https://www.fbgcdn.com/pictures/54f82d5a-f8c7-4b99-9948-727e401b1e8a.jpg',
    //             'https://www.fbgcdn.com/pictures/d608f61c-c377-45f2-b793-6a99dd63a374.jpg',
    //             'https://www.fbgcdn.com/pictures/eba77cc5-bb12-4f9f-b775-51566eba8c0c.jpg',
    //             'https://www.fbgcdn.com/pictures/f7a04117-9ffd-4cd1-9eb5-10cc110c8d54.jpg',
    //             'https://www.fbgcdn.com/pictures/faf3ea6e-8c5a-4e38-b248-e0648ac61505.jpg',
    //             'https://www.fbgcdn.com/pictures/358cf8cf-5c37-4b30-9e7b-9459575f0395.jpg'
    //         ]
    //     },
    //     {
    //         label: 'Cake',
    //         slider: [
    //             'https://www.fbgcdn.com/pictures/e73bc677-5ddc-437c-8938-02f0ff474c0b.jpg',
    //             'https://www.fbgcdn.com/pictures/f9cbd05a-ab3a-4762-98cf-ff5c251a86ad.jpg',
    //             'https://www.fbgcdn.com/pictures/b6c715f1-2081-42f2-ae02-c27535827d52.jpg',
    //             'https://www.fbgcdn.com/pictures/e4228851-7efa-41bc-b655-e5a4b37a9d23.jpg',
    //             'https://www.fbgcdn.com/pictures/9634f4a6-72ae-466e-ac0a-946a7f601453.jpg',
    //             'https://www.fbgcdn.com/pictures/6a64a812-16e1-4399-858e-5e5077b1dccf.jpg',
    //             'https://www.fbgcdn.com/pictures/e65dc4b7-b8ae-4cfa-b01e-cb854a16d2ca.jpg',
    //             'https://www.fbgcdn.com/pictures/3dd0bf28-12c4-4afd-a507-a3272cb4a5e5.jpg'
    //         ]
    //     },
    //     {
    //         label: 'Muffin',
    //         slider: [
    //             'https://www.fbgcdn.com/pictures/a0edd887-4c74-4621-a98c-3d4811394325.jpg',
    //             'https://www.fbgcdn.com/pictures/69fb66bc-1c05-459c-bf79-30f2c7a82f4a.jpg',
    //             'https://www.fbgcdn.com/pictures/d2bb9c68-3aed-4fa3-97fa-e20d01586c8f.jpg',
    //             'https://www.fbgcdn.com/pictures/c6ee6fd3-de2a-4e2a-bffb-3090a06d426c.jpg',
    //             'https://www.fbgcdn.com/pictures/d1273145-1c83-49c5-b25c-c4ea1d25c4bb.jpg'
    //         ]
    //     },
    //     {
    //         label: 'Cookie',
    //         slider: [
    //             'https://www.fbgcdn.com/pictures/f4c642a8-96b2-4101-810f-d913b222a349.jpg',
    //             'https://www.fbgcdn.com/pictures/819867f9-7016-4577-91ee-6407d6898b86.jpg',
    //             'https://www.fbgcdn.com/pictures/dbbf68a3-c09d-4efe-badf-1b04528e622e.jpg',
    //             'https://www.fbgcdn.com/pictures/4066da17-f535-4256-9047-3f904e30b5f4.jpg',
    //             'https://www.fbgcdn.com/pictures/072aaba5-121e-49dc-b171-becd5e3a93a7.jpg'
    //         ]
    //     },
    //     {
    //         label: 'Other',
    //         slider: [
    //             'https://www.fbgcdn.com/pictures/1808e40d-9b24-47b3-a4b8-86c76a9b0ca7.jpg',
    //             'https://www.fbgcdn.com/pictures/1fdde35c-607c-45aa-9c00-4e198bed6f5c.jpg',
    //             'https://www.fbgcdn.com/pictures/7be2f161-53a6-41ca-b303-5b3d094a35bb.jpg',
    //             'https://www.fbgcdn.com/pictures/2b2d6aed-23a6-4790-b091-d34ef3305851.jpg',
    //             'https://www.fbgcdn.com/pictures/b4e96298-da52-4829-b964-e9854faf5f0d.jpg'
    //         ]
    //     }
    // ]

    const tabs: any[] = []

    return (
        <>
            <Dialog open={open} fullWidth>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: theme => `0.0625rem solid ${theme.palette.divider}`,
                        px: 4,
                        py: 3
                    }}
                >
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 600 }}>Select Promo Deal Image</Typography>
                    <IconButton onClick={() => setOpen(false)} sx={{ fontSize: 25 }}>
                        <Icon icon={'ic:round-close'} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 4, pt: '1rem !important' }}>
                    <Collapse in={isUpload}>
                        <Box
                            {...getRootProps()}
                            sx={{
                                border: theme => `2px dashed ${theme.palette.divider}`,
                                borderRadius: '6px',
                                height: '13rem',
                                flexDirection: 'column',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                cursor: 'pointer',
                                p: 2,
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': { bgcolor: theme => theme.palette.info.lightOpacity }
                            }}
                        >
                            <input {...getInputProps()} />
                            {file === null ? (
                                <Box>
                                    <Box
                                        component={Icon}
                                        icon={'line-md:uploading-loop'}
                                        sx={{ color: theme => theme.palette.info.main }}
                                        fontSize={45}
                                    />
                                    <Typography sx={{ mt: 2, fontWeight: 600, fontSize: '1.3rem' }}>Upload Yor Own Picture</Typography>
                                    <Typography sx={{ fontSize: '0.9rem' }}>Format: PNG, JPEG. Size: 810x475 or larger</Typography>
                                </Box>
                            ) : (
                                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <Avatar
                                        variant='rounded'
                                        src={file instanceof Blob ? URL.createObjectURL(file) : `${UrlHelper.imgPath}${file}`}
                                        sx={{ width: '100%', height: '100%' }}
                                    />
                                    <IconButton
                                        color='info'
                                        sx={{
                                            bgcolor: '#fff !important',
                                            position: 'absolute',
                                            zIndex: '2',
                                            top: '0.5rem',
                                            right: '0.5rem'
                                        }}
                                    >
                                        <Icon icon={'line-md:uploading-loop'} />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </Collapse>
                    <Collapse in={!isUpload}>
                        <TabContext value={value}>
                            <CustomTabList
                                onChange={(event: any, newValue: string) => {
                                    setValue(newValue)
                                    swiperRef.current.slideTo(0)
                                }}
                                variant='scrollable'
                                scrollButtons='auto'
                            >
                                {Array.isArray(tabs) &&
                                    tabs?.length > 0 &&
                                    tabs?.map((item: any, index: number) => {
                                        return <Tab key={index} value={index.toString()} label={item?.label} />
                                    })}
                            </CustomTabList>
                            <Box
                                sx={{
                                    mt: 4,
                                    position: 'relative',
                                    '& .swiper-pagination-bullet-active': {
                                        bgcolor: theme => `${theme.palette.primary.main} !important`
                                    },
                                    '& .swiper-pagination-bullet': { bgcolor: '#fff', opacity: 1 }
                                }}
                            >
                                <IconButton
                                    color='primary'
                                    sx={{
                                        bgcolor: '#fff !important',
                                        position: 'absolute',
                                        zIndex: '2',
                                        top: '50%',
                                        left: '0.5rem'
                                    }}
                                    onClick={() => swiperRef.current?.slidePrev()}
                                >
                                    <Icon icon={'mingcute:arrow-left-line'} />
                                </IconButton>
                                <Box
                                    component={Swiper}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    pagination={{ clickable: true, dynamicBullets: true }}
                                    modules={[Pagination]}
                                    onSwiper={swiper => (swiperRef.current = swiper)}
                                    onSlideChange={swiper => setActImg(swiper.activeIndex)}
                                >
                                    {tabs[Number(value)]?.slider.map((slide: any, slideIndex: number) => {
                                        return (
                                            <SwiperSlide key={slideIndex}>
                                                <Avatar
                                                    src={slide}
                                                    alt={`slide ${slideIndex}`}
                                                    variant='rounded'
                                                    sx={{ width: '100%', height: '20rem' }}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Box>
                                <IconButton
                                    color='primary'
                                    sx={{
                                        bgcolor: '#fff !important',
                                        position: 'absolute',
                                        zIndex: '2',
                                        top: '50%',
                                        right: '0.5rem'
                                    }}
                                    onClick={() => swiperRef?.current?.slideNext()}
                                >
                                    <Icon icon={'mingcute:arrow-right-line'} />
                                </IconButton>
                            </Box>
                        </TabContext>
                    </Collapse>
                </DialogContent>
                <DialogActions
                    sx={{
                        borderTop: theme => `0.0625rem solid ${theme.palette.divider}`,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        pt: '1rem !important',
                        justifyContent: isUpload ? 'end' : 'space-between'
                    }}
                >
                    {!isUpload && (
                        <LoadingButton
                            size='large'
                            sx={{ bgcolor: theme => theme.palette.primary.lightOpacity }}
                            onClick={() => setIsUpload(true)}
                        >
                            Your Own Picture
                        </LoadingButton>
                    )}
                    <Box>
                        <LoadingButton
                            size='large'
                            sx={{ mr: { xs: 0, sm: 2.5 }, mb: { xs: 2.5, sm: 0 } }}
                            variant='outlined'
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </LoadingButton>
                        <LoadingButton
                            size='large'
                            sx={{ ml: { xs: '0 !important', sm: 2.5 }, mt: { xs: 2.5, sm: 0 } }}
                            variant='contained'
                            onClick={() => {
                                if (isUpload) {
                                    setImage(file)
                                } else {
                                    setImage(tabs[Number(value)]?.slider[actImg])
                                }
                                setOpen(false)
                            }}
                        >
                            Save
                        </LoadingButton>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ChangeImage
