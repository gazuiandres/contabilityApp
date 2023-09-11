import { SessionProvider } from "next-auth/react";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster"
import MainLayout from "@/components/layout/MainLayout";
import { DatesProvider } from "@/context/dates";

import { Lato } from "next/font/google";

const lato = Lato({ weight: ["300", "400", "700", "900"], subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient()
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <DatesProvider>
          <MainLayout>
            <main className={`${lato.className}`}>
              <Component {...pageProps} />
            </main>
          </MainLayout>
        </DatesProvider>
        <Toaster/>
      </QueryClientProvider>
    </SessionProvider>
  );
}
