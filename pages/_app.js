import NProgress from "nprogress";
import Router from "next/router";
import '../styles/globals.css'
import Layout from '../components/Layout'
import store from '../redux/store'
import {Provider} from 'react-redux'

function MyApp({ Component, pageProps }) {
  NProgress.configure({showSpinner: true})

  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })

  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })


  return (
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
    
    
  )
}

export default MyApp
