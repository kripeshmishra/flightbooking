"use client"
import React, { FC } from 'react';
import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FiX } from 'react-icons/fi';
import useAuthModal from '@/businesslogic/useAuthModal';
import { allLinks } from '@/staticData/AllLinks';


interface SidebarMenuProps {
    isDrawerOpen: any;
    setIsDrawerOpen: any;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ isDrawerOpen, setIsDrawerOpen }) => {

    const { session, status, signOut, openLoginModal, handleOpen, handleClose } = useAuthModal()

    const linkLists = new allLinks()

    return (
        <Drawer anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            disableScrollLock={true}>
            <Box className='mobileMenuTop'>
                <Button onClick={() => setIsDrawerOpen(false)} variant='outlined' color='primary' className='mobileMenuCloseBtn' >
                    <FiX size={22} />
                </Button>
                <Box className='mobileMenuTopBox'>
                    <h3>Welcome to Fly States!</h3>
                    {status === 'authenticated' ? (
                        <p>{session?.user?.name}</p>
                    ) : (
                        <>
                            <p>Please Login to continue</p>
                            <Button variant="contained" color="primary" sx={{ height: '36px', width: '100%' }}
                                onClick={() => {
                                    handleOpen(); setIsDrawerOpen(false);
                                }}>
                                Login
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
            <Box className="mobileHeaderMenu">
                <List>
                    {

                        (linkLists.GetFilterLinks(['vacations', 'flights', 'hotels', 'cruise'])).map((menu: any, index: number) => (
                            <ListItem disablePadding key={index}>
                                <ListItemButton disableRipple href={menu.link} onClick={() => { setIsDrawerOpen(false); }}>
                                    <ListItemText primary={menu.name} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
            <Box sx={{ p: 2, mt: 'auto' }}>

                {status === 'authenticated' && (
                    <Button variant="contained" color="primary" sx={{ height: '36px', width: '100%' }}
                        onClick={() => {
                            signOut(); setIsDrawerOpen(false);
                        }}>
                        Logout
                    </Button>
                )}
            </Box>
        </Drawer>
    )
}

export default SidebarMenu