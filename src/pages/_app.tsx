import '@/utils/i18n'
import '@/constants/globals.css'

import { type AppProps } from 'next/app'
import Head from 'next/head'
import { NotoSansTC, WorkSans } from '@/constants/fonts'

import { Toaster } from '@/components/Toaster'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{'tw-invoice'}</title>
        <meta name={'description'} content={'Easily Check Taiwan Invoice Lottery Tool.'} />
        <meta name={'viewport'} content={'width=device-width, initial-scale=1'} />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --work-sans: ${WorkSans.style.fontFamily};
                --noto-sans-tc: ${NotoSansTC.style.fontFamily};
              }
            `
          }}
        />
      </Head>

      <Component {...pageProps} />

      <Toaster />
    </>
  )
}
