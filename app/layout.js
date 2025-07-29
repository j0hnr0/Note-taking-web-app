import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./contexts/auth-provider";
import { Providers } from "./provider/providers";
import { ReduxProvider } from "./provider/redux-provider";
import TanstackProvider from "./provider/tanstack-provider";
import { ThemesProvider } from "./provider/themes-provider";
import { FontProvider } from "./contexts/font-context";

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

const serif = localFont({
  src: [
    {
      path: "../public/fonts/noto-serif/static/NotoSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/noto-serif/static/NotoSerif-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/noto-serif/static/NotoSerif-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/noto-serif/static/NotoSerif-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-serif",
  display: "swap",
});

const monoSpace = localFont({
  src: [
    {
      path: "../public/fonts/source-code-pro/static/SourceCodePro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/source-code-pro/static/SourceCodePro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/source-code-pro/static/SourceCodePro-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/source-code-pro/static/SourceCodePro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-monospace",
  display: "swap",
});



export const metadata = {
  title: "Note taking app",
  description: "Notes!, Notes!, Notes!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${serif.variable} ${monoSpace.variable} antialiased`}>
        <ThemesProvider>
          <FontProvider>
            <Providers>
              <AuthProvider>
                <TanstackProvider>
                  <ReduxProvider>{children}</ReduxProvider>
                </TanstackProvider>
              </AuthProvider>
            </Providers>
          </FontProvider>
        </ThemesProvider>
      </body>
    </html>
  );
}
