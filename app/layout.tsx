import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "@/context/AuthContext";
import { PreferencesContextProvider } from "@/context/PreferencesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Info Chronicle",
  description: "Read latest news",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <AuthContextProvider>
          <PreferencesContextProvider>
            <Header />
            {children}
          </PreferencesContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
