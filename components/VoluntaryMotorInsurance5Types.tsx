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

const VoluntaryMotorInsurance5TypesComp: FC = () => {

  const {t} = useTranslation('common')

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
      <div className="voluntary-motor-insurance-t5-wrap">
        <div className="banner">
          <div className="bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-3">
                  <img src="/insurance/landing-pages/voluntary-t5/voluntary-t5-banner-lg-1.png" className="lg-1" alt="voluntary img1" />
                  <div className="w-100 d-block">
                  <img src="/insurance/landing-pages/voluntary-t5/voluntary-t5-banner-sm.png" className="sm" alt="voluntary img3" />
                  </div>
                </div>
                <div className="col-sm-6 text-center">
                  <div className="w-100 d-block title1">{t('LANDING_VOLUNTARY_T5_BANNER_title')}</div>
                  <small className="text-secondary">{t('LANDING_VOLUNTARY_T5_BANNER_paragraph')}</small>
                  <div className="w-100 d-block mt-2">
                    <Link href="/brand-selection" passHref>
                     <button className="btn btn-primary">{t('LANDING_VOLUNTARY_T5_BANNER_button')}</button>
                    </Link>
                  </div>
                  <div className="media">
                    <img src="/insurance/landing-pages/voluntary-t5/voluntary-t5-vehicle-insurance-icon.png" alt="vehicle insurance" />
                    <div className="media-body">
                    {t('LANDING_VOLUNTARY_T5_BANNER_offering')}
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 text-end">
                  <img src="/insurance/landing-pages/voluntary-t5/voluntary-t5-banner-lg-2.png" className="lg-2" alt="voluntary img2" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="landing-content-section type type-1">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="title2">
                  <span className="text-primary">{t('LANDING_VOLUNTARY_T5_T1_TITLE_type1')}</span> - {t('LANDING_VOLUNTARY_T5_T1_TITLE_car_insurance_policy')}
                </div>
                <div className="title1">
                {t('LANDING_VOLUNTARY_T5_T1_TITLE_comprehensive')}
                </div>
                <p className="text-secondary">
                {t('LANDING_VOLUNTARY_T5_T1_paragraph')}
                </p>
                <button className="btn btn-primary">
                {t('BUTTON_buy_now')}
                </button>
              </div>
              <div className="col-lg-8 col-md-6 col-sm-12">
                  <div className="row">
                    <div className="col-12">
                      <div className="text-card text-card-shadow a">
                        <div className="text-body">
                        {t('LANDING_VOLUNTARY_T5_T1_textA')}
                        </div>
                        <span className="after"></span>
                    </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="text-card b">
                        <div className="text-body">
                        {t('LANDING_VOLUNTARY_T5_T1_textB')}
                        </div>
                        <span className="after"></span>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="text-card c">
                        <div className="text-body">
                        {t('LANDING_VOLUNTARY_T5_T1_textC')}
                        </div>
                        <span className="after"></span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="text-card d">
                        <div className="text-body">
                        {t('LANDING_VOLUNTARY_T5_T1_textD')}
                        </div>
                        <span className="after"></span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="landing-content-section type type-2">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-sm-12">
                <div className="title2">
                  <span className="text-primary">{t('LANDING_VOLUNTARY_T5_T2_TITLE_type2')}</span> - {t('LANDING_VOLUNTARY_T5_T2_TITLE_car_insurance_policy')}
                </div>
                <div className="title1">
                {t('LANDING_VOLUNTARY_T5_T2_TITLE_third_party')}
                </div>
                <p className="text-secondary">
                {t('LANDING_VOLUNTARY_T5_T2_paragraph')}
                </p>
                <button className="btn btn-primary">
                {t('BUTTON_buy_now')}
                </button>
              </div>
              <div className="col-lg-2 d-lg-block d-md-none"></div>
              <div className="col-lg-5 col-md-6 col-sm-12">
                    <div className="w-100 d-inline-block">
                      <div className="text-card lg text-card-shadow a">
                        <div className="text-body">
                        {t('LANDING_VOLUNTARY_T5_T2_textA')}
                        </div>
                        <span className="after"></span>
                    </div>
                    </div>
                    <div className="w-100 d-inline-block">
                      <div className="text-card b">
                        <div className="text-body">
                        {t('LANDING_VOLUNTARY_T5_T2_textB')}
                        </div>
                        <span className="after right"></span>
                      </div>
                    </div>
                    <div className="w-100 d-inline-block">
                      <div className="text-card c">
                        <div className="text-body">
                        {t('LANDING_VOLUNTARY_T5_T2_textC')}
                        </div>
                        <span className="after right"></span>
                      </div>
                    </div>
              </div>
            </div>
          </div>
          <div className="landing-content-section type type-3">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-sm-12">
                <div className="title2">
                  <span className="text-primary">{t('LANDING_VOLUNTARY_T5_T3_TITLE_type3')}</span> - {t('LANDING_VOLUNTARY_T5_T3_TITLE_car_insurance_policy')}
                </div>
                <div className="title1">
                {t('LANDING_VOLUNTARY_T5_T3_TITLE_third_party')}
                </div>
                <p className="text-secondary">
                {t('LANDING_VOLUNTARY_T5_T3_paragraph')}
                </p>
                <button className="btn btn-primary">
                {t('BUTTON_buy_now')}
                </button>
              </div>
              <div className="col-lg-7 col-md-6 col-sm-12">
                    <div className="w-100 d-inline-block">
                      <div className="text-card text-card-shadow a">
                        <div className="text-body">
                        {t('LANDING_VOLUNTARY_T5_T3_textA')}
                        </div>
                        <span className="after"></span>
                    </div>
                    </div>
                    <div className="w-100 d-inline-block">
                      <div className="text-card sm b">
                        <div className="text-body">
                        {t('LANDING_VOLUNTARY_T5_T3_textB')}
                        </div>
                        <span className="after right"></span>
                      </div>
                    </div>
              </div>
            </div>
          </div>
          <div className="landing-content-section type type-4">
            <div className="row flow-root">
              <div className="col-lg-5 col-md-12 col-sm-12 float-end">
                <div className="title2">
                  <span className="text-primary">{t('LANDING_VOLUNTARY_T5_T4_TITLE_type4')}</span> - {t('LANDING_VOLUNTARY_T5_T4_TITLE_car_insurance_policy')}
                </div>
                <div className="title1">
                {t('LANDING_VOLUNTARY_T5_T4_TITLE_third_party')}
                </div>
                <p className="text-secondary">
                {t('LANDING_VOLUNTARY_T5_T4_paragraph')}
                </p>
                <button className="btn btn-primary">
                {t('BUTTON_buy_now')}
                </button>
              </div>
              <div className="col-lg-1 d-lg-block d-md-none"></div>
              <div className="col-lg-6 col-md-12 col-sm-12 float-start">
              <div className="bg"></div>
              <img src="/insurance/landing-pages/voluntary-t5/voluntary-t5-type-4.png" className="lg-1" alt="insurance type-4" />
              </div>
            </div>
          </div>
          <div className="landing-content-section type type-5">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="title2">
                  <span className="text-primary">{t('LANDING_VOLUNTARY_T5_T5_TITLE_type5')}</span> - {t('LANDING_VOLUNTARY_T5_T5_TITLE_car_insurance_policy')}
                </div>
                <p className="text-secondary">
                {t('LANDING_VOLUNTARY_T5_T5_paragraphA')}
                </p>
                <p className="text-secondary">
                {t('LANDING_VOLUNTARY_T5_T5_paragraphB')}
                </p>
                <ol>
                  <li>{t('LANDING_VOLUNTARY_T5_T5_li1')}</li>
                  <li>{t('LANDING_VOLUNTARY_T5_T5_li2')}</li>
                </ol>
              </div>
              <div className="col-lg-1 d-lg-block d-md-none"></div>
              <div className="col-lg-7 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-sm-6">
                      <div className="text-card header-title text-card-shadow a">
                        <div className="header">
                          <span className="title">{t('LANDING_VOLUNTARY_T5_T5_type2')}</span>
                        </div>
                        <div className="text-body">
                        {t('LANDING_VOLUNTARY_T5_T5_type2_paragraph')}
                        <ul>
                          <li>{t('LANDING_VOLUNTARY_T5_T5_type2_liA')}</li>
                          <li>{t('LANDING_VOLUNTARY_T5_T5_type2_liB')}</li>
                          <li>{t('LANDING_VOLUNTARY_T5_T5_type2_liC')}</li>
                          <li>{t('LANDING_VOLUNTARY_T5_T5_type2_liD')}</li>
                        </ul>
                        </div>
                        <span className="after right"></span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                  <div className="text-card header-title b">
                        <div className="header">
                          <span className="title">{t('LANDING_VOLUNTARY_T5_T5_type3')}</span>
                        </div>
                      <div className="text-body">
                      {t('LANDING_VOLUNTARY_T5_T5_type3_paragraph')}
                        <ul>
                          <li>{t('LANDING_VOLUNTARY_T5_T5_type3_liA')}</li>
                          <li>{t('LANDING_VOLUNTARY_T5_T5_type3_liB')}</li>
                          <li>{t('LANDING_VOLUNTARY_T5_T5_type3_liC')}</li>
                        </ul>
                      </div>
                        <span className="after"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default VoluntaryMotorInsurance5TypesComp;