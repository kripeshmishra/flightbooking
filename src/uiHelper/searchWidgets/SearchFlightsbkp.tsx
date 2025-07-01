
import React, { useState } from 'react'
import { Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField, Stack, Button, Autocomplete, MenuItem, Select, Menu, IconButton, Divider } from '@mui/material'
import { FiCalendar, FiChevronDown, FiMapPin, FiMinus, FiPlus } from 'react-icons/fi';
import { CabinType, CabinTypeLabel, TripType, TripTypeLabel } from '@/utilty/Enums';
import useSearchFlights from '@/businesslogic/useSearchFlights';
import { useForm, Controller } from 'react-hook-form';
import { MdOutlineFlightTakeoff, MdAirlineSeatReclineExtra } from 'react-icons/md';
import { GetFromLocalStorage } from '@/utilty/Helper';
import Image from 'next/image';
import DatePicker from "react-datepicker";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaUser } from 'react-icons/fa';
import SecureIcon from '../../../public/images/secure.svg';

const SearchFlights = () => {

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
        dateRange,
        setDateRange,
        startFromDate,
        setStartFromDate
    } = useSearchFlights()


    const onSubmit = async (data: any) => {

        const formatDate = (date: any) => {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return new Date(date).toLocaleDateString('en-GB', options);
        };

        setValue('AdultCount', AdultCount);
        setValue('ChildCount', ChildCount);
        setValue('InfantCount', InfantCount);

        const formData = {
            AdultCount,
            ChildCount,
            InfantCount,
            tripType: data.tripType,
            fromDate: selectedTripType === TripType.ONE_WAY ? formatDate(startFromDate) : formatDate(dateRange[0]),
            toDate: selectedTripType === TripType.ONE_WAY ? null : formatDate(dateRange[1]),
            preferredCarrier: false,
            isDirect: true,
            userId: 'testUser',
            isEachWay: false,
            cabinClass: data.cabinClass,
            originCity: data?.originCity?.airportCode,
            destinationCity: data?.destinationCity?.airportCode,
            currency: GetFromLocalStorage('_currency'),
        };
        console.log('data:', data);
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

        <Box className='searchFlightsForm'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack mb={2} direction='row' gap={6} alignItems='center'>
                    <Box className="flex items-center">
                        <Box className="mr-2 flex items-center"><BiSolidPlaneAlt color='#003053' size={18} /></Box>
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
                                        sx={{ width: '140px' }}
                                        className="transparentSelectBtn"
                                        IconComponent={FiChevronDown}
                                    >
                                        {
                                            [...TripTypeLabel.entries()].map(
                                                ([value, label]: [string, number], index) =>
                                                    <MenuItem value={value} key={index}>
                                                        {label}
                                                    </MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Box>
                    <Box>
                        <Button className="transparentSelectBtn" disableRipple onClick={handleTravellerType} variant='outlined' color='primary' endIcon={<FiChevronDown size={16} />}>   <Box className="mr-2 flex items-center"><FaUser size={14} /></Box>
                            {AdultCount} Adult {(ChildCount > 0) && ` , ${ChildCount} Child`} {(InfantCount > 0) && ` , ${InfantCount} Infant`}
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
                    <Box className="flex items-center">
                        <Box className="mr-2 flex items-center"><MdAirlineSeatReclineExtra color='#003053' size={22} /></Box>
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
                                            handleTravellerTypeChange(e);
                                            field.onChange(e);
                                        }}
                                        inputProps={{
                                            MenuProps: {
                                                className: 'select-MuiList',
                                                disableScrollLock: true,
                                            },
                                        }}
                                        sx={{ width: '140px' }}
                                        className="transparentSelectBtn"
                                        IconComponent={FiChevronDown}
                                    >
                                        {
                                            [...CabinTypeLabel.entries()].map(
                                                ([value, label]: [string, number], index) =>
                                                    <MenuItem value={value} key={index}>
                                                        {label}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Box>
                    <Box className="ml-auto flex items-center">
                        <Image src={SecureIcon} alt='' width={21} height={21} />
                        <Typography className='text-secondary font-medium ml-2'>Secure Payment</Typography>
                    </Box>
                </Stack>

                <Box className='flex  flex-row  items-center justify-between'>
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
                                        open={true}
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
                                            <Stack direction='row' {...props} sx={{ py: '8px !important' }} key={option.id}>
                                                <Box className='mr-2'>
                                                    <MdOutlineFlightTakeoff size={24} color='#000000' />
                                                </Box>
                                                <Box className='ml-2'>
                                                    <Typography variant='h5' className='text-sm font-medium'>{option?.cityName}</Typography>
                                                    <Typography variant='h6' className='text-xs font-normal mt-1 text-slate-400'>{option?.text}</Typography>
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
                                            <Stack direction='row' key={option.id} {...props} sx={{ py: '8px !important' }}>
                                                <Box className='mr-2'>
                                                    <MdOutlineFlightTakeoff size={24} color='#000000' />
                                                </Box>
                                                <Box className='ml-2'>
                                                    <Typography variant='h5' className='text-sm font-medium'>{option?.cityName}</Typography>
                                                    <Typography variant='h6' className='text-xs font-normal mt-1 text-slate-400'>{option?.text}</Typography>
                                                </Box>
                                                <Typography variant='h4' className='text-base font-medium ml-auto '>{option?.airportCode}</Typography>
                                            </Stack>
                                        )}
                                    />
                                )}
                            />
                        </Box>
                    </Box>
                    <Box className={`searchFlightDateWrapper ${errors.fromDate || errors.toDate ? ' has-error' : ''}`}>


                        <Controller
                            name="fromDate"
                            control={control}
                            rules={{
                                required: 'Please select Leaving Date.'
                            }}
                            render={({ field }) => (
                                selectedTripType === TripType.ONE_WAY ? (
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
                                ) : (
                                    <DatePicker
                                        {...field}
                                        showIcon
                                        icon={<FiCalendar />}
                                        selectsRange={true}
                                        startDate={dateRange[0]}
                                        endDate={dateRange[1]}
                                        onChange={(date: any) => {
                                            setDateRange(date);
                                            setValue('fromDate', date[0]);
                                            setValue('toDate', date[1]);
                                        }}
                                        popperPlacement="top-end"
                                        monthsShown={2}
                                        placeholderText='Leaving on      |      Return'
                                    />
                                )
                            )}
                        />
                    </Box>
                    <Button type="submit" variant='contained' color='primary' sx={{ background: '#F27502', height: '48px', px: '25px' }}>
                        Search
                    </Button>
                </Box>

            </form >
        </Box >

    )
}

export default SearchFlights