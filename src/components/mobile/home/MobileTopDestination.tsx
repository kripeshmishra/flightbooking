import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Typography } from '@mui/material'
import DestinationCard from '@/uiHelper/DestinationCard';
import { USAPopularFlights } from '@/staticData/AllStaticData';

const MobileTopDestination = () => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        speed: 500
    };

    return (
        <Box className='mobilePopularFlights py-5'>
            <Box className='sectionTitle px-4'>
                <Typography variant='h2'>Top Destinations</Typography>
            </Box>
            <Slider {...settings}>
                {
                    USAPopularFlights.map((item) => (
                        <div >
                            <Box key={item.id} >
                                <Box className='ml-4'>
                                    <DestinationCard destination={item.toDestinations} destinationImage={item.destinationImage} />
                                </Box>
                            </Box>
                        </div>
                    ))
                }
            </Slider>
        </Box>
    )
}

export default MobileTopDestination