import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const useAuthModal = () => {
    const { data: session, status } = useSession();
    const [openLoginModal, setLoginModal] = useState<boolean>(false);

    const handleOpen = (): void => {
        setLoginModal(true);
    };


    const handleClose = (): void => {
        setLoginModal(false);
    };


    return {
        session,
        status,
        openLoginModal,
        handleOpen,
        handleClose,
        signOut
    }
}

export default useAuthModal