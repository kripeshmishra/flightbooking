"use client"
import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import MobileSearchVacationsWidget from './MobileSearchVacationsWidget'
import Image from 'next/image'
import MobilePopularHoliday from './MobilePopularHoliday'
import MobileTopHoliday from './MobileTopHoliday'

const MobileVacations = () => {
    return (
        <>
            <Box className='mobileHeroSection p-4'>
                <MobileSearchVacationsWidget />
            </Box>
            <Box className='mobileWhyChooseUs px-4 py-4'>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box className='bg-white rounded-md p-3 text-center h-24'>
                            <Image src="/images/vacations/easy-booking.png" width={41} height={41} alt='' />
                            <Typography className='font-medium text-secondary text-xs'>Easy Booking</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box className='bg-white rounded-md p-3 text-center h-24'>
                            <Image src="/images/vacations/truested.png" width={41} height={41} alt='' />
                            <Typography className='font-medium text-secondary text-xs'>Trusted by Millions</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box className='bg-white rounded-md p-3 text-center h-24'>
                            <Image src="/images/vacations/24X7-support.png" width={41} height={41} alt='' />
                            <Typography className='font-medium text-secondary text-xs'>24/7 Customer Support</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box className='mobilePopularHolidays py-5'>
                <Box className='sectionTitle px-4'>
                    <Typography variant='h2'>Popular flights</Typography>
                </Box>
                <MobilePopularHoliday />
            </Box>
            <Box className='mobileTopHolidays customSlickSliderIndicator py-5'>
                <Box sx={{ textAlign: 'center' }} className='sectionTitle px-10'>
                    <Typography variant='h2'>Top Holyday Destinations</Typography>
                </Box>
                <MobileTopHoliday />
            </Box>

        </>
    )
}

export default MobileVacations