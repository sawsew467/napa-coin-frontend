import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import LoginModal from '../../components/LoginModal';
import RegisterModal from '../../components/RegisterModal';

const HomePage = () => {
    const [isShowLoginModal, setIsShowLoginModal] = useState(true);
    const [isShowRegisterModal, setIsShowRegisterModal] = useState(false);
    return (
        <>
            <Header></Header>
            {isShowLoginModal && (
                <LoginModal
                    setIsShowRegisterModal={setIsShowRegisterModal}
                    setIsShowLoginModal={setIsShowLoginModal}
                ></LoginModal>
            )}
            {isShowRegisterModal && (
                <RegisterModal
                    setIsShowRegisterModal={setIsShowRegisterModal}
                    setIsShowLoginModal={setIsShowLoginModal}
                ></RegisterModal>
            )}
        </>
    );
};

export default HomePage;
