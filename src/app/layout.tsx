import type { Metadata } from "next";
import Navbar from "./_components/Navbar";
import Banner from "./_components/Banner";
import "./globals.css";

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
        <html lang="en">
            <body className='m-0 p-0'>
                <Navbar />
                <Banner />
                {children}
            </body>
        </html>
    );
}
