import React from 'react'
import { Box, Grid, Typography, Container, Tab, Button, Stack } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const TopVacations = () => {
    return (
        <Box className="sectionGap75 bg-lightbg relative overflow-hidden topHolidayDestinationSection">
            <Container maxWidth="lg">
                <Box className="flex items-center w-full max-w-4xl flex-row md:pb-28 sm:pb-10 pb-1 text-left">
                    <Typography variant='h2' className='flex-none  md:text-2xl text-xl font-semibold'>Top <Typography className='text-darksecondary md:text-3xl text-2xl font-normal  italic mx-2' component='span' sx={{ fontFamily: "'Alex Brush', cursive;" }}>Holiday</Typography> Destinations</Typography>
                    <Typography className='ml-6 grow italic text-lg font-normal text-[#676977]'>Lorem ipsum dolor sit amet consectetur. At in natoque nibh porta pharetra. Elit donec est non quam tristique feugiat.</Typography>
                </Box>
                <Grid container spacing={{ xs: 2, md: 3, lg: 4 }} >
                    <Grid item xs={12} sm={6} md={4} lg={4} >
                        <Box className='flex flex-col gap-8'>
                            <Box className='vacationHolidayCard'>
                                <Link href='/' className=' text-white w-full h-full '>
                                    <Box className='imageGradientEffect w-full h-full relative overflow-hidden'>
                                        <Image
                                            fill
                                            placeholder="blur"
                                            blurDataURL='/images/vacations/holiday1.png'
                                            src='/images/vacations/holiday1.png'
                                            alt='title'
                                            sizes='auto'

                                        />
                                        <Box className="vacationHolidayCardInfo">
                                            <Typography variant='h3'>New York</Typography>
                                            <Typography>United States</Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Box>
                            <Box className='vacationHolidayCard vacationHolidayGreenShape'>
                                <Link href='/' className=' text-white w-full h-full'>
                                    <Box className='imageGradientEffect w-full h-full relative overflow-hidden'>
                                        <Image
                                            fill
                                            placeholder="blur"
                                            blurDataURL='/images/vacations/holiday3.png'
                                            src='/images/vacations/holiday3.png'
                                            alt='title'
                                            sizes='auto'

                                        />
                                        <Box className="vacationHolidayCardInfo">
                                            <Typography variant='h3'>Chicago</Typography>
                                            <Typography>United States</Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4} >
                        <Box className='flex flex-col gap-8 md:-mt-10'>
                            <Box className='vacationHolidayCard'>
                                <Link href='/' className=' text-white w-full h-full'>
                                    <Box className='imageGradientEffect w-full h-full relative overflow-hidden'>
                                        <Image
                                            fill
                                            placeholder="blur"
                                            blurDataURL='/images/vacations/holiday2.png'
                                            src='/images/vacations/holiday2.png'
                                            alt='title'
                                            sizes='auto'

                                        />
                                        <Box className="vacationHolidayCardInfo">
                                            <Typography variant='h3'>Paris</Typography>
                                            <Typography>France</Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Box>
                            <Box className='vacationHolidayCard'>
                                <Link href='/' className=' text-white w-full h-full'>
                                    <Box className='imageGradientEffect w-full h-full relative overflow-hidden'>
                                        <Image
                                            fill
                                            placeholder="blur"
                                            blurDataURL='/images/vacations/holiday4.png'
                                            src='/images/vacations/holiday4.png'
                                            alt='title'
                                            sizes='auto'

                                        />
                                        <Box className="vacationHolidayCardInfo">
                                            <Typography variant='h3'>London</Typography>
                                            <Typography>United Kingdom</Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} >
                        <Box className='vacationHolidayRightCard  lg:-mt-20'>
                            <Link href='/' className=' text-white w-full h-full'>
                                <Box className='w-full h-full relative'>
                                    <Image
                                        fill
                                        placeholder="blur"
                                        blurDataURL='/images/vacations/holiday5.png'
                                        src='/images/vacations/holiday5.png'
                                        alt='title'
                                        sizes='auto'

                                    />
                                    <Box className="vacationHolidayRightCardInfo">
                                        <Typography variant='h3' className='text-white'>Sydeny Cruise</Typography>
                                        <Typography>Embark on a Cruise journey for your lifetime. At in natoque nibh </Typography>
                                        <Button variant='contained' color='secondary' sx={{ background: '#000000', mt: 2.5 }}>Start Planning</Button>
                                    </Box>
                                </Box>
                            </Link>
                        </Box>
                        <Stack sx={{ mt: '50px' }} justifyContent='flex-end' direction='row'>
                            <Button className='text-white hover:bg-transparent hover:text-primary' endIcon={<>
                                <svg width="40" height="34" viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M38.9999 17C38.9999 25.8366 31.8365 33 22.9999 33C17.5006 33 12.6493 30.2255 9.7693 26H8.57505C11.5789 30.8043 16.9162 34 22.9999 34C32.3888 34 39.9999 26.3888 39.9999 17C39.9999 7.61116 32.3888 0 22.9999 0C16.1065 0 10.1714 4.10295 7.50342 10H8.6084C11.205 4.67153 16.6737 1 22.9999 1C31.8365 1 38.9999 8.16344 38.9999 17Z" fill="currentColor" fill-opacity="0.21" />
                                    <g clip-path="url(#clip0_71_1529)">
                                        <path d="M0.624872 16.9584H18.5256L15.6586 14.0914L16.4245 13.3254L20.5991 17.5001L16.4245 21.6747L15.6586 20.9088L18.5256 18.0417H0.624872V16.9584Z" fill="currentColor" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_71_1529">
                                            <rect width="21" height="9" fill="currentColor" transform="matrix(-1 0 0 1 21 13)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </>}>More Destinations </Button>
                        </Stack>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default TopVacations