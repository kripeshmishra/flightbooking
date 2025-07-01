"use client"
import React from 'react'
import { Box, Grid, Container } from '@mui/material';
import LoginCard from '@/components/login/LoginCard';
import useAuthModal from '@/businesslogic/useAuthModal';
import { useRouter } from 'next/navigation';

const LoginWrapper = () => {
    const { status } = useAuthModal()
    const router = useRouter()

    if (status === 'authenticated') {
        router.push('/')
    }

    return (
        <Box className='loginMainWrapper flex h-dvh items-center justify-center '>
            <LoginCard />
        </Box>
    )
}

export default LoginWrapper