import { FC } from 'react';

import { ComparePackagesComp } from '../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

const ComparePolicies:FC = () => {
  return (
    <ComparePackagesComp></ComparePackagesComp>
  )
}

export default ComparePolicies;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})