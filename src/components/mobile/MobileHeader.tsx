"use client"
import React from 'react'
import { Box, Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import CurrencyLangaugeModal from '../popups/CurrencyLangaugeModal'
import useHeader from '@/businesslogic/useHeader'
import SidebarMenu from '../SidebarMenu'

const MobileHeader = () => {
    const { isDrawerOpen, setIsDrawerOpen, selectedLanguage, selectedCurrency, openCurrencyModal, handleCurrencyOpen, handleCurrencyClose } = useHeader()

    return (
        <>
            <Box className='mobile-header w-full z-50 py-3 px-4 absolute top-0 bg-custom-gradient'>
                <Box className='flex justify-between items-center'>
                    <Link href="/">
                        <Box className="headerLogo">
                            <Image alt="Fly States" src="/images/logo-white.svg" fill sizes="auto" />
                        </Box>
                    </Link>
                    <Button disableRipple onClick={() => setIsDrawerOpen(true)} className='text-white hover:text-primary lg:hidden ml-5' sx={{ minWidth: '32px', padding: '0' }}
                    >
                        <svg width="26" height="18" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5.83398" width="14.1667" height="2" rx="1" fill="currentColor" />
                            <rect y="7" width="20" height="2" rx="1" fill="currentColor" />
                            <rect x="7.5" y="14" width="12.5" height="2" rx="1" fill="currentColor" />
                        </svg>
                    </Button>
                </Box>
            </Box>
            <SidebarMenu isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            <CurrencyLangaugeModal openCurrencyModal={openCurrencyModal} handleCurrencyClose={handleCurrencyClose} />
        </>
    )
}

export default MobileHeader