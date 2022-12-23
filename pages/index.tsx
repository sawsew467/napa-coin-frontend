import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import Header from '../components/Header/Header';
import UserDropdown from '../components/UserDropdown';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Header></Header>
            <LoginModal></LoginModal>
            {/* <RegisterModal></RegisterModal> */}
        </>
    );
}
