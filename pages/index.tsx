import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import Header from '../components/Header/Header';
import HomePage from './home';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <HomePage></HomePage>
        </>
    );
}
