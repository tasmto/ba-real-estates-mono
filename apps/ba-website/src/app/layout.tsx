const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin={'true'}
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className={`font-sans`}>{children}</body>
    </html>
  );
};
export default RootLayout;
