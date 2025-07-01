import React, { FC } from 'react'
import { Stack, Typography, Box, Button } from '@mui/material'
import Image from 'next/image';
import { MdOutlineSwapHoriz } from "react-icons/md";



interface FlightBookCardProps {
    fromDestinations?: string;
    toDestinations?: any;
    destinationImage?: string;
    flightFare?: string;
}

const FlightBookCard: FC<FlightBookCardProps> = ({ fromDestinations, toDestinations, destinationImage, flightFare }) => {

    const imageSrc = destinationImage || '';

    return (
        <Stack className='flightBookCard' direction='row'>
            <Box className='flightBookImageWrapper'>
                <Image src={imageSrc} fill alt={toDestinations} sizes='auto' />
            </Box>
            <Box>
                <Box className='flightBookFromTo'>
                    <Stack direction='row' gap={0.5} alignItems='center'>
                        <Typography variant='h5'>{fromDestinations}</Typography>
                        <MdOutlineSwapHoriz size={18} />
                    </Stack>
                    <Typography variant='h4'>{toDestinations}</Typography>
                </Box>
                <Typography className='flightFares'>Tickets from  {flightFare}</Typography>
            </Box>
            <Button variant='contained' color='secondary' sx={{ ml: 'auto' }}>Book</Button>
        </Stack>
    )
}

export default FlightBookCard