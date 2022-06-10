import '../public/assets/css/style.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/swiper.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BaseLayoutComp } from '../components';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';

const MyApp = ({ Component, pageProps }) => {
  return (
    <BaseLayoutComp>
      <Component {...pageProps} />
    </BaseLayoutComp>
  )
}

export default appWithTranslation(MyApp, nextI18NextConfig);
