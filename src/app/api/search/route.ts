import { NextResponse } from 'next/server';
import listingResult from '../../../staticData/listingResult.json'

export async function GET(request: Request) {
    const response = {
        "Filter": listingResult.Filter,
        "IsSearchComplete": listingResult.IsSearchComplete,
        "Contract": listingResult.Contract,
        "ListContract": listingResult.ListContract,
        "ErrorResponse": listingResult.ErrorResponse,
        "SearchRequest": listingResult.SearchRequest
    }
    return NextResponse.json(response);
}