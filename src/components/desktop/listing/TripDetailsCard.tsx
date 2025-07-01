import React, { FC, useState } from 'react'
import { Box, Button, Card, Collapse, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import moment from 'moment';
import { getCabinClass } from '@/utilty/Helper';

interface TripDetailsCardProps {
    contract: any;
}

const TripDetailsCard: FC<TripDetailsCardProps> = ({ contract }) => {

    return (
        <Box key={contract.ContractID}>
            {
                contract.ListofTrips.flatMap((trip: any,) =>
                    trip.ListofFlights.map((flight: any) => (
                        <Box className="flightDetailsCollapseBox" key={flight.FlightNumber}>
                            <Box className="">
                                <Typography className='text-xs font-medium text-black '> Depart {moment(flight.DepartureDateTime).format('ddd')} , {moment(flight.DepartureDateTime).format('MMM D')} </Typography>
                                <Box className="gap-8 flex justify-between my-5">
                                    <Box className='w-52 flex gap-2 items-center' >
                                        <Box className='listingFlightImg'>
                                            <Image src={`${process.env.cdn_path}/${contract.ValidatingCarrier}.png`} alt='' fill sizes='auto' />
                                        </Box>
                                        <Box>
                                            <Typography className="font-medium text-md text-black leading-1 mb-0">{flight.AirlineName}</Typography>
                                            <Box className="font-medium text-xs">Flight :{flight.FlightNumber} </Box>
                                            <Box className="font-medium text-xs">Aircraft  :{flight.EquipmentCode} </Box>
                                        </Box>
                                    </Box>
                                    <Box className='flex items-center'>
                                        <Typography className="font-medium text-xs text-nowrap">  {moment(flight.DepartureDateTime).format('ddd')} , {moment(flight.DepartureDateTime).format('MMM D')} </Typography>
                                    </Box>
                                    <Box className="flex grow  flex-col gap-2">
                                        <Box className=" flex items-center justify-between grow  ">
                                            <Box className=" text-left w-32">
                                                <Typography variant='h3' className='text-base uppercase'>{moment(flight.DepartureTime, 'HH:mm').format('HH:mm')} <span>{moment(flight.DepartureTime, 'HH:mm').format('a')}</span></Typography>
                                                <Typography className='text-sm '>{flight.OriginCityName}, {flight?.Origin}, </Typography>
                                            </Box>
                                            <div className='timelineDivider'>
                                            </div>
                                            <Box className=" text-right w-32">
                                                <Typography variant='h3' className='text-base uppercase'>{moment(flight.ArrivalTime, 'HH:mm').format('HH:mm')} <span>{moment(flight.ArrivalTime, 'HH:mm').format('a')}</span></Typography>
                                                <Typography className=' text-sm'>{flight.DestinationCityName}, {flight?.Destination}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box className='flex items-center'>
                                        <Typography className="font-medium text-xs text-nowrap">  {moment(flight.ArrivalDateTime).format('ddd')} , {moment(flight.ArrivalDateTime).format('MMM D')} </Typography>
                                    </Box>
                                    <Box className='flex items-center pr-2' >
                                        <Box className="text-right">
                                            <Box className="font-medium text-xs text-nowrap"> Cabin :  {getCabinClass(trip?.CabinClass)} </Box>
                                        </Box>

                                    </Box>
                                </Box>
                                <Typography className='text-xs font-medium'>Total Trip Duration: {trip?.TripDuration}</Typography>
                            </Box>

                        </Box>
                    ))
                )
            }
            <Box className="mt-4 flex justify-end">
                <Button variant='contained' color='primary'>Book Now</Button>
            </Box>

        </Box >
    )
}

export default TripDetailsCard