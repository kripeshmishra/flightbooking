import React, { FC } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import moment from 'moment';

interface TripItemCardProps {
    flight?: any;
    trip?: any;
    contract?: any;
    originCityName?: any;
    destinationCityName?: any;
    DepartureTime?: any;
    ArrivalTime?: any;
}



const TripItemCard: FC<TripItemCardProps> = ({ flight, trip, contract, originCityName, destinationCityName, DepartureTime, ArrivalTime }) => {

    return (
        <Box className="gap-12 flex  justify-between">
            <Box className='listingFlightInfo flex gap-2 items-center w-1/4' >
                <Box className='listingFlightImg'>
                    <Image src={`${process.env.cdn_path}/${contract.ValidatingCarrier}.png`} alt='' fill sizes='auto' />
                </Box>
                <Typography className='font-medium leading-tight text-slate-600 truncate '>{flight.AirlineName}</Typography>
            </Box>
            <Box className="listingTimingOptionOuter flex grow  flex-col gap-2 w-3/4">
                <Box className=" flex items-center justify-between grow  ">
                    <Box className="flightTimeDestination text-center">
                        <Typography variant='h3' className='text-lg '>{moment(DepartureTime, 'HH:mm').format('HH:mm')}   <span>{moment(DepartureTime, 'HH:mm').format('a')}</span></Typography>
                        <Typography className='font-medium text-sm '>{originCityName}</Typography>
                    </Box>
                    <Box className="listingFlightsTimeline">
                        <Typography className='font-normal text-sm'>{trip?.TripDuration}</Typography>
                        <div className='timelineDivider'>
                            <Image src='/images/listing/el_plane.svg' alt='' width={16} height={16} />
                        </div>
                        <Typography className='font-normal text-sm'>{trip?.Stops === 0 ? 'Non stop' : trip?.Stops}</Typography>
                    </Box>
                    <Box className="flightTimeDestination text-center">
                        <Typography variant='h3'>{moment(ArrivalTime, 'HH:mm').format('HH:mm')} <span>{moment(ArrivalTime, 'HH:mm').format('a')}</span></Typography>
                        <Typography className='font-medium text-sm'>{destinationCityName}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default TripItemCard