"use client";
import { TimePeriod } from '@/utilty/Enums';
import React, { useEffect, useState } from 'react';
import { blGetFilterResult } from './blSearchWidget';
import { useForm, Controller } from 'react-hook-form';

const useFilterFlights = () => {
    const { control, handleSubmit, trigger, setValue } = useForm();
    const [searchShortFilter, setSearchShortFilter] = useState<any>()
    const [model, setModel] = useState<any>([]);
    const [selectedStops, setSelectedStops] = useState<any[]>([]);
    const [selectedDeparture, setSelectedDeparture] = useState<any[]>([]);
    const [selectedReturn, setSelectedReturn] = useState<any[]>([]);
    const [selectedAirlines, setSelectedAirlines] = useState<any[]>([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [priceRangeValue, setPriceRangeValue] = useState([minPrice, maxPrice]);



    useEffect(() => {
        blGetFilterResult(setModel);
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


    const getNotStops = model?.Filter?.StopsFilter.reduce((minStops: any, currentStop: any) => {
        return currentStop.MaxNoOfStopsInContract === 0 && currentStop.AveragePrice < minStops.AveragePrice
            ? currentStop
            : minStops;
    }, model?.Filter?.StopsFilter[0]);

    const getCheapFlight = model?.Filter?.AirlinesFilters.reduce((minPriceAirline: any, currentAirline: any) => {
        return currentAirline.AveragePrice < minPriceAirline.AveragePrice ? currentAirline : minPriceAirline;
    }, model?.Filter?.AirlinesFilters[0]);


    const handlePriceRangeChange = (event: any, newValue: any) => {
        setPriceRangeValue(newValue);
        trigger().then(() => handleSubmit(onSidebarFilterSubmit)());
    };


    const handleStopsChange = (event: any, selectedStops: any) => {
        setSelectedStops(selectedStops);
        trigger().then(() => handleSubmit(onSidebarFilterSubmit)());
    };

    const handleDepartureChange = (event: any, selectedDeparture: any) => {
        setSelectedDeparture(selectedDeparture);
        trigger().then(() => handleSubmit(onSidebarFilterSubmit)());
    };

    const handleReturnChange = (event: any, selectedReturn: any) => {
        setSelectedReturn(selectedReturn);
        trigger().then(() => handleSubmit(onSidebarFilterSubmit)());
    };

    const handleAirlineChange = (event: any, airlineId: any, field: any) => {
        const isChecked = event.target.checked;
        const updatedAirlines = isChecked
            ? [...field.value, airlineId]
            : field.value.filter((id: any) => id !== airlineId);
        field.onChange(updatedAirlines);
        trigger().then(() => handleSubmit(onSidebarFilterSubmit)());
    };


    const onSidebarFilterSubmit = (data: any) => {
        console.log('data:', data);
        const formData = {
            ...data,
            page: 1,
            SearchKey: "XXXXXXXYYYYYZZZZZ"
        }
        console.log('formData:', formData);
    };
    const handleShortChange = (event: any, newAlignment: string,) => {
        setSearchShortFilter(newAlignment);
    };

    const handleClearAllFilter = () => {
        setValue('selectedStops', [])
        setValue('selectedDeparture', [])
        setValue('selectedReturn', [])
        setValue('selectedAirlines', [])
        setValue('setPriceRangeValue', [minPrice, maxPrice])
    };



    return {
        model,
        control,
        searchShortFilter,
        handleSubmit,
        selectedStops,
        selectedDeparture,
        selectedReturn,
        selectedAirlines,
        minPrice,
        maxPrice,
        priceRangeValue,
        getNotStops,
        getCheapFlight,
        handlePriceRangeChange,
        handleStopsChange,
        handleDepartureChange,
        handleReturnChange,
        handleAirlineChange,
        handleClearAllFilter,
        handleShortChange,
        onSidebarFilterSubmit
    };
};

export default useFilterFlights;