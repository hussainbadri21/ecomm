import type { Metadata } from "next";
import Navbar from "./_components/Navbar";
import Banner from "./_components/Banner";
import "./globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
    title: "ECOMMERCE",
    description: "Ecommerce application for selecting your favourite categories",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <TRPCReactProvider>
            <html lang="en">
                <body className='m-0 p-0'>
                    <Navbar />
                    <Banner />
                    <ToastContainer />
                    {children}
                </body>
            </html>
        </TRPCReactProvider>
    );
}
