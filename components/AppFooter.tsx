/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/dist/client/router';
import { NAVIGATION } from '../utilities/constants';

const Footer: FC = () => {
  const router = useRouter();
  const { asPath, locale, isReady } = useRouter();
  const { t } = useTranslation('common');
  const [language, setLanguage] = React.useState(locale === 'en'? 'English' : 'ภาษาไทย');
  const [open, setOpen] = React.useState(false);
  const [baseUrl, setBaseUrl] = useState<string>();

  useEffect(() => {
    if (!isReady) {return}
    setBaseUrl(window.location.origin !== 'http://localhost:3000' ? window.location.origin : 'https://dev.otoz.biz')
  }, [isReady])

  const handleChange = (e) => {
    handleLangChange(e.target.value);
    setLanguage(e.target.value);
  };

  const handleLangChange = (lang) => {
    const langShort = lang === 'English' ? 'en' : 'th';
    if(locale !== langShort) {
      router.push(asPath, '', {locale: langShort, scroll : true})
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <footer className="w-100">
      <div className="footer-graphic"></div>
      <div className="footer-white">
        <a target="_blank" className="line-icon-fixed"></a>
        <div className="top">
          <div className="container">
            <div className="row">
              <div className="col col-lg-40 col-sm-100">
                <div className="footer-address">
                  <div className="footer-logo mg-b-25">
                    <Link href="/">
                      <a className="float-start">
                        <img src="/insurance/logo.svg" alt="drivemate logo" />
                      </a>
                    </Link>
                    <div className="sha float-start">
                      <img alt="sha" src="/insurance/sha-logo.svg" />
                    </div>
                    <div className="certification float-start">
                      <a target="_blank" href="/insurance/drivemate-insurance-certificate.jpeg">
                        <img alt="Drivemate Insurance Certification" src="/insurance/certification-logo.jpg" />
                      </a>
                    </div>
                  </div>
                  <div className="address-wrap">
                    <p>{t('TEXT_DM')}
                      <br />
                      {t('TEXT_ADDRESS')}
                      <Link href="tel:02-270-5555">
                        <a className="d-block mt-4">02-270-5555</a>
                      </Link>
                      <span className="float-start me-1">Line:</span>
                      <Link href="https://page.line.me/tfg5201b">
                        <a className="float-start" target="_blank">@autosmart</a>
                      </Link>
                    </p>
                  </div>
                  <div className="download-app">
                    <Link href="https://goo.gl/6pPTDa">
                      <a className="app-store apple" rel="nofollow" target="_blank"></a>
                    </Link>
                    <Link href="https://goo.gl/HbL5NF">
                      <a className="app-store play" rel="nofollow" target="_blank"></a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col col-sm-50">
                <div className="h4">{t('HOME')}</div>
                <ul className="mg-b-25">
                  <li><a href={baseUrl+NAVIGATION.ABOUT_US}>{t('ABOUT')}</a></li>
                  <li><a href="https://www.drivemate.asia/blog/">{t('BLOG')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.CONTACT_US}>{t('CONTACT_US')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.PRIVACY_POLICY}>{t('FOOTER_PRIVACY_POLICY')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.FAQS}>{t('FAQs')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.BMW}>{t('BMW')}</a></li>
                </ul>
              </div>
              <div className="col col-sm-50">
                <div className="h4">{t('DISCOVER')}</div>
                <ul className="mg-b-25">
                  <li><a href={baseUrl+NAVIGATION.PROMOTION}>{t('CHECK_OUR_PROMOTIONS')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.INSURANCE}>{t('INSURANCE')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.TERMS_OF_USE}>{t('TERMS_OF_SERVICE')}</a></li>
                  {/* <li><Link href="/"><a target="_blank">Download Rental Agreement</a></Link></li>
                  <li><Link href="/"><a>Letter Of Consent</a></li> */}
                </ul>
              </div>
              <div className="col col-sm-100">
                <div className="last-col-wrap">
                  <div className="social-wrap">
                    <div className="h4">{t('SOCIAL')}</div>
                    <div className="social-icons">
                      <Link href="https://www.facebook.com/drivemateasia/">
                        <a target="_blank">
                          <span className="fb"></span>
                        </a>
                      </Link>
                      <Link href="https://line.me/ti/p/%40drivemate">
                        <a target="_blank">
                          <span className="line"></span>
                        </a>
                      </Link>
                      <Link href="tel:+6620263238">
                        <a target="_blank" className="phone">
                          <span className="phone"></span>
                        </a>
                      </Link>
                      <Link href="https://instagram.com/drivemate.asia?igshid=13gxt405bb2e">
                        <a target="_blank" className="insta">
                          <span className="insta"></span>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="language-switch">
                    <div className="h4 mb-2">{t('LANGUAGE')}</div>
                    <FormControl>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={language}
                        onChange={handleChange}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left"
                          },
                          getContentAnchorEl: null
                        }}
                        >
                        <MenuItem value={'English'}>
                          <div className="lang-item">
                            <span className="flag-img">
                              <img src="/insurance/flags/flag-en.svg" alt="Eng" />
                            </span>
                            <span className="language-name"> English </span>
                          </div>
                        </MenuItem>
                        <MenuItem value={'ภาษาไทย'}>
                          <div className="lang-item">
                            <span className="flag-img">
                              <img src="/insurance/flags/flag-th.svg" alt="ภาษาไทย" />
                            </span>
                            <span className="language-name">ภาษาไทย</span>
                          </div>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="bottom">
          <div className="container">
            <div className="row">
              <div className="col col-sm-50">
                <h4 className="h4">{t('CAR_RENTAL_CITY')}</h4>
                <ul className="mg-b-25">
                  <li><a href={baseUrl+NAVIGATION.CAR_RENTAL+'/krabi'}>{t('RENT_CAR_KRABI')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.CAR_RENTAL+'/phuket'}>{t('RENT_CAR_PHUKET')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.CAR_RENTAL+'/chiangmai'}>{t('RENT_CAR_CHIANG')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.CAR_RENTAL+'/pattaya'}>{t('RENT_CAR_PATTAYA')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.CAR_RENTAL+'/bangkok'}>{t('RENT_CAR_BANGKOK')}</a></li>
                </ul>
              </div>
              <div className="col col-sm-50">
                <h4 className="h4">{t('CAR_WITH_DRIVER_CITY')}</h4>
                <ul className="mg-b-25">
                  <li><a href={baseUrl+NAVIGATION.CAR_WITH_DRIVER+'/bangkok'}>{t('RENT_CAR_BANGKOK')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.CAR_WITH_DRIVER+'/chiangmai'}>{t('RENT_CAR_CHIANG')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.CAR_WITH_DRIVER+'/phuket'}>{t('RENT_CAR_PHUKET')}</a></li>
                </ul>
              </div>
              <div className="col col-sm-50">
                <h4 className="h4">{t('AIRPORT_TRANSFER')}</h4>
                <ul className="mg-b-25">
                  <li><a href={baseUrl+NAVIGATION.AIRPORT_TRANSFER+'/donmueang'}>{t('DONMUEANG_AIRPORT')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.AIRPORT_TRANSFER+'/phuket'}>{t('PHUKET_AIRPORT')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.AIRPORT_TRANSFER+'/chiangmai'}>{t('CHIANGMAI_AIRPORT')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.AIRPORT_TRANSFER+'/suvarnabhumi'}>{t('SUVARNABHUMI_AIRPORT')}</a></li>
                </ul>
              </div>
              <div className="col col-sm-50">
                <h4 className="h4">{t('OUR_SERVICES')}</h4>
                <ul className="mg-b-25">
                  <li><a href={baseUrl+NAVIGATION.CAR_RENTAL}>{t('CAR_RENTAL')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.MONTHLY_RENTAL}>{t('SUBSCRIPTION')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.CAR_WITH_DRIVER}>{t('CAR_WITH_DRIVER')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.AIRPORT_TRANSFER}>{t('AIRPORT_TRANSFERS')}</a></li>
                </ul>
              </div>
              <div className="col col-sm-50">
                <h4 className="h4">{t('HELP_CENTER')}</h4>
                <ul className="mg-b-25">
                  <li><a href={baseUrl+NAVIGATION.FAQS}>{t('HOW_TO_BOOK_CAR')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.FAQS}>{t('PAYMENT')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.FAQS}>{t('CANCELLATION_POLICY')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.SUPER_HOST}>{t('SUPER_HOST')}</a></li>
                  <li><a href={baseUrl+NAVIGATION.INSTANT_BOOKING}>{t('INSTANT_BOOKING')}</a></li>
                </ul>
              </div>
            </div>
            <hr />
            <p className="w-100 dis-block mb-0 copyright-text">{t('COPYRIGHT_2')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;