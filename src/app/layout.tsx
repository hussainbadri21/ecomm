'use client'
import type { Metadata } from "next";
import Navbar from "./_components/Navbar";
import Banner from "./_components/Banner";
import "./globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '~/app/utils/userContext';
import { useState } from "react";



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [userData, setUserData] = useState({});
    return (
        <TRPCReactProvider>
            <UserContext.Provider value={{ userData, setUserData }}>
                <html lang="en">
                    <body className='m-0 p-0'>
                        <Navbar />
                        <Banner />
                        <ToastContainer />
                        {children}
                    </body>
                </html>
            </UserContext.Provider>
        </TRPCReactProvider>
    );
}
