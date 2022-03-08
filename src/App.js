import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}
