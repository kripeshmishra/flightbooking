import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const response = await fetch(`${process.env.cws_url}/countrylist`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' });
    }
}



// export async function middleware(request: Request) {

//     const url = new URL(request.url);
//     const path = url.pathname.slice(1)

//     if (path === 'countrylist') {
//         try {
//             const response = await fetch(`${process.env.cws_url}/countrylist`);
//             if (!response.ok) {
//                 throw new Error(`API error: ${response.status}`);
//             }
//             const data = await response.json();
//             return NextResponse.json(data);
//         } catch (error) {
//             return NextResponse.json({ error: 'An error occurred fetching countries' });
//         }
//     } else if (path === 'statelist') {
//         try {
//             const response = await fetch(`${process.env.cws_url}/statelist`);
//             if (!response.ok) {
//                 throw new Error(`API error: ${response.status}`);
//             }
//             const data = await response.json();
//             return NextResponse.json(data);
//         } catch (error) {
//             return NextResponse.json({ error: 'An error occurred fetching states' });
//         }
//     }
// }