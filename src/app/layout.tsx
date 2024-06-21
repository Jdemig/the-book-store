import { Inter } from "next/font/google";
import "./globals.css";
import { RootStoreProvider } from "../stores/react";
import { Metadata } from "next";
import NavBar from "@/components/NavBar";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Books R Us",
  description: "The place for all your books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootStoreProvider>
            <NavBar />
            {children} 
        </RootStoreProvider>
      </body>
    </html>
  );
}
