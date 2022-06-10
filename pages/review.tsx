import { FC } from 'react';

import { ReviewComp } from '../components'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config.js';

const Review:FC = () => {
  return (
    <ReviewComp></ReviewComp>
  )
}

export default Review;

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common'], nextI18NextConfig),
  },
})