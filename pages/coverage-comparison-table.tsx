import { FC } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

import { CoverageComparisonTableComp } from '../components'

const CoverageComparisonTable:FC = () => {
  return (
    <CoverageComparisonTableComp></CoverageComparisonTableComp>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})

export default CoverageComparisonTable;