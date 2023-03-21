import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import { Header } from '@tanchohang/langtang-rcl';
import Navbar from 'components/navbar';

type ComponentWithLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: any;
  };
  session: any;
};

export default function App({
  Component,
  session,
  pageProps,
}: ComponentWithLayout) {
  return (
    <SessionProvider session={session}>
      {Component.PageLayout ? (
        <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout>
      ) : (
        <>
          <Navbar />

          <Component {...pageProps} />
        </>
      )}
    </SessionProvider>
  );
}
