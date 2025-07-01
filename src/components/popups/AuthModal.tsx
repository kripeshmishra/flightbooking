import React, { FC } from 'react';
import { Box, Modal, Backdrop, Fade, IconButton, Card, Typography, Stack, Button, Zoom, Dialog } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import { BsGoogle } from 'react-icons/bs';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface AuthModalProps {
    openLoginModal: boolean;
    handleClose: () => void;
}


const AuthModal: FC<AuthModalProps> = ({ openLoginModal, handleClose }) => {

    const popupCenter = (url: string, title: string) => {
        const dualScreenLeft = window.screenLeft ?? window.screenX;
        const dualScreenTop = window.screenTop ?? window.screenY;

        const width =
            window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

        const height =
            window.innerHeight ??
            document.documentElement.clientHeight ??
            screen.height;

        const systemZoom = width / window.screen.availWidth;

        const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
        const top = (height - 550) / 2 / systemZoom + dualScreenTop;

        const newWindow = window.open(
            url,
            title,
            `width=${500 / systemZoom},height=${550 / systemZoom
            },top=${top},left=${left}`
        );

        newWindow?.focus();
    };


    return (
        <Dialog
            maxWidth="md"
            className='DialogPopupStyle DialogPopupMdWidth'
            open={openLoginModal}
            onClose={handleClose}
            TransitionComponent={Zoom}
            disableScrollLock={true}
            transitionDuration={300}
        >
            <Box className="modal-container customModal">
                <IconButton onClick={handleClose} sx={{ zIndex: 999, m: 1, color: "#000" }} aria-label="cross" className='authModalCloseBtn' >
                    <RxCross2 />
                </IconButton>
                <Card className='loginCardWrapper'>
                    <div className='p-4 items-center flex flex-col overflow-hidden rounded-md shadow-lg lg:flex-row lg:flex-1'>
                        <div className='p-6  relative loginLeftWrapper bg-primary text-center text-white rounded-md  lg:w-80 md:flex-shrink-0 lg:flex lg:flex-col lg:items-center lg:justify-evenly'>
                            <div className='h-36 flex items-center justify-center'>
                                <Image src='/images/logo.svg' width={165} height={45} alt='logo' />
                            </div>
                            <Box>
                                <Typography variant='h2' className='text-3xl text-white'> Hey! Welcome</Typography>
                                <Typography variant='h4' className='text-base text-white my-2 font-normal'>Login into access your Account</Typography>
                                <Typography className='text-sm'>Get better deals, save your details for easy booking, and see all your trips in one place.</Typography>
                            </Box>
                        </div>
                        <div className='p-5 px-6 py-12 flex-1 flex flex-col items-center justify-center text-center'>
                            <Typography variant='h3' className='text-base font-medium mb-6'>Continue to your account with</Typography>
                            <Box className='flex flex-col gap-5 justify-center items-center w-full px-16'>
                                <Button onClick={() => { popupCenter("/login/facebook", "Sample Sign In") }} variant='outlined' color='primary' className='capitalize font-normal px-3 loginfacebookBtn w-full h-12 hover:bg-[#3B5998] hover:border-[#3B5998]'>
                                    <span className=' text-[#3B5998] size-6 flex items-center justify-center mr-2'>
                                        <FaFacebookF size={16} color='currentColor' />
                                    </span>
                                    <Typography className='text-sm font-medium'>Facebook</Typography>
                                </Button>
                                <Button onClick={() => { popupCenter("/login/google", "Sample Sign In") }} variant='outlined' color='primary' className='capitalize font-normal px-3 loginGoogleBtn hover:bg-[#EB4335] hover:border-[#EB4335] w-full h-12'>
                                    <span className='size-5 flex text-red-500 items-center justify-center mr-2'>
                                        <BsGoogle size={18} color='currentColor' />
                                    </span>
                                    <Typography className='text-sm font-medium'>Google</Typography>
                                </Button>
                                <Button onClick={() => { popupCenter("/login/github", "Sample Sign In") }} variant='outlined' color='primary' className='capitalize font-normal px-3 loginLinkedinBtn w-full hover:bg-[#0077B5] hover:border-[#0077B5] h-12'>
                                    <span className='text-[#0077B5] size-5 flex items-center justify-center mr-2'>
                                        <FaLinkedinIn size={18} color='currentColor' />
                                    </span>
                                    <Typography className='text-sm font-medium'>Linkedin</Typography>
                                </Button>
                            </Box>
                            <Typography className='text-sm font-base mt-5 leading-normal px-4'>
                                By creating an account via Facebook/Google, or by entering your email address above, you agree to FlyStates’s <Link href='/'> Terms & Conditions</Link> and <Link href='/'>Privacy Policy</Link>.
                            </Typography>
                        </div>
                    </div>
                </Card>
            </Box>
        </Dialog>
    )
}

export default AuthModal


const styles = {
    authModalBox: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 430,
        borderRadius: "20px",
        overflow: "hidden",
        '@media screen and (max-width: 575px)': {
            width: '95%',
        },
    }
}