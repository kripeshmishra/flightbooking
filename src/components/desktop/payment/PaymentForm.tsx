'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Card, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import { countryCodes, usStates } from '@/staticData/AllStaticData';
import CVVImg from '../../../../public/images/payment/cvv.svg'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { FaRegUser } from 'react-icons/fa';
import { usePaymentContext } from '@/components/context/PaymentPageContext';
import { GenderType } from '@/utilty/Enums';
enum CardType {
    Visa = 'visa',
    Mastercard = 'mastercard',
    AmexCard = 'american-express',
    DinersClubCard = 'direct-debit',

}
type FormValues = {
    cardType: string,
    name: string,
    cardNumber: string,
    cvv: string,
    countryCode: string,
    city: string,
    postalCode: string,
    state: string,
    expirationDate: Date,
    address: string,

}
interface Date {
    _d: string
}

const cardTypeImages: Record<CardType, string> = {
    [CardType.Visa]: '/images/payment/card5.png',
    [CardType.Mastercard]: '/images/payment/card4.png',
    [CardType.AmexCard]: '/images/payment/card1.png',
    [CardType.DinersClubCard]: '/images/payment/card2.png',

};


const PaymentForm = () => {
    const { activeStep, formData, paymentDetails, setPaymentDetails, selectedCardType, setSelectedCardType, validateCardNumber, handleBack, goToFirstForm, steps, useScrollToTop, selectedPlan, countryList, stateList } = usePaymentContext();

    //*Scroll to top
    useScrollToTop();

    const { control, handleSubmit, setValue, getValues, trigger, formState: { errors } } = useForm<FormValues>({ defaultValues: paymentDetails });

    const isInitialRender = useRef(true);
    const router = useRouter()

    const handleCardTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCardType(event.target.value as CardType);
    };
    const onSubmit = (data: FormValues) => {
        const paymentPageData = {
            cardType: selectedCardType,
            name: data.name,
            cardNumber: data.cardNumber,
            expirationDate: moment(data?.expirationDate as any).format('YYYY-MM'),
            cvv: data.cvv,
            address: data.address,
            country: data.countryCode,
            state: data.state,
            city: data.city,
            postalCode: data.postalCode,
            contact: formData.contact,
            dob: moment(formData?.DOB as any).format('YYYY-MM-DD'),
            countryCode: formData.countryCodes,
            email: formData.email,
            firstAndMiddleName: formData.firstAndMiddleName,
            gender: formData.gender,
            lastName: formData.lastName,
            isAddedToTrip: selectedPlan.isAddedToTrip,
            selectedPlan: selectedPlan.selectedPlan
        };
        setPaymentDetails(paymentPageData)
        router.push('/confirmation')
    };

    useEffect(() => {
        setValue('countryCode', paymentDetails?.country);
    }, [paymentDetails, selectedCardType]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        trigger('cardNumber');
    }, [selectedCardType, trigger]);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box >
                <Box className="inner-subtitle mb-5">
                    <Typography variant='h3'>Payment Information</Typography>
                </Box>
                <Card className='shadow-none p-5'>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label" className='text-black  text-sm font-medium textPoppins mb-2'>Card Type</FormLabel>
                        <Controller
                            control={control}
                            name="cardType"
                            defaultValue="visa"
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={selectedCardType}
                                    onChange={handleCardTypeChange}

                                >
                                    {Object.values(CardType).map((cardType, index) => (
                                        <FormControlLabel
                                            key={cardType}
                                            value={cardType}
                                            control={<Radio />}
                                            label={<Image height={32} width={50} src={cardTypeImages[cardType]} alt={cardType} />}
                                            className={index < Object.values(CardType).length - 1 ? 'mr-16' : ''}
                                        />
                                    ))}
                                </RadioGroup>
                            )}
                        />
                        {errors.cardType && errors.cardType.message}
                    </FormControl>
                    <Stack direction={'row'} spacing={2} className='mt-5'>
                        <FormControl fullWidth>
                            <FormLabel className='text-black  text-sm font-medium textPoppins mb-2'>Card Holder's Name <span className='text-red-500'>*</span></FormLabel>
                            <Controller
                                control={control}
                                name="name"
                                rules={{
                                    required: "Name is required",
                                    maxLength: 50,
                                    pattern: {
                                        value: /^[a-zA-Z]+( [a-zA-Z]+)?( [a-zA-Z]+)?$/,
                                        message: "Invalid name",
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField error={!!errors.name}
                                        helperText={errors.name && errors.name.message} {...field} className={`emailInput paymentInputs ${errors.name ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} placeholder='Card holder name' fullWidth />
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel className='text-black  text-sm font-medium textPoppins mb-2'>Credit/Debit Card No <span className='text-red-500'>*</span></FormLabel>
                            <Controller
                                control={control}
                                name="cardNumber"
                                rules={{
                                    required: "Card number is required",
                                    maxLength: 16,
                                    validate: value => validateCardNumber(value, selectedCardType),
                                }}
                                render={({ field }) => (
                                    <TextField error={!!errors.cardNumber} inputProps={{ maxLength: 16 }}
                                        helperText={errors.cardNumber && errors.cardNumber.message} {...field} onChange={(e) => {
                                            field.onChange(e);
                                            trigger('cardNumber');
                                        }} className={`emailInput paymentInputs ${errors.cardNumber ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} placeholder='Credit or debit card number' fullWidth />
                                )}
                            />
                        </FormControl>
                    </Stack>
                    <Stack direction={'row'} className='mt-7 mb-2 items-end justify-center' spacing={2}>
                        <FormControl fullWidth className='flex-1'>
                            <FormLabel className='text-black  text-sm font-medium textPoppins mb-2'>Expiration Date<span className='text-red-500'>*</span></FormLabel>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <Controller
                                    control={control}
                                    name="expirationDate"
                                    rules={{
                                        required: "Please provide expiration date",
                                        validate: (value) => {
                                            const currentDate = moment();
                                            const selectedDate = moment(value as any, 'MM/YYYY', true);

                                            if (!selectedDate.isValid()) {
                                                return "Invalid date format";
                                            }

                                            if (selectedDate.isBefore(currentDate, 'month')) {
                                                return "Card has expired";
                                            }

                                            return true;
                                        },
                                    }}
                                    render={({ field }) => {
                                        return (
                                            <DatePicker
                                                className={`paymentInputs ${errors.expirationDate ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"} `}
                                                value={field.value}
                                                inputRef={field.ref}
                                                onChange={(date) => {
                                                    field.onChange(date);
                                                    console.log(date);
                                                }}
                                                views={['year', 'month']}
                                                openTo="year"
                                                format="MM/YYYY"
                                                slotProps={{
                                                    textField: {
                                                        variant: 'outlined',
                                                        error: !!errors.expirationDate,
                                                        helperText: errors?.expirationDate?.message,
                                                    },
                                                }}
                                            />
                                        );
                                    }}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl fullWidth className='flex-1'>
                            <FormLabel className='text-black  text-sm font-medium textPoppins mb-2'>CVV<span className='text-red-500'>*</span></FormLabel>
                            <Controller
                                control={control}
                                name="cvv"
                                rules={{
                                    required: "CVV is required",
                                    maxLength: 4,
                                    pattern: {
                                        value: /\b\d{3}\b/,
                                        message: "Invalid CVV",
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField error={!!errors.cvv} inputProps={{ maxLength: 4 }}
                                        helperText={errors.cvv && errors.cvv.message} {...field} className={`emailInput paymentInputs ${errors.cvv ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} placeholder='Enter CVV' fullWidth />
                                )}
                            />
                        </FormControl>
                        <Stack flexDirection={'row'} className='items-center pb-2'>
                            <Image src={CVVImg} height={22} width={22} alt='cvv' />
                            <Typography className='text-black textPoppins text-[13px] pl-2'>
                                3-4 Digit Number on your card
                            </Typography>
                        </Stack>
                    </Stack>
                </Card>
            </Box>
            <Box className='mt-10'>
                <Box className="inner-subtitle mb-5">
                    <Typography variant='h3'> Billing and Contact Information</Typography>
                    <Typography>   As per bank records or credit card company</Typography>
                </Box>

                <Card className='shadow-none p-6'>
                    <FormControl fullWidth>
                        <FormLabel className='text-black  text-sm font-medium textPoppins mb-2'>Address<span className='text-red-500'>*</span></FormLabel>
                        <Controller
                            control={control}
                            name="address"
                            rules={{
                                required: "Address is required",
                                maxLength: 100,
                                pattern: {
                                    value: /^[a-zA-Z0-9\s,.'-]+$/,
                                    message: "Invalid address format",
                                }
                            }}
                            render={({ field }) => (
                                <TextField error={!!errors.address}
                                    helperText={errors.address && errors.address.message} {...field} className={`emailInput paymentInputs ${errors.address ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} placeholder='Enter your address' fullWidth />
                            )}
                        />
                    </FormControl>
                    <Stack direction={'row'} className='mt-6' spacing={3}>
                        <FormControl fullWidth>
                            <FormLabel className='text-black  text-sm font-medium textPoppins mb-2'>Country Code<span className='text-red-500'>*</span></FormLabel>
                            <Controller
                                control={control}
                                name="countryCode"
                                defaultValue='us'
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className={` paymentSelectBox rounded-full border-0  ${errors.countryCode ? "ring-1 ring-red-500 border-0 ring-inset" : "ring-1  ring-[#0A557F30] ring-inset"}`}
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        // value={countryCode}
                                        inputProps={{
                                            MenuProps: {
                                                className: 'select-MuiList',
                                                disableScrollLock: true,
                                                style: {
                                                    maxHeight: 400,
                                                },
                                            },
                                        }}
                                        // onChange={handleCountryCodeChange}
                                        autoWidth
                                        label="CountryCode"
                                    >
                                        {countryList?.map((item: any) => (
                                            <MenuItem className='textPoppins ' key={item.countryCode} value={item.countryCode}>
                                                <Image src={`${process.env.tscdn_path}/cdn/images/flags/4x3/${item.countryCode}.svg`} height={20} width={20} alt='country' /> <span className='pl-1'>{item.phoneCode} {item.countryName}</span>
                                            </MenuItem>
                                        ))}

                                    </Select>
                                )}
                            />
                        </FormControl>


                        <FormControl fullWidth>
                            <FormLabel className='text-black  text-sm font-medium textPoppinss mb-2'>State<span className='text-red-500'>*</span></FormLabel>
                            <Controller
                                control={control}
                                name="state"
                                defaultValue='AK'
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        className={`border-0 paymentSelectBox rounded-full ${errors.state ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`}
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        // value={states}
                                        inputProps={{
                                            MenuProps: {
                                                className: 'select-MuiList',
                                                disableScrollLock: true,
                                                style: {
                                                    maxHeight: 400,
                                                },
                                            },
                                        }}
                                        // onChange={handleStateChange}
                                        autoWidth
                                        label="state"
                                        placeholder='Select state'
                                    >
                                        {stateList?.map((item: any) => (
                                            <MenuItem className='textPoppins ' key={item.stateCode} value={item.stateCode}>
                                                {item.stateName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Stack>
                    <Stack direction={'row'} spacing={2} className='mt-5 mb-2'>
                        <FormControl fullWidth>
                            <FormLabel className='text-black  text-sm font-medium textPoppins mb-2'>City/Town<span className='text-red-500'>*</span></FormLabel>
                            <Controller
                                control={control}
                                name="city"
                                rules={{
                                    required: "City is required",
                                    maxLength: 20,
                                    pattern: {
                                        value: /^[a-zA-Z]+$/,
                                        message: "Invalid city",
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField error={!!errors.city} inputProps={{ maxLength: 20 }}
                                        helperText={errors.city && errors.city.message} {...field} className={`emailInput paymentInputs ${errors.city ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} placeholder='Enter your city/town' fullWidth />
                                )}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel className='text-black  text-sm font-medium textPoppins mb-2'>Postal/Zip code<span className='text-red-500'>*</span></FormLabel>
                            <Controller
                                control={control}
                                name="postalCode"
                                rules={{
                                    required: "Postal code is required",
                                    maxLength: 13,
                                    pattern: {
                                        value: /^\d{5}[-\s]?(?:\d{4})?$/gm,
                                        message: "Invalid postal code ",
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField error={!!errors.postalCode} inputProps={{ maxLength: 13 }}
                                        helperText={errors.postalCode && errors.postalCode.message} {...field} className={`emailInput paymentInputs ${errors.postalCode ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} placeholder='Enter your postal code ' fullWidth />
                                )}
                            />
                        </FormControl>
                    </Stack>
                </Card>
                <Box className='mt-10'>
                    <Box className="inner-subtitle mb-5">
                        <Typography variant='h3'> Review Trip Details</Typography>
                        <Typography> Please confirm <span className='text-[#F27502]'>Date & Time</span> of flights and <span className='text-[#F27502]'>Name of Travelers</span> are accurate.</Typography>
                    </Box>


                    <Card className='shadow-none p-6'>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Stack direction={'row'} className='items-center' spacing={2}>
                                    <Box className='bg-[#0A557F] rounded-full h-[35px] w-[35px] flex justify-center items-center'>
                                        <FaRegUser color='#FFFFFF' />
                                    </Box>
                                    <Box>
                                        <Typography className='text-sm '>Primary Passenger</Typography>
                                        <Typography variant='h4' className='text-base font-medium'>{formData.firstAndMiddleName ?? "-"}</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid item xs={4} className='flex items-center justify-center'>
                                <Typography variant='h4' className='text-base font-medium'>{formData.gender === GenderType.MR ? 'Male' : 'Female'}</Typography>
                            </Grid>

                            <Grid item xs={4} className='flex items-center justify-end'>
                                <Button onClick={goToFirstForm} variant='outlined' color='primary' className='text-[#0A557F] font-normal text-sm border-solid border-[1px] border-[#CEDEE99E] capitalize'>Make Changes</Button>
                            </Grid>
                        </Grid>
                        {/* <Box className="mt-4">
                            <Box className="flex border-solid border border-slate-200 rounded-md p-4">
                                <Box className='listingFlightInfo flex gap-2 items-center w-1/4' >
                                    <Box className='w-24 h-14 relative border-solid border border-slate-200 rounded-md p-4 mr-2 overflow-hidden'>
                                        <Image src={`${process.env.cdn_path}/DL.png`} alt='' fill sizes='auto' className='object-contain aspect-auto' />
                                    </Box>
                                    <Box>
                                        <Typography variant='h5' className='font-medium text-base leading-tight text-black truncate '>Air India</Typography>
                                        <Typography className='font-medium text-sm leading-tight text-[#323232] mt-1'>6E-5045</Typography>
                                    </Box>
                                </Box>
                                <Box className="listingTimingOptionOuter flex grow  flex-col gap-2 w-3/4">
                                    <Box className=" flex items-center justify-between grow  ">
                                        <Box className="flightTimeDestination text-center">
                                            <Typography variant='h3' className='text-lg '>07:10   <span>pm</span></Typography>
                                            <Typography className='font-medium text-sm '>BOM</Typography>
                                        </Box>
                                        <Box className="listingFlightsTimeline">
                                            <Typography className='font-normal text-sm'>12h 15</Typography>
                                            <div className='timelineDivider'>
                                                <Image src='/images/listing/el_plane.svg' alt='' width={16} height={16} />
                                            </div>
                                            <Typography className='font-normal text-sm'>Non stop</Typography>
                                        </Box>
                                        <Box className="flightTimeDestination text-center">
                                            <Typography variant='h3'>07:10 <span>pm</span></Typography>
                                            <Typography className='font-medium text-sm'>HYD</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box> */}
                    </Card>
                </Box>

            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    type='submit'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button type='submit' endIcon={<MdKeyboardArrowRight />} className='capitalize payment-step-btn textPoppins font-medium text-base' variant='contained' color='secondary' >
                    {activeStep === steps.length - 1 ? 'Make Payment' : 'Continue to next'}
                </Button>
            </Box>
        </form>
    );
};

export default PaymentForm;
