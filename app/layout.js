import "./globals.css";
import styles from "./page.module.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import PwaPrompt from "@/components/PwaPrompt";

export const metadata = {
  title: "Avalon",
  description: "A Companion app for Avalon big box edition",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa", "boardgames", "avalon"],
  authors: [
    {
      name: "Laith Alwani",
      url: "https://www.laithalwani.ca",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/box.webp" },
    { rel: "icon", url: "/box.webp" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Toaster />
          <Navbar />
          <PwaPrompt />
          <main className={styles.main}>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
