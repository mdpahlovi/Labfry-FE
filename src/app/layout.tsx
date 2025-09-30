import "./globals.css";

import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import AuthGuard from "./AuthGuard";
import Provider from "./Provider";

const publicSans = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = { title: "LabFry" };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={publicSans.className}>
                <Provider>
                    <AuthGuard>{children}</AuthGuard>
                </Provider>
            </body>
        </html>
    );
}
