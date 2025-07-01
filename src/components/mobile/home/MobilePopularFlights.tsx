import React, { ChangeEvent, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Grid, Typography, Tab, Stack, Button } from '@mui/material'
import Slider from "react-slick";
import { PopularFlightsCountries, PopularFlightsCountriesLabel } from '@/utilty/Enums';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import { USAPopularFlights } from '@/staticData/AllStaticData';

const MobilePopularFlights = () => {
    const [popularCountry, setPopularCountry] = useState(PopularFlightsCountries.USA.toString());

    const handlePopularFlights = (event: ChangeEvent<{}>, newValue: string) => {
        setPopularCountry(newValue);
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        speed: 500
    };

    return (
        <Box className='mobilePopularFlights py-5'>
            <Box className='sectionTitle px-4'>
                <Typography variant='h2'>Popular flights</Typography>
            </Box>
            <TabContext value={popularCountry}>
                <Box>
                    <TabList onChange={handlePopularFlights} textColor="secondary" className='mobileTabStyleButton' variant="scrollable"
                        TabIndicatorProps={{ style: { display: 'none' } }} >
                        {
                            [...PopularFlightsCountriesLabel.entries()].map(
                                ([value, label]: [string, number], index) =>
                                    <Tab key={index} label={label} disableRipple value={value.toString()} />
                            )
                        }
                    </TabList>
                </Box>
                <Box className="mt-3">
                    <TabPanel value={PopularFlightsCountries.USA.toString()} sx={{ padding: 0 }} >
                        <Slider {...settings}>
                            {
                                USAPopularFlights.map((item) => (
                                    <div >
                                        <Box key={item.id} >
                                            <Box className='ml-3'>
                                                <Box className='mobilePopularFlightsBox' >
                                                    <Box className='mobilePopularFlightsImage'>
                                                        <Image src={item.destinationImage} alt={item.toDestinations} fill />
                                                    </Box>
                                                    <Box className='mobilePopularFlightsInfo'>
                                                        <Stack direction='row' gap={0.5} alignItems='center'>
                                                            <Typography variant='h5'>{item.fromDestinations}</Typography>
                                                            <MdOutlineSwapHoriz size={18} color="#00BDBB" />
                                                            <Typography variant='h5'>{item.toDestinations}</Typography>
                                                        </Stack>
                                                        <Typography className='mobilePopularFlightsPrice'>Tickets from {item.flightFare}</Typography>
                                                        <Stack justifyContent='center' alignItems='center' mt={2}>
                                                            <Button sx={{ background: '#CFF1FF', color: '#0A557F', height: '30px' }} variant="contained" color="primary">Book</Button>
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </div>
                                ))
                            }
                        </Slider>
                    </TabPanel>
                    <TabPanel value={PopularFlightsCountries.ENGLAND.toString()} sx={{ padding: 0 }} >
                        <Slider {...settings}>
                            {
                                USAPopularFlights.map((item) => (
                                    <div >
                                        <Box key={item.id} >
                                            <Box className='ml-3'>
                                                <Box className='mobilePopularFlightsBox' >
                                                    <Box className='mobilePopularFlightsImage'>
                                                        <Image src={item.destinationImage} alt={item.toDestinations} fill />
                                                    </Box>
                                                    <Box className='mobilePopularFlightsInfo'>
                                                        <Stack direction='row' gap={0.5} alignItems='center'>
                                                            <Typography variant='h5'>{item.fromDestinations}</Typography>
                                                            <MdOutlineSwapHoriz size={18} color="#00BDBB" />
                                                            <Typography variant='h5'>{item.toDestinations}</Typography>
                                                        </Stack>
                                                        <Typography className='mobilePopularFlightsPrice'>Tickets from {item.flightFare}</Typography>
                                                        <Stack justifyContent='center' alignItems='center' mt={2}>
                                                            <Button sx={{ background: '#CFF1FF', color: '#0A557F', height: '30px' }} variant="contained" color="primary">Book</Button>
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </div>
                                ))
                            }
                        </Slider>
                    </TabPanel>
                </Box>

            </TabContext>
        </Box>
    )
}

export default MobilePopularFlights