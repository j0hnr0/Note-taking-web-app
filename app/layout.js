import "./globals.css";

export const metadata = {
  title: "Note taking app",
  description: "Notes!, Notes!, Notes!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
