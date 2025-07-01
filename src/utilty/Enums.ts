export enum SignUpSource {
    FACEBOOK = 1,
    GOOGLE = 2,
    LINEDINE = 4,
}

export enum TripType {
    NONE = 0,
    ONE_WAY = 1,
    ROUND_TRIP = 2,
};


export const TripTypeLabel: any = new Map<TripType, string>([
    [TripType.NONE, ""],
    [TripType.ONE_WAY, "One Way"],
    [TripType.ROUND_TRIP, "Round Trip"]
]);


export enum CabinType {
    ECONOMY = 1,
    BUSINESS = 2,
    FIRST = 3,
    PREMIUM_ECONOMY = 4,
};


export const CabinTypeLabel: any = new Map<CabinType, string>([
    [CabinType.ECONOMY, "Economy"],
    [CabinType.BUSINESS, "Business"],
    [CabinType.FIRST, "First"],
    [CabinType.PREMIUM_ECONOMY, "Premium Economy"],
]);


export enum PopularFlightsCountries {
    USA = 1,
    ENGLAND = 2,
    CHINA = 3,
    UAE = 4,
    ITALY = 5,
    FRANCE = 6,
};


export const PopularFlightsCountriesLabel: any = new Map<PopularFlightsCountries, string>([
    [PopularFlightsCountries.USA, "USA"],
    [PopularFlightsCountries.ENGLAND, "England"],
    [PopularFlightsCountries.CHINA, "China"],
    [PopularFlightsCountries.UAE, "UAE"],
    [PopularFlightsCountries.ITALY, "Italy"],
    [PopularFlightsCountries.FRANCE, "France"],
]);


export enum VacationsCategories {
    DESERT = 1,
    BEACHES = 2,
    MOUNTAINS = 3,
    ADVENTURE = 4,
    CRUISES = 5,
};

export const VacationsCategoriesLabel: any = new Map<VacationsCategories, string>([
    [VacationsCategories.DESERT, "Desert"],
    [VacationsCategories.BEACHES, "Beaches"],
    [VacationsCategories.MOUNTAINS, "Mountains"],
    [VacationsCategories.ADVENTURE, "Adventure"],
    [VacationsCategories.CRUISES, "Cruises"],
]);

export enum TimePeriod {
    EARLYMORNING = 1,
    MORNING = 2,
    AFTERNOON = 3,
    EVENING = 4,
};
export const TimePeriodLabel: any = new Map<TimePeriod, string>([
    [TimePeriod.EARLYMORNING, "00 - 06"],
    [TimePeriod.MORNING, "06 - 12"],
    [TimePeriod.AFTERNOON, "12 - 18"],
    [TimePeriod.EVENING, "18 - 00"],
]);


export enum CardType {
    Visa = 'visa',
    Mastercard = 'mastercard',
    AmexCard = 'american-express',
    DinersClubCard = 'direct-debit',

}

export enum GenderType {
    MR = 1,
    MRS = 2,
    MS = 3,
};
export const GenderTypeLabel: any = new Map<GenderType, string>([
    [GenderType.MR, "Mr."],
    [GenderType.MRS, "Mrs."],
    [GenderType.MS, "Ms."],
]);