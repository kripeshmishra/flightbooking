import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { MdOutlineSwapHoriz } from 'react-icons/md';
import { USAPopularFlights } from '@/staticData/AllStaticData';


const MobileFindFlights = () => {

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
        <>
            <Box className='mobileFindFlights customSlickSliderIndicator py-5'>
                <Box sx={{ textAlign: 'center' }} className='sectionTitle px-10'>
                    <Typography variant='h2'>Find flights the airlines don’t want you to see.</Typography>
                </Box>
                <Slider {...settings}>
                    {
                        USAPopularFlights.map((item) => (
                            <div key={item.id}>
                                <Box className='mobileFindDealBox' >
                                    <Box className='mobileFindDealImage imageGradientEffect'>
                                        <Image
                                            fill
                                            placeholder="blur"
                                            blurDataURL={item.destinationImage}
                                            src={item.destinationImage}
                                            alt='title'
                                            sizes='auto'
                                        />
                                        <Typography className='mobileFindDealPrice'>Tickets from <strong>{item.flightFare}</strong></Typography>
                                        <Box className='mobileFindDealContent'>
                                            <Box className='mobileFindDealFromTo'>
                                                <Stack direction='row' gap={0.5} alignItems='center'>
                                                    <Typography variant='h5'>{item.fromDestinations}</Typography>
                                                    <MdOutlineSwapHoriz size={18} />
                                                </Stack>
                                                <Typography variant='h4'>{item.toDestinations}</Typography>
                                            </Box>
                                            <Box>
                                                <Button variant='contained' color='secondary'>Discover a Deal</Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                        ))
                    }

                </Slider>
            </Box>
        </>
    )
}

export default MobileFindFlights