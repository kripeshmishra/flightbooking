
import React from 'react'
import '../../../public/css/vacations.css'
import useDeviceDetect from '@/utilty/useDeviceDetect'
import DesktopVacations from '@/components/desktop/vacations/DesktopVacations'
import MobileVacations from '@/components/mobile/vacations/MobileVacations'

const page = () => {
    const isMobile: boolean = useDeviceDetect();
    return (
        <>
            {
                isMobile ? (<MobileVacations />) : <DesktopVacations />
            }
        </>
    )
}

export default page