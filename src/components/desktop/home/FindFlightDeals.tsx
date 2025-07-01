import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { FaExchangeAlt } from "react-icons/fa";
import Link from 'next/link';


const FindFlightDeals = () => {
    return (
        <Box className='sectionGap75'>
            <Container maxWidth='lg'>
                <Box sx={{ textAlign: 'center', marginBottom: '40px' }} className='sectionTitle'>
                    <Typography variant='h2'>Find flights the airlines don’t want you to see.</Typography>
                    <Typography>We’re exposing loopholes in airfare pricing to save you money.</Typography>
                </Box>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box className='findDealLeftTopBox imageGradientEffect'>
                            <Link href='/'>
                                <Box className='findDealLeftTopImage '>
                                    <Image
                                        fill
                                        placeholder="blur"
                                        blurDataURL='/images/home/deal1.png'
                                        src='/images/home/deal1.png'
                                        alt='title'
                                        sizes='auto'
                                    />
                                </Box>
                                <Box className='findDealLeftTopContent'>
                                    <Box className='dealFromTo'>
                                        <Typography variant='h3'>London</Typography>
                                        <FaExchangeAlt />
                                        <Typography variant='h3'>Newyork</Typography>
                                    </Box>
                                    <Typography>Tickets from 30,246 ₹</Typography>
                                    <Button variant='outlined' color='primary'>Discover a Deal</Button>
                                </Box>
                            </Link>
                        </Box>
                        <Box>
                            <Grid container spacing={4}>
                                <Grid item xs={6} >
                                    <Box className='findDealLeftBottomBox'>
                                        <Link href='/'>
                                            <Box className='findDealLeftBottomImage imageGradientEffect'>
                                                <Image
                                                    fill
                                                    placeholder="blur"
                                                    blurDataURL='/images/home/deal2.png'
                                                    src='/images/home/deal2.png'
                                                    alt='title'
                                                    sizes='auto'

                                                />
                                                <Box className='findDealLeftBottomContent'>
                                                    <Typography variant='h3'>Chandigarh to Delhi</Typography>
                                                    <Typography>Tickets from 30,246 ₹</Typography>
                                                </Box>
                                            </Box>
                                            <Box className='newbadge'>New</Box>
                                        </Link>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} >
                                    <Box className='findDealLeftBottomBox'>
                                        <Link href='/'>
                                            <Box className='findDealLeftBottomImage imageGradientEffect'>
                                                <Image
                                                    fill
                                                    placeholder="blur"
                                                    blurDataURL='/images/home/deal3.png'
                                                    src='/images/home/deal3.png'
                                                    alt='title'
                                                    sizes='auto'
                                                />
                                                <Box className='findDealLeftBottomContent'>
                                                    <Typography variant='h3'>London to Maldives</Typography>
                                                    <Typography>Tickets from 30,246 ₹</Typography>
                                                </Box>
                                            </Box>
                                            <Box className='newbadge'>New</Box>
                                        </Link>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box className='findDealSummerDestination'>
                            <Typography variant='h2'>Super savings to <Box></Box> summer destinations</Typography>
                            <Typography>Check out our cheap flights to some amazing places! Search and book a trip today to make your summer extra special</Typography>
                            <Button variant='contained' color='secondary'>See Deals</Button>
                        </Box>
                        <Box>
                            <Grid container spacing={4}>
                                <Grid item xs={6} >
                                    <Box className='findDealLeftBottomBox findDealRightBottomLeftBox'>
                                        <Link href='/'>
                                            <Box className='findDealLeftBottomImage imageGradientEffect'>
                                                <Image
                                                    fill
                                                    placeholder="blur"
                                                    blurDataURL='/images/home/deal4.png'
                                                    src='/images/home/deal4.png'
                                                    alt='title'
                                                    sizes='auto'
                                                />
                                                <Box className='findDealLeftBottomContent'>
                                                    <Typography variant='h3'>Delhi to Peru</Typography>
                                                    <Typography>Tickets from 30,246 ₹</Typography>
                                                </Box>
                                                <Box className='offeerBadgeOne'>25% Off</Box>
                                            </Box>
                                        </Link>
                                    </Box>
                                </Grid>
                                <Grid item xs={6} >
                                    <Box className='findDealLeftBottomBox findDealRightBottomLeftBox findDealRightBottomRightBox'>
                                        <Link href='/'>
                                            <Box className='findDealLeftBottomImage imageGradientEffect'>
                                                <Image
                                                    fill
                                                    placeholder="blur"
                                                    blurDataURL='/images/home/deal5.png'
                                                    src='/images/home/deal5.png'
                                                    alt='title'
                                                    sizes='auto'
                                                />
                                                <Box className='findDealLeftBottomContent'>
                                                    <Typography variant='h3'>Dubai to Paris</Typography>
                                                    <Typography>Tickets from 30,246 ₹</Typography>
                                                </Box>
                                                <Box className='offeerBadgetwo'>25% Off</Box>
                                            </Box>
                                        </Link>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    )
}

export default FindFlightDeals