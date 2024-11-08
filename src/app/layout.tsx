import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "./provider";
import { Toaster } from "../components/ui/toaster";

export const metadata = {
  title: "Next App",
  description: "Created By Adrig Ai",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
