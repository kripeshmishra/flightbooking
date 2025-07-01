import DesktopListing from '@/components/desktop/listing/DesktopListing'
import React from 'react'
import '../../../public/css/search-listing.css'
import MobileListing from '@/components/mobile/listing/MobileListing'
import useDeviceDetect from '@/utilty/useDeviceDetect'

const page = () => {
    const isMobile: boolean = useDeviceDetect();
    return (
        <>
            {
                isMobile ? (<MobileListing />) : <DesktopListing />
            }
        </>
    )
}

export default page