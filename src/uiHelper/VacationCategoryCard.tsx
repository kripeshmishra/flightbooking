"use client"
import { Stack, Typography, Box, Button } from '@mui/material'
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'

interface VacationCategoryCardProps {
    destination?: any;
    country?: string;
    destinationImage?: string;
    url?: string;
}

const VacationCategoryCard: FC<VacationCategoryCardProps> = ({ destination, country, destinationImage, url }) => {

    const imageSrc = destinationImage || '';

    return (
        <Stack className='vacationCatCard' direction='row' alignItems='center' gap={2}>
            <Image src={imageSrc} width={80} height={70} alt={destination} sizes='auto' className='object-cover object-center overflow-hidden max-w-full rounded-md' />
            <Box className='vacationCatInfo'>
                <Typography variant='h4'>{destination}</Typography>
                <Typography>{country}</Typography>
            </Box>
            <Button variant='outlined' color='secondary' sx={{ ml: 'auto', borderRadius: '50px' }} >Details</Button>
        </Stack>
    )
}

export default VacationCategoryCard