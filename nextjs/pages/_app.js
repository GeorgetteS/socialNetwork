import '../styles/global.css';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
// import { useRouter } from 'next/router';

import { store } from '../redux/store';
import { useCheckAuthQuery } from '../restApi/authApi/authApi';

import { socket } from '../socket';

const MyApp = ({ Component, pageProps }) => {
  const {
    isLoading,
    //  error,
    //  data
  } = useCheckAuthQuery();
  // const router = useRouter();

  // useEffect(() => {
  //   if (error) {
  //     router.push('/');
  //   }
  // }, [error, data, router]);

  useEffect(() => {
    socket.on('error', (message) => {
      console.error('Socket.IO Error:', message);
    });
    return () => {
      socket.off('error');
      socket.disconnect();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Component {...pageProps} />;
};

const withReduxStore = (WrappedComponent) => {
  const WithReduxStore = ({ ...props }) => {
    return (
      <Provider store={store}>
        <WrappedComponent {...props} />
      </Provider>
    );
  };

  return WithReduxStore;
};

export default withReduxStore(MyApp);
