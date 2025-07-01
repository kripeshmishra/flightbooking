"use client"
import React from 'react'
import { Box, Grid, Typography, Tab } from '@mui/material'
import MobileSearchFlightWidget from './MobileSearchFlightWidget'
import Image from 'next/image'
import MobileFindFlights from './MobileFindFlights'
import MobilePopularFlights from './MobilePopularFlights'
import { topAirlines } from '@/staticData/AllStaticData'
import MobileTopDestination from './MobileTopDestination'

const MobileHome = () => {

    return (
        <>
            <Box className='mobileHeroSection' sx={{ backgroundImage: "url('/images/home/hero-bg.png')    " }}>
                <MobileSearchFlightWidget />
            </Box>
            <Box className='mobileWhyChooseUs px-4 py-4'>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box className='bg-white rounded-md p-3 text-center'>
                            <Image src="/images/home/m-whychoose1.svg" width={41} height={41} alt='' />
                            <Typography className='font-medium text-secondary text-xs'>One search, all the flights</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box className='bg-white rounded-md p-3 text-center'>
                            <Image src="/images/home/m-whychoose2.svg" width={41} height={41} alt='' />
                            <Typography className='font-medium text-secondary text-xs'>Trusted by millions</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box className='bg-white rounded-md p-3 text-center'>
                            <Image src="/images/home/m-whychoose3.svg" width={41} height={41} alt='' />
                            <Typography className='font-medium text-secondary text-xs'>24/7 Customer Support</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <MobileFindFlights />
            <MobilePopularFlights />
            <Box className='mobileTopAirlines py-5 px-4'>
                <Box className='sectionTitle'>
                    <Typography variant='h2'>Top Airlines</Typography>
                </Box>
                <Grid container spacing={2}>
                    {
                        topAirlines.map((item) => (
                            <Grid item xs={4} key={item.id} >
                                <Box className='bg-white rounded-md p-3 relative w-full h-12'>
                                    <Box className="relative w-full h-full">
                                        <Image src={item.image} alt='' fill className='object-contain object-center' />
                                    </Box>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
            <MobileTopDestination />
        </>
    )
}

export default MobileHome