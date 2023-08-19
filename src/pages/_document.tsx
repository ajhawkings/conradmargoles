import { Head, Html, Main, NextScript } from 'next/document'

export default function Document () {
  return (
    <Html lang="en">
      <Head>
        <meta name='theme-color' content='#ffffff' />
        <link rel='icon' href='favicon.ico' />
        <link rel='icon' href='favicon_alt.ico' media="(prefers-color-scheme: dark)"/>
        {/* Search Engines */}
        <meta name='description' content='Conrad Margoles Architects' />
        <meta name='image' content='/images/handwritten/CAArchitects_Logo.png' />
        {/* Schema.org for Google */}
        <meta itemProp='name' content='Conrad Margoles Architects' />
        <meta itemProp='description' content='Conrad Margoles Architects' />
        <meta itemProp='image' content='/images/handwritten/CAArchitects_Logo.png' />
        {/* Open Graph (Facebook, Discord, SMS) */}
        <meta property='og:title' content='Conrad Margoles Architects' />
        <meta property='og:description' content='Conrad Margoles Architects' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://conradmargoles.com' />
        <meta property='og:image' content='/images/handwritten/CAArchitects_Logo.png' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:width' content='993' />
        <meta property='og:image:height' content='277' />
        <meta property='og:image:alt' content='Conrad Margoles Architects logo' />
        <meta property='og:locale' content='en_GB' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
