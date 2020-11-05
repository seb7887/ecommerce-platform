import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="Your description" />
          <meta name="keyword" content="your, keywords" />
        </Head>
        <body className="font-sans">
          <script src="dark-mode.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}