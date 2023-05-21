import '../styles/global.css';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { store } from '../redux/store';
import { useCheckAuthQuery } from '../api/authApi/authApi';

const MyApp = ({ Component, pageProps }) => {
  const { isLoading, error } = useCheckAuthQuery();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push('/auth');
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
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
