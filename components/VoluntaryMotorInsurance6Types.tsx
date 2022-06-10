/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const Accordion = withStyles({
})(MuiAccordion);

const AccordionSummary = withStyles({
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
}))(MuiAccordionDetails);

const VoluntaryMotorInsurance6TypesComp: FC = () => {

  const {t} = useTranslation('common')

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
      <div className="voluntary-motor-insurance-t6-wrap">
        <div className="banner">
          <div className="bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-4">
                  <img src="/insurance/landing-pages/voluntary-t6/voluntary-t6-banner-sm.png" className="sm" alt="voluntary img3" />
                  <div className="w-100 d-block">
                  <img src="/insurance/landing-pages/voluntary-t6/voluntary-t6-banner-lg-2.png" className="lg-1" alt="voluntary img1" />
                  </div>
                </div>
                <div className="col-sm-4 text-center">
                  <div className="w-100 d-block title1">{t('LANDING_VOLUNTARY_T6_BANNER_title')}</div>
                  <small className="text-secondary">{t('LANDING_VOLUNTARY_T6_BANNER_paragraph')}</small>
                  <div className="w-100 d-block mt-2">
                    <Link href="/brand-selection" passHref>
                      <button className="btn btn-primary">{t('LANDING_VOLUNTARY_T6_BANNER_button')}</button>
                    </Link>
                  </div>
                  <div className="media">
                    <img src="/insurance/landing-pages/voluntary-t6/voluntary-t6-vehicle-insurance-icon.png" alt="vehicle insurance" />
                    <div className="media-body">
                      <span className="type-counter">6</span>
                    {t('LANDING_VOLUNTARY_T6_BANNER_offering')}
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 text-end">
                  <img src="/insurance/landing-pages/voluntary-t6/voluntary-t6-banner-lg-1.png" className="lg-2" alt="voluntary img2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="landing-content-section services-wrap">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-12">
                <div className="service">
                  <img src="/insurance/landing-pages/voluntary-t6/services/coverage.png" alt="coverage" />
                  <div className="title3">{t('LANDING_VOLUNTARY_T6_SERVICES_S1_TITLE_third_party')}</div>
                  <div className="title2">{t('LANDING_VOLUNTARY_T6_SERVICES_S1_TITLE_coverage')}</div>
                  <p>{t('LANDING_VOLUNTARY_T6_SERVICES_S1_paragraph')}</p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="service">
                  <img src="/insurance/landing-pages/voluntary-t6/services/protection.png" alt="protection" />
                  <div className="title3">{t('LANDING_VOLUNTARY_T6_SERVICES_S2_TITLE_third_party')}</div>
                  <div className="title2">{t('LANDING_VOLUNTARY_T6_SERVICES_S2_TITLE_protection')}</div>
                  <p>{t('LANDING_VOLUNTARY_T6_SERVICES_S2_paragraph')}</p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="service">
                  <img src="/insurance/landing-pages/voluntary-t6/services/damage.png" alt="damage" />
                  <div className="title3">{t('LANDING_VOLUNTARY_T6_SERVICES_S3_TITLE_od')}</div>
                  <div className="title2">{t('LANDING_VOLUNTARY_T6_SERVICES_S3_TITLE_damage')}</div>
                  <p>{t('LANDING_VOLUNTARY_T6_SERVICES_S3_paragraph')}</p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="service">
                  <img src="/insurance/landing-pages/voluntary-t6/services/loss-fire.png" alt="loss and fire" />
                  <div className="title3">{t('LANDING_VOLUNTARY_T6_SERVICES_S4_TITLE_ft')}</div>
                  <div className="title2">{t('LANDING_VOLUNTARY_T6_SERVICES_S4_TITLE_liability')}</div>
                  <p>{t('LANDING_VOLUNTARY_T6_SERVICES_S4_paragraph')}</p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="service">
                  <img src="/insurance/landing-pages/voluntary-t6/services/fire.png" alt="fire" />
                  <div className="title2">{t('LANDING_VOLUNTARY_T6_SERVICES_S5_TITLE_fire')}</div>
                  <p>{t('LANDING_VOLUNTARY_T6_SERVICES_S5_paragraph')}</p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="service">
                  <img src="/insurance/landing-pages/voluntary-t6/services/lost.png" alt="lost" />
                  <div className="title2">{t('LANDING_VOLUNTARY_T6_SERVICES_S6_TITLE_lost')}</div>
                  <p>{t('LANDING_VOLUNTARY_T6_SERVICES_S6_paragraph')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="landing-content-section insurance-types">
            <div className="title1 text-center">{t('LANDING_VOLUNTARY_T6_TYPES_TITLE_additional')}</div>
            <div className="row">
              <div className="col-md-6">
              <img src="/insurance/landing-pages/voluntary-t6/types/personal-accident.png" alt="personal accident" />
              </div>
              <div className="col-md-6">
                <div className="detail">
                  <div className="text">
                    <div className="title2">{t('LANDING_VOLUNTARY_T6_TYPES_TITLE_T1_title')}</div>
                    <p>{t('LANDING_VOLUNTARY_T6_TYPES_TITLE_T1_paragraph')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row flow-root">
              <div className="col-md-6 float-end">
              <img src="/insurance/landing-pages/voluntary-t6/types/bail-bond.png" alt="bail bond" />
              </div>
              <div className="col-md-6 float-start">
                <div className="detail text-end">
                  <div className="text">
                  <div className="title2">{t('LANDING_VOLUNTARY_T6_TYPES_TITLE_T2_title')}</div>
                    <p>{t('LANDING_VOLUNTARY_T6_TYPES_TITLE_T2_paragraph')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <img src="/insurance/landing-pages/voluntary-t6/types/medical-expense.png" alt="medical expense" />
              </div>
              <div className="col-md-6">
                <div className="detail">
                  <div className="text">
                  <div className="title2">{t('LANDING_VOLUNTARY_T6_TYPES_TITLE_T3_title')}</div>
                    <p>{t('LANDING_VOLUNTARY_T6_TYPES_TITLE_T3_paragraph')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="title2 text-center">{t('LANDING_VOLUNTARY_T6_TYPES_text')}</div>
          </div>
          <div className="landing-content-section landing-faqs">
            <div className="title1">
            {t('LANDING_FAQS_faqs')}
            </div>
          <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Typography>{t('LANDING_FAQS_Q1')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Typography>{t('LANDING_FAQS_Q2')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Typography>{t('LANDING_FAQS_Q3')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </p>
            </AccordionDetails>
          </Accordion>
          </div>
        </div>
      </div>
  )
}

export default VoluntaryMotorInsurance6TypesComp;