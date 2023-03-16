import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ComponentType } from 'react';
import DashboardLayout from './dashboard/layout';

type ComponentWithLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: ComponentType;
  };
};

export default function App({ Component, pageProps }: ComponentWithLayout) {
  return Component.PageLayout ? (
    <Component.PageLayout>
      <Component {...pageProps} />
    </Component.PageLayout>
  ) : (
    <Component {...pageProps} />
  );
}
