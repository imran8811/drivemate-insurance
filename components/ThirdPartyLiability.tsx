/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-i18next';

const Accordion = withStyles({
})(MuiAccordion);

const AccordionSummary = withStyles({
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
}))(MuiAccordionDetails);

const ThirdPartyLiabilityComp: FC = () => {

  const {t} = useTranslation('common')

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
      <div className="third-party-liability-wrap">
        <div className="banner">
          <div className="bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-9 text-center float-end">
                  <div className="row">
                    <div className="col-lg-8 col-md-12"><div className="w-100 d-block title1">{t('LANDING_THIRD_PARTY_LIABILITY_BANNER_title')}</div></div>
                  </div>
                </div>
                <div className="col-sm-3 float-start">
                  <img src="/insurance/landing-pages/third-party-liability/tpl-banner-img.png" alt="Third Party Liability" />
                </div>
                </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="description">
            <p>{t('LANDING_THIRD_PARTY_LIABILITY_BANNER_paragraphA')}</p>
            <p>{t('LANDING_THIRD_PARTY_LIABILITY_BANNER_paragraphB')}</p>
            <p>{t('LANDING_THIRD_PARTY_LIABILITY_BANNER_paragraphC')}</p>
          </div>
          <div className="landing-content-section insurance-types pt-0">
            <div className="title2 w-100 d-block text-center text-primary">{t('LANDING_THIRD_PARTY_LIABILITY_3rd_TYPE_title')}</div>
            <div className="title1 w-100 d-block text-center">{t('LANDING_THIRD_PARTY_LIABILITY_THIRD_PARTY_PROTECTION_title')}</div>
            <div className="row">
              <div className="col-md-6">
              <img src="/insurance/landing-pages/third-party-liability/property-protection.png" alt="Property Protection" />
              </div>
              <div className="col-md-6">
                <div className="detail">
                  <div className="text">
                    <div className="title2">{t('LANDING_THIRD_PARTY_LIABILITY_PROPERTY_PROTECTION_title')}</div>
                    <p>{t('LANDING_THIRD_PARTY_LIABILITY_PROPERTY_PROTECTION_paragraph')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row flow-root">
              <div className="col-md-6 float-end">
              <img src="/insurance/landing-pages/third-party-liability/life-body-protection.png" alt="Life and body protection" />
              </div>
              <div className="col-md-6 float-start">
                <div className="detail text-end">
                  <div className="text">
                  <div className="title2">{t('LANDING_THIRD_PARTY_LIABILITY_LIFE_PROTECTION_title')}</div>
                    <p>{t('LANDING_THIRD_PARTY_LIABILITY_LIFE_PROTECTION_paragraph')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <img src="/insurance/landing-pages/third-party-liability/medical-expenses.png" alt="Medical expenses" />
              </div>
              <div className="col-md-6">
                <div className="detail">
                  <div className="text">
                  <div className="title2">{t('LANDING_THIRD_PARTY_LIABILITY_MEDICAL_EXPENSES_title')}</div>
                    <p>{t('LANDING_THIRD_PARTY_LIABILITY_MEDICAL_EXPENSES_paragraph')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row flow-root">
              <div className="col-md-6 float-end">
              <img src="/insurance/landing-pages/third-party-liability/personal-accident-insurance.png" alt="Personal Accident Insurance" />
              </div>
              <div className="col-md-6 float-start">
                <div className="detail text-end">
                  <div className="text">
                  <div className="title2">{t('LANDING_THIRD_PARTY_LIABILITY_PERSONAL_ACCIDENT_title')}</div>
                    <p>{t('LANDING_THIRD_PARTY_LIABILITY_PERSONAL_ACCIDENT_paragraph')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <img src="/insurance/landing-pages/third-party-liability/driver-insurance.png" alt="Driver insurance" />
              </div>
              <div className="col-md-6">
                <div className="detail">
                  <div className="text">
                  <div className="title2">{t('LANDING_THIRD_PARTY_LIABILITY_DRIVER_INSURANCE_title')}</div>
                    <p>{t('LANDING_THIRD_PARTY_LIABILITY_DRIVER_INSURANCE_paragraph')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="landing-content-section insurance-table-wrap">
            <div className="header">
              <div className="title1">{t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_title')}</div>
              <p className="w-100 d-block text-center m-0 p-0">{t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_paragraph')}</p>
            </div>
            
              <div className="insurance-table">
                  <div className="row g-2 text-center">
                    <div className="col-md-6 mt-0">
                      <div className="table-col h-auto">
                      {t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_point1')}
                      </div>
                      <div className="table-col h-auto">
                      {t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_point2')}
                      </div>
                      <div className="table-col h-auto">
                      {t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_point3')}
                      </div>
                      <div className="table-col h-auto">
                      {t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_point4')}
                      </div>
                      <div className="table-col h-auto">
                      {t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_point5')}
                      </div>
                    </div>
                    <div className="col-md-6 mt-0">
                      <div className="table-col h-auto">
                      {t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_point6')}
                      </div>
                      <div className="table-col h-auto">
                      {t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_point7')}
                      </div>
                      <div className="table-col h-auto">
                      {t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_point8')}
                      </div>
                      <div className="table-col h-auto">
                      {t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_point9')}
                      </div>
                    </div>
                    <div className="col-12 mt-0">
                      <div className="table-col h-auto">
                      {t('LANDING_THIRD_PARTY_LIABILITY_WHY_3rd_TYPE_point10')}
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
  )
}

export default ThirdPartyLiabilityComp;