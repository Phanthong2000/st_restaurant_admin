import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { connectWithSocket } from './utils/wssConnection';

export default function App() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      connectWithSocket();
    }
    return function () {
      return null;
    };
  }, []);
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}
