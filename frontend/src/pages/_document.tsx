import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json"></link>
        <link rel="apple-touch-icon" href="/icon.png"></link>
      </Head>
      <body className='dark'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
