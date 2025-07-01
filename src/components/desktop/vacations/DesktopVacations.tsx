"use client"
import React from 'react'
import { Box, Grid, Typography, Container, Button } from '@mui/material'
import SearchVacations from '@/uiHelper/searchWidgets/SearchVacations'
import Image from 'next/image'
import VacationCategories from './VacationCategories'
import TopVacations from './TopVacations'
import DownloadAppTwo from './DownloadAppTwo'
const DesktopVacations = () => {
    return (
        <>
            <Box className='heroBannerSection' sx={{ background: "url('/images/vacations/vacation-bg.png') no-repeat right / cover" }}>
                <Container maxWidth="lg" sx={{ height: '100%' }}>
                    <Grid container spacing={2} alignItems='center' className='h-full'>
                        <Grid item xs={12}>
                            <Box className="">
                                <h1 className='md:text-5xl sm:text-3xl text-2xl text-white font-semibold'>Tailor-made holidays of a lifetime</h1>
                                <p className='text-white md:text-xl text-lg mt-3'>100% flexible tours planned by experts to 70+ destinations.</p>
                            </Box>
                            <Box className='searchMainWrapper'>
                                <SearchVacations />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box className="py-14 lg:py-32 vacationsWhyChooseUs" sx={{ background: "url('/images/vacations/why-vacations-bg.png') no-repeat right / cover " }} >
                <Container maxWidth="lg">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-3/5">
                            <div className="flex items-start justify-between lg:gap-5 gap-3 max-md:flex-wrap vacationsWhyChooseItems">
                                <div className="flex-col  basis-[0%] grow relative self-center flex items-center my-auto">
                                    <Image
                                        alt=''
                                        src="/images/vacations/easy-booking.png"
                                        width={42}
                                        height={42}
                                        className="aspect-square object-contain object-center w-[42px] overflow-hidden max-w-full"
                                    />
                                    <Typography variant='h4' className="text-black text-center text-lg font-medium self-stretch whitespace-nowrap mt-4">
                                        Easy Booking
                                    </Typography>
                                    <div className="text-lightgrey text-center text-sm leading-5 self-stretch whitespace-nowrap mt-1">
                                        Available 24/7 to help
                                    </div>
                                </div>
                                <div className='vacation-seperator'></div>
                                <div className="flex-col  basis-[0%] grow relative self-center flex items-center my-auto">
                                    <Image
                                        alt=''
                                        src="/images/vacations/truested.png"
                                        width={42}
                                        height={42}
                                        className="aspect-square object-contain object-center w-[42px] overflow-hidden max-w-full"
                                    />
                                    <Typography variant='h4' className="text-black text-center text-lg font-medium self-stretch whitespace-nowrap mt-4">
                                        Trusted by Millions
                                    </Typography>
                                    <div className="text-lightgrey text-center text-sm leading-5 self-stretch whitespace-nowrap mt-1">
                                        100% secure transactions
                                    </div>
                                </div>
                                <div className='vacation-seperator'></div>
                                <div className="self-center basis-[0%] grow relative flex flex-col items-center my-auto">
                                    <Image
                                        alt=''
                                        src="/images/vacations/24X7-support.png"
                                        width={42}
                                        height={42}
                                        className="aspect-square object-contain object-center w-[42px] overflow-hidden max-w-full"
                                    />
                                    <Typography variant='h4' className="text-black text-center text-lg font-medium self-stretch whitespace-nowrap mt-4">
                                        24/7 Support
                                    </Typography>
                                    <div className="text-lightgrey text-center text-sm leading-5 self-stretch whitespace-nowrap mt-1">
                                        Support service provider
                                    </div>
                                </div>
                            </div>
                            <Typography className='text-black mt-8 text-lg'>
                                *Holiday Packages are inclusive of per person flight tickets and the hotels are on twin-sharing basis. Offered packaged deals are based on historic search data and cannot be guaranteed until the booking is confirmed.
                            </Typography>
                            <Box className="text-center lg:text-left mt-8">
                                <Button variant='contained' color='secondary'>Book Now</Button>
                            </Box>

                        </div>
                        <div className="w-full lg:w-2/5">
                            <div className='relative mx-auto lg:ml-auto max-w-[410px] w-full h-80 lg:h-full max-h-[333px] '>
                                <Image src="/images/vacations/why-vacations.png" fill className='aspect-square object-contain object-center w-full overflow-hidden max-w-full' alt='' />
                            </div>
                        </div>
                    </div>
                </Container>
            </Box>
            <VacationCategories />
            <TopVacations />
            <DownloadAppTwo />
        </>
    )
}

export default DesktopVacations