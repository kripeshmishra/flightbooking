'use client'
import React, { useState, useEffect } from 'react'
import { blGetCountryList } from './blMisc';

const useTravelerDetails = () => {
  const [countryCode, setCountryCode] = useState('1');
  const [states, setStates] = useState('Alabama');
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const handleCountryCodeChange = (event: any) => {
    setCountryCode(event.target.value);
  };

  const handleStateChange = (event: any) => {
    setStates(event.target.value);
  };


  const [countryList, setCountryList] = useState<any>([]);


  useEffect(() => {
    blGetCountryList(setCountryList);
  }, []);




  return {
    countryCode, setCountryCode, handleCountryCodeChange, dateOfBirth, setDateOfBirth, setStates, handleStateChange, states, countryList,
  }
}

export default useTravelerDetails