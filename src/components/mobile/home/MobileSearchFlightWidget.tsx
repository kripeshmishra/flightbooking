import React, { useEffect, useState } from 'react'
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Stack, Button, Autocomplete, MenuItem, Select, Menu, IconButton, Divider, Grid, ToggleButtonGroup, Tabs, Tab, SwipeableDrawer, List, ListItemButton, ListItemText, Dialog, InputAdornment } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useForm, Controller } from 'react-hook-form';
import { CabinType, CabinTypeLabel, TripType, TripTypeLabel } from '@/utilty/Enums';
import { FiCalendar, FiChevronDown, FiChevronLeft, FiMapPin, FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { destinations } from '@/staticData/AllStaticData';
import useSearchFlights from '@/businesslogic/useSearchFlights';
import DatePicker from "react-datepicker";
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { FaBaby, FaChild, FaUser } from 'react-icons/fa';
import moment from 'moment';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

const MobileSearchFlightWidget = () => {

    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    const {
        anchorEl,
        selectedTravellerType,
        selectedTripType,
        AdultCount,
        ChildCount,
        InfantCount,
        handleTravellerTypeChange,
        handleTripType,
        handleTravellerType,
        handleTravellerClose,
        handleQuantityChange,
        originLocations,
        destinationLocations,
        onLocationChange,
        setDateRange,
        startFromDate,
        setStartFromDate,
        startTripDate,
        endTripDate,
        dateRange
    } = useSearchFlights()


    const [openBottomDrawer, setOpenBottomDrawer] = useState<any>(null);

    const [originCity, setOriginCity] = useState<any>(null);
    const [destinationCity, setDestinationCity] = useState<any>(null);
    const [rotation, setRotation] = useState(0);


    const toggleBottomDrawer = (drawerKey: any) => () => {
        setOpenBottomDrawer((prevDrawer: any) => (prevDrawer === drawerKey ? null : drawerKey));
    };


    useEffect(() => {
        document.body.classList.toggle('dialog-open', openBottomDrawer);
        return () => {
            document.body.classList.remove('dialog-open');
        };
    }, [openBottomDrawer]);


    const handlePopupSearch = (value: string) => {
        setOpenBottomDrawer(null)
    };

    const handleSwap = () => {
        const originValue = originCity;
        const destinationValue = destinationCity;
        setOriginCity(destinationValue)
        setDestinationCity(originValue)
        setRotation(rotation === 0 ? 180 : 0);
    };


    const onSubmit = (data: any) => {

        if (!originCity?.airportCode || !destinationCity?.airportCode || !startFromDate || !startTripDate || !endTripDate || !selectedTravellerType) {
            setError(true);
            return;
        }
        setValue('AdultCount', AdultCount);
        setValue('ChildCount', ChildCount);
        setValue('InfantCount', InfantCount);
        setError(false);
        const formData = {
            AdultCount,
            ChildCount,
            InfantCount,
            OriginAirportCode: originCity?.airportCode,
            DestinationAirportCode: destinationCity?.airportCode,
            DepartureDate: startFromDate ? moment(startFromDate).format('YYYY-MM-DD') : (startTripDate ? moment(startTripDate).format('YYYY-MM-DD') : null),
            ReturnDate: selectedTripType == TripType.ONE_WAY ? null : (endTripDate !== null ? moment(endTripDate).format('YYYY-MM-DD') : null),
            TripType: +data.tripType,
            ClassType: selectedTravellerType,
            SessionKey: '',
            PortalID: parseInt(process.env.NEXT_PUBLIC_PORTAL_ID),
        }
        console.log('Form Data:', formData);
    }


    const [error, setError] = useState<boolean>(false);



    return (
        <>
            <Box className='mobileSearchWidgetsType'>
                <Link href='/' className='mobileWidgetsTypeItem active' >
                    Flights
                </Link>
                <Link href='/' className='mobileWidgetsTypeItem'>
                    Vacations
                </Link>
                <Link href='/' className='mobileWidgetsTypeItem'>
                    Hotels
                </Link>
                <Link href='/' className='mobileWidgetsTypeItem'>
                    Cruise
                </Link>
            </Box>
            <Box className='mobileSearchWidgetsFromBox mt-4 px-4 py-5 rounded-md bg-white'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="tripType"
                        control={control}
                        defaultValue={TripType.ONE_WAY}
                        render={({ field }) => (
                            <RadioGroup
                                {...field}
                                row
                                className='mobileRadioButtonTabStyle mb-8'
                                onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(value);
                                    handleTripType(e);
                                }}
                            >
                                {[...TripTypeLabel.entries()].map(([value, label]: [string, number], index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={value}
                                        control={<Radio disableRipple />}
                                        label={label}
                                    />
                                ))}
                            </RadioGroup>
                        )}
                    />
                    <Box className="mobileFlightFromToWrapper flex items-center justify-between mobileSearchFieldWrapper gap-4">
                        <Box className={`mobileSearchFieldBox ${error && !originCity?.airportCode ? 'has-error' : ''}`} onClick={toggleBottomDrawer('originCity')}>
                            <Typography variant='h4' className='text-black font-medium mb-1 text-base '>{originCity ? originCity?.airportCode : 'From'}</Typography>
                            <Typography variant='h6' className='text-slate-300 font-normal text-xs '>{originCity ? originCity?.cityName : 'City or airport'} </Typography>
                        </Box>
                        <button className='mobileFlightSwap' type='button' onClick={handleSwap} style={{ transition: '200ms', transform: `rotate(${rotation}deg)` }}>
                            <Image src="/images/swap-icon.svg" width={16} height={16} alt="swap" />
                        </button>
                        <Box className={`mobileSearchFieldBox ${error && !destinationCity?.airportCode ? 'has-error' : ''}`} onClick={toggleBottomDrawer('destinationCity')}>
                            <Typography variant='h4' className='text-black font-medium mb-1 text-base  ml-auto'>{destinationCity ? destinationCity?.airportCode : 'To'}</Typography>
                            <Typography variant='h6' className='text-slate-300 font-normal text-xs  ml-auto'>{destinationCity ? destinationCity?.cityName : 'City or airport'}</Typography>
                        </Box>
                    </Box>
                    <Box className="mobileFlightDateWrapper flex items-center justify-between mobileSearchFieldWrapper gap-4" onClick={toggleBottomDrawer('travellingDate')}>
                        <Box className={`mobileSearchFieldBox ${error && !startFromDate ? 'has-error' : ''}`}>
                            <Typography variant='h4' className='text-black font-medium  text-base '> {startFromDate ? moment(startFromDate).format('ddd, MMM D') : (startTripDate ? moment(startTripDate).format('ddd, MMM D') : 'From Date')}
                            </Typography>

                        </Box>
                        {
                            selectedTripType == TripType.ROUND_TRIP && (
                                <Box className={`mobileSearchFieldBox ${error && !startFromDate ? 'has-error' : ''}`}>
                                    <Typography variant='h4' className='text-black font-medium  text-base text-right ml-auto'>{endTripDate ? moment(endTripDate).format('ddd, MMM D') : 'Return'} </Typography>
                                </Box>
                            )
                        }
                    </Box>
                    <Box className="mobileFlightCabinWrapper flex items-center justify-between mobileSearchFieldWrapper gap-4 " onClick={toggleBottomDrawer('cabinClass')}>
                        <Box className="mobileSearchFieldBox">
                            <Typography variant='h4' className='text-black font-medium  text-base ' > {CabinTypeLabel.get(selectedTravellerType)}</Typography>
                        </Box>
                        <Box className="mobileSearchFieldBox flex justify-end flex-row items-center gap-4"  >
                            <Box className="flex items-center"><FaUser size={14} color='#adadad' /> <Typography className='ml-2 text-black font-medium'>{AdultCount}</Typography></Box>
                            <Box className="flex items-center"><FaChild size={16} color='#adadad' /> <Typography className='ml-2 text-black font-medium'>{ChildCount}</Typography></Box>
                            <Box className="flex items-center"><FaBaby size={16} color='#adadad' /> <Typography className='ml-2 text-black font-medium'>{InfantCount}</Typography></Box>
                        </Box>
                    </Box>
                    <Button type="submit" variant='contained' color='primary' sx={{ mt: 2, background: '#F27502', height: '48px', px: '25px', width: '100%' }}>
                        Search
                    </Button>
                </form>
            </Box >


            <Dialog
                fullScreen
                open={openBottomDrawer === 'originCity'}
            >
                <Stack className='fullSearchBar' direction='row' alignItems='center' gap='10px'>
                    <Button color='secondary' disableRipple onClick={() => setOpenBottomDrawer(null)} sx={{ minWidth: '32px', padding: '0', marginLeft: '8px' }}>
                        <HiOutlineArrowNarrowLeft size={26} color='#000' />
                    </Button>
                    <Box className="flex gap-4 flex-1">
                        <Autocomplete
                            sx={{ width: '100%' }}
                            open={true}
                            defaultValue={originCity}
                            options={originLocations || []}
                            getOptionLabel={(option: any) => {
                                if (!option) {
                                    return '';
                                }
                                return `${option?.cityName || ''} ${option?.cityCode && `, ${option?.cityCode || ''}`}`;

                            }}
                            autoFocus={true}
                            onChange={(event, newValue: any) => {
                                handlePopupSearch(newValue);
                                setOriginCity(newValue);

                            }}
                            onKeyUp={(e: any) => {
                                if (e.key === 'Enter') {
                                    setOpenBottomDrawer(null);
                                }
                            }}
                            onKeyPress={(e: any) => {
                                if (e.key === 'Enter') {
                                    setOpenBottomDrawer(null);
                                }
                            }}
                            ListboxProps={
                                {
                                    className: 'destinationsDropdownLists'
                                }
                            }
                            componentsProps={{
                                popper: {
                                    className: 'popupSearchAutocomplete'
                                }
                            }}
                            closeText={''}
                            freeSolo={originLocations?.length ? false : true}
                            className={`${errors.originCity ? ' has-error' : ''}`}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    autoFocus={true}
                                    onChange={ev => {
                                        if (ev.target.value !== "" || ev.target.value !== null) {
                                            onLocationChange(ev.target.value, 1);
                                        }
                                    }}
                                    placeholder="Where From?"
                                    id="originCity-placeholder"
                                />
                            )}
                            renderOption={(props, option: any) => (
                                <Stack direction='row' {...props} sx={{ py: '8px !important' }} key={option.airportCode}>
                                    <Box className='mr-2'>
                                        <BiSolidPlaneAlt size={20} color='#000000' />
                                    </Box>
                                    <Box className='ml-2'>
                                        <Typography variant='h5' className='text-sm font-medium'>{option?.cityName}</Typography>
                                        <Typography variant='h6' className='text-xs font-normal mt-1 text-zinc-400'>{option?.airportName}</Typography>
                                    </Box>
                                    <Typography variant='h4' className='text-base font-medium ml-auto '>{option?.airportCode}</Typography>
                                </Stack>
                            )}
                        />
                    </Box>
                </Stack>
            </Dialog >


            <Dialog
                fullScreen
                open={openBottomDrawer === 'destinationCity'}
            >
                <Stack className='fullSearchBar' direction='row' alignItems='center' gap='10px'>
                    <Button color='secondary' disableRipple onClick={() => setOpenBottomDrawer(null)} sx={{ minWidth: '32px', padding: '0', marginLeft: '8px' }}>
                        <HiOutlineArrowNarrowLeft size={26} color='#000' />
                    </Button>
                    <Box className="flex gap-4 flex-1">
                        <Autocomplete
                            sx={{ width: '100%' }}
                            open={true}
                            defaultValue={destinationCity}
                            options={destinationLocations || []}
                            getOptionLabel={(option: any) => {
                                if (!option) {
                                    return '';
                                }
                                return `${option?.cityName || ''} ${option?.cityCode && `, ${option?.cityCode || ''}`}`;

                            }}
                            autoFocus={true}
                            onChange={(event, newValue: any) => {
                                handlePopupSearch(newValue);
                                setDestinationCity(newValue);

                            }}
                            onKeyUp={(e: any) => {
                                if (e.key === 'Enter') {
                                    setOpenBottomDrawer(null);
                                }
                            }}
                            onKeyPress={(e: any) => {
                                if (e.key === 'Enter') {
                                    setOpenBottomDrawer(null);
                                }
                            }}
                            ListboxProps={
                                {
                                    className: 'destinationsDropdownLists'
                                }
                            }
                            componentsProps={{
                                popper: {
                                    className: 'popupSearchAutocomplete'
                                }
                            }}
                            closeText={''}
                            freeSolo={destinationLocations?.length ? false : true}
                            className={`${errors.destinationCity ? ' has-error' : ''}`}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    autoFocus={true}
                                    onChange={ev => {
                                        if (ev.target.value !== "" || ev.target.value !== null) {
                                            onLocationChange(ev.target.value, 2);
                                        }
                                    }}
                                    placeholder="Where To?"
                                    id="destinationCity-placeholder"
                                />
                            )}
                            renderOption={(props, option: any) => (
                                <Stack direction='row' {...props} sx={{ py: '8px !important' }} key={option.airportCode}>
                                    <Box className='mr-2'>
                                        <BiSolidPlaneAlt size={20} color='#000000' />
                                    </Box>
                                    <Box className='ml-2'>
                                        <Typography variant='h5' className='text-sm font-medium'>{option?.cityName}</Typography>
                                        <Typography variant='h6' className='text-xs font-normal mt-1 text-zinc-400'>{option?.airportName}</Typography>
                                    </Box>
                                    <Typography variant='h4' className='text-base font-medium ml-auto '>{option?.airportCode}</Typography>
                                </Stack>
                            )}
                        />
                    </Box>
                </Stack>
            </Dialog >


            <SwipeableDrawer
                anchor="bottom"
                open={openBottomDrawer === 'travellingDate'}
                onClose={toggleBottomDrawer('travellingDate')}
                onOpen={toggleBottomDrawer('travellingDate')}
                PaperProps={{
                    className: 'bottomDrawerPopup'
                }}
            >
                <Box className="bottomDrawerTopHeader">
                    <h3>When Are You Departing?</h3>
                    <Box onClick={() => setOpenBottomDrawer(null)}>
                        <FiX size={20} />
                    </Box>
                </Box>
                <Box>
                    {
                        selectedTripType == TripType.ONE_WAY ? (
                            <DatePicker
                                selected={startFromDate}
                                onChange={(date: any) => {
                                    setStartFromDate(date);
                                    setOpenBottomDrawer(null)
                                }}
                                inline
                                monthsShown={2}
                            />
                        ) : (
                            <DatePicker
                                inline
                                selectsRange={true}
                                startDate={startFromDate ? startFromDate : startTripDate}
                                endDate={endTripDate}
                                onChange={(date: any) => {
                                    setDateRange(date);
                                    if (date[1]) {
                                        setOpenBottomDrawer(null);
                                    }
                                }}
                                minDate={startFromDate}
                                monthsShown={2}
                                dateFormat="MMM D, YYYY"
                            />
                        )
                    }

                </Box>
            </SwipeableDrawer>
            <SwipeableDrawer
                anchor="bottom"
                open={openBottomDrawer === 'cabinClass'}
                onClose={toggleBottomDrawer('cabinClass')}
                onOpen={toggleBottomDrawer('cabinClass')}
                PaperProps={{
                    className: 'bottomDrawerPopup'
                }}
            >
                <Box className="bottomDrawerTopHeader">
                    <h3>Select the Class and Travelers</h3>
                    <Box onClick={() => setOpenBottomDrawer(null)}>
                        <FiX size={20} />
                    </Box>
                </Box>
                <Box className="px-4 mb-8 mt-3">
                    <List className='bottomDrawerList'>
                        {[...CabinTypeLabel.entries()].map(([value, label]: [string, number], index) => (
                            <ListItemButton key={index} onClick={() => handleTravellerTypeChange(value)} selected={selectedTravellerType === value} disableRipple>
                                {label}
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
                <Divider />
                <Box className="mt-8 px-4">
                    <Stack className='travelerCountBox' direction='row' alignItems='center'>
                        <Box>
                            <Typography variant='h5'>Adults:</Typography>
                            <Typography> (12 years)</Typography>
                        </Box>
                        <Stack className='travelerCountBoxAction' direction='row'>
                            <IconButton onClick={() => handleQuantityChange('AdultCount', -1)} size="small" disableRipple>
                                <FiMinus />
                            </IconButton>
                            <Typography>{AdultCount}</Typography>
                            <IconButton onClick={() => handleQuantityChange('AdultCount', 1)} size="small" disableRipple>
                                <FiPlus />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack className='travelerCountBox' direction='row' alignItems='center'>
                        <Box>
                            <Typography variant='h5'>Children:</Typography>
                            <Typography> (2-12 years)</Typography>
                        </Box>
                        <Stack className='travelerCountBoxAction' direction='row'>
                            <IconButton onClick={() => handleQuantityChange('ChildCount', -1)} size="small" disableRipple>
                                <FiMinus />
                            </IconButton>
                            <Typography>{ChildCount}</Typography>
                            <IconButton onClick={() => handleQuantityChange('ChildCount', 1)} size="small" disableRipple>
                                <FiPlus />
                            </IconButton>
                        </Stack>
                    </Stack>
                    <Stack className='travelerCountBox' direction='row' alignItems='center'>
                        <Box>
                            <Typography variant='h5'>Infants:</Typography>
                            <Typography> (under 2 years)</Typography>
                        </Box>
                        <Stack className='travelerCountBoxAction' direction='row'>
                            <IconButton onClick={() => handleQuantityChange('InfantCount', -1)} size="small" disableRipple>
                                <FiMinus />
                            </IconButton>
                            <Typography>{InfantCount}</Typography>
                            <IconButton onClick={() => handleQuantityChange('InfantCount', 1)} size="small" disableRipple>
                                <FiPlus />
                            </IconButton>
                        </Stack>
                    </Stack>

                </Box>
                <Stack className="p-4 mt-auto">
                    <Button variant='contained' color='primary' sx={{ width: '100%', textTransform: 'capitalize', fontSize: '13px' }}
                        onClick={() => setOpenBottomDrawer(null)}>Apply</Button>
                </Stack>
            </SwipeableDrawer>
        </>
    )
}

export default MobileSearchFlightWidget