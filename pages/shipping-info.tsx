import { FC } from 'react';

import { ShippingInfoComp } from '../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

const ShippingInfo:FC = () => {
  return (
    <ShippingInfoComp></ShippingInfoComp>
  )
}

export default ShippingInfo;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})