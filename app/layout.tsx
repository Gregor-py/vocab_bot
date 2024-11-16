import type {Metadata} from "next";
import {PT_Sans} from "next/font/google";
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css'
import {ClerkProvider} from '@clerk/nextjs'
import {SkeletonTheme} from "react-loading-skeleton";
import { Toaster } from "@/components/ui/toaster"

const ptSans = PT_Sans({subsets: ["latin", "cyrillic"], weight: ["400", "700"]});

export const metadata: Metadata = {
    title: "Vocab bot",
    description: "",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <html lang="en">
                <body className={ptSans.className}>
                {children}
                <Toaster />
                </body>
                </html>
            </SkeletonTheme>
        </ClerkProvider>
    );
}
