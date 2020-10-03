import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps /* , AppContext */ } from 'next/app';

import { Provider } from 'react-redux';
import { Provider as AuthProvider } from 'next-auth/client';
import store from '../store/store';
import NavBar from '../components/NavBar';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <AuthProvider session={session}>
      <Provider store={store}>
        <NavBar />
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
