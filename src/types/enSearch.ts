type enSearch = {
    tripType: number,
    fromLocation: string,
    toLocation: string,
    fromDate: Date,
    toDate: Date | null,
    adultCount: number,
    childCount: number,
    infantCount: number,
    cabinClass: number,
    currency: string | 'USD',
    airlineCode: string | null
};