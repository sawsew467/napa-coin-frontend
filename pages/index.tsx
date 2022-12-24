import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import Header from '../components/Header/Header';
import UserDropdown from '../components/UserDropdown';
import HomePage from './home';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <HomePage></HomePage>
        </>
    );
}
