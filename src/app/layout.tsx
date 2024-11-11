import React, {ReactNode} from "react";
import type {Metadata} from "next";

import AppProviders from "@/lib/app-providers";

import 'react-toastify/dist/ReactToastify.css';

import './globals.css';

type Props = {
    children: ReactNode;
};

export const metadata: Metadata = {
    title: 'My admin panel',
}

export default async function RootLayout({children}: Props) {

    return (
        <html lang="en">
        <body>
        <AppProviders options={{key: 'mui'}}>
            {children}
        </AppProviders>
        </body>
        </html>
    )
}
