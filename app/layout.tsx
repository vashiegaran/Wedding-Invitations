import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lauvindra & Divashini's Wedding Invitation",
  description:
    "Join Lauvindra & Divashini for their wedding celebration. Find the venue, schedule, and contacts in one beautiful invitation.",
  openGraph: {
    title: "Lauvindra & Divashini's Wedding Invitation",
    description:
      "Celebrate Lauvindra & Divashini's love story with all the details you need for their wedding celebration.",
    type: "website",
    images: [
      {
        url: "/groom_bride.png",
        width: 1200,
        height: 630,
        alt: "Lauvindra and Divashini",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lauvindra & Divashini's Wedding Invitation",
    description:
      "Celebrate Lauvindra & Divashini's love story with all the details you need for their wedding celebration.",
    images: ["/groom_bride.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

