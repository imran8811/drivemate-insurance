import { FC } from 'react';

import { SummaryComp } from '../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

const Summary:FC = () => {
  return (
    <SummaryComp></SummaryComp>
  )
}

export default Summary;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})