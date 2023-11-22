import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Metrofy",
  description: "Your music app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="forest">
      <body>
        <div className="">
          <div className="w-full max-w-screen mb-14">
            <Navbar />
          </div>
          <div className="z-0">{children}</div>
        </div>
      </body>
    </html>
  );
}
