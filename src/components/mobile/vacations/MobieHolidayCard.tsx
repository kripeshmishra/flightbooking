"use client"
import { Stack, Typography, Box, Button } from '@mui/material'
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import { FiChevronRight } from 'react-icons/fi';

interface MobieHolidayCardProps {
    destination?: any;
    country?: string;
    destinationImage?: string;
    url?: string;
}
const MobieHolidayCard: FC<MobieHolidayCardProps> = ({ destination, country, destinationImage, url }) => {

    const imageSrc = destinationImage || '';

    return (
        <Box className='bg-white mb-3 rounded-md overflow-hidden'>
            <Link href='/' className='w-full h-full pr-3 flex items-center gap-3'>
                <Image src={imageSrc} width={80} height={70} alt={destination} sizes='auto' className='object-cover object-center overflow-hidden max-w-full rounded-l-md' />
                <Box className='vacationCatInfo'>
                    <Typography variant='h4' className='font-medium text-base'>{destination}</Typography>
                    <Typography className='text-customorange text-sm'>{country}</Typography>
                </Box>
                <Box className='ml-auto size-9 rounded-full bg-lightbg flex items-center justify-center text-secondary'><FiChevronRight /></Box>
            </Link>
        </Box>
    )
}

export default MobieHolidayCard