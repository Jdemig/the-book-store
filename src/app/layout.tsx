import "./globals.css";
import { RootStoreProvider } from "../stores/react";
import { Metadata } from "next";
import NavBar from "@/components/NavBar";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


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
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <RootStoreProvider>
          <NavBar />
          {children}
        </RootStoreProvider>
      </body>
    </html>
  );
}
