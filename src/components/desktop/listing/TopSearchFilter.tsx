
import React, { useState, useEffect, ChangeEvent } from 'react'
import { Box, Container, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Stack, Button, Autocomplete, MenuItem, Select, Menu, IconButton, Divider, FormHelperText } from '@mui/material'
import { FiCalendar, FiChevronDown, FiMapPin, FiMinus, FiPlus, FiUser } from 'react-icons/fi';
import { CabinType, CabinTypeLabel, TripType, TripTypeLabel } from '@/utilty/Enums';
import useSearchFlights from '@/businesslogic/useSearchFlights';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from "react-datepicker";
import { GetFromLocalStorage } from '@/utilty/Helper';
import Image from 'next/image';
import moment from 'moment';
import { BiSolidPlaneAlt } from 'react-icons/bi';

const TopSearchFilter = () => {


    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const [rotation, setRotation] = useState(0);

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
        endTripDate
    } = useSearchFlights()


    const onSubmit = async (data: any) => {
        setValue('AdultCount', AdultCount);
        setValue('ChildCount', ChildCount);
        setValue('InfantCount', InfantCount);

        if (selectedTripType === TripType.ROUND_TRIP && endTripDate === null) {
            return;
        }

        const formData = {
            AdultCount,
            ChildCount,
            InfantCount,
            tripType: data.tripType,
            fromDate: moment(startFromDate).format('DD-MM-YYYY'),
            toDate: selectedTripType === TripType.ONE_WAY ? null : (endTripDate !== null ? moment(endTripDate).format('DD-MM-YYYY') : null),
            preferredCarrier: false,
            isDirect: true,
            userId: 'testUser',
            isEachWay: false,
            cabinClass: data.cabinClass,
            originCity: data?.originCity?.airportCode,
            destinationCity: data?.destinationCity?.airportCode,
            currency: GetFromLocalStorage('_currency'),
        };
        console.log('FormData:', formData);
    };


    const handleSwap = () => {
        const originValue = getValues('originCity');
        const destinationValue = getValues('destinationCity');
        setValue('originCity', destinationValue);
        setValue('destinationCity', originValue);
        setRotation(rotation + 180);
    };


    return (
        <Box className="topSearchFilter">
            <Container maxWidth="xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box className='flex  flex-row  items-center justify-between'>
                        <Box className="searchFlightTripType">
                            <Controller
                                name="tripType"
                                control={control}
                                defaultValue={TripType.ONE_WAY}
                                render={({ field }) => (
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={selectedTripType}
                                            onChange={(e) => {
                                                handleTripType(e);
                                                field.onChange(e);
                                            }}
                                            inputProps={{
                                                MenuProps: {
                                                    className: 'select-MuiList',
                                                    disableScrollLock: true,
                                                },
                                            }}
                                            sx={{ width: '100%' }}
                                            IconComponent={FiChevronDown}
                                        >
                                            <MenuItem value={TripType.ONE_WAY}>{TripTypeLabel.get(TripType.ONE_WAY)}</MenuItem>
                                            <MenuItem value={TripType.ROUND_TRIP}>{TripTypeLabel.get(TripType.ROUND_TRIP)}</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                            />
                        </Box>
                        <Box className='searchFlightFromToWrapper'>
                            <Box className={`searchFormFieldBox btn_swap btn_swap_left `}>
                                <Box className='searchFormLeftIcon'>
                                    <FiMapPin size={18} />
                                </Box>
                                <Controller
                                    name="originCity"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Please select origin city.',
                                    }}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            sx={{ width: '100%' }}
                                            options={originLocations || []}
                                            getOptionLabel={(option) => {
                                                if (!option) {
                                                    return '';
                                                }
                                                return `${option?.cityName || ''} ${option?.cityCode && `, ${option?.cityCode || ''}`}`;
                                            }}
                                            onChange={(event, newValue) => {
                                                field.onChange(newValue);
                                            }}
                                            ListboxProps={
                                                {
                                                    style: {
                                                        maxHeight: '400px',
                                                    },
                                                    className: 'destinationsDropdownLists'
                                                }
                                            }
                                            componentsProps={{
                                                popper: {
                                                    className: 'destinationsDropdownPopper',
                                                    placement: 'bottom-start'
                                                }
                                            }}
                                            freeSolo={originLocations?.length ? false : true}
                                            className={`${errors.originCity ? ' has-error' : ''}`}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
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
                                    )}
                                />
                            </Box>

                            <button className='swapBtn rounded-full ' type='button' onClick={handleSwap} style={{ transition: '200ms', transform: `rotate(${rotation}deg)` }}>
                                <Image src="/images/swap-icon.svg" width={16} height={16} alt="swap" />
                            </button>
                            <Box className='searchFormFieldBox destinationFieldBox btn_swap btn_swap_right'>
                                <Box className='searchFormLeftIcon'>
                                    <FiMapPin size={18} />
                                </Box>
                                <Controller
                                    name="destinationCity"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: 'Please select destination city.',
                                    }}
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            sx={{ width: '100%' }}
                                            options={destinationLocations || []}
                                            getOptionLabel={(option) => {
                                                if (!option) {
                                                    return '';
                                                }
                                                return `${option?.cityName || ''} ${option?.cityCode && `, ${option?.cityCode || ''}`}`;
                                            }}
                                            onChange={(event, newValue) => {
                                                field.onChange(newValue);
                                            }}
                                            ListboxProps={
                                                {
                                                    style: {
                                                        maxHeight: '400px',
                                                    },
                                                    className: 'destinationsDropdownLists'
                                                }
                                            }
                                            componentsProps={{
                                                popper: {
                                                    className: 'destinationsDropdownPopper',
                                                    placement: 'bottom-start'
                                                }
                                            }}
                                            freeSolo={destinationLocations?.length ? false : true}
                                            className={`${errors.destinationCity ? ' has-error' : ''}`}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Where To?"
                                                    onChange={ev => {
                                                        if (ev.target.value !== "" || ev.target.value !== null) {
                                                            onLocationChange(ev.target.value, 2);
                                                        }
                                                    }}
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
                                                        <Typography variant='h6' className='text-xs font-normal mt-1 text-slate-500'>{option?.airportName}</Typography>
                                                    </Box>
                                                    <Typography variant='h4' className='text-base font-medium ml-auto '>{option?.airportCode}</Typography>
                                                </Stack>
                                            )}
                                        />
                                    )}
                                />
                            </Box>
                        </Box>
                        <Box className={`searchFlightDateWrapper ${errors.startFromDate ? 'has-error' : ''} ${selectedTripType === TripType.ROUND_TRIP && endTripDate === null ? 'has-error' : ''}`}>
                            {
                                selectedTripType === TripType.ONE_WAY ? (
                                    <Controller
                                        name="startFromDate"
                                        control={control}
                                        rules={{
                                            required: 'Please select Leaving Date.'
                                        }}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                selected={startFromDate}
                                                onChange={(date: any) => {
                                                    setStartFromDate(date);
                                                    field.onChange(date);
                                                }}
                                                showIcon
                                                icon={<FiCalendar />}
                                                monthsShown={2}

                                                popperPlacement="top-end"
                                                placeholderText='Leaving on'
                                            />
                                        )}
                                    />
                                ) : (
                                    <Controller
                                        name="endTripDate"
                                        control={control}
                                        rules={{
                                            required: 'Please select Leaving Date.'
                                        }}
                                        render={({ field }) => (
                                            <DatePicker
                                                {...field}
                                                showIcon
                                                icon={<FiCalendar />}
                                                selectsRange={true}
                                                startDate={startFromDate ? startFromDate : startTripDate}
                                                endDate={endTripDate}
                                                onChange={(date: any) => {
                                                    setDateRange(date);
                                                }}
                                                minDate={startFromDate}
                                                popperPlacement="top-end"
                                                monthsShown={2}
                                                placeholderText='Leaving on      |      Return'
                                            />
                                        )}
                                    />
                                )
                            }
                        </Box>
                        <Box className="searchFlightPacksInfo">
                            <Stack direction='row' alignItems='center' onClick={handleTravellerType}>
                                <Box className='searchFormLeftIcon'>
                                    <FiUser size={18} />
                                </Box>
                                <Box className='pl-8 searchFlightPackDetailsInfo'>
                                    Travelers : {AdultCount + ChildCount + InfantCount}  /
                                    {CabinTypeLabel.get(selectedTravellerType)}
                                </Box>
                            </Stack>
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                disableScrollLock={true}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                PaperProps={{ style: { marginTop: '35px' } }}
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                MenuListProps={{
                                    className: 'travelerCountWrapper ',
                                }}
                                PopoverClasses={{
                                    paper: 'MuiPopoverCustomShadow',
                                }}
                                onClose={handleTravellerClose}
                            >
                                <Box className="mb-4 innerFilterPackInfo">
                                    <Controller
                                        name="cabinClass"
                                        control={control}
                                        defaultValue={CabinType.ECONOMY}
                                        render={({ field }) => (
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={selectedTravellerType}
                                                    onChange={(e) => {
                                                        handleTravellerTypeChange(e.target.value);
                                                        field.onChange(e);
                                                    }}
                                                    inputProps={{
                                                        MenuProps: {
                                                            className: 'select-MuiList',
                                                            disableScrollLock: true,
                                                        },
                                                    }}
                                                    sx={{ width: '140px' }}
                                                    IconComponent={FiChevronDown}
                                                >
                                                    {
                                                        [...CabinTypeLabel.entries()].map(
                                                            ([value, label]: [string, number], index) =>
                                                                <MenuItem value={value} key={index}> {label}</MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                </Box>
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
                                <Stack>
                                    <Button variant='contained' color='primary' sx={{ ml: 'auto', textTransform: 'capitalize', height: '32px', fontSize: '13px' }} onClick={handleTravellerClose}>Apply</Button>
                                </Stack>
                            </Menu>
                        </Box>

                        <Button type="submit" variant='contained' color='secondary' sx={{ height: '40px', px: '20px', borderRadius: '10px' }}>
                            Search
                        </Button>
                    </Box>

                </form>
            </Container>
        </Box >
    )
}

export default TopSearchFilter