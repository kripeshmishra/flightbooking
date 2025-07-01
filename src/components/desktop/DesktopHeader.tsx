"use client"
import React from 'react'
import { Toolbar, Box, Stack, Button, Container, Typography, } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { allLinks } from '@/staticData/AllLinks';
import { FiChevronDown } from 'react-icons/fi';
import { currency } from '@/staticData/AllStaticData';
import AuthModal from '../popups/AuthModal';
import useAuthModal from '@/businesslogic/useAuthModal';
import useHeader from '@/businesslogic/useHeader';
import SidebarMenu from '../SidebarMenu';
import CurrencyLangaugeModal from '../popups/CurrencyLangaugeModal';
import ImgHeaderLogo from '../../../public/images/logo.svg';
import ImgHeaderLogoWhite from '../../../public/images/logo-white.svg';
import ImgSupport from '../../../public/images/support.png';
import ImgMenu from '../../../public/images/menu.svg';
import { usePathname } from 'next/navigation';

const DesktopHeader = () => {

    const linkLists = new allLinks()
    const { openLoginModal, handleOpen, handleClose } = useAuthModal()
    const { isDrawerOpen, setIsDrawerOpen, selectedLanguage, selectedCurrency, openCurrencyModal, handleCurrencyOpen, handleCurrencyClose } = useHeader()

    const pathname = usePathname()
    const isHomePage: boolean = pathname === '/';


    return (
        <>
            {
                isHomePage ? (
                    <nav className="main-header w-full z-50 relative homeHeader bg-white">
                        <Box>
                            <Container maxWidth="xl">
                                <Toolbar disableGutters>
                                    <Link href="/">
                                        <Box className="headerLogo">
                                            <Image alt="Fly States" src={isHomePage ? ImgHeaderLogo : ImgHeaderLogoWhite} fill sizes="auto" />
                                        </Box>
                                    </Link>
                                    <Box className='flex items-center justify-between ml-auto flex-1 pl-10' >
                                        <Box className="hidden lg:block">
                                            <Stack
                                                sx={{
                                                    flexGrow: 0,
                                                    marginLeft: 'auto',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    gap: '20px',
                                                }}
                                            >
                                                <Box className="navmenu mobileHide">
                                                    {
                                                        (linkLists.GetFilterLinks(['flights', 'vacations', 'hotels', 'cruise'])).map((menu: any, index: number) => (
                                                            <Link key={index} className="navmenuItem" href={`/${menu.link}`}>
                                                                {menu.name}
                                                            </Link>
                                                        ))
                                                    }
                                                </Box>
                                            </Stack>
                                        </Box>
                                        <Stack spacing={2} direction='row' alignItems='center' className="hidden md:flex ml-auto lg:ml-0">
                                            <Stack direction='row' gap='10px' className='headerCustomerSupport' alignItems='center'>
                                                <Box>
                                                    <Image src={ImgSupport} width={49} height={45} alt='Customer Support' />
                                                </Box>
                                                <Box>
                                                    <Typography>Speak to us:</Typography>
                                                    <Typography variant="h5" >1-866-217-3217</Typography>
                                                </Box>
                                            </Stack>
                                            <Button
                                                onClick={handleCurrencyOpen}
                                                variant="outlined"
                                                color="secondary"
                                                endIcon={<FiChevronDown size={16} />}
                                                className="transparentSelectBtn ml-5 md:ml-8 lg:ml-10"
                                                disableRipple
                                            >
                                                <img
                                                    src={currency.find((curr: any) => curr.code === selectedCurrency)?.icon}
                                                    alt={selectedCurrency}
                                                    style={{ marginRight: '8px', width: '20px' }}
                                                />
                                                {selectedCurrency} / {selectedLanguage}
                                            </Button>
                                            <Button variant='outlined' color='secondary' onClick={handleOpen} sx={{ borderRadius: '8px' }} className='ml-5 md:ml-6 lg:ml-8'>
                                                Sign in
                                            </Button>
                                        </Stack>
                                    </Box>
                                    <Button disableRipple onClick={() => setIsDrawerOpen(true)} className='text-white hover:text-primary lg:hidden ml-5' sx={{ minWidth: '32px', padding: '0' }}
                                    >
                                        <Image alt="menu" src={ImgMenu} width={26} height={16} />
                                    </Button>
                                </Toolbar>
                            </Container>
                        </Box>
                    </nav>
                ) : (
                    <nav className="main-header w-full z-50 relative innerHeader">
                        <Box>
                            <Container maxWidth="xl">
                                <Toolbar disableGutters>
                                    <Link href="/">
                                        <Box className="headerLogo">
                                            <Image alt="Fly States" src={isHomePage ? ImgHeaderLogo : ImgHeaderLogoWhite} fill sizes="auto" />
                                        </Box>
                                    </Link>
                                    <Box className='flex items-center  ml-auto  pl-10' >

                                        <Stack spacing={2} direction='row' alignItems='center' className="hidden md:flex ml-auto lg:ml-0">
                                            <Stack direction='row' gap='10px' className='headerCustomerSupport' alignItems='center'>
                                                <Box>
                                                    <Image src={ImgSupport} width={49} height={45} alt='Customer Support' />
                                                </Box>
                                                <Box>
                                                    <Typography>Speak to us:</Typography>
                                                    <Typography variant="h5" >1-866-217-3217</Typography>
                                                </Box>
                                            </Stack>
                                            <Button
                                                onClick={handleCurrencyOpen}
                                                variant="outlined"
                                                color="secondary"
                                                endIcon={<FiChevronDown size={16} />}
                                                className="transparentSelectBtn ml-5 md:ml-8 lg:ml-10"
                                                disableRipple
                                            >
                                                <img
                                                    src={currency.find((curr: any) => curr.code === selectedCurrency)?.icon}
                                                    alt={selectedCurrency}
                                                    style={{ marginRight: '8px', width: '20px' }}
                                                />
                                                {selectedCurrency} / {selectedLanguage}
                                            </Button>
                                            <Button variant='outlined' color='secondary' onClick={handleOpen} sx={{ borderRadius: '8px' }} className='ml-5 md:ml-6 lg:ml-8'>
                                                Sign in
                                            </Button>
                                        </Stack>
                                    </Box>
                                    <Button disableRipple onClick={() => setIsDrawerOpen(true)} className='text-white hover:text-primary lg:hidden ml-5' sx={{ minWidth: '32px', padding: '0' }}
                                    >
                                        <Image alt="menu" src={ImgMenu} width={26} height={16} />
                                    </Button>
                                </Toolbar>
                            </Container>
                        </Box>
                    </nav>
                )
            }

            <AuthModal openLoginModal={openLoginModal} handleClose={handleClose} />
            <SidebarMenu isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            <CurrencyLangaugeModal openCurrencyModal={openCurrencyModal} handleCurrencyClose={handleCurrencyClose} />
        </>
    )
}

export default DesktopHeader