import React, { useState, FC, useEffect } from "react";
import Enumerable from 'linq';
import {
    Box, FormControl, Slider, Typography, RadioGroup, FormControlLabel, Checkbox, FormGroup, Stack, Button, Select, MenuItem, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import Image from 'next/image';
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { TimePeriod, TimePeriodLabel } from "@/utilty/Enums";
import MorningSvg from "@/staticData/svg/MorningSvg";
import DaySvg from "@/staticData/svg/DaySvg";
import AfternoonSvg from "@/staticData/svg/AfternoonSvg";
import NightSvg from "@/staticData/svg/NightSvg";
import { useForm, Controller } from 'react-hook-form';
import { blGetSearchResult } from "@/businesslogic/blSearchWidget";
import useFilterFlights from "@/businesslogic/useFilterFlights";


const SidebarFilter = () => {
    const { control, handleSubmit, trigger } = useForm();
    const [model, setModel] = useState<any>([]);
    const [selectedStops, setSelectedStops] = useState<any[]>([]);
    const [selectedDeparture, setSelectedDeparture] = useState<any[]>([]);
    const [selectedReturn, setSelectedReturn] = useState<any[]>([]);
    const [selectedAirlines, setSelectedAirlines] = useState<any[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [priceRangeValue, setPriceRangeValue] = useState([minPrice, maxPrice]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        blGetSearchResult(setModel);
    }, []);

    useEffect(() => {
        if (model?.Filter?.AirlinesFilters) {
            const prices = model.Filter.AirlinesFilters.map((flight: any) => flight.AveragePrice);

            const newMinPrice = Math.min(...prices);
            const newMaxPrice = Math.max(...prices);

            setMinPrice(newMinPrice);
            setMaxPrice(newMaxPrice);

            setPriceRangeValue([newMinPrice, newMaxPrice]);
        }
    }, [model]);


    const handlePriceRangeChange = (event: any, newValue: any) => {
        setPriceRangeValue(newValue);
        trigger().then(() => handleSubmit(onSubmit)());
    };


    const handleStopsChange = (event: any, selectedStops: any) => {
        setSelectedStops(selectedStops);
        trigger().then(() => handleSubmit(onSubmit)());
    };

    const handleDepartureChange = (event: any, selectedDeparture: any) => {
        setSelectedDeparture(selectedDeparture);
        trigger().then(() => handleSubmit(onSubmit)());
    };

    const handleReturnChange = (event: any, selectedReturn: any) => {
        setSelectedReturn(selectedReturn);
        trigger().then(() => handleSubmit(onSubmit)());
    };

    const handleAirlineChange = (event: any, airlineId: any, field: any) => {
        const isChecked = event.target.checked;
        const updatedAirlines = isChecked
            ? [...field.value, airlineId]
            : field.value.filter((id: any) => id !== airlineId);
        field.onChange(updatedAirlines);
        trigger().then(() => handleSubmit(onSubmit)());
    };



    const handleClearAllFilter = () => {
        setSelectedStops([]);
        setSelectedDeparture([]);
        setSelectedReturn([]);
    };

    const onSubmit = (data: any) => {
        console.log('data:', data);
        const formData = {
            ...data,
            page: page,
            SearchKey: "XXXXXXXYYYYYZZZZZ"
        }
        console.log('formData:', formData);
    };



    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>

                {
                    model?.Filter?.StopsFilter && model?.Filter?.StopsFilter?.length > 0 ? (
                        <>
                            <Box className="filterWidgit" sx={{ marginBottom: '20px' }}>
                                <Typography variant='h2' className="mb-3 font-medium text-base">Stops</Typography>

                                <Controller
                                    name="selectedStops"
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <ToggleButtonGroup
                                            {...field}
                                            className="filterRadioBtnGroup"
                                            onChange={(event, selectedStops) => {
                                                field.onChange(selectedStops);
                                                handleStopsChange(event, selectedStops);
                                            }}
                                        >
                                            {model?.Filter?.StopsFilter?.map((item: any, index: any) => (
                                                <ToggleButton key={index} value={item.MaxNoOfStopsInContract} disableRipple>
                                                    <Box>
                                                        <h5>{item.MaxNoOfStopsInContract > 2 ? `+${item.MaxNoOfStopsInContract - 2}` : `${item.MaxNoOfStopsInContract}`}</h5>
                                                        <p>{item.MaxNoOfStopsInContract > 2 ? ` Stops` : `Stop`}</p>
                                                    </Box>
                                                </ToggleButton>
                                            ))}
                                        </ToggleButtonGroup>
                                    )}
                                />


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

                                <Controller
                                    name="selectedDeparture"
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <ToggleButtonGroup
                                            {...field}
                                            className="filterRadioBtnGroup"
                                            onChange={(event, selectedDeparture) => {
                                                field.onChange(selectedDeparture);
                                                handleDepartureChange(event, selectedDeparture);
                                            }}
                                        >
                                            {model?.Filter?.DepartTime?.map((item: any, index: any) => (
                                                <ToggleButton key={index} value={item.DepartTimeFilter} disableRipple>
                                                    <Box>
                                                        {index === 0 && <MorningSvg />}
                                                        {index === 1 && <AfternoonSvg />}
                                                        {index === 2 && <DaySvg />}
                                                        {index === 3 && <NightSvg />}
                                                        <Typography>{TimePeriodLabel.get(+item.DepartTimeFilter)}</Typography>
                                                    </Box>
                                                </ToggleButton>
                                            ))}
                                        </ToggleButtonGroup>
                                    )}
                                />
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
                            <Controller
                                name="selectedReturn"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <ToggleButtonGroup
                                        {...field}
                                        className="filterRadioBtnGroup"
                                        onChange={(event, selectedReturn) => {
                                            field.onChange(selectedReturn);
                                            handleReturnChange(event, selectedReturn);
                                        }}
                                    >
                                        {model?.Filter?.DepartTime?.map((item: any, index: any) => (
                                            <ToggleButton key={index} value={item.DepartTimeFilter} disableRipple>
                                                <Box>
                                                    {index === 0 && <MorningSvg />}
                                                    {index === 1 && <AfternoonSvg />}
                                                    {index === 2 && <DaySvg />}
                                                    {index === 3 && <NightSvg />}
                                                    <Typography>{TimePeriodLabel.get(+item.DepartTimeFilter)}</Typography>
                                                </Box>
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>
                                )}
                            />
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
                                name="priceRange"
                                control={control}
                                defaultValue={[minPrice, maxPrice]}
                                render={({ field }) => (
                                    <Box sx={{ width: '100%' }} className="filterPriceRange">
                                        <Slider
                                            {...field}
                                            value={priceRangeValue}
                                            onChange={(event, priceRangeValue) => {
                                                field.onChange(priceRangeValue);
                                                handlePriceRangeChange(event, priceRangeValue);
                                            }}
                                            valueLabelDisplay="auto"
                                            min={minPrice}
                                            max={maxPrice}
                                        />
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="h5" className="font-normal text-sm text-secondary m-0">${priceRangeValue[0]}</Typography>
                                            <Typography variant="h5" className="font-normal text-sm text-secondary m-0">${priceRangeValue[1]}</Typography>
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
                                <Typography variant='h2' className="mb-5 font-medium text-base">Airlines</Typography>

                                <Controller
                                    name="selectedAirlines"
                                    control={control}
                                    defaultValue={[]}
                                    render={({ field }) => (
                                        <FormGroup className="filterAirlines">
                                            {model?.Filter?.AirlinesFilters?.map((item: any) => (
                                                <FormControlLabel
                                                    key={item.Id}
                                                    control={
                                                        <Checkbox
                                                            checked={field.value.includes(item.AirlineInContract)}
                                                            onChange={(e) => handleAirlineChange(e, item.AirlineInContract, field)}
                                                            disableRipple
                                                            icon={<span className="uncheckedWrapper"></span>}
                                                            checkedIcon={<span className="checkedWrapper"><FiCheck /></span>}
                                                        />
                                                    }
                                                    label={
                                                        <Stack direction="row" sx={{ width: '100%' }} alignItems="center" justifyContent="space-between">
                                                            <Typography variant="h5">{item.AirlineNameInContract}</Typography>
                                                            <Typography>${item.AveragePrice}</Typography>
                                                        </Stack>
                                                    }
                                                    className="customCheckBoxStyle"
                                                />
                                            ))}
                                        </FormGroup>
                                    )}
                                />

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