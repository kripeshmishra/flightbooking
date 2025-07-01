"use client"
import React, { useState } from 'react'
import { Box, Container, Step, Stepper, StepLabel, Typography, Button, Grid, Card, Stack, Divider, Accordion, AccordionSummary, AccordionDetails, FormControl, TextField, InputAdornment } from '@mui/material'
import OptionalsForm from './OptionalsForm';
import PaymentForm from './PaymentForm';
import ContactInfo from './ContactInfo';
import Image from 'next/image';
import flightBg from '../../../../public/images/payment/flightbg.png'
import arrow from '../../../../public/images/payment/arrow.png'
import Takeoff1 from '../../../../public/images/payment/takeoff1.svg'
import Takeoff2 from '../../../../public/images/payment/takeoff2.svg'
import Tag from '../../../../public/images/payment/tag.svg'
import { Controller, useForm } from 'react-hook-form';
import { IoIosArrowDown } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { usePaymentContext } from '@/components/context/PaymentPageContext';


type FormValues = {
    email: string,
}


const DesktopPaymentSteps = () => {
    const {
        steps,
        activeStep
    } = usePaymentContext();

    const { control, handleSubmit, setValue, getValues, trigger, formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        const emailData = {
            email: data.email,
        };
        console.log(emailData)
    };




    return (

        <>
            <Box className="bg-white pb-7 pt-9">
                <Container maxWidth="lg">
                    <Grid container spacing={0} justifyContent='center'>
                        <Grid xs={8}>
                            <Stepper activeStep={activeStep} alternativeLabel className="multiStepButtons">
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box className="sectionGap75 ">
                <Container maxWidth="lg">
                    <Grid container columnSpacing={4} mt={0}>
                        <Grid item xs={12} md={8} >
                            {activeStep === 0 && (
                                <ContactInfo />
                            )}
                            {activeStep === 1 && (
                                <OptionalsForm />
                            )}
                            {activeStep === 2 && (
                                <PaymentForm />
                            )}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box>

                                <Typography variant='h3'  >Flight Information</Typography>
                                <Card className='mt-3 rounded-t-lg shadow-none'>
                                    <Box className='relative flex justify-center items-center '>

                                        <Image src={flightBg} height={120} width={200} alt='flightbg' className='w-full rounded-t-lg bg-[#023256]' />
                                        <Box className='absolute top-6'>
                                            <Stack direction='row' className='justify-center items-center' spacing={2}>
                                                <Typography variant='h3' className='text-white text-[25px] font-medium '>LAS</Typography>
                                                <Box className='border-[1px] border-[#0A557F] border-solid flex items-center justify-center h-[40px] w-[40px] rounded-[50px]'>

                                                    <Image src={arrow} height={20} width={20} alt='arrow' />
                                                </Box>
                                                <Typography variant='h3' className='text-white text-[25px] font-medium '>LAS</Typography>
                                            </Stack>
                                            <Typography className='text-white text-sm mt-3'>12 Feb - 15 Feb | 1 Adult | Economy</Typography>
                                        </Box>
                                    </Box>
                                    <Box className='p-4'>
                                        <Box className='divide-y'>
                                            <Stack direction='row' className='justify-between items-center '>
                                                <Stack direction='row' className='items-center' spacing={1}>
                                                    <Box>
                                                        <Image src={Takeoff1} height={25} width={25} alt='takeoff' />
                                                    </Box>
                                                    <Typography variant='h4' className=''>
                                                        Mon, 02/12
                                                    </Typography>
                                                </Stack>
                                                <Typography className='text-sm'>
                                                    01h 10m, Non-Stop
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' className='justify-between items-center mt-2'>
                                                <Typography className='text-[#000000] textPoppins text-sm'>
                                                    Las Vegas (LAS)
                                                </Typography>
                                                <Typography className='mt-0 text-sm textPoppins'>
                                                    08:55 PM
                                                </Typography>

                                            </Stack>
                                            <Stack direction='row' className='justify-between items-center mt-2'>
                                                <Typography className='text-[#000000] textPoppins text-sm'>
                                                    Las Vegas (LAS)
                                                </Typography>
                                                <Typography className='mt-0 text-sm textPoppins'>
                                                    08:55 PM
                                                </Typography>

                                            </Stack>
                                        </Box>
                                        <Divider className='my-4' />
                                        <Box className=''>
                                            <Stack direction='row' className='justify-between items-center '>
                                                <Stack direction='row' className='items-center' spacing={1}>
                                                    <Box>
                                                        <Image src={Takeoff2} height={25} width={25} alt='takeoff' />
                                                    </Box>
                                                    <Typography variant='h4'>
                                                        Mon, 02/12
                                                    </Typography>
                                                </Stack>
                                                <Typography className='text-sm'>
                                                    01h 10m, Non-Stop
                                                </Typography>
                                            </Stack>
                                            <Stack direction='row' className='justify-between items-center mt-2'>
                                                <Typography className='text-[#000000] textPoppins text-sm'>
                                                    Las Vegas (LAS)
                                                </Typography>
                                                <Typography className='mt-0 text-sm textPoppins'>
                                                    08:55 PM
                                                </Typography>

                                            </Stack>
                                            <Stack direction='row' className='justify-between items-center mt-2'>
                                                <Typography className='text-[#000000] textPoppins text-sm'>
                                                    Las Vegas (LAS)
                                                </Typography>
                                                <Typography className='mt-0 text-sm textPoppins'>
                                                    08:55 PM
                                                </Typography>

                                            </Stack>
                                        </Box>

                                    </Box>
                                </Card>
                            </Box>
                            <Box className='mt-10'>
                                <Typography variant='h3' >Price Details</Typography>
                                <Card className='mt-3 shadow-none'>
                                    <Box className='p-4'>
                                        <Stack direction='row' className='justify-between items-center'>
                                            <Typography className='text-[#000000] textPoppins text-[15px]'>
                                                ADULT (1 X $512.96)
                                            </Typography>
                                            <Typography className='mt-0 text-sm textPoppins'>
                                                $512.<sup>96</sup>
                                            </Typography>
                                        </Stack>
                                        <Stack direction='row' className='justify-between items-center mt-2'>
                                            <Typography className='text-[#000000] textPoppins text-[15px]'>
                                                Service Fee
                                            </Typography>
                                            <Typography className='mt-0 text-sm textPoppins'>
                                                $10.<sup>00</sup>
                                            </Typography>
                                        </Stack>
                                        <Stack direction='row' className='bg-[#EAF4FA] mt-3 p-2 rounded-lg items-center justify-between'>
                                            <Typography className='text-base text-[#0A557F] font-medium textPoppins'>
                                                Total Price (USD)
                                            </Typography>
                                            <Typography className='mt-0 text-[#003053] font-semibold text-base textPoppins'>
                                                $522.96
                                            </Typography>

                                        </Stack>
                                        <Box className=''>
                                            <Typography className='text-sm text-[#676977] mt-3 font-normal'>
                                                <span className='text-[#F27502]'>Note:</span>   All fares are quoted in USD. Additional <span className='text-[#00BDBB]'>Baggage Fees</span> may apply as per the airline policies. Your Credit/Debit card may be billed in multiple charges totalling the final total price.
                                            </Typography>

                                        </Box>
                                        <Box className='border-b-[2px] py-2 mt-3 border-t-[2px] border-r-0 border-l-0 border-[#CEDEE9] border-dashed'>
                                            <Accordion className='shadow-none payment-accordion'>
                                                <AccordionSummary
                                                    className=' p-0'
                                                    expandIcon={<IoIosArrowDown />}
                                                    aria-controls="panel1-content"
                                                    id="panel1-header"
                                                >
                                                    <Stack direction={'row'} className='' spacing={1}>
                                                        <Image src={Tag} height={20} width={20} alt='tag' />

                                                        <Typography variant='h4' className='font-normal text-sm'>Enter promo code or gift card number</Typography>
                                                    </Stack>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <form onSubmit={handleSubmit(onSubmit)}>


                                                        <Stack direction={'row'} className='relative items-center'>

                                                            <FormControl fullWidth>
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
                                                                        <TextField  {...field} className={`emailInput paymentInputs ${errors.email ? "ring-1 ring-red-500 ring-inset" : "ring-1 ring-[#0A557F30] ring-inset"}`} placeholder='Enter Email ID *' fullWidth />
                                                                    )}
                                                                />

                                                            </FormControl>
                                                            <Button type='submit' variant='contained' color='primary' className='capitalize absolute p-0 h-[33px] right-[4px] text-base '>
                                                                Apply
                                                            </Button>

                                                        </Stack>
                                                    </form>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Box>
                                    </Box>

                                </Card>
                            </Box>

                        </Grid>
                    </Grid>

                </Container>
            </Box>

        </>
    )
}

export default DesktopPaymentSteps