import { DataProvider } from "./_context/DataContext";
import "./globals.css";

export const metadata = {
  title: "Note taking app",
  description: "Notes!, Notes!, Notes!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
