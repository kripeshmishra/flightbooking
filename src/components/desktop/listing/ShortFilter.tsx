import React, { useState, MouseEvent } from 'react'
import { Box, Button, Card, Divider, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { FiBell } from 'react-icons/fi';
import useFilterFlights from '@/businesslogic/useFilterFlights';
import { BiSolidSortAlt } from 'react-icons/bi';
import BellSvg from '@/staticData/svg/BellSvg';


const ShortFilter = () => {

    const {
        searchShortFilter,
        getNotStops,
        getCheapFlight,
        handleShortChange
    } = useFilterFlights()


    return (
        <Card className='flex flex-row items-center' sx={{ boxShadow: '0px 0px 9px 0px #042F7112' }}>
            <ToggleButtonGroup
                value={searchShortFilter}
                exclusive
                onChange={handleShortChange}
                className='shortFilterButtonGroup'
            >
                <ToggleButton value={getNotStops?.MaxNoOfStopsInContract} disableRipple >
                    <Stack direction="row" gap={1}>
                        <BiSolidSortAlt size={16} />
                        <Typography variant='h4'>Nonstop</Typography>
                    </Stack>
                    <Typography>$ {getNotStops?.AveragePrice}</Typography>
                </ToggleButton>

                <ToggleButton value={getCheapFlight?.AveragePrice} disableRipple>
                    <Stack direction="row" gap={1}>
                        <BiSolidSortAlt size={16} />
                        <Typography variant='h4'>Cheapest</Typography>
                    </Stack>
                    <Typography>$ {getCheapFlight?.AveragePrice}</Typography>
                </ToggleButton>

                <ToggleButton value="short-duration" disableRipple>
                    <Stack direction="row" gap={1}>
                        <BiSolidSortAlt size={16} />
                        <Typography variant='h4'>Shortest</Typography>
                    </Stack>
                    <Typography>$1,035</Typography>
                </ToggleButton>
                <ToggleButton value="nearbyairport" disableRipple>
                    <Stack direction="row" gap={1}>
                        <BiSolidSortAlt size={16} />
                        <Typography variant='h4'>Near by</Typography>
                    </Stack>
                    <Typography>$2,035</Typography>
                </ToggleButton>
                <Button className='getAlertButton' startIcon={<BellSvg />} disableRipple >Create Price Alert</Button>
            </ ToggleButtonGroup>

        </Card>
    )
}

export default ShortFilter