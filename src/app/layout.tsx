import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Muslim Care",
  description:
    "Providing safe, reliable, and culturally sensitive care for Muslim communities. Find trusted caregivers, nannies, and babysitters who understand and respect your values.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-stone-200">{children}</body>
    </html>
  );
}
