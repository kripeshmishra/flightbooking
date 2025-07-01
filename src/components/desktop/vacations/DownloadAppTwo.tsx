import { Box, Container, Grid, Typography, Stack, Button } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { DiAndroid } from 'react-icons/di'
import { IoLogoApple } from 'react-icons/io5'

const DownloadAppTwo = () => {
    return (
        <Box className='sectionGap75  appdownloadtwo-section mt-12'>
            <Container maxWidth='lg'>
                <Box className='appdownloadtwo-inner rounded-xl px-12 flex items-end justify-center' sx={{ background: "url('/images/vacations/appdownload-bg.png') no-repeat right / cover   " }}>
                    <Box className='flex flex-row gap-5 lg:gap-x-16 items-center' >
                        <Box className='w-1/2 grow'>
                            <Box className='appdownloadtwo-Content mt-12'>
                                <Typography variant='h2' className='lg:w-3/4 leading-relaxed flex-none text-white  lg:text-4xl md:text-3xl text-2xl font-semibold'>Download Our app
                                    to make <Typography className=' lg:text-5xl  md:text-4xl  text-3xl font-normal  italic mx-2' component='span' sx={{ fontFamily: "'Alex Brush', cursive;" }}>booking easy</Typography> </Typography>
                                <Stack direction='row' className='downloadActionWrapper'>
                                    <Button variant='contained' color='secondary'><IoLogoApple size={26} /> IOS</Button>
                                    <Button variant='contained' color='secondary'><DiAndroid size={26} /> Android</Button>
                                </Stack>
                            </Box>
                        </Box>
                        <Box className='w-1/2 grow justify-center flex'>
                            <Box className='appdownloadtwo-image'>
                                <Image src='/images/vacations/download-app2.png' alt='' fill sizes='auto' />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default DownloadAppTwo