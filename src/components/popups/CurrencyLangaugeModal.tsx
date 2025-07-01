import React, { FC } from 'react';
import { Box, Modal, Backdrop, Fade, IconButton, Card, Typography, Stack, Button, Zoom, Dialog, MenuItem } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import { currency, languages } from '@/staticData/AllStaticData';
import Image from 'next/image';
import useHeader from '@/businesslogic/useHeader';


interface CurrencyLangaugeModalProps {
    openCurrencyModal: boolean;
    handleCurrencyClose: () => void;
}


const CurrencyLangaugeModal: FC<CurrencyLangaugeModalProps> = ({ openCurrencyModal, handleCurrencyClose }) => {

    const { handleLanguageSelect, handleCurrencySelect } = useHeader()

    return (
        <Dialog
            maxWidth="md"
            className='DialogPopupStyle DialogPopupMdWidth'
            open={openCurrencyModal}
            onClose={handleCurrencyClose}
            TransitionComponent={Zoom}
            disableScrollLock={true}
            transitionDuration={300}
        >
            <Box className="modal-container customModal">
                <IconButton onClick={handleCurrencyClose} sx={{ zIndex: 999, m: 1, color: "#000" }} aria-label="cross" className='authModalCloseBtn' >
                    <RxCross2 />
                </IconButton>
                <Box sx={{ p: 3 }} className="langaugeCurrencyMenu">
                    <Typography variant='h3' className="mb-8">Languages & Currency</Typography>
                    <Typography variant='h4'>Languages</Typography>
                    <Stack direction='row' className='menuLangaugeLists mb-8'>
                        {languages.map((language: any) => (
                            <MenuItem key={language.id}
                                onClick={() => {
                                    handleLanguageSelect(language.code, language.name);
                                    handleCurrencyClose()
                                }}
                            >
                                <Image src={language.icon} alt={language.code} style={{ marginRight: '8px' }} width={20} height={12} />
                                {language.name}
                            </MenuItem>
                        ))}
                    </Stack>
                    <Typography variant='h4'>Currency</Typography>
                    <Stack direction='row' className='menuCurrencyLists' sx={{ flexWrap: 'wrap' }}>
                        {currency.map((curr: any) => (
                            <MenuItem key={curr.code}
                                onClick={() => {
                                    handleCurrencySelect(curr.code)
                                    handleCurrencyClose()
                                }}
                            >
                                <Image src={curr.icon} alt={curr.code} style={{ marginRight: '8px' }} width={20} height={12} />
                                {curr.code}
                            </MenuItem>
                        ))}

                    </Stack>
                </Box>
            </Box>
        </Dialog>
    )
}

export default CurrencyLangaugeModal