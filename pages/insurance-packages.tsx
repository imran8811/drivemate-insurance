import { FC } from 'react';

import { InsurancePackagesComp } from '../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

const Packages:FC = () => {
  return (
    <InsurancePackagesComp></InsurancePackagesComp>
  )
}

export default Packages;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})