import { Component, ReactNode } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

interface RootlayoutIProps {
  children: ReactNode;
}
const Rootlayout = ({ children }: RootlayoutIProps) => {
  return (
    <SessionProvider>
      {/* {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <>
          <Navbar />

          <Component {...pageProps} />
        </>
      )} */}
    </SessionProvider>
  );
};
export default Rootlayout;
