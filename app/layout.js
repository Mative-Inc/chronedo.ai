import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BadgeSection from "@/components/BadgeSection";
import { UserProvider } from "@/context/UserContext";
import Providers from "./Providers";
import { ImageProvider } from "@/context/ImageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chronedo.AI",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >

        <Providers>
          <ImageProvider>
            <UserProvider>{children}</UserProvider>
          </ImageProvider>
        </Providers>
      </body>
    </html>
  );
}
