import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Toaster } from "../components/ui/toaster";
import { UserProvider } from '../context/userContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next App",
  description: "Created By Adrig Ai",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.apiKey = 'bb5b35f0-119e-4408-a5ef-4da4c967d9b1';`,
          }}
        />

        <script src="https://arivubot.tipflow.pro/chatbot.min.js"></script>
      </head>

      <body className={`${inter.className}`}>
        <Toaster />
        <UserProvider>
          <Providers>{children}</Providers>
        </UserProvider>
      </body>
    </html>
  );
}
