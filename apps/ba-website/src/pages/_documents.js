import { Html, Head, Main, NextScript } from "next/document";
import { Manrope } from "next/font/google/";
import localFont from "next/font/local/";

export default function Document() {
  const sfprodisplay = localFont({
    src: [
      {
        path: "../fonts/sf-pro-display/SF-Pro-Display-Regular.otf",
        weight: "400",
        style: "normal",
      },
      {
        path: "../fonts/sf-pro-display/SF-Pro-Display-RegularItalic.otf",
        weight: "400",
        style: "italic",
      },

      {
        path: "../fonts/sf-pro-display/SF-Pro-Display-Bold.otf",
        weight: "700",
        style: "normal",
      },
      {
        path: "../fonts/sf-pro-display/SF-Pro-Display-BoldItalic.otf",
        weight: "700",
        style: "italic",
      },
      {
        path: "../fonts/sf-pro-display/SF-Pro-Display-Heavy.otf",
        weight: "800",
        style: "normal",
      },
      {
        path: "../fonts/sf-pro-display/SF-Pro-Display-HeavyItalic.otf",
        weight: "800",
        style: "italic",
      },
    ],
    variable: "--sfprodisplay-font",
    fallback: ["system-ui"],
  });

  const manrope = Manrope({
    variable: "--manrope-font",
    subsets: ["latin"],
    fallback: ["system-ui"],
  });

  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${manrope.variable} ${sfprodisplay.variable} font-sans`}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
