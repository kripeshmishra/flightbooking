import React, { useState, useEffect } from 'react'
import { CabinType, TripType } from '@/utilty/Enums';
import { blDestinationGetByName } from './blSearchWidget';

const useSearchFlights = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTravellerType, setSelectedTravellerType] = useState<any>(CabinType.ECONOMY);
    const [selectedTripType, setSelectedTripType] = useState<any>(TripType.ONE_WAY);
    const [AdultCount, setAultCount] = useState(1);
    const [ChildCount, setChildCount] = useState(0);
    const [InfantCount, setInfantCount] = useState(0);
    const [originLocations, setOriginLocations] = useState<any>([]);
    const [destinationLocations, setDestinationLocations] = useState<any>([]);
    const [dateRange, setDateRange] = useState<any>([null, null]);
    const [startFromDate, setStartFromDate] = useState<any>(null);
    const [startTripDate, endTripDate] = dateRange

    useEffect(() => {
        blDestinationGetByName('', 1, setOriginLocations, setDestinationLocations);
    }, [originLocations, destinationLocations]);

    const onLocationChange = async (value: any, type: number) => {
        if (value.length >= 2 || !value) {
            blDestinationGetByName(value, type, setOriginLocations, setDestinationLocations);
        }
    };


    const handleTravellerTypeChange = (value: any) => {
        setSelectedTravellerType(value);
    };

    const handleTripType = (event: any) => {
        setSelectedTripType(event.target.value);
    };

    const handleTravellerType = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleTravellerClose = () => {
        setAnchorEl(null);
    };



    const handleQuantityChange = (type: any, change: any) => {
        switch (type) {
            case 'AdultCount':
                setAultCount((prevValue) => Math.max(0, prevValue + change));
                break;
            case 'ChildCount':
                setChildCount((prevValue) => Math.max(0, prevValue + change));
                break;
            case 'InfantCount':
                setInfantCount((prevValue) => Math.max(0, prevValue + change));
                break;
            default:
                break;
        }
    };



    return {
        anchorEl,
        selectedTravellerType,
        selectedTripType,
        AdultCount,
        ChildCount,
        InfantCount,
        handleTravellerTypeChange,
        handleTripType,
        handleTravellerType,
        handleTravellerClose,
        handleQuantityChange,
        originLocations,
        destinationLocations,
        onLocationChange,
        dateRange,
        setDateRange,
        startFromDate,
        setStartFromDate,
        startTripDate,
        endTripDate
    }
}

export default useSearchFlights