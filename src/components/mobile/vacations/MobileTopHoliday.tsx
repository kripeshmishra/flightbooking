import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import { popularHolidays } from '@/staticData/AllStaticData';
import DestinationCard from '@/uiHelper/DestinationCard';

const MobileTopHoliday = () => {

    const settings = {
        className: "center",
        centerMode: true,
        dots: true,
        infinite: true,
        centerPadding: "35px",
        slidesToShow: 1,
        speed: 500
    };

    return (
        <Slider {...settings}>
            {
                popularHolidays.map((item) => (
                    <div key={item.id} >
                        <Box className='mx-4'>
                            <DestinationCard destination={item.destinations} destinationImage={item.destinationImage} />
                        </Box>
                    </div>
                ))
            }

        </Slider>
    )
}

export default MobileTopHoliday