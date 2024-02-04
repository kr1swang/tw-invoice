import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang={'en'}>
      <Head />
      <body className={'bg-gray-400 tracking-widest text-gray-800 antialiased'}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
