import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import UtilRedux from './utils/UtilRedux';
import { connectWithSocket } from './utils/wssConnection';

export default function App() {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    if (loggedIn) {
      connectWithSocket();
    } else {
      navigate('/login');
    }
    return function () {
      return null;
    };
  }, []);
  return (
    <ThemeConfig>
      <UtilRedux />
      <ScrollToTop />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}
