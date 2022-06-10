/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

const TermsOfServicesComp: FC = () => {

  const { t } = useTranslation('common')
  const [selectedCss, setSelectedCss] = useState("1");


  const setCss = (e) => {
   setSelectedCss(e);
  }

  return (
    <div className="container terms-of-services">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-4 d-sm-block d-none">
          <div className="sticky-top">
          <a onClick={(e) => {setCss('1')}} className={classNames("btn", { "btn-primary": selectedCss === '1' })} href="#general"><span>1.</span> <span>{t('TERMS_AND_CONDITIONS_GENERAL')}</span></a>
          <a onClick={(e) => {setCss('2')}} className={classNames("btn", { "btn-primary": selectedCss === '2' })} href="#privacy"><span>2.</span> <span>{t('TERMS_AND_CONDITIONS_PRIVACY')}</span></a>
          <a onClick={(e) => {setCss('3')}} className={classNames("btn", { "btn-primary": selectedCss === '3' })} href="#representations"><span>3.</span> <span>{t('TERMS_AND_CONDITIONS_REPRESENTATIONS_ABOUT_CUSTOMER')}</span></a>
          <a onClick={(e) => {setCss('4')}} className={classNames("btn", { "btn-primary": selectedCss === '4' })} href="#user"><span>4.</span> <span>{t('TERMS_AND_CONDITIONS_USER_ACKNOWLEDGEMENTS')}</span></a>
          <a onClick={(e) => {setCss('5')}} className={classNames("btn", { "btn-primary": selectedCss === '5' })} href="#intellectual"><span>5.</span> <span>{t('TERMS_AND_CONDITIONS_INTELLECTUAL_PROPERTY_WITH_RESPECT_TO_THE_WEBSITE')}</span></a>
          <a onClick={(e) => {setCss('6')}} className={classNames("btn", { "btn-primary": selectedCss === '6' })} href="#restrictions"><span>6.</span> <span>{t('TERMS_AND_CONDITIONS_RESTRICTIONS_ON_USE_OF_THE_WEBSITE')}</span></a>
          <a onClick={(e) => {setCss('7')}} className={classNames("btn", { "btn-primary": selectedCss === '7' })} href="#limitations"><span>7.</span> <span>{t('TERMS_AND_CONDITIONS_LIMITATIONS_ON_AVAILABILITY')}</span></a>
          <a onClick={(e) => {setCss('8')}} className={classNames("btn", { "btn-primary": selectedCss === '8' })} href="#thirdParty"><span>8.</span> <span>{t('TERMS_AND_CONDITIONS_THIRD_PARTY_OFFERINGS')}</span></a>
          <a onClick={(e) => {setCss('9')}} className={classNames("btn", { "btn-primary": selectedCss === '9' })} href="#underwriter"><span>9.</span> <span>{t('TERMS_AND_CONDITIONS_WE_ARE_NOT_AN_INSURANCE_UNDERWRITER_OR_AGENT')}</span></a>
          <a onClick={(e) => {setCss('10')}} className={classNames("btn", { "btn-primary": selectedCss === '10' })} href="#disclaimer"><span>10.</span> <span>{t('TERMS_AND_CONDITIONS_DISCLAIMER_OF_WARRANTY')}</span></a>
          <a onClick={(e) => {setCss('11')}} className={classNames("btn", { "btn-primary": selectedCss === '11' })} href="#liability"><span>11.</span> <span>{t('TERMS_AND_CONDITIONS_LIMITATION_OF_LIABILITY')}</span></a>
          <a onClick={(e) => {setCss('12')}} className={classNames("btn", { "btn-primary": selectedCss === '12' })} href="#modifications"><span>12.</span> <span>{t('TERMS_AND_CONDITIONS_MODIFICATIONS')}</span></a>
          <a onClick={(e) => {setCss('13')}} className={classNames("btn", { "btn-primary": selectedCss === '13' })} href="#governing"><span>13.</span> <span>{t('TERMS_AND_CONDITIONS_GOVERNING_LAW_AND_JURISDICTION')}</span></a>
          <a onClick={(e) => {setCss('14')}} className={classNames("btn", { "btn-primary": selectedCss === '14' })} href="#cancellation"><span>14.</span> <span>{t('TERMS_AND_CONDITIONS_CANCELLATION_OF_POLICY')}</span></a>
          </div>
        </div>
        <div className="col-lg-9 col-md-8 col-sm-8">
        <div className="title1 w-100 d-block mb-4">{t('TERMS_AND_CONDITIONS')}</div>
          <p className="mb-3">{t('TERMS_AND_CONDITIONS_paragraph')}</p>
            <div className="w-100 d-inline-block mb-4 pt-3" id="general">
              <div className="title3 w-100 d-block mb-3">1. {t('TERMS_AND_CONDITIONS_GENERAL')}</div>
              <ul>
                <li>
                {t('TERMS_AND_CONDITIONS_GENERAL_p1')}
                </li>
                <li>
                {t('TERMS_AND_CONDITIONS_GENERAL_p2')}
                </li>
                <li>
                {t('TERMS_AND_CONDITIONS_GENERAL_p3')}
                </li>
                <li>
                {t('TERMS_AND_CONDITIONS_GENERAL_p4')}
                </li>
              </ul>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="privacy">
              <div className="title3 w-100 d-block mb-3">2. {t('TERMS_AND_CONDITIONS_PRIVACY')}</div>
              <p>{t('TERMS_AND_CONDITIONS_PRIVACY_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="representations">
              <div className="title3 w-100 d-block mb-3">3. {t('TERMS_AND_CONDITIONS_REPRESENTATIONS_ABOUT_CUSTOMER')}</div>
              <p>{t('TERMS_AND_CONDITIONS_REPRESENTATIONS_ABOUT_CUSTOMER_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="user">
              <div className="title3 w-100 d-block mb-3">4. {t('TERMS_AND_CONDITIONS_USER_ACKNOWLEDGEMENTS')}</div>
              <p>{t('TERMS_AND_CONDITIONS_USER_ACKNOWLEDGEMENTS_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="intellectual">
              <div className="title3 w-100 d-block mb-3">5. {t('TERMS_AND_CONDITIONS_INTELLECTUAL_PROPERTY_WITH_RESPECT_TO_THE_WEBSITE')}</div>
              <p>{t('TERMS_AND_CONDITIONS_INTELLECTUAL_PROPERTY_WITH_RESPECT_TO_THE_WEBSITE_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="restrictions">
              <div className="title3 w-100 d-block mb-3">6. {t('TERMS_AND_CONDITIONS_RESTRICTIONS_ON_USE_OF_THE_WEBSITE')}</div>
              <p>{t('TERMS_AND_CONDITIONS_RESTRICTIONS_ON_USE_OF_THE_WEBSITE_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="limitations">
              <div className="title3 w-100 d-block mb-3">7. {t('TERMS_AND_CONDITIONS_LIMITATIONS_ON_AVAILABILITY')}</div>
              <p>{t('TERMS_AND_CONDITIONS_LIMITATIONS_ON_AVAILABILITY_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="thirdParty">
              <div className="title3 w-100 d-block mb-3">8. {t('TERMS_AND_CONDITIONS_THIRD_PARTY_OFFERINGS')}</div>
              <p>{t('TERMS_AND_CONDITIONS_THIRD_PARTY_OFFERINGS_paragraph1')}</p>
              <p>{t('TERMS_AND_CONDITIONS_THIRD_PARTY_OFFERINGS_paragraph2')}</p>
              <p>{t('TERMS_AND_CONDITIONS_THIRD_PARTY_OFFERINGS_paragraph3')}</p>
              <p>{t('TERMS_AND_CONDITIONS_THIRD_PARTY_OFFERINGS_paragraph4')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="underwriter">
              <div className="title3 w-100 d-block mb-3">9. {t('TERMS_AND_CONDITIONS_WE_ARE_NOT_AN_INSURANCE_UNDERWRITER_OR_AGENT')}</div>
              <p>{t('TERMS_AND_CONDITIONS_WE_ARE_NOT_AN_INSURANCE_UNDERWRITER_OR_AGENT_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="disclaimer">
              <div className="title3 w-100 d-block mb-3">10. {t('TERMS_AND_CONDITIONS_DISCLAIMER_OF_WARRANTY')}</div>
              <p>{t('TERMS_AND_CONDITIONS_DISCLAIMER_OF_WARRANTY_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="liability">
              <div className="title3 w-100 d-block mb-3">11. {t('TERMS_AND_CONDITIONS_LIMITATION_OF_LIABILITY')}</div>
              <p>{t('TERMS_AND_CONDITIONS_LIMITATION_OF_LIABILITY_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="modifications">
              <div className="title3 w-100 d-block mb-3">12. {t('TERMS_AND_CONDITIONS_MODIFICATIONS')}</div>
              <p>{t('TERMS_AND_CONDITIONS_MODIFICATIONS_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="governing">
              <div className="title3 w-100 d-block mb-3">13. {t('TERMS_AND_CONDITIONS_GOVERNING_LAW_AND_JURISDICTION')}</div>
              <p>{t('TERMS_AND_CONDITIONS_GOVERNING_LAW_AND_JURISDICTION_paragraph')}</p>
            </div>
            <div className="w-100 d-inline-block mb-4 pt-3" id="cancellation">
              <div className="title3 w-100 d-block mb-3">14. {t('TERMS_AND_CONDITIONS_CANCELLATION_OF_POLICY')}</div>
              <p>{t('TERMS_AND_CONDITIONS_CANCELLATION_OF_POLICY_paragraph')}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TermsOfServicesComp;