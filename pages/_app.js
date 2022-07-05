import '../styles/globals.css'
import Layout from './components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <h1>나는 모든 페이지에 들어가</h1>
    </Layout>
  )

}

export default MyApp
