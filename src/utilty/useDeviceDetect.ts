
import { headers } from 'next/headers';

export default function useDeviceDetect() {
    const headersList = headers();
    const userAgent = headersList.get('user-agent');

    const isMobileWidth = typeof window !== 'undefined' && window.innerWidth < 768;

    const isMobile = isMobileWidth || Boolean(userAgent?.match(
        /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
    ));

    return isMobile;
}
