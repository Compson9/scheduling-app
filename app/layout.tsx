import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Avatar, AvatarFallback,  } from "@radix-ui/react-avatar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scheduling Platform",
  description: "A job-matching platform with scheduling features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 min-h-screen flex flex-col`}
      >
        <header className="bg-blue-600 text-white py-4 shadow">
          <div className="container flex justify-around mx-auto px-4">
            <Link className="font-bold text-2xl cursor-pointer" href="/">
            Xcelsz
            </Link>
            <h1 className="text-2xl font-bold">Scheduling Platform</h1>
            <Link className="border-2 rounded-full p-2" href="/">
            <Avatar className="h-5" >
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
            </Link>
           

          </div>
        </header>
        <main className="container mx-auto px-4 py-8 flex-grow">
          
          {children}
          </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Xcelsz Scheduling Platform. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
