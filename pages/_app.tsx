import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Ectomonster</title>
            </Head>
            <Component {...pageProps} />
        </SessionProvider>
    )
}
