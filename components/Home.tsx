/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const Home: FC = () => {
  const  { t } = useTranslation();
  return (
    <div className="container">
      <div className="home-banner">
        <div className="row d-inline-block">
          <div className="col-md-7 float-end">
            <img src="/insurance/home-banner.png" alt="drivemate banner" />
          </div>
          <div className="col-md-5 float-start">
            <div className="title">{ t('HOMEPAGE_text_1') }</div>
            <Link href="/brand-selection" passHref>
              <button className="btn btn-primary">{ t('HOMEPAGE_text_2') }</button>
            </Link>
          </div>
        </div>
        <p>{ t('HOMEPAGE_text_3') }</p>
      </div>
      <div className="home-services">
        <div className="row mb-3">
        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
          <div className="home-services-detail">
              <img src="/insurance/home-services/adjust-work.svg" alt="drivemate insurance adjust work" />
              <div className="title">{ t('HOMEPAGE_text_4') }</div>
              <p>{ t('HOMEPAGE_text_5') }</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="home-services-detail">
              <img src="/insurance/home-services/pickup-services.svg" alt="drivemate insurance pickup services" />
              <div className="title">{ t('HOMEPAGE_text_6') }</div>
              <p>{ t('HOMEPAGE_text_7') }</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="home-services-detail">
              <img src="/insurance/home-services/special-promotion.svg" alt="drivemate insurance special promotion" />
              <div className="title">{ t('HOMEPAGE_text_8') }</div>
              <p>{ t('HOMEPAGE_text_9') }</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="home-services-detail">
              <img src="/insurance/home-services/spare-rental-services.svg" alt="drivemate insurance spare rental services" />
              <div className="title">{ t('HOMEPAGE_text_10') }</div>
              <p>{ t('HOMEPAGE_text_11') }</p>
            </div>
            <div className="home-services-detail d-lg-block d-md-none d-sm-none d-none">
              <img src="/insurance/home-services/online-services.svg" alt="drivemate insurance online services" />
              <div className="title">{ t('HOMEPAGE_text_16') }</div>
              <p>{ t('HOMEPAGE_text_17') }</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="home-services-detail">
              <img src="/insurance/home-services/types.svg" alt="drivemate insurance types" />
              <div className="title">{ t('HOMEPAGE_text_12') }</div>
              <p>{ t('HOMEPAGE_text_13') }</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="home-services-detail">
              <img src="/insurance/home-services/repair-center.svg" alt="drivemate insurance repair center" />
              <div className="title">{ t('HOMEPAGE_text_14') }</div>
              <p>{ t('HOMEPAGE_text_15') }</p>
            </div>
          </div>
          <div className="col-12 d-lg-none d-md-block">
            <div className="home-services-detail">
              <img src="/insurance/home-services/online-services.svg" alt="drivemate insurance online services" />
              <div className="title">{ t('HOMEPAGE_text_16') }</div>
              <p>{ t('HOMEPAGE_text_17') }</p>
            </div>
          </div>
        </div>
        <p>{ t('HOMEPAGE_text_18') }</p>
      </div>
    </div>
  )
}

export default Home;