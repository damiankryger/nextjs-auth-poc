import type {Metadata} from "next";
import "./globals.css";
import {Providers} from "@/app/providers";


export const metadata: Metadata = {
  title: "Next.js Auth PoC",
  description: "Proof of concept application to test how the authentication in Next.js works using the Prisma ORM and PostgreSQL as a database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='light'>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
