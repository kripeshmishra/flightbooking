
import React from 'react';
import LoginWrapper from '@/components/login/LoginWrapper';

export const metadata = {
    title: `${process.env.SITE_NAME} - Login`,
}

const page = () => {
    return (
        <LoginWrapper />
    )
}

export default page;