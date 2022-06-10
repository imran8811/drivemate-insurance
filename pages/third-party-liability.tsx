import { FC } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

import { ThirdPartyLiabilityComp } from '../components'

const ThirdPartyLiability:FC = () => {
  return (
    <ThirdPartyLiabilityComp></ThirdPartyLiabilityComp>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})

export default ThirdPartyLiability;