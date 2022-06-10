import { FC } from 'react';

import { PersonalInfoComp } from '../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

const PersonalInfo:FC = () => {
  return (
    <PersonalInfoComp></PersonalInfoComp>
  )
}

export default PersonalInfo;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})