import { blGetCountryList, blGetStateList } from '@/businesslogic/blMisc';
import { CardType, GenderType } from '@/utilty/Enums';
import React, { createContext, useContext, useState, ReactNode, useEffect, SetStateAction, Dispatch } from 'react';


type FormData = {
  contact: string;
  DOB: Date | null;
  countryCodes: string;
  email: string;
  gender: any;
  firstAndMiddleName: string;
  lastName: string;
};

type PaymentDetails = {
  cardType: string;
  name: string;
  cardNumber: string;
  expirationDate: any;
  cvv: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
};

type SelectedPlan = {
  isAddedToTrip: boolean;
  selectedPlan: number | null;
};


type PaymentContextProps = {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  paymentDetails: PaymentDetails;
  setPaymentDetails: Dispatch<SetStateAction<PaymentDetails>>;
  selectedPlan: SelectedPlan;
  setSelectedPlan: Dispatch<SetStateAction<SelectedPlan>>;
  selectedCardType: CardType;
  setSelectedCardType: Dispatch<SetStateAction<CardType>>;
  handleBack: () => void;
  handleNext: () => void;
  useScrollToTop: () => void;
  goToFirstForm
  : () => void;
  steps: string[];
  validateCardNumber: (value: string, cardType: CardType) => boolean | string;
  countryList: any;
  stateList: any;
};

const PaymentContext = createContext<PaymentContextProps | undefined>(undefined);

type PaymentProviderProps = {
  children: ReactNode;
};

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {

  const [countryList, setCountryList] = useState<any>([]);
  const [stateList, setStateList] = useState<any>([]);

  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Contact', 'Optionals', 'Payment'];

  useEffect(() => {
    blGetCountryList(setCountryList);
  }, []);

  useEffect(() => {
    blGetStateList(setStateList);
  }, []);


  const [formData, setFormData] = useState<FormData>({
    contact: '',
    DOB: null,
    countryCodes: '',
    email: '',
    gender: GenderType.MR,
    firstAndMiddleName: '',
    lastName: '',
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardType: '',
    name: '',
    cardNumber: '',
    expirationDate: null,
    cvv: '',
    address: '',
    country: 'us',
    state: 'AK',
    city: '',
    postalCode: '',
  });

  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan>({
    isAddedToTrip: false,
    selectedPlan: null,
  });

  const [selectedCardType, setSelectedCardType] = useState<CardType>(CardType.Visa);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const goToFirstForm = () => {
    setActiveStep(0);
  };
  const useScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  };


  const validateCardNumber = (value: string, cardType: CardType): boolean | string => {
    let regex;
    switch (cardType) {
      case CardType.Visa:
        regex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        break;

      case CardType.Mastercard:
        regex = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
        break;

      case CardType.AmexCard:
        regex = /^3[47][0-9]{13}$/;
        break;

      case CardType.DinersClubCard:
        regex = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
        break;

      default:
        regex = /^\d{13,16}$/;
    }

    return regex.test(value) || 'Invalid Card number';
  };

  const contextValue: PaymentContextProps = {
    activeStep,
    setActiveStep,
    formData,
    setFormData,
    paymentDetails,
    setPaymentDetails,
    selectedPlan,
    setSelectedPlan,
    selectedCardType,
    setSelectedCardType,
    handleNext,
    handleBack,
    goToFirstForm,
    steps,
    useScrollToTop,
    validateCardNumber,
    countryList,
    stateList
  };

  return <PaymentContext.Provider value={contextValue}>{children}</PaymentContext.Provider>;
};

export const usePaymentContext = (): PaymentContextProps => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePaymentContext must be used within a PaymentProvider');
  }
  return context;
};
