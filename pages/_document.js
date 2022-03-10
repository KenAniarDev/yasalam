import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=G-QT67FEW8BH'
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-QT67FEW8BH');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
