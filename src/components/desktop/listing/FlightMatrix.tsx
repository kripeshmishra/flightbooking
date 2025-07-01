import React, { FC } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Box, Button, Card, Typography } from '@mui/material'
import Image from 'next/image';
import useFilterFlights from '@/businesslogic/useFilterFlights';


const FlightMatrix = () => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        speed: 500
    };

    const {
        model
    } = useFilterFlights()


    return (
        <Card className="flightMatrixWrap bg-white" sx={{ boxShadow: '0px 0px 9px 0px #042F7112' }}>
            <Box className="flightMatrixAside">
                <Box className="flightMatrixTop">
                    All fares
                </Box>
                <Box className="flightMatrixBottomBox">
                    <Button className='textPoppins text-secondary'>
                        Non Stop
                    </Button>
                </Box>
                {/* <Box className="flightMatrixBottomBox">
                    <Button>
                        1 + Stop
                    </Button>
                </Box> */}
            </Box>
            <Box className="flightMatrixSlider">
                {
                    model?.Filter?.AirlinesFilters && model?.Filter?.AirlinesFilters?.length > 0 ? (
                        <Slider {...settings}>
                            {
                                model?.Filter?.AirlinesFilters?.map((item: any, index: any) => (
                                    <Box key={index}>
                                        <Box className="flightMatrixTop">
                                            <Button disableRipple className='textPoppins'>
                                                <Box className="flightMatrixImgBox">
                                                    <Image src={`${process.env.cdn_path}/${item.AirlineInContract}.png`} alt='' fill />
                                                </Box>
                                                <Typography variant='h6'>{item.AirlineNameInContract}</Typography>
                                            </Button>
                                        </Box>
                                        <Box className="flightMatrixBottomBox">
                                            <Button disableRipple className='textPoppins'>
                                                $ {item.AveragePrice}
                                            </Button>
                                        </Box>
                                        {/* <Box className="flightMatrixBottomBox">
                                    <Button disableRipple>
                                        $178.16
                                    </Button>
                                </Box> */}
                                    </Box>
                                ))
                            }
                        </Slider>
                    ) : (
                        <Box className="flex">
                            {[1, 2, 3, 4, 5, 6].map((index) => (
                                <Box key={index} className="flex-1">
                                    <Box className="flightMatrixTop">
                                        <Box className="w-full h-full p-5" >
                                            <Box className="animate-pulse w-full h-full bg-slate-200 rounded-md" >
                                            </Box>
                                            <Typography variant='h6'></Typography>
                                        </Box>
                                    </Box>
                                    <Box className="flightMatrixBottomBox px-5">
                                        <Box className="animate-pulse w-full h-5 bg-slate-200 rounded-md" >
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )
                }

            </Box>
        </Card>
    )
}

export default FlightMatrix