import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const response = await fetch(`${process.env.cws_url}/statelist`);
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred' });
    }
}

