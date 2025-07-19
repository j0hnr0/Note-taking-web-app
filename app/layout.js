import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./contexts/auth-provider";
import { Providers } from "./provider/providers";
import { ReduxProvider } from "./provider/redux-provider";
import TanstackProvider from "./provider/tanstack-provider";
import { ThemesProvider } from "./provider/themes-provider";

const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/static/Inter_18pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/static/Inter_18pt-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/static/Inter_18pt-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/inter/static/Inter_18pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Note taking app",
  description: "Notes!, Notes!, Notes!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemesProvider>
          <Providers>
            <AuthProvider>
              <TanstackProvider>
                <ReduxProvider>{children}</ReduxProvider>
              </TanstackProvider>
            </AuthProvider>
          </Providers>
        </ThemesProvider>
      </body>
    </html>
  );
}
