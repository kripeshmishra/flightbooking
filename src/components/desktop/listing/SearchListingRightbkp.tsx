import { Box, Button, Card, Collapse, Skeleton, Stack, Typography } from '@mui/material'
import React, { FC, useState } from 'react'
import FlightMatrix from './FlightMatrix'
import ShortFilter from './ShortFilter'
import { LoadingButton } from '@mui/lab'
import { BiSolidChevronDownCircle } from "react-icons/bi";
import moment from 'moment'
import TripItemCard from './TripItemCard'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import TripDetailsCard from './TripDetailsCard'

interface SearchListingRightProps {
    model: any;
}

const SearchListingRight: FC<SearchListingRightProps> = ({ model }) => {

    console.log('model---', model)

    const [openCollapses, setOpenCollapses] = useState<string | null>(null);


    const handleFlightDetails = (contractID: string) => {
        setOpenCollapses((prev) => (prev === contractID ? null : contractID));
    };

    return (
        <Box>
            <FlightMatrix />
            <Box className="mt-4">
                <ShortFilter />
            </Box>
            <Box className="mt-4">

                {model === null || model === undefined ? (
                    [...Array(10)].map((_, index) => (
                        <Card key={index} className='FlightslistingItem mt-4  mb-2'>
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
                ) : (
                    model.map((contract: any) => (
                        <Card className='FlightslistingItem mb-4' key={contract.ContractID}>
                            <Box className="flex items-center p-3 ">
                                <Box className="flex-1">
                                    {
                                        contract.ListofTrips.map((trip: any) => (
                                            <div className='listItemTrips' key={trip.BoundType}>
                                                {
                                                    trip.ListofFlights.map((flight: any) => (
                                                        <TripItemCard key={flight.BoundType} flight={flight} trip={trip} contract={contract} />
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </Box>
                                <Box className='listingFlightRight flex items-center' >
                                    <Box className="text-right mr-8">
                                        <Typography variant='h2'>{contract.AveragePrice}</Typography>
                                        <Button
                                            onClick={() => handleFlightDetails(contract.ContractID)}
                                            disableRipple
                                            endIcon={<> {
                                                openCollapses === contract.ContractID ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />
                                            }</>}
                                            className='p-0 text-sm capitalize font-medium text-[#676977] hover:bg-transparent '>Flight Details</Button>
                                    </Box>
                                    <Box className="relative">
                                        <Button variant="contained" color="secondary">Book Now</Button>
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
                )}


            </Box>
            {/* <Stack justifyContent="center" alignItems="center" className="mt-8">
                <LoadingButton variant='contained' color='secondary' sx={{ textTransform: 'capitalize' }} endIcon={<BiSolidChevronDownCircle />}>Load More Flights</LoadingButton>
            </Stack> */}
        </Box >
    )
}

export default SearchListingRight


import React, { useState, FC, useEffect } from "react";
import Enumerable from 'linq';
import {
    Box, FormControl, Slider, Typography, RadioGroup, FormControlLabel, Checkbox, FormGroup, Stack, Button
} from '@mui/material';
import Image from 'next/image';
import { FiChevronDown } from "react-icons/fi";
import { TimePeriod, TimePeriodLabel } from "@/utilty/Enums";
import MorningSvg from "@/staticData/svg/MorningSvg";
import DaySvg from "@/staticData/svg/DaySvg";
import AfternoonSvg from "@/staticData/svg/AfternoonSvg";
import NightSvg from "@/staticData/svg/NightSvg";
import useFilterFlights from "@/businesslogic/useFilterFlights";
import { useForm, Controller } from 'react-hook-form';


const SidebarFilter = () => {

    const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm();

    const {
        getAllAirline,
        selectedStops,
        handleStopsChange,
        getAllStops,
        getAllTimePeriod,
        selectedTimePeriods,
        handleTimePeriodChange,
        minPrice,
        maxPrice,
        priceRangeValue,
        handlePriceRangeChange,
        handleAirlineChange,
        selectedAirlines,
        handleClearAllFilter
    } = useFilterFlights()

    // console.log('selectedAirlines', selectedAirlines)
    // console.log('selectedStops', selectedStops)
    // console.log('selectedTimePeriods', selectedTimePeriods)

    const onSubmit = (data: any) => {
        console.log('data', data)
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="filterWidgit" sx={{ marginBottom: '20px' }}>
                    <Typography variant='h2' className="mb-3 font-medium text-base">Stops</Typography>
                    <FormControl sx={{ width: '100%' }}>
                        {
                            getAllStops && getAllStops?.length > 0 ? (
                                <>
                                    <Controller
                                        name="selectedStops"
                                        control={control}
                                        defaultValue={selectedStops}
                                        render={({ field }) => (
                                            <RadioGroup {...field} row className="filterRadioBtnGroup">
                                                {getAllStops?.map((item: any) => (
                                                    <FormControlLabel
                                                        key={item.Id}
                                                        value={item.value}
                                                        control={<Checkbox
                                                            disableRipple
                                                            checked={selectedStops.includes(item.Id)}
                                                            onChange={(e) => handleStopsChange(e, item.Id)}
                                                        />}
                                                        label={
                                                            <Box>
                                                                <Typography variant="h5">
                                                                    {item.value > 2 ? `+${item.value - 2}` : `${item.value}`}
                                                                </Typography>
                                                                <Typography className="font-medium">
                                                                    {item.value > 2 ? ` Stops` : `Stop`}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                ))}
                                            </RadioGroup>
                                        )}
                                    />

                                    <RadioGroup row className="filterRadioBtnGroup" value={selectedStops} >
                                        {
                                            getAllStops?.map((item: any) => (
                                                <FormControlLabel key={item.Id} value={item.value} control={<Checkbox disableRipple
                                                    checked={selectedStops.includes(item.Id)}
                                                    onChange={(e) => handleStopsChange(e, item.Id)}
                                                />} label={
                                                    <Box>
                                                        <Typography variant="h5">
                                                            {item.value > 2 ? `+${item.value - 2}` : `${item.value}`}
                                                        </Typography>
                                                        <Typography className="font-medium">
                                                            {item.value > 2 ? ` Stops` : `Stop`}
                                                        </Typography>
                                                    </Box>
                                                } />
                                            ))
                                        }
                                    </RadioGroup>
                                </>
                            ) : (
                                <Box className="flex gap-3">
                                    {[1, 2, 3, 4].map((index) => (
                                        <Box key={index} className="flex-1 animate-pulse w-full h-14 bg-slate-300 rounded-md">
                                        </Box>
                                    ))}
                                </Box>
                            )
                        }

                    </FormControl>
                </Box>


                <Box className="filterWidgit" >
                    <Typography variant='h2' className="mb-3 font-medium text-base">Flight Times</Typography>

                    <FormControl sx={{ width: '100%' }}>

                        {
                            getAllTimePeriod && getAllTimePeriod?.length > 0 ? (
                                <RadioGroup row className="filterRadioBtnGroup" value={selectedTimePeriods}>
                                    {
                                        getAllTimePeriod?.map((item: any, index: number) => (
                                            <FormControlLabel
                                                key={index}
                                                value={item.Id}
                                                control={<Checkbox
                                                    disableRipple
                                                    checked={selectedTimePeriods.includes(item.Id)}
                                                    onChange={(e) => handleTimePeriodChange(e, item.Id)}
                                                />}
                                                label={
                                                    <Box>
                                                        {index === 0 && (
                                                            <MorningSvg />
                                                        )}
                                                        {index === 1 && (
                                                            <DaySvg />
                                                        )}
                                                        {index === 2 && (
                                                            <AfternoonSvg />
                                                        )}
                                                        {index === 3 && (
                                                            <NightSvg />
                                                        )}
                                                        <Typography>{TimePeriodLabel.get(item.Id)}</Typography>
                                                    </Box>
                                                }

                                            />
                                        ))
                                    }
                                </RadioGroup>
                            ) : (
                                <Box className="flex gap-3">
                                    {[1, 2, 3, 4].map((index) => (
                                        <Box key={index} className="flex-1 animate-pulse w-full h-14 bg-slate-300 rounded-md">
                                        </Box>
                                    ))}
                                </Box>
                            )
                        }

                    </FormControl>
                </Box>

                <Box className="filterWidgit" >
                    <Typography variant='h2' className="mb-3 font-medium text-base">Price from Mumbai</Typography>
                    <Box sx={{ width: '100%' }} className="filterPriceRange">
                        <Slider
                            value={priceRangeValue}
                            onChange={handlePriceRangeChange}
                            valueLabelDisplay="auto"
                            min={minPrice}
                            max={maxPrice}
                        />
                        <Stack direction='row' justifyContent='space-between'>
                            <Box className="font-medium text-base  text-black"> ${priceRangeValue[0]} </Box>
                            <Box className="font-medium text-base  text-black">  ${priceRangeValue[1]} </Box>
                        </Stack>
                    </Box>

                </Box>
                <Box className="filterWidgit" >
                    <Typography variant='h2' className="mb-3 font-medium text-base">Airlines</Typography>
                    <FormGroup className="filterAirlines">
                        {
                            getAllAirline && getAllAirline.length > 0 ? (
                                getAllAirline?.map((item: any) => (
                                    <FormControlLabel
                                        key={item.Id}
                                        control={<Checkbox
                                            checked={selectedAirlines.includes(item.Id)}
                                            onChange={(e) => handleAirlineChange(e, item.Id)}
                                            disableRipple
                                        />}
                                        label={
                                            <Stack direction='row' sx={{ width: '100%' }} alignItems='center' justifyContent='space-between'>
                                                <Typography variant="h5" >{item.Name}</Typography>
                                                <Typography variant="h6">${item.MinPrice}</Typography>
                                            </Stack>
                                        }
                                        className='customCheckBoxStyle'
                                    />
                                ))

                            ) : (
                                <Box className="flex gap-4 flex-col">
                                    {[1, 2, 3, 4, 5, 6, 7].map((index: any) => (
                                        <Box key={index} className="animate-pulse w-full h-[15px] bg-slate-300 rounded-md">
                                        </Box>
                                    ))}
                                </Box>
                            )

                        }
                    </FormGroup>

                    <Stack justifyContent='center' alignItems='center' mt={4}>
                        <Button
                            onClick={handleClearAllFilter} variant='contained' color='secondary' className='w-full rounded-none bg-white text-secondary hover:bg-primary hover:text-white'>Clear All Filters</Button>
                    </Stack>
                    <Button type="submit" variant='contained' color='primary'>Submit</Button>
                </Box>
            </form>
        </Box>
    )
}

export default SidebarFilter


import React, { useState, FC, useEffect } from "react";
import Enumerable from 'linq';
import {
    Box, FormControl, Slider, Typography, RadioGroup, FormControlLabel, Checkbox, FormGroup, Stack, Button, Select, MenuItem
} from '@mui/material';
import Image from 'next/image';
import { FiChevronDown } from "react-icons/fi";
import { TimePeriod, TimePeriodLabel } from "@/utilty/Enums";
import MorningSvg from "@/staticData/svg/MorningSvg";
import DaySvg from "@/staticData/svg/DaySvg";
import AfternoonSvg from "@/staticData/svg/AfternoonSvg";
import NightSvg from "@/staticData/svg/NightSvg";
import { useForm, Controller } from 'react-hook-form';
import { blGetSearchResult } from "@/businesslogic/blSearchWidget";
import useFilterFlights from "@/businesslogic/useFilterFlights";


const SidebarFilter = () => {

    const { control, handleSubmit, setValue, getValues, trigger, formState: { errors } } = useForm();

    const [selectedStops, setSelectedStops] = useState<any[]>([]);
    const [selectedAirlines, setSelectedAirlines] = useState<any[]>([]);
    const [selectedDeparture, setSelectedDeparture] = useState<any[]>([]);
    const [selectedReturn, setSelectedReturn] = useState<any[]>([]);

    const { model,
        minPrice,
        maxPrice,
        priceRangeValue,
        handlePriceRangeChange } = useFilterFlights()


    const handleAirlineChange = (event: any, airlineId: string) => {
        const isChecked = event.target.checked;
        setSelectedAirlines((prev) => {
            if (isChecked) {
                return [...prev, airlineId];
            } else {
                return prev.filter((id) => id !== airlineId);
            }
        });
        trigger().then(() => handleSubmit(onSubmit)());
    };



    const handleStopsChange = (event: any, stopId: string) => {
        const isChecked = event.target.checked;
        setSelectedStops((prev) => {
            if (isChecked) {
                return [...prev, stopId];
            } else {
                return prev.filter((id) => id !== stopId);
            }
        });
        trigger().then(() => handleSubmit(onSubmit)());
    };

    const handleDeparturChange = (event: any, timePeriodId: string) => {
        const isChecked = event.target.checked;
        setSelectedDeparture((prev) => {
            if (isChecked) {
                return [...prev, timePeriodId];
            } else {
                return prev.filter((id) => id !== timePeriodId);
            }
        });
        trigger().then(() => handleSubmit(onSubmit)());
    };


    const handleReturnChange = (event: any, timePeriodId: string) => {
        const isChecked = event.target.checked;
        setSelectedReturn((prev) => {
            if (isChecked) {
                return [...prev, timePeriodId];
            } else {
                return prev.filter((id) => id !== timePeriodId);
            }
        });
        trigger().then(() => handleSubmit(onSubmit)());
    };


    const handleClearAllFilter = () => {
        setSelectedStops([])
        setSelectedAirlines([])
    }


    const onSubmit = (data: any) => {
        console.log('data:', data);
    }



    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>

                {
                    model?.Filter?.StopsFilter && model?.Filter?.StopsFilter?.length > 0 ? (
                        <>
                            <Box className="filterWidgit" sx={{ marginBottom: '20px' }}>
                                <Typography variant='h2' className="mb-3 font-medium text-base">Stops</Typography>
                                <FormControl sx={{ width: '100%' }}>
                                    <Controller
                                        name="selectedStops"
                                        defaultValue={selectedStops}
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup row className="filterRadioBtnGroup" {...field}>
                                                {model?.Filter?.StopsFilter?.map((item: any) => (
                                                    <FormControlLabel
                                                        key={item.MaxNoOfStopsInContract}
                                                        control={<Checkbox disableRipple
                                                            checked={selectedStops.includes(item.MaxNoOfStopsInContract)}
                                                            onChange={(e) => handleStopsChange(e, item.MaxNoOfStopsInContract)}
                                                        />}
                                                        label={
                                                            <Box>
                                                                <Typography variant="h5">
                                                                    {item.MaxNoOfStopsInContract > 2 ? `+${item.MaxNoOfStopsInContract - 2}` : `${item.MaxNoOfStopsInContract}`}
                                                                </Typography>
                                                                <Typography className="font-medium">
                                                                    {item.MaxNoOfStopsInContract > 2 ? ` Stops` : `Stop`}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                ))}
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                            </Box>
                        </>
                    ) : (
                        <Box className="flex gap-4  flex-col mb-16">
                            <Box className="animate-pulse w-3/6 h-[20px] bg-slate-300 rounded-md ">
                            </Box>
                            <Box className="flex gap-3 ">
                                {[1, 2, 3, 4].map((index) => (
                                    <Box key={index} className="flex-1 animate-pulse w-full h-14 bg-slate-300 rounded-md">
                                    </Box>
                                ))}
                            </Box>

                        </Box>
                    )
                }


                {
                    model?.Filter?.DepartTime && model?.Filter?.DepartTime?.length > 0 ? (
                        <>
                            <Box className="filterWidgit" >
                                <Typography variant='h2' className="mb-3 font-medium text-base">Departure Times</Typography>
                                <FormControl sx={{ width: '100%' }}>

                                    <Controller
                                        name="DepartureTime"
                                        defaultValue={selectedDeparture}
                                        control={control}
                                        render={({ field }) => (
                                            <RadioGroup row className="filterRadioBtnGroup"  {...field}>
                                                {model?.Filter?.DepartTime?.map((item: any, index: number) => (
                                                    <FormControlLabel
                                                        key={index}
                                                        value={item.Id}
                                                        control={<Checkbox disableRipple
                                                            checked={selectedDeparture.includes(item.DepartTimeFilter)}
                                                            onChange={(e) => handleDeparturChange(e, item.DepartTimeFilter)}
                                                        />}
                                                        label={
                                                            <Box>
                                                                {index === 0 && <MorningSvg />}
                                                                {index === 1 && <DaySvg />}
                                                                {index === 2 && <AfternoonSvg />}
                                                                {index === 3 && <NightSvg />}
                                                                <Typography>{TimePeriodLabel.get(+item.DepartTimeFilter)}</Typography>
                                                            </Box>
                                                        }
                                                    />
                                                ))}
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                            </Box>
                        </>
                    ) : (
                        <Box className="flex gap-4  flex-col mb-16">
                            <Box className="animate-pulse w-3/6 h-[20px] bg-slate-300 rounded-md ">
                            </Box>
                            <Box className="flex gap-3 ">
                                {[1, 2, 3, 4].map((index) => (
                                    <Box key={index} className="flex-1 animate-pulse w-full h-14 bg-slate-300 rounded-md">
                                    </Box>
                                ))}
                            </Box>

                        </Box>
                    )
                }


                {
                    model?.Filter?.ReturnTime && model?.Filter?.ReturnTime?.length > 0 ? (
                        <Box className="filterWidgit" >
                            <Typography variant='h2' className="mb-3 font-medium text-base">Return Times</Typography>
                            <FormControl sx={{ width: '100%' }}>

                                {
                                    model?.Filter?.DepartTime && (
                                        <>
                                            <Controller
                                                name="ReturnTime"
                                                defaultValue={selectedReturn}
                                                control={control}
                                                render={({ field }) => (
                                                    <RadioGroup row className="filterRadioBtnGroup"  {...field}>
                                                        {model?.Filter?.DepartTime?.map((item: any, index: number) => (
                                                            <FormControlLabel
                                                                key={index}
                                                                value={item.Id}
                                                                control={<Checkbox disableRipple
                                                                    checked={selectedReturn.includes(item.DepartTimeFilter)}
                                                                    onChange={(e) => handleReturnChange(e, item.DepartTimeFilter)}
                                                                />}
                                                                label={
                                                                    <Box>
                                                                        {index === 0 && <MorningSvg />}
                                                                        {index === 1 && <DaySvg />}
                                                                        {index === 2 && <AfternoonSvg />}
                                                                        {index === 3 && <NightSvg />}
                                                                        <Typography>{TimePeriodLabel.get(+item.DepartTimeFilter)}</Typography>
                                                                    </Box>
                                                                }
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                )}
                                            />
                                        </>
                                    )
                                }

                            </FormControl>
                        </Box>
                    ) : (
                        <Box className="flex gap-4  flex-col mb-16">
                            <Box className="animate-pulse w-3/6 h-[20px] bg-slate-300 rounded-md ">
                            </Box>
                            <Box className="flex gap-3 ">
                                {[1, 2, 3, 4].map((index) => (
                                    <Box key={index} className="flex-1 animate-pulse w-full h-14 bg-slate-300 rounded-md">
                                    </Box>
                                ))}
                            </Box>

                        </Box>
                    )
                }

                {
                    model?.Filter?.AirlinesFilters && model?.Filter?.AirlinesFilters?.length > 0 ? (
                        <Box className="filterWidgit" >
                            <Typography variant='h2' className="mb-3 font-medium text-base">Price from Mumbai</Typography>
                            <Controller
                                name="priceRangeValue"
                                defaultValue={[minPrice, maxPrice]}
                                control={control}
                                render={({ field }) => (
                                    <Box sx={{ width: '100%' }} className="filterPriceRange">
                                        <Slider
                                            {...field}
                                            value={priceRangeValue}
                                            onChange={handlePriceRangeChange}
                                            valueLabelDisplay="auto"
                                            min={minPrice}
                                            max={maxPrice}
                                        />
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography className="font-medium text-base text-black m-0">${priceRangeValue[0]}</Typography>
                                            <Typography className="font-medium text-base text-black m-0">${priceRangeValue[1]}</Typography>
                                        </Stack>
                                    </Box>
                                )}
                            />

                        </Box>
                    ) : (
                        <Box className="flex gap-4 flex-col mb-16">
                            <Box className="animate-pulse w-3/6 h-[20px] bg-slate-300 rounded-md mb-3">
                            </Box>
                            {[1].map((index: any) => (
                                <Box key={index} className="animate-pulse w-full h-[15px] bg-slate-300 rounded-md">
                                </Box>
                            ))}
                        </Box>
                    )
                }


                {
                    model?.Filter?.AirlinesFilters && model?.Filter?.AirlinesFilters.length > 0 ? (
                        <>
                            <Box className="filterWidgit" >
                                <Typography variant='h2' className="mb-3 font-medium text-base">Airlines</Typography>
                                <FormGroup className="filterAirlines">
                                    <Controller
                                        name="selectedAirlines"
                                        defaultValue={selectedAirlines}
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                {model?.Filter?.AirlinesFilters?.map((item: any) => (
                                                    <FormControlLabel
                                                        key={item.Id}
                                                        control={
                                                            <Checkbox
                                                                {...field}
                                                                checked={selectedAirlines.includes(item.AirlineInContract)}
                                                                onChange={(e) => handleAirlineChange(e, item.AirlineInContract)}
                                                                disableRipple
                                                            />
                                                        }
                                                        label={
                                                            <Stack direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent="space-between">
                                                                <Typography variant="h5">{item.AirlineNameInContract}</Typography>
                                                                <Typography variant="h6">${item.AveragePrice}</Typography>
                                                            </Stack>
                                                        }
                                                        className="customCheckBoxStyle"
                                                    />
                                                ))}
                                            </>
                                        )}
                                    />
                                </FormGroup>
                            </Box>
                            <Stack justifyContent='center' alignItems='center' mt={4}>
                                <Button
                                    onClick={handleClearAllFilter} variant='contained' color='secondary' className='w-full rounded-none bg-white text-secondary hover:bg-primary hover:text-white'>Clear All Filters</Button>
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Box className="flex gap-4 flex-col">
                                <Box className="animate-pulse w-3/6 h-[20px] bg-slate-300 rounded-md mb-3">
                                </Box>
                                {
                                    [1, 2, 3, 4, 5, 6, 7].map((index: any) => (
                                        <Box key={index} className="animate-pulse w-full h-[15px] bg-slate-300 rounded-md">
                                        </Box>
                                    ))
                                }
                            </Box >
                        </>
                    )
                }
            </form>
        </Box >
    )
}

export default SidebarFilter