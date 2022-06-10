import { FC } from 'react';

import { BrandSelectionComp } from '../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

const BrandSelection:FC = () => {
  return (
    <BrandSelectionComp></BrandSelectionComp>
  )
}

export default BrandSelection;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})