import { Inter } from "next/font/google";
import localfont from "next/font/local";
import Navbar from '@/components/Navbar';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const myFont = localfont({
  src: [
    {
      path: "../public/assets/fonts/myFont.ttf",
      weight: "900",
    },
  ],
  variable: "--font-myFont",
});

export const metadata = {
  title: "Portfolio",
  description: "Personal Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"
    className={`${myFont.variable} font-myFont`}
    >
      <Navbar />
      <body
      // className={inter.className}
      className=""
      >{children}</body>
    </html>
  );
}
