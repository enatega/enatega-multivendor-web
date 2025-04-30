import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Script from "next/script";


export const metadata = {
  title: "Enatega Multivendor",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/png" href="/favsicon.png" />
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
