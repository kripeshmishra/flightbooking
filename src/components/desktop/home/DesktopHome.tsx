"use client"
import React from 'react'
import FindFlightDeals from './FindFlightDeals'
import PopularFlights from './PopularFlights'
import { Box, Grid, Typography, Container, Button, Stack } from '@mui/material'
import WhyChooseCard from '@/uiHelper/WhyChooseCard'
import Image from 'next/image'
import { DiAndroid } from 'react-icons/di'
import { IoLogoApple } from 'react-icons/io5'
import SearchFlights from '@/uiHelper/searchWidgets/SearchFlights'

const DesktopHome = () => {
    return (
        <>
            <Box className='heroBannerSection' sx={{ backgroundImage: "url('/images/home/hero-bg.png')" }}>
                <Container maxWidth="lg" >
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Box className="heroCaptions">
                                <Typography variant='h1'>Explore the World with Flystates</Typography>
                                <p>Lorem ipsum dolor amet sed do eiusmod tempor incididunt.</p>
                            </Box>
                            <Box className='searchMainWrapper'>
                                <SearchFlights />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box className='whyChooseUsSection'>
                <Container maxWidth='lg'>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6} md={4} className='whyChooseUsCardLeft'>
                            <WhyChooseCard title='One search, all the flights' descriptions='Lorem ipsum dolor sit amet consectetur. At in natoque nibh porta pharetra. Elit donec est non quam tristique feugiat.' icon='/images/home/whychoose1.svg' />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <WhyChooseCard title='Trusted by millions' descriptions='Lorem ipsum dolor sit amet consectetur. At in natoque nibh porta pharetra. Elit donec est non quam tristique feugiat.' icon='/images/home/whychoose2.svg' />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} className='whyChooseUsCardRight'>
                            <WhyChooseCard title='24/7 Customer Support' descriptions='Lorem ipsum dolor sit amet consectetur. At in natoque nibh porta pharetra. Elit donec est non quam tristique feugiat.' icon='/images/home/whychoose3.svg' />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <FindFlightDeals />
            <Box className=' appdownload-section'>
                <Container maxWidth='lg'>
                    <Grid container spacing={0} alignItems='center'>
                        <Grid item xs={12} sm={5} md={6} >
                            <Box className='appDownloadImage'>
                                <Image src='/images/home/download-app.png' alt='' fill sizes='auto' className='object-contain object-left-bottom' />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={6} sx={{ pr: 4 }}>
                            <Box className='appDownloadContent'>
                                <Typography variant='h2'>
                                    Download Our app to make Travel Easy
                                </Typography>
                                <Typography >
                                    Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </Typography>
                                <Stack direction='row' className='downloadActionWrapper' sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                    <Button variant='contained' color='primary'><IoLogoApple size={26} /> IOS</Button>
                                    <Button variant='contained' color='primary'><DiAndroid size={26} /> Android</Button>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <PopularFlights />
        </>
    )
}

export default DesktopHome