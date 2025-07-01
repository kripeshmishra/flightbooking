import DesktopHome from '@/components/desktop/home/DesktopHome'
import React from 'react'
import '../../public/css/home.css'
import useDeviceDetect from '@/utilty/useDeviceDetect'
import MobileHome from '@/components/mobile/home/MobileHome'

const page = () => {
  const isMobile: boolean = useDeviceDetect();
  return (
    <>
      {
        isMobile ? (<MobileHome />) : <DesktopHome />
      }
    </>
  )
}

export default page