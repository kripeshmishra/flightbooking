import React, { ChangeEvent, useState } from 'react'
import { Box, Grid, Typography, Container, Tab, Button, Stack } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { vacationsCategories } from '@/staticData/AllStaticData';
import VacationCategoryCard from '@/uiHelper/VacationCategoryCard';
import Image from 'next/image';

const VacationCategories = () => {

    const [popularCountry, setPopularCountry] = useState('Desert');

    const handlePopularFlights = (event: ChangeEvent<{}>, newValue: string) => {
        setPopularCountry(newValue);
    };

    return (
        <Box className="sectionGap75 bg-darksecondary relative">
            <Container maxWidth="lg">
                <Box className="grid grid-cols-1 md:pb-8 sm:pb-5 pb-1 text-center">
                    <Typography variant='h5' className='text-customyellow lg:text-5xl md:text-3xl text-2xl font-normal mb-3' sx={{ fontFamily: "'Alex Brush', cursive;" }}>Vacation Category</Typography>
                    <Typography variant='h2' className='mb-4 lg:text-4xl md:text-2xl text-xl font-medium text-white'>Our Popular Holidays Type</Typography>
                </Box>
                <TabContext value={popularCountry}>
                    <Box className='flex justify-center'>
                        <TabList onChange={handlePopularFlights} textColor="secondary" className='vacationsCategoryTabStyle mb-10' variant="standard"
                            TabIndicatorProps={{ style: { display: 'none' } }} >
                            {
                                vacationsCategories.map((category) => (
                                    <Tab key={category.id} label={
                                        <Box className='vacationCatTabBtn flex items-center justify-center flex-col'>
                                            <Image src={category.icon} alt={category.name} width={38} height={38} />
                                            <Typography variant='h4' className='capitalize font-medium text-sm lg:text-base leading-tight mt-1'>{category.name}</Typography>
                                            <Typography className='text-secondary capitalize font-normal text-xs lg:text-base '>{category.totalcount}</Typography>
                                        </Box>
                                    } disableRipple value={category.name} />
                                ))
                            }
                        </TabList>
                    </Box>
                    <TabPanel value='Desert' sx={{ padding: 0 }} >
                        <Grid container spacing={{ xl: 5, lg: 4, xs: 3 }}>
                            {
                                Array.from({ length: 12 }, (v, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                                        <VacationCategoryCard destinationImage='/images/home/deal2.png' country='United States' destination='New York' url='new-york' />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </TabPanel>
                    <TabPanel value='Beaches' sx={{ padding: 0 }} >
                        <Grid container spacing={{ xl: 5, lg: 4, xs: 3 }}>
                            {
                                Array.from({ length: 12 }, (v, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                                        <VacationCategoryCard destinationImage='/images/home/deal3.png' country='United States' destination='Washington DC' url='washington-dc' />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </TabPanel>
                    <TabPanel value='Mountains' sx={{ padding: 0 }} >
                        <Grid container spacing={{ xl: 5, lg: 4, xs: 3 }}>
                            {
                                Array.from({ length: 12 }, (v, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                                        <VacationCategoryCard destinationImage='/images/home/deal4.png' country='United States' destination='Chicago' url='chicago' />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </TabPanel>
                    <TabPanel value='Adventure' sx={{ padding: 0 }} >
                        <Grid container spacing={{ xl: 5, lg: 4, xs: 3 }}>
                            {
                                Array.from({ length: 12 }, (v, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                                        <VacationCategoryCard destinationImage='/images/home/deal5.png' country='United States' destination='San Diego' url='san-diego' />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </TabPanel>
                    <TabPanel value='Cruises' sx={{ padding: 0 }} >
                        <Grid container spacing={{ xl: 5, lg: 4, xs: 3 }}>
                            {
                                Array.from({ length: 12 }, (v, index) => (
                                    <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                                        <VacationCategoryCard destinationImage='/images/home/deal1.png' country='United States' destination='Boston' url='boston' />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </TabPanel>
                </TabContext>
                <Stack justifyContent='center' alignItems='center' className='mt-8 sm:mt-10'>
                    <Button variant='contained' color='primary' className='text-sm px-8'>See All Places</Button>
                </Stack>
            </Container>
        </Box>
    )
}

export default VacationCategories