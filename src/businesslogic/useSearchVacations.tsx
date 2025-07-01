import React, { useState } from 'react'

const useSearchVacations = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [rooms, setRooms] = useState(0);
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [showRoomGuestCount, setShowRoomGuestCount] = useState(false)

    const handleTravellerType = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleTravellerClose = () => {
        setAnchorEl(null);
        if (rooms >= 1 || adults >= 1 || children >= 1) {
            setShowRoomGuestCount(true)
        } else {
            setShowRoomGuestCount(false)
        }
    };

    const handleQuantityChange = (type: any, change: any) => {
        switch (type) {
            case 'rooms':
                setRooms((prevValue) => Math.max(0, prevValue + change));
                break;
            case 'adults':
                setAdults((prevValue) => Math.max(0, prevValue + change));
                break;
            case 'children':
                setChildren((prevValue) => Math.max(0, prevValue + change));
                break;
            default:
                break;
        }
    };


    return {
        anchorEl,
        rooms,
        adults,
        children,
        showRoomGuestCount,
        handleTravellerType,
        handleTravellerClose,
        handleQuantityChange,
    }
}

export default useSearchVacations