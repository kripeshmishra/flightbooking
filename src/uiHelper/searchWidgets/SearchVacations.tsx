import React from 'react'
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Stack, Button, Autocomplete, MenuItem, Select, Menu, IconButton } from '@mui/material'
import { FiChevronDown, FiMapPin, FiMinus, FiPlus } from 'react-icons/fi';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { destinations } from '@/staticData/AllStaticData';
import useSearchVacations from '@/businesslogic/useSearchVacations';

const SearchVacations = () => {
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
            <Stack className='searchFormFieldWrapper' direction='row' gap={2} justifyContent='space-between' alignItems='center'>
                <Box className='searchFormFieldBox'>
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
                <Box className='searchFormFieldBox'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Check-in" />
                    </LocalizationProvider>
                </Box>

                <Box className='searchFormFieldBox'>
                    <Button className='bg-white text-black capitalize text-sm font-normal ' disableRipple onClick={handleTravellerType} variant='contained' color='primary' endIcon={<FiChevronDown size={16} />} sx={{ height: '50px', width: '100%', justifyContent: 'flex-start' }}>
                        {
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
                        }
                    </Button>
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
                </Box>

                <Button variant='contained' color='primary' sx={{ background: '#F27502', height: '50px', px: '45px', }}>
                    Search
                </Button>
            </Stack >
        </>
    )
}

export default SearchVacations