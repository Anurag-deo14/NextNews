import '../styles/globals.scss';
import Layout from '../components/Layout/Layout';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { AuthUserProvider } from '../AuthUserContext';

// NProgress Customization
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

// Show a loading bar when changing routes
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AuthUserProvider>
  );
}

export default MyApp;
