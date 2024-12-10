import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProviders from '../redux/Provider';
import Header from "./component/header";
import Footer from "./component/footer";


// Load fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata
export const metadata: Metadata = {
  title: "Shadow Company",
  description: "Welcome to Shadow Company",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProviders>
        <Header /> {/* Fixed header import */}
        {children}
        <Footer />
        </ReduxProviders>
      </body>
    </html>
  );
}
