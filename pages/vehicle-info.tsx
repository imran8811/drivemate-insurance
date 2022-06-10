import { FC } from 'react';

import { VehicleInfoComp } from '../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

const VehicleInfo:FC = () => {
  return (
    <VehicleInfoComp></VehicleInfoComp>
  )
}

export default VehicleInfo;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})