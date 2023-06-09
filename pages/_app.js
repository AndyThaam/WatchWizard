import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { store } from '../redux/store';
import '/public/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;