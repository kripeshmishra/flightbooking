import React, { useEffect, useState } from 'react'
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Stack, Button, Autocomplete, MenuItem, Select, Menu, IconButton, Divider, Grid } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { CabinTypeLabel, TripType, TripTypeLabel } from '@/utilty/Enums';
import { FiCalendar, FiChevronDown, FiMapPin, FiMinus, FiPlus } from 'react-icons/fi';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { destinations } from '@/staticData/AllStaticData';
import useSearchVacations from '@/businesslogic/useSearchVacations';
import { MobileDatePicker } from '@mui/x-date-pickers';

const MobileSearchVacationsWidget = () => {

    const {
        anchorEl,
        rooms,
        adults,
        children,
        showRoomGuestCount,
        handleTravellerType,
        handleTravellerClose,
        handleQuantityChange
    } = useSearchVacations()


    return (
        <>
            <Box className='mobileSearchWidgetsType'>
                <Link href='/' className='mobileWidgetsTypeBox ' >
                    <Box className='mobileWidgetsTypeImage'>
                        <Image src='/images/flights.svg' alt='' width={32} height={32} />
                    </Box>
                    <Typography className='text-defaultText text-sm font-medium'>Flights</Typography>
                </Link>
                <Link href='/vacations' className='mobileWidgetsTypeBox active'>
                    <Box className='mobileWidgetsTypeImage'>
                        <Image src='/images/vacations.svg' alt='' width={32} height={32} />
                    </Box>
                    <Typography className='text-defaultText text-sm font-medium'>Vacations </Typography>
                </Link>
            </Box>
            <Box className='mobileSearchWidgetsFromBox mt-4 p-6 rounded-md'>
                <Box className='searchFormFieldBox mt-0'>
                    <Box className='searchFormLeftIcon'>
                        <FiMapPin size={18} />
                    </Box>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        sx={{ width: '100%' }}
                        options={destinations.map((option) => option.title)}
                        renderInput={(params) => <TextField {...params} placeholder='Enter City' />}
                    />
                </Box>
                <Box className='searchFormFieldBox searchWidgetDateWrapper'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box className='searchFormLeftIcon'>
                            <FiCalendar size={18} />
                        </Box>
                        <MobileDatePicker label="Check-in"
                            className='searchWidgetDateFrom'
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker label="Check-out" />
                    </LocalizationProvider>
                </Box>
                <Stack className='searchFormFieldBox searchWidgetPacksInfo' direction='row'>
                    <Box sx={{ width: '100%' }}>
                        <Button disableRipple className='mobileTravelerBtn' onClick={handleTravellerType} variant='contained' color='primary' endIcon={<FiChevronDown size={16} />}>   {
                            showRoomGuestCount ? (
                                <>
                                    {
                                        (rooms >= 1) && (`Rooms : ${rooms}, `)
                                    }
                                    {
                                        (adults >= 1 || children >= 1) && (`Person : ${adults + children}`)
                                    }
                                </>
                            ) : (" Rooms & Adults ")
                        } </Button>
                    </Box>
                    <Menu
                        id="traveler-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        disableScrollLock={true}
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                        PaperProps={{ style: { marginTop: '35px' } }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        MenuListProps={{
                            className: 'travelerCountWrapper',
                        }}
                        PopoverClasses={{
                            paper: 'MuiPopoverCustomShadow',
                        }}
                        onClose={handleTravellerClose}
                    >
                        <Stack className='travelerCountBox' direction='row' alignItems='center'>
                            <Box>
                                <Typography variant='h5'>Rooms:</Typography>
                            </Box>
                            <Stack className='travelerCountBoxAction' direction='row'>
                                <IconButton onClick={() => handleQuantityChange('rooms', -1)} size="small" disableRipple>
                                    <FiMinus />
                                </IconButton>
                                <Typography>{rooms}</Typography>
                                <IconButton onClick={() => handleQuantityChange('rooms', 1)} size="small" disableRipple>
                                    <FiPlus />
                                </IconButton>
                            </Stack>
                        </Stack>

                        <Stack className='travelerCountBox' direction='row' alignItems='center'>
                            <Box>
                                <Typography variant='h5'>Adults:</Typography>
                            </Box>
                            <Stack className='travelerCountBoxAction' direction='row'>
                                <IconButton onClick={() => handleQuantityChange('adults', -1)} size="small" disableRipple>
                                    <FiMinus />
                                </IconButton>
                                <Typography>{adults}</Typography>
                                <IconButton onClick={() => handleQuantityChange('adults', 1)} size="small" disableRipple>
                                    <FiPlus />
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Stack className='travelerCountBox' direction='row' alignItems='center'>
                            <Box>
                                <Typography variant='h5'>Children:</Typography>
                                <Typography> (0 - 17 Years Old)</Typography>
                            </Box>
                            <Stack className='travelerCountBoxAction' direction='row'>
                                <IconButton onClick={() => handleQuantityChange('children', -1)} size="small" disableRipple>
                                    <FiMinus />
                                </IconButton>
                                <Typography>{children}</Typography>
                                <IconButton onClick={() => handleQuantityChange('children', 1)} size="small" disableRipple>
                                    <FiPlus />
                                </IconButton>
                            </Stack>
                        </Stack>
                        <Stack>
                            <Button variant='contained' color='primary' sx={{ ml: 'auto', textTransform: 'capitalize', height: '32px', fontSize: '13px' }} onClick={handleTravellerClose}>Apply</Button>
                        </Stack>

                    </Menu>
                </Stack>

                <Box className="searchFormFieldBox">
                    <Button variant='contained' color='primary' sx={{ background: '#F27502', px: '45px', width: '100%' }}>
                        Search Vacations
                    </Button>
                </Box>
            </Box >
        </>
    )
}

export default MobileSearchVacationsWidget