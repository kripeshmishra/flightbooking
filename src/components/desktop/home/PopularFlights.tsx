import React, { ChangeEvent, useState } from 'react'
import { Box, Container, Grid, Tab, Typography } from '@mui/material'
import { PopularFlightsCountries, PopularFlightsCountriesLabel } from '@/utilty/Enums';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FlightBookCard from '@/uiHelper/FlightBookCard';
import { USAPopularFlights } from '@/staticData/AllStaticData';

const PopularFlights = () => {

    const [popularCountry, setPopularCountry] = useState(PopularFlightsCountries.USA.toString());

    const handlePopularFlights = (event: ChangeEvent<{}>, newValue: string) => {
        setPopularCountry(newValue);
    };

    return (
        <Box className='sectionGap75 popularFlightSection'>
            <Container maxWidth='lg'>
                <Grid container justifyContent='center'>
                    <Grid item xs={12} md={10} lg={8}>
                        <Box sx={{ textAlign: 'center', marginBottom: '40px' }} className='sectionTitle'>
                            <Typography variant='h2'>Popular flights</Typography>
                            <Typography>Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <TabContext value={popularCountry}>
                    <Grid container justifyContent='center'>
                        <Grid item xs={12} md={10} lg={8}>
                            <TabList onChange={handlePopularFlights} textColor="secondary" className='tabStyleButton' variant="standard"
                                TabIndicatorProps={{ style: { display: 'none' } }} >
                                {
                                    [...PopularFlightsCountriesLabel.entries()].map(
                                        ([value, label]: [string, number], index) =>
                                            <Tab key={index} label={label} disableRipple value={value.toString()} />
                                    )
                                }
                            </TabList>
                        </Grid>
                    </Grid>
                    <TabPanel value={PopularFlightsCountries.USA.toString()} sx={{ padding: 0 }} >
                        <Grid container spacing={3}>
                            {
                                USAPopularFlights.map((item) => (
                                    <Grid item xs={12} sm={6} md={6} lg={4} key={item.id}>
                                        <FlightBookCard destinationImage={item.destinationImage} fromDestinations={item.fromDestinations} toDestinations={item.toDestinations} flightFare={item.flightFare} />
                                    </Grid>
                                ))
                            }

                        </Grid>
                    </TabPanel>
                    <TabPanel value={PopularFlightsCountries.ENGLAND.toString()} sx={{ padding: 0 }} >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FlightBookCard destinationImage='/images/home/deal1.png' fromDestinations='Delhi' toDestinations='New York' flightFare='13,025 ₹' />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <FlightBookCard destinationImage='/images/home/deal1.png' fromDestinations='Delhi' toDestinations='New York' flightFare='13,025 ₹' />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={PopularFlightsCountries.CHINA.toString()} sx={{ padding: 0 }} >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FlightBookCard destinationImage='/images/home/deal1.png' fromDestinations='Delhi' toDestinations='New York' flightFare='13,025 ₹' />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={PopularFlightsCountries.UAE.toString()} sx={{ padding: 0 }} >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FlightBookCard destinationImage='/images/home/deal1.png' fromDestinations='Delhi' toDestinations='New York' flightFare='13,025 ₹' />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <FlightBookCard destinationImage='/images/home/deal1.png' fromDestinations='Delhi' toDestinations='New York' flightFare='13,025 ₹' />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={PopularFlightsCountries.ITALY.toString()} sx={{ padding: 0 }} >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FlightBookCard destinationImage='/images/home/deal1.png' fromDestinations='Delhi' toDestinations='New York' flightFare='13,025 ₹' />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <FlightBookCard destinationImage='/images/home/deal1.png' fromDestinations='Delhi' toDestinations='New York' flightFare='13,025 ₹' />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <FlightBookCard destinationImage='/images/home/deal1.png' fromDestinations='Delhi' toDestinations='New York' flightFare='13,025 ₹' />
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={PopularFlightsCountries.FRANCE.toString()} sx={{ padding: 0 }} >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <FlightBookCard destinationImage='/images/home/deal1.png' fromDestinations='Delhi' toDestinations='New York' flightFare='13,025 ₹' />
                            </Grid>
                        </Grid>
                    </TabPanel>
                </TabContext>

            </Container>
        </Box >
    )
}

export default PopularFlights