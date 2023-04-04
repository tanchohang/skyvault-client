import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import Navbar from 'components/navbar';
import { ReactElement, ReactNode } from 'react';
import { NextComponentType } from 'next';
import DashboardLayout from './dashboard/layout';
import { useRouter } from 'next/router';
import ErrorBoundary from 'components/ErrorBoundary';

interface ComponentPageIProps extends AppProps {
  Component: NextComponentType & { auth?: boolean };
}

export default function App({ Component, pageProps: { session, ...pageProps } }: ComponentPageIProps) {
  const { route } = useRouter();
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Auth>
      ) : (
        <>
          {route == '/login' || route == '/signup' ? '' : <Navbar />}
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </>
      )}
    </SessionProvider>
  );
}

export function Auth({ children }: { children: ReactElement }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
