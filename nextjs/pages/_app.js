import '../styles/global.css';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { store } from '../redux/store';
import { useCheckAuthQuery } from '../restApi/authApi/authApi';

import { socket } from '../socket';
import { Spin } from 'antd';

const MyApp = ({ Component, pageProps }) => {
  const { isLoading, error } = useCheckAuthQuery();
  const router = useRouter();

  useEffect(() => {
    if (error && router.pathname !== '/auth') {
      router.push('/auth');
    }
  }, [error]);

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
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}>
        <Spin />
      </div>
    );
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
