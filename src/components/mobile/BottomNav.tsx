"use client"
import React, { useEffect, useState } from 'react'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';


const BottomNav = () => {
    const { data: session, status } = useSession();
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(window.location.pathname);
        const handleRouteChange = () => {
            setValue(window.location.pathname);
        };
        window.addEventListener('popstate', handleRouteChange);

        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };



    return (

        <BottomNavigation
            showLabels
            value={value}
            onChange={handleChange}
            sx={{
                position: 'fixed',
                bottom: '8px',
                width: 'calc(100% - 15px)',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                zIndex: '9',
                height: '72px',
                boxShadow: '0px 0px 31px 4px #042F7121',
                backgroundColor: '#fff',
                padding: '12px',
                borderRadius: '10px',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <BottomNavigationAction label="Explore" icon={<Image src='/images/search.svg' alt='search' width={20} height={20} />}
                component={Link} href="/" disableRipple
                sx={styles.bottomNavItem}
                className={value === '/' ? 'bottomNavActiveItem' : ''}

            />
            <BottomNavigationAction label="Bookings" icon={<Image src='/images/booking.svg' alt='booking' width={24} height={24} />}
                component={Link} href="/vacations" disableRipple
                sx={styles.bottomNavItem}
                className={value === '/vacations' ? 'bottomNavActiveItem' : ''}
            />

            <BottomNavigationAction label="Call Us" icon={<Image src='/images/callus.svg' alt='callus' width={24} height={24} />}
                component={Link} href="/" disableRipple
                sx={styles.bottomNavItem}
                className={value === '/favorite' ? 'bottomNavActiveItem' : ''}
            />

            <BottomNavigationAction label="Profile" icon={<Image src='/images/profile.svg' alt='profile' width={24} height={24} />}
                component={Link} href="/" disableRipple
                sx={styles.bottomNavItem}
                className={
                    `${status === 'authenticated' && 'UserAuthenticated'} ${value === '/account' ? 'bottomNavActiveItem' : ''
                    }`
                }
            />

        </BottomNavigation>
    )
}

export default BottomNav

const styles = {
    bottomNavItem: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        gap: '5px',
        padding: '8px 12px',
        minWidth: '75px',
        maxWidth: '75px',
        height: '55px',
        "& .MuiBottomNavigationAction-label": {
            fontSize: '15px !important',
            color: '#0A557F',
            fontWeight: '400',
            lineHeight: '1',
            position: 'relative',
        },
        "& .MuiBottomNavigationAction-label.Mui-selected": {
            display: 'block',
        },
        "&.Mui-selected": {
            color: '#009BB5',
            background: '#0A557F',
            borderRadius: '10px',
            "& img": {
                filter: 'brightness(100)',
            },
            "& .MuiBottomNavigationAction-label": {
                color: '#fff',
            }
        },
    },

};