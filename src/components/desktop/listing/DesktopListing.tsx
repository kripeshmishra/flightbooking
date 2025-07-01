"use client"
import React, { useEffect, useState } from 'react'
import TopSearchFilter from './TopSearchFilter'
import { Box, Container, Grid, Typography } from '@mui/material'
import SidebarFilter from './SidebarFilter'
import SearchListingRight from './SearchListingRight'
import FlightMatrix from './FlightMatrix'
import ShortFilter from './ShortFilter'

const DesktopListing = () => {

    return (
        <>
            <Box className="bg-lightgrey">
                <TopSearchFilter />
                <Box className="py-12">
                    <Container maxWidth="xl">
                        <Grid container spacing={4}>
                            <Grid item xs={3} >
                                <SidebarFilter />
                            </Grid>
                            <Grid item xs={9} sx={{ pl: `50px !important` }}>
                                <FlightMatrix />
                                <Box className="mt-3">
                                    <ShortFilter />
                                </Box>
                                <SearchListingRight />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    )
}

export default DesktopListing