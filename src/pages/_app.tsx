import '../globals.css'
import type { AppProps } from 'next/app'
import { withTRPC } from "@trpc/next";
import {ServerRouter} from "~/server/router";
import {SessionProvider} from "next-auth/react";


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
  )
}

export default withTRPC<ServerRouter>({
  config({ ctx }) {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000/api/trpc"

    return {
      url,
      headers: {
        "x-ssr": "1"
      },
    };
  },
  ssr: true
})(MyApp);
