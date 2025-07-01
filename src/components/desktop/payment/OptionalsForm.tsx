import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    Divider,
    Grid,
    Stack,
    Typography
} from '@mui/material';
import Image from 'next/image';
import BluebagsImg from '../../../../public/images/payment/brb-logo.png'
import Link from 'next/link';
import { IoIosCheckmark } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { usePaymentContext } from '@/components/context/PaymentPageContext';
import { baggageProtectionData, plans } from '@/staticData/AllStaticData';

const SITENAME = process.env.SITE_NAME;
const SITEURL = process.env.SITE_URL;


const OptionalsForm = () => {
    const { handleNext, handleBack, activeStep, selectedPlan, setSelectedPlan, steps, useScrollToTop } = usePaymentContext();

    //*Scroll to top
    useScrollToTop();

    const handleAddToTrip = () => {
        setSelectedPlan({
            ...selectedPlan,
            isAddedToTrip: true,
        });
    };
    const handleRemoveFromTrip = () => {
        setSelectedPlan({
            ...selectedPlan,
            isAddedToTrip: false,
        });
    };

    const handleChoosePlan = (planId: number) => {
        setSelectedPlan({
            ...selectedPlan,
            selectedPlan: planId,
        });
    };

    return (
        <>
            <Box className='mb-4'>
                <Stack className='mb-5' direction="row" alignItems='center'>
                    <Box className="inner-subtitle">
                        <Typography variant='h3'>Lost Baggage Protection</Typography>
                        <Typography>Get compensated in case your baggage is delayed or lost, at just $1000/traveler</Typography>
                    </Box>
                    <Box className="ml-auto text-center border border-slate-300 border-solid p-2 px-3 rounded-md">
                        <Typography variant='h4' className='text-darksecondary text-lg leading-none mb-1'>$5.<sup>00</sup></Typography>
                        <Typography className='text-sm font-normal text-defaultText'>Per Traveler</Typography>
                    </Box>
                </Stack>

                <Card className='p-5 mt-3 shadow-none'>
                    <Grid container spacing={5}>
                        {baggageProtectionData.map((item, index) => (
                            <Grid key={item.id} item xs={4}>
                                <Box className='[box-shadow:0px_4px_4px_2px_#00000005] flex items-center justify-center bg-[#F0F9F8] rounded-md h-[50px] w-[50px]'>
                                    <Image src={item.img} height={25} width={25} alt='img' />
                                </Box>
                                <Box className='mt-4'>
                                    <Typography variant='h4' className='font-medium text-base text-secondary'>
                                        {item.title}
                                    </Typography>
                                    <Typography className='text-base'>
                                        {item.desc}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Stack direction={'row'} className='items-center mt-5 border-b-[2px] py-4  border-t-[2px] border-r-0 border-l-0 border-[#CEDEE9] border-dashed' spacing={2}>
                        <Stack direction={'row'} className='items-center' spacing={2}>
                            <Image src={BluebagsImg} width={60} height={33} alt='bluebags' />
                            <Typography className='text-base leading-tight'>
                                I agree to purchase the Delayed and Lost Baggage Protection service powered by Blue Ribbon Bags, LLC and also to all <span className='text-[#F27502]'>T&Cs</span>  of the service agreement.
                            </Typography>
                        </Stack>
                        {selectedPlan.isAddedToTrip ? (
                            <Button variant='contained' color='primary' className='capitalize min-w-[125px] bg-[#F27502] textPoppins font-medium text-sm text-white' onClick={handleRemoveFromTrip}>
                                Remove
                            </Button>
                        ) : (
                            <Button variant='contained' color='primary' className=' capitalize min-w-[125px] bg-[#F27502] textPoppins font-normal text-sm text-white' onClick={handleAddToTrip}>
                                Add to trip
                            </Button>
                        )}
                    </Stack>
                    <Typography className='mt-3 text-sm textPoppins'>
                        <span className='text-[#F27502] font-semibold'>Disclaimer:</span> "Terms & conditions of Blue Ribbon Bags baggage tracking services are set out at: Service Agreement (<span className='text-[#F27502]'>{SITEURL}</span>). {SITENAME} is not endorsing or making any representation in relation to such services."
                    </Typography>
                </Card>

                <Box className='mt-10'>
                    <Box className="inner-subtitle mb-5">
                        <Typography variant='h3'>Concierge All-In-One Pack</Typography>
                        <Typography>  Becoming a part of FareMaze's Super-Saver Services Package will help you keep your flight experience and pocket happy.</Typography>
                    </Box>
                    <Box className='mt-5'>
                        <Grid container columnSpacing={2}>
                            {plans.map((plan) => (
                                <Grid key={plan.id} item xs={4} >
                                    <Box className={`relative rounded-lg p-5 ${selectedPlan.selectedPlan === plan.id ? 'bg-[#0A557F]' : 'bg-white'} h-full flex flex-col`}>
                                        {
                                            plan?.recommended && (
                                                <Box className='recommendedBadge textPoppins'>
                                                    Recommended
                                                </Box>
                                            )
                                        }

                                        <Box>
                                            <Typography variant='h3' className={`${selectedPlan.selectedPlan === plan.id ? "text-white" : "text-black"} text-base font-medium`}>
                                                {plan.name}
                                            </Typography>

                                            <Divider className={` ${selectedPlan.selectedPlan === plan.id ? 'border-[#FFFFFF2B]' : 'border-[#EEEEEE]'} my-2`} aria-hidden="true" />
                                            <Typography variant='h4' className={`pb-2 font-medium text-sm ${selectedPlan.selectedPlan === plan.id ? "text-white" : "text-black"}`}>
                                                Includes:
                                            </Typography>
                                            <ul className=''>
                                                {plan.includes.map((item, index) => (
                                                    <li className={`py-2 font-normal pl-8 textPoppins relative paymentListItems text-sm ${selectedPlan.selectedPlan === plan.id ? "text-white" : "text-defaultText"}`} key={index}>{item}</li>
                                                ))}
                                            </ul>
                                            <Typography className='mb-4'><Link className={`${selectedPlan.selectedPlan === plan.id ? "text-white" : "text-[#F27502]"}  text-sm pl-1 underline textPoppins font-medium`} href={"#"}>View More Details</Link></Typography>
                                        </Box>
                                        <Box className={`${selectedPlan.selectedPlan === plan.id ? "text-white" : "text-black"} mt-auto text-center`}>
                                            <Typography variant='h3' className={`${selectedPlan.selectedPlan === plan.id ? "text-white" : "text-black"} font-medium text-[30px] textPoppins`}> ${plan.cost}<span className={`font-normal text-base ${selectedPlan.selectedPlan === plan.id ? "text-white" : "text-[#87898A]"}`}>/Person</span></Typography>
                                            {selectedPlan.selectedPlan === plan.id ? (
                                                <Button variant='contained' color='primary' className={`mt-4 h-[42px] min-w-[140px] bg-white text-[#0A557F] capitalize selectedBtn textPoppins text-sm font-medium`} endIcon={<IoIosCheckmark className='text-white' />}>
                                                    Selected
                                                </Button>
                                            ) : (
                                                <Button variant='contained' color='primary' className={`mt-4 h-[42px] min-w-[140px] capitalize textPoppins text-sm font-medium bg-[#EAF4FA] text-[#0A557F]`} onClick={() => handleChoosePlan(plan.id)}>
                                                    Choose Plan
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button type='submit' endIcon={<MdKeyboardArrowRight />} className='capitalize payment-step-btn textPoppins font-medium text-sm' variant='contained' color='secondary' onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Continue to next'}
                </Button>
            </Box>
        </>
    );
}

export default OptionalsForm;
