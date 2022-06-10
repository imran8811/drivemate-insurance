import { FC } from 'react';

import { HomeComp } from '../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

const Home:FC = () => {
  return (
    <HomeComp></HomeComp>
  )
}

export default Home;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})