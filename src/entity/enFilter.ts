interface enFilter {
    ListOfAirline: filter[],
    ListOfStop: filter[],
    ListOfLayoverAirports: filter[],
}

type filter = {
    Id: string,
    Name: string,
    MinPrice: number
}