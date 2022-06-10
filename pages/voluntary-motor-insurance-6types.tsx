import { FC } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

import { VoluntaryMotorInsurance6TypesComp } from '../components'

const VoluntaryMotorInsurance6Types:FC = () => {
  return (
    <VoluntaryMotorInsurance6TypesComp></VoluntaryMotorInsurance6TypesComp>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})

export default VoluntaryMotorInsurance6Types;