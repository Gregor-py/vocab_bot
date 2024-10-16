import type {Metadata} from "next";
import {PT_Sans} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'

const ptSans = PT_Sans({subsets: ["latin", "cyrillic"], weight: ["400", "700"]});

export const metadata: Metadata = {
    title: "Vocab bot",
    description: "",
};
// Oswald
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={ptSans.className}>
            {children}
            </body>
            </html>
        </ClerkProvider>
    );
}
