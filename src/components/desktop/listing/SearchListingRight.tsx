import { Box, Button, Card, Collapse, Skeleton, Stack, Typography } from '@mui/material'
import React, { FC, useState, useEffect } from 'react'
import FlightMatrix from './FlightMatrix'
import ShortFilter from './ShortFilter'
import { LoadingButton } from '@mui/lab'
import { BiSolidChevronDownCircle } from "react-icons/bi";
import TripItemCard from './TripItemCard'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import TripDetailsCard from './TripDetailsCard'
import { blGetSearchResult } from '@/businesslogic/blSearchWidget'


const SearchListingRight = () => {

    const [contractsList, setContractsList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isMoreResult, setisMoreResult] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        blGetSearchResult(setContractsList, setIsLoading, setisMoreResult, page)
    }, [page]);


    const [openCollapses, setOpenCollapses] = useState<string | null>(null);

    const handleFlightDetails = (contractID: string) => {
        setOpenCollapses((prev) => (prev === contractID ? null : contractID));
    };


    return (
        <Box>

            <Box className="mt-3">

                {contractsList && contractsList.length > 0 ? (
                    contractsList?.map((contract: any) => (
                        <Card className='FlightslistingItem mb-3' key={contract.ContractID} sx={{ boxShadow: '0px 0px 9px 0px #042F7112' }}>
                            <Box className="flex items-center p-3 ">
                                <Box className="w-3/4">
                                    {
                                        contract.ListofTrips.map((trip: any) => (
                                            <div className='listItemTrips' key={trip.BoundType}>
                                                {
                                                    trip.ListofFlights.length > 0 && (
                                                        <TripItemCard
                                                            originCityName={trip.ListofFlights[0].Origin}
                                                            DepartureTime={trip.ListofFlights[0].DepartureTime}
                                                            destinationCityName={
                                                                trip.ListofFlights.length > 1
                                                                    ? trip.ListofFlights[trip.ListofFlights.length - 1].Destination
                                                                    : trip.ListofFlights[0].Destination
                                                            }
                                                            ArrivalTime={
                                                                trip.ListofFlights.length > 1
                                                                    ? trip.ListofFlights[trip.ListofFlights.length - 1].ArrivalTime
                                                                    : trip.ListofFlights[0].ArrivalTime
                                                            }
                                                            flight={trip.ListofFlights[0]} trip={trip} contract={contract} />
                                                    )
                                                }

                                            </div>
                                        ))
                                    }
                                </Box>
                                <Box className='listingFlightRight justify-end flex items-center w-1/4' >
                                    <Box className="text-right mr-8">
                                        <Typography variant='h2'>${contract.AveragePrice}</Typography>
                                        <Typography className='text-xs font-normal text-[#676977] '>All tax inclusive</Typography>
                                    </Box>
                                    <Box className="relative">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className='capitalize textPoppins font-normal text-base'
                                            endIcon={<> {
                                                openCollapses === contract.ContractID ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />
                                            }</>}
                                            onClick={() => handleFlightDetails(contract.ContractID)}
                                            disableRipple
                                        >Select</Button>
                                        {
                                            contract.SeatRemaining < 5 && (
                                                <Box className="seatLeftCount">{(`< ${contract.SeatRemaining} left`)}</Box>
                                            )
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            <Collapse in={openCollapses === contract.ContractID}  >
                                <Box className='flightDetailsCollapse'>
                                    <TripDetailsCard contract={contract} />
                                </Box>
                            </Collapse>
                        </Card>
                    ))
                ) : (
                    [...Array(10)].map((_, index) => (
                        <Card key={index} className='FlightslistingItem mt-3  mb-2'>
                            <Box className="gap-12 flex px-4 py-2 justify-between">
                                <Box className='listingFlightInfo flex gap-2 items-center' >
                                    <Box className='listingFlightImg'>
                                        <Skeleton variant="rounded" width={40} height={40} />
                                    </Box>
                                    <Skeleton width={50} variant="text" sx={{ fontSize: '1rem' }} />
                                </Box>
                                <Box className="listingTimingOptionOuter flex items-center justify-between grow  ">
                                    <Box className="flightTimeDestination text-center">
                                        <Stack direction='row'>

                                            <Skeleton className='mr-2' width={50} variant="text" sx={{ fontSize: '1rem' }} />

                                            <Skeleton width={10} variant="text" sx={{ fontSize: '0.5rem' }} />
                                        </Stack>
                                        <Skeleton className='inline-block' width={30} variant="text" sx={{ fontSize: '1rem' }} />
                                    </Box>
                                    <Box className="listingFlightsTimeline items-center">
                                        <Skeleton width={60} variant="text" sx={{ fontSize: '1rem' }} />
                                        <div className='timelineDivider'>
                                        </div>
                                        <Skeleton width={80} variant="text" sx={{ fontSize: '1rem' }} />
                                    </Box>
                                    <Box className="flightTimeDestination text-center">
                                        <Stack direction='row'>

                                            <Skeleton className='mr-2' width={50} variant="text" sx={{ fontSize: '1rem' }} />

                                            <Skeleton width={10} variant="text" sx={{ fontSize: '0.5rem' }} />
                                        </Stack>
                                        <Skeleton className='inline-block' width={30} variant="text" sx={{ fontSize: '1rem' }} />
                                    </Box>
                                </Box>
                                <Box className='listingFlightRight flex items-center' >
                                    <Box className="text-center mr-8">
                                        <Skeleton width={70} variant="text" sx={{ fontSize: '1rem' }} />
                                        <Skeleton className='inline-block' width={50} variant="text" sx={{ fontSize: '1rem' }} />
                                    </Box>
                                    <Skeleton className='rounded-full' variant="rounded" width={120} height={40} />
                                </Box>
                            </Box>
                        </Card>
                    ))
                )}
            </Box>
            {isMoreResult && (
                <Stack justifyContent="center" alignItems="center" className="mt-8">
                    <LoadingButton
                        onClick={() => {
                            setIsLoading(true);
                            setPage(prev => prev + 1);
                        }}
                        loading={isLoading}
                        variant='contained'
                        color='secondary'
                        sx={{ textTransform: 'capitalize' }}
                        endIcon={<BiSolidChevronDownCircle />}>Load More Flights</LoadingButton>
                </Stack>
            )}

        </Box >
    )
}

export default SearchListingRight