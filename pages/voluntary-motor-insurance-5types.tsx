import { FC } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

import { VoluntaryMotorInsurance5TypesComp } from '../components'

const VoluntaryMotorInsurance5Types:FC = () => {
  return (
    <VoluntaryMotorInsurance5TypesComp></VoluntaryMotorInsurance5TypesComp>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})

export default VoluntaryMotorInsurance5Types;