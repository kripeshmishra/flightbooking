import React, { ChangeEvent, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Grid, Typography, Tab, Stack, Button } from '@mui/material'
import Slider from "react-slick";
import { PopularFlightsCountries, PopularFlightsCountriesLabel, VacationsCategories, VacationsCategoriesLabel } from '@/utilty/Enums';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import { USAPopularFlights, popularHolidays } from '@/staticData/AllStaticData';
import VacationsCategoryCard from './MobieHolidayCard';

const MobilePopularHoliday = () => {
    const [popularCountry, setPopularCountry] = useState(PopularFlightsCountries.USA.toString());

    const handlePopularFlights = (event: ChangeEvent<{}>, newValue: string) => {
        setPopularCountry(newValue);
    };
    return (
        <>
            <TabContext value={popularCountry}>
                <Box>
                    <TabList onChange={handlePopularFlights} textColor="secondary" className='mobileTabStyleButton' variant="scrollable"
                        TabIndicatorProps={{ style: { display: 'none' } }} >
                        {
                            [...VacationsCategoriesLabel.entries()].map(
                                ([value, label]: [string, number], index) =>
                                    <Tab key={index} label={label} disableRipple value={value.toString()} />
                            )
                        }
                    </TabList>
                </Box>
                <Box className="mt-3 px-4">
                    <TabPanel value={VacationsCategories.DESERT.toString()} sx={{ padding: 0 }} >
                        {
                            popularHolidays.map((item) => (
                                <VacationsCategoryCard destination={item.destinations} destinationImage={item.destinationImage} country={item.country} url={item.destinations} />
                            ))
                        }
                    </TabPanel>
                    <TabPanel value={VacationsCategories.ADVENTURE.toString()} sx={{ padding: 0 }} >
                        {
                            popularHolidays.map((item) => (
                                <VacationsCategoryCard destination={item.destinations} destinationImage={item.destinationImage} country={item.country} url={item.destinations} />
                            ))
                        }
                    </TabPanel>
                    <TabPanel value={VacationsCategories.BEACHES.toString()} sx={{ padding: 0 }} >
                        {
                            popularHolidays.map((item) => (
                                <VacationsCategoryCard destination={item.destinations} destinationImage={item.destinationImage} country={item.country} url={item.destinations} />
                            ))
                        }
                    </TabPanel>
                    <TabPanel value={VacationsCategories.MOUNTAINS.toString()} sx={{ padding: 0 }} >
                        {
                            popularHolidays.map((item) => (
                                <VacationsCategoryCard destination={item.destinations} destinationImage={item.destinationImage} country={item.country} url={item.destinations} />
                            ))
                        }
                    </TabPanel>
                    <TabPanel value={VacationsCategories.CRUISES.toString()} sx={{ padding: 0 }} >
                        {
                            popularHolidays.map((item) => (
                                <VacationsCategoryCard destination={item.destinations} destinationImage={item.destinationImage} country={item.country} url={item.destinations} />
                            ))
                        }
                    </TabPanel>
                    <Stack justifyContent='center' alignItems='center' className='mt-8 sm:mt-10'>
                        <Button variant='contained' color='secondary' className='text-sm px-8'>See All Places</Button>
                    </Stack>
                </Box>
            </TabContext>

        </>
    )
}

export default MobilePopularHoliday