"use client"
import React, { useState, useEffect } from 'react';
import { GetFromLocalStorage } from '@/utilty/Helper';

const useHeader = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openCurrencyModal, setOpenCurrencyModal] = useState<boolean>(false)
    const [selectedLanguage, setSelectedLanguage] = useState<string>('ENG');
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');



    const handleCurrencyOpen = (): void => {
        setOpenCurrencyModal(true);
    };

    const handleCurrencyClose = (): void => {
        setOpenCurrencyModal(false);
    };

    const handleLanguageSelect = (code_: string, name: string) => {
        setSelectedLanguage(code_);
        localStorage.setItem('_lang', code_);
        window.location.reload()
    };

    const handleCurrencySelect = (curr_: string) => {
        setSelectedCurrency(curr_);
        localStorage.setItem('_currency', curr_);
        window.location.reload()
    };



    useEffect(() => {
        const currency = GetFromLocalStorage('_currency');
        const lang = GetFromLocalStorage('_lang');
        if (currency != null)
            setSelectedCurrency(currency);

        if (currency != null)
            setSelectedLanguage(lang);
    }, [])



    return {
        isDrawerOpen,
        openCurrencyModal,
        selectedLanguage,
        selectedCurrency,
        setIsDrawerOpen,
        handleCurrencyOpen,
        handleCurrencyClose,
        handleLanguageSelect,
        handleCurrencySelect
    }
}

export default useHeader