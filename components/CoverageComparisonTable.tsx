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

const CoverageComparisonTableComp: FC = () => {

  const {t} = useTranslation('common')

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
      <div className="coverage-comparison-table-wrap">
        <div className="banner">
          <div className="bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-3">
                  <img src="/insurance/landing-pages/coverage-comparison-table/cct-banner-lg.png" className="circle-lg" alt="comparison img1" />
                </div>
                <div className="col-sm-6 text-center">
                <img src="/insurance/landing-pages/coverage-comparison-table/cct-banner-icon.png" className="comparison-icon" alt="comparison icon" />
                  <div className="w-100 d-block title1">{t('LANDING_COVERAGE_COMPARISON_BANNER_title')}</div>
                  <div className="row">
                    <div className="col">
                    <img src="/insurance/landing-pages/coverage-comparison-table/cct-banner-rectangle-lg.png" className="rectangle-lg" alt="comparison" />
                    </div>
                    <div className="col">
                    <img src="/insurance/landing-pages/coverage-comparison-table/cct-banner-sm.png" className="circle-sm" alt="comparison" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3 text-end">
                  <img src="/insurance/landing-pages/coverage-comparison-table/cct-banner-rectangle-sm.png" className="rectangle-sm" alt="comparison" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="landing-content-section insurance-table-wrap">
            <div className="title1">{t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_title')}</div>
            <div className="insurance-table">
              <div className="table-col primary">
              {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_coverage_comparison')}
              </div>
              <div className="row g-3">
                <div className="col-sm-2 col-3">
                  <div className="table-col primary flex h-200px">
                    <span className="flex-text">{t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_policy_type')}</span>
                  </div>
                  <div className="table-col primary">
                  {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_type')} 1
                  </div>
                  <div className="table-col primary">
                  {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_type')} 2
                  </div>
                  <div className="table-col primary">
                  {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_type')} 3
                  </div>
                  <div className="table-col primary">
                  {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_type')} 4
                  </div>
                  <div className="table-col primary">
                  {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_type')} 5 (3+)
                  </div>
                  <div className="table-col primary">
                  {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_type')} 5 (2+)
                  </div>
                </div>
                <div className="col-sm-10 col-9">
                  <div className="custom-scrollbar">
                    <div className="row cs-row g-3">
                      <div className="col-7">
                      <div className="table-col dark-gray">
                      {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_main_coverage')}
                      </div>
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="table-col light-gray">
                            {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_liability')}
                          </div>
                          <div className="row g-2">
                            <div className="col-7">
                              <div className="table-col h-100px">
                                <div className="w-100 d-block mb-2">{t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_injury_death')}</div>
                                  <small>{t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_injury_death_small')}</small>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                            </div>
                            <div className="col-5">
                              <div className="table-col h-100px">
                                {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_property')}
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="stars">
                                  <span className="star"></span>
                                </div>
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="table-col light-gray">
                            {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_coverage_insured')}
                          </div>
                          <div className="row g-2">
                            <div className="col-4">
                              <div className="table-col h-100px">
                                {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_damage')}
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="stars">
                                  <span className="star"></span>
                                  <span className="star"></span>
                                </div>
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="stars">
                                  <span className="star"></span>
                                  <span className="star"></span>
                                  <span className="star"></span>
                                </div>
                                <div className="icon check"></div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="table-col h-100px">
                                {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_lost')}
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="table-col h-100px">
                                {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_fire')}
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      <div className="col-5">
                        <div className="table-col dark-gray">
                          {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_coverage_according')}
                        </div>
                        <div className="table-col light-gray">
                          {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_person_inside')}
                          </div>
                          <div className="row g-2">
                            <div className="col-4">
                              <div className="table-col h-100px">
                                {t('LANDING_VOLUNTARY_T6_TYPES_TITLE_T1_title')}
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="table-col h-100px">
                                {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_medical_expenses')}
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="table-col h-100px">
                                {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_driver_insurance')}
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon cross"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                              <div className="table-col icon-col">
                                <div className="icon check"></div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <div className="stars">
                        <span className="star"></span>
                      </div>
                      <small>{t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_star_1')}</small>
                    </li>
                    <li>
                      <div className="stars">
                        <span className="star"></span><span className="star"></span>
                      </div>
                      <small>{t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_star_2')}</small>
                    </li>
                    <li>
                      <div className="stars">
                        <span className="star"></span><span className="star"></span><span className="star"></span>
                      </div>
                      <small>{t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_TABLE_star_3')}</small>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="landing-content-section protection-act-wrap">
            <div className="title1">{t('LANDING_COVERAGE_COMPARISON_PROTCTION_title')}</div>
              <div className="icons-wrap">
                <div className="row">
                  <div className="col-4">
                    <div className="icon-box sedan">
                      <img src="/insurance/landing-pages/coverage-comparison-table/cct-sedan.png" alt="sedan" />
                      <div className="text">{t('LANDING_COVERAGE_COMPARISON_PROTCTION_sedan')}</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="icon-box pickup">
                      <img src="/insurance/landing-pages/coverage-comparison-table/cct-pickup.png" alt="pickup" />
                      <div className="text">{t('LANDING_COVERAGE_COMPARISON_PROTCTION_pick_up')}</div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="icon-box van">
                      <img src="/insurance/landing-pages/coverage-comparison-table/cct-van.png" alt="van" />
                      <div className="text">{t('LANDING_COVERAGE_COMPARISON_PROTCTION_van')}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="insurance-table">
                <div className="table-col primary">
                  {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_insurance_coverage')}
                </div>
                <div className="custom-scrollbar">
                  <div className="row g-2 cs-row">
                    <div className="col-6">
                      <div className="table-col dark-gray">
                      {t('LANDING_COVERAGE_COMPARISON_VOLUNTARILY_type')} 1
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_protection_death')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_total_permanent')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_loss_alb')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_total_permanent')} ({t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_unable_to_pursue')})
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_deaf')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_dumb')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_torn_tongue')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_torn_reproductive')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_mental')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_loss_other')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_loss_1alb')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_missing')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_injury')}
                      </div>
                      <div className="table-col text-start">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_Daily')}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="table-col dark-gray">
                        {t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_protection_limit')}
                      </div>
                      <div className="table-col flex h-140px">
                        <b className="flex-text">500,000</b>
                      </div>
                      <div className="table-col">
                        <b>300,000</b>
                      </div>
                      <div className="table-col flex h-333px">
                        <b className="flex-text">250,000</b>
                      </div>
                      <div className="table-col">
                        <b>200,000</b>
                      </div>
                      <div className="table-col">
                        <b>80,000</b>
                      </div>
                      <div className="table-col">
                        <b>4,000</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <small>{t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_the_driver')}</small>
              <div className="title4">{t('LANDING_COVERAGE_COMPARISON_PROTCTION_TABLE_buy_compare')}</div>
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

export default CoverageComparisonTableComp;