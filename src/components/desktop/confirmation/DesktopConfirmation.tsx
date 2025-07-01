'use client'
import { usePaymentContext } from '@/components/context/PaymentPageContext';
import { Box, Grid, Container, Typography, Card, Stack, Divider } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import SuccessImg from '../../../../public/images/confirmation/Confirmation.svg'
import PlaneImg from '../../../../public/images/confirmation/plane.svg'
import AirIndiaImg from '../../../../public/images/confirmation/air-india.png'
import ArrowImage from '../../../../public/images/confirmation/arrow.svg'
import moment from 'moment';



const DesktopConfirmation = () => {
    const {
        paymentDetails,
        formData
    } = usePaymentContext();

    console.log(paymentDetails)
    return (
        <Box>
            <Box className="bg-secondary py-12">
                <Container maxWidth="lg">
                    <Box className='flex items-center justify-center'>
                        <Image src={SuccessImg} height={60} width={60} alt='confirmation' />
                    </Box>
                    <Typography variant='h2' className='text-white tracking-wide text-center mt-4 font-Barlow font-medium text-[24px]'>
                        Booking Successful!
                    </Typography>
                </Container>
            </Box>
            <Box className="sectionGap75 bg-[#F0F9F8]">
                <Container maxWidth="lg">

                    <Grid container spacing={4} mt={0}>

                        <Grid item xs={12} md={8}>
                            <Box>
                                <Typography variant='h1' className='font-medium text-[#00BDBB]'>
                                    Dear {formData.firstAndMiddleName},
                                    {/* Dear John Doe, */}
                                </Typography>
                                <Typography className='text-black textPoppins text-sm mt-3'>
                                    Your E-Ticket Will Be Emailed Shortly After Your Credit Card Verification Has Been Completed.
                                    You Will Soon Receive An Email Confirmation With Your E-Ticket.
                                </Typography>
                                <Typography className='text-black textPoppins text-sm'>
                                    <span className='text-[#F27502]'>Note:</span>  We Are Processing Your Reservation And Will Send You Confirmation Once This Has Been Completed And A Ticket Has Been Issued.
                                </Typography>
                            </Box>

                            <Box className='mt-24'>
                                <Typography variant='h3' className='text-lg'>
                                    Customer Details
                                </Typography>
                                <Card className='shadow-none p-6 mt-3'>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Typography className='text-[15px]'>Customer name:</Typography>
                                            <Typography variant='h4' className='text-sm font-normal'>{formData.firstAndMiddleName}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography className='text-[15px]'>Mobile No:</Typography>
                                            <Typography variant='h4' className='text-sm font-normal'>{formData.contact}</Typography>

                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography className='text-[15px]'>Email:</Typography>
                                            <Typography variant='h4' className='text-sm font-normal'>{formData.email}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography className='text-[15px]'>Booked On:</Typography>
                                            <Typography variant='h4' className='text-sm font-normal'>{moment(new Date()).format("DD/MM/YYYY")}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography className='text-[15px]'>Address:</Typography>
                                            <Typography variant='h4' className='text-sm font-normal'>{paymentDetails.address}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>

                                        </Grid>
                                    </Grid>
                                    <Box className='border-[1px] relative mt-8 border-solid border-[#CEDEE9] px-3 py-6 rounded-lg'>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography className='text-[15px]'>Customer name:</Typography>
                                                <Typography variant='h4' className='text-sm font-normal'>{formData.firstAndMiddleName}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography className='text-[15px]'>DOB:</Typography>
                                                <Typography variant='h4' className='text-sm font-normal'>{moment(formData.DOB).format("DD/MM/YYYY")}</Typography>

                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography className='text-[15px]'>Type:</Typography>
                                                <Typography variant='h4' className='text-sm font-normal'>Adult</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography className='text-[15px]'>Gender:</Typography>
                                                <Typography variant='h4' className='text-sm font-normal'>{formData.gender}</Typography>
                                            </Grid>

                                        </Grid>
                                        <span className='px-4 py-1 bg-[#023256] top-[-15px] left-5 absolute textPoppins text-sm font-medium text-white rounded-md' >traveler #1</span>
                                    </Box>
                                </Card>
                                <Box className='mt-10'>
                                    <Typography variant='h3'>
                                        Flight Details
                                    </Typography>
                                    {[...Array(2)].map((_, index) => (
                                        <Box key={index} className='border-[1px] mt-5 rounded-lg min-h-[170px]  border-solid border-[#CEDEE99E]'>
                                            <Grid container spacing={0}>
                                                <Grid item xs={3}>
                                                    <Box className='bg-[#023256]  h-full rounded-l-lg'>
                                                        <Stack direction='column' className='justify-center items-center p-4' spacing={2}>
                                                            <Typography variant='h4' className='text-white font-medium text-[27px]'>07:10 <span className='uppercase font-normal text-[12px]'>pm</span></Typography>
                                                            <Box className='border-[1px] border-solid border-[#FFFFFF3D] rounded-full h-[45px] w-[45px] flex items-center justify-center'>

                                                                <Image src={PlaneImg} height={25} width={25} alt='plane' />
                                                            </Box>
                                                            <Typography variant='h4' className='text-white font-medium text-[27px]'>07:10 <span className='uppercase font-normal text-[12px]'>pm</span></Typography>

                                                        </Stack>

                                                    </Box>
                                                </Grid>
                                                <Grid item xs={9}>
                                                    <Box className='bg-white h-full rounded-r-lg p-5'>
                                                        <Stack direction={'row'} className='text-sm items-center  justify-between py-2' spacing={2} >
                                                            <Box>
                                                                <span className='uppercase text-white textPoppins font-normal text-[13px] rounded-lg px-3 py-1 bg-[#0a557f]'>Departing</span>
                                                            </Box>
                                                            <Box>
                                                                <Typography className='text-[13px] text-[#0A557F] textPoppins font-normal'><span className='pr-2'>Wed, Feb 28 </span>|<span className='pl-2'>Duration 1h 50m</span></Typography>

                                                            </Box>
                                                            <Stack direction='row' spacing={1} className='justify-center items-center'>
                                                                <Image src={AirIndiaImg} height={20} width={30} alt='airline' />
                                                                <Typography variant='h5' className='text-[15px] text-black font-normal'>
                                                                    Air India
                                                                </Typography>
                                                                <Typography className='text-[#323232] text-xs'>
                                                                    6E-5045
                                                                </Typography>
                                                            </Stack>

                                                        </Stack>
                                                        <Divider className='py-2 border-[#CEDEE99E]' />
                                                        <Stack direction={'row'} className='items-center justify-center pt-5' spacing={3}>
                                                            <Box>
                                                                <Typography variant='h4' className='text-[25px] font-semibold'>
                                                                    HKG

                                                                </Typography>
                                                                <Typography className='text-black text-[14px]'>
                                                                    Hong Kong International AirportT1

                                                                </Typography>
                                                            </Box>
                                                            <Box className='bg-[#003053] flex items-center justify-center h-[35px] w-[35px] rounded-full'>
                                                                <Image src={ArrowImage} height={20} width={20} alt='arrows' />
                                                            </Box>
                                                            <Box>
                                                                <Typography variant='h4' className='text-[25px] font-semibold'>
                                                                    HKG

                                                                </Typography>
                                                                <Typography className='text-black text-[14px]'>
                                                                    Hong Kong International AirportT1

                                                                </Typography>
                                                            </Box>

                                                        </Stack>
                                                    </Box>
                                                </Grid>

                                            </Grid>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>

                        </Grid>

                    </Grid>
                </Container>
            </Box>

        </Box>
    )
}

export default DesktopConfirmation