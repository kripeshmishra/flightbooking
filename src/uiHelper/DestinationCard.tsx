"use client"
import { Stack, Typography, Box, Card } from '@mui/material'
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'

interface DestinationCardProps {
    destination?: any;
    destinationImage?: string;
}
const DestinationCard: FC<DestinationCardProps> = ({ destination, destinationImage }) => {

    const imageSrc = destinationImage || '';

    return (
        <Card className='destinationCardStyle relative'>
            <Link href='/' className='w-full h-full'>
                <Box className='destinationCardImageWrapper imageGradientEffect'>
                    <Image src={imageSrc} alt={destination} fill />
                </Box>
                <Typography variant='h3'>{destination}</Typography>
            </Link>
        </Card>
    )
}

export default DestinationCard