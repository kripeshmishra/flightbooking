'use client'
import { Box, Card, FormControl, FormLabel, Grid, TextField, Typography, Select, MenuItem, InputAdornment, Checkbox, Stack, FormControlLabel, RadioGroup, Radio, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { countryCodes } from '@/staticData/AllStaticData';
import Image from 'next/image';
import DatePicker, { ReactDatePicker } from "react-datepicker";
import useTravelerDetails from '@/businesslogic/useTravelerDetails';
import { SlCalender } from 'react-icons/sl';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { usePaymentContext } from '@/components/context/PaymentPageContext';
import { FiCheck } from 'react-icons/fi';
import { GenderType, GenderTypeLabel } from '@/utilty/Enums';

type FormValues = {
    dateOfBirth: any
    contact: string,
    contactCode: string,
    email: string,
    gender: string,
    firstAndMiddleName: string,
    lastName: string
}

const ContactInfo = () => {




    const { handleNext, handleBack, paymentDetails, formData, setFormData, activeStep, steps, useScrollToTop, countryList, } = usePaymentContext();
    //*Scroll to top
    useScrollToTop();

    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormValues>({ defaultValues: formData });
    const { handleCountryCodeChange, countryCode } = useTravelerDetails();

    useEffect(() => {
        setValue('dateOfBirth', formData?.DOB);
    }, [formData.DOB]);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);

    const onSubmit = (data: FormValues) => {
        const formFields = {
            contact: data.contact,
            DOB: new Date(data.dateOfBirth),
            countryCodes: countryCode,
            email: data.email,
            gender: data.gender,
            firstAndMiddleName: data.firstAndMiddleName,
            lastName: data.lastName,
        };
        setFormData(formFields)
        handleNext();
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="inner-subtitle mb-5">
                    <Typography variant='h3'>Contact Information</Typography>
                    <Typography>Your ticket and flight info will be sent here</Typography>
                </Box>
                <Card className='p-5 shadow-none'>
                    <Grid container spacing={0} mt={0}>
                        <Grid item xs={12} md={12}>
                            <Grid container columnSpacing={3} mt={0}>
                                <Grid item xs={12} md={6} >
                                    <FormControl fullWidth>
                                        <FormLabel className='text-[#000000] text-sm font-medium textPoppins mb-2'>Mobile Number</FormLabel>
                                        <Controller
                                            control={control}
                                            name="contact"
                                            rules={{
                                                required: "Contact is required",
                                                maxLength: 10,
                                                pattern: {
                                                    value: /\d{10}/,
                                                    message: "Invalid contact number",
                                                }
                                            }}
                                            render={({ field }) => (
                                                <TextField {...field} inputProps={{
                                                    maxLength: 10,
                                                }} InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <FormControl sx={{ m: 1, minWidth: 100 }}>
                                                                <Controller
                                                                    control={control}
                                                                    name="contactCode"
                                                                    defaultValue="+93"
                                                                    render={({ field }) => (
                                                                        <Select
                                                                            {...field}
                                                                            className={`border-0 h-[20px] countrySelect`}
                                                                            labelId="demo-simple-select-autowidth-label"
                                                                            id="demo-simple-select-autowidth"
                                                                            inputProps={{
                                                                                IconComponent: () => null,
                                                                                MenuProps: {
                                                                                    className: 'select-MuiList',
                                                                                    disableScrollLock: true,
                                                                                    style: {
                                                                                        maxHeight: 400,
                                                                                    },
                                                                                },
                                                                            }}
                                                                            onChange={handleCountryCodeChange}
                                                                            autoWidth
                                                                            label="Age"
                                                                        >
                                                                            {countryList?.map((item: any) => (
                                                                                <MenuItem className='textPoppins ' key={item.phoneCode} value={item.phoneCode}>
                                                                                    <Image src={`${process.env.tscdn_path}/cdn/images/flags/4x3/${item.countryCode}.svg`} height={20} width={20} alt='country' /> <span className='pl-1'>{item.phoneCode}</span>
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    )}
                                                                />
                                                            </FormControl>
                                                        </InputAdornment>
                                                    ),
                                                }} placeholder='Enter your contact number...' error={!!errors.contact}
                                                    helperText={errors.contact && errors.contact.message} className={`contactInput paymentInputs ${errors.contact ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} fullWidth />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <FormLabel className='text-[#000000] text-sm font-medium textPoppins mb-2'>Email ID</FormLabel>
                                        <Controller
                                            control={control}
                                            name="email"
                                            rules={{
                                                required: "Email is required",
                                                maxLength: 50,
                                                pattern: {
                                                    value: /^(([^<>()[\]\\.+='`~%/|!#?$^&*,;:\s@"_-]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Invalid email address",
                                                }
                                            }}
                                            render={({ field }) => (
                                                <TextField error={!!errors.email}
                                                    helperText={errors.email && errors.email.message} {...field} className={`emailInput paymentInputs ${errors.email ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} placeholder='Enter Email ID *' fullWidth />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Stack direction='row' spacing={1} className='items-center mt-6'>
                                <Checkbox size="small" defaultChecked
                                    disableRipple
                                    icon={<span className="uncheckedWrapper"></span>}
                                    checkedIcon={<span className="checkedWrapper"><FiCheck /></span>}
                                />
                                <Typography className='textPoppins text-black text-sm font-normal'>Update me on order status, news and exclusive offers via sms, rcs, whatsapp and email</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Card>
                <Box className="inner-subtitle mb-5 mt-10">
                    <Typography variant='h3'>Traveler Information</Typography>
                    <Typography><span className='text-[#F27502] font-medium text-sm '>Important!</span> All names and dates of birth must match each traveler's passport or government issued photo ID.</Typography>
                </Box>
                <Card className='px-5 pt-5 pb-8 overflow-visible shadow-none'>
                    <FormControl className='mb-4'>
                        <Controller
                            control={control}
                            name="gender"
                            rules={{
                                required: "Please select a gender",
                            }}
                            render={({ field }) => (
                                <RadioGroup {...field} row
                                    onChange={(e) => {
                                        field.onChange(e);
                                    }} >
                                    {
                                        [...GenderTypeLabel.entries()].map(
                                            ([value, label]: [string, number], index) =>
                                                <FormControlLabel
                                                    key={index}
                                                    value={value}
                                                    control={<Radio disableRipple />}
                                                    label={label}
                                                />
                                        )
                                    }
                                </RadioGroup>
                            )}
                        />
                    </FormControl>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={12} md={4}>
                            <FormControl className='w-full'>
                                <FormLabel className='text-[#000000] text-sm font-medium textPoppins mb-2'>First name & middle name <span className='text-red-600'>*</span></FormLabel>
                                <Controller
                                    control={control}
                                    name="firstAndMiddleName"
                                    rules={{
                                        required: 'Please enter your name.',
                                        minLength: {
                                            value: 2,
                                            message: "Min 2 characters",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Max length is 50",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z]+(?: [a-zA-Z]+)?$/,
                                            message:
                                                "Please enter a valid name",
                                        }
                                    }}
                                    render={({ field }) => (
                                        <TextField {...field} error={!!errors.firstAndMiddleName}
                                            helperText={errors.firstAndMiddleName && errors.firstAndMiddleName.message} id="outlined-basic" placeholder='Enter name' variant="outlined" className={` travelerDetailsInput paymentInputs  ${errors.firstAndMiddleName ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} />
                                    )}
                                />

                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl className='w-full'>
                                <FormLabel className='text-[#000000] text-sm font-medium textPoppins mb-2'>Last Name <span className='text-red-600'>*</span></FormLabel>
                                <Controller
                                    control={control}
                                    name="lastName"
                                    rules={{
                                        required: 'Please enter your last name.',
                                        minLength: {
                                            value: 2,
                                            message: "Min length is 2",
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: "Max length is 50",
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z]+$/,
                                            message: "Please enter a valid name",
                                        }
                                    }}
                                    render={({ field }) => (
                                        <TextField {...field} error={!!errors.lastName}
                                            helperText={errors.lastName && errors.lastName.message} id="outlined-basic" placeholder='Last name' variant="outlined" className={`travelerDetailsInput paymentInputs ${errors.lastName ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} />
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl className='w-full'>
                                <FormLabel className='text-[#000000] text-sm font-medium textPoppins mb-2'>Select Date <span className='text-red-600'>*</span></FormLabel>
                                <Box className={`paymentDatepicker  ${errors.dateOfBirth ? "ring-1 ring-red-500 ring-inset border-0" : "ring-1 border-0 ring-[#0A557F30] ring-inset"}`}>
                                    <Controller
                                        name="dateOfBirth"
                                        control={control}
                                        rules={{
                                            required: 'Please select a date.'
                                        }}
                                        render={({
                                            field: { value, onChange }
                                        }) => (
                                            <>

                                                <DatePicker
                                                    onChange={onChange}
                                                    selected={value}
                                                    showIcon
                                                    icon={<SlCalender size={40} />}
                                                    showYearDropdown
                                                    className='relative'
                                                    maxDate={maxDate}
                                                    minDate={minDate}
                                                    popperPlacement="top-end"
                                                    placeholderText='Enter your DOB'
                                                />

                                            </>

                                        )}
                                    />


                                </Box>
                                {errors.dateOfBirth && (
                                    <Typography className='absolute left-3 top-[70px] textPoppins font-medium text-red-500 text-[13px]'>{errors.dateOfBirth.message as any}</Typography>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                </Card>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button type='submit' endIcon={<MdKeyboardArrowRight />} className='capitalize payment-step-btn textPoppins font-medium text-sm' variant='contained' color='secondary' >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Continue to next'}
                    </Button>
                </Box>

            </form>
        </>
    )
}

export default ContactInfo