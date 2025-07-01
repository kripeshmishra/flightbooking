"use client"
import { Card, Typography, Box } from '@mui/material'
import Image from 'next/image';
import React, { FC } from 'react'

interface WhyChooseCardProps {
    title?: any;
    descriptions?: string;
    icon?: string;
}

const WhyChooseCard: FC<WhyChooseCardProps> = ({ title, descriptions, icon }) => {
    const imageSrc = icon || '';
    return (
        <Card className='whyChooseCard'>
            <Box className='whyChooseCardIconWrapper'>
                <Image src={imageSrc} alt={title} fill sizes='auto' />
            </Box>
            <Typography variant='h3'>{title}</Typography>
            <Typography>{descriptions}</Typography>
        </Card>
    )
}

export default WhyChooseCard