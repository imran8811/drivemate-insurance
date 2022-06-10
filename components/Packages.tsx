/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useRef } from 'react';
import useState from 'react-usestateref';
import Link from 'next/link';
import useAxiosInterceptor from '../utilities/axiosApiInstance';
import { GET_BRANDS, GET_BRAND_MODELS, GET_INSURANCE_TYPES, GET_INSURANCE_PACKAGES, GET_BRAND_MODELS_YEARS } from '../utilities/endpoints';
import { useRouter } from 'next/dist/client/router';
import { packagesAllowedForCompare, PAGINATION, coverageSection } from '../utilities/constants';
import { searchTypes } from '../types/search-types';
import { useTranslation } from 'next-i18next';

import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const InsurancePackages: FC = () => {
  const { isLoading, axiosApiInstance } = useAxiosInterceptor();
  const router = useRouter();
  const ref = useRef();
  const { t } = useTranslation('common')
  const { query, isReady } = useRouter()
  const [insurancePackages, setInsurancePackages] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [activeBrandId, setActiveBrandId, brandIdRef] = useState(null);
  const [activeModelId, setActiveModelId, modelIdRef] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [selectedModel, setSelectedModel] = useState(0);
  const [selectedYear, setSelectedYear] = useState(null);
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [insuranceTypeDropdown, setInsuranceTypeDropdown] = useState(false);
  const [comparePackages, setComparePackages, comparePackageRef] = useState([])
  const [compareSwitch, setCompareSwitch] = useState(false)
  const [comparePackageLimit, setComparePackageLimit] = useState(false)
  const [noRecordFound, setNoRecordFound] = useState(false)
  const [countPackages, setCountPackages] = useState([]);
  const [loadMore, setLoadMore] = useState(0)
  const [currentPage, setCurrentPage] = useState(PAGINATION.page+1);
  const [pagination, setPagination] = useState(true);
  const [insuranceDetails, setInsuranceDetails] = useState([]);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [insuranceTypes, setInsuranceTypes] = useState([]);
  const [insuranceTypeIds, setInsuranceTypeIds, insuranceTypeIdRef] = useState([]);
  const [mobFilters, setMobFilters, mobFiltersRef] = useState(false);  
  const { brand, model, year } = query;
  const config = {Auth:false};

  const handleDetailsDialogOpen = (id) => {
    const res = insurancePackages.filter(insPackage => insPackage.id === id)
    setInsuranceDetails(res);
    setDetailsDialog(true);
  }

  const handleDetailsDialogClose = () => { setDetailsDialog(false); }

  type insurancePackage = {
    id: number,
    coverage_id: number,
    code: string,
    name: string,
    description: string,
    company_name: string,
    start_date: string,
    end_date: string,
    repair_type: string,
    insurance_min: number,
    insurance_max: number,
    insurance_premium: number,
    total_insurance_premium: number,
    paidable_commission: number,
    total_insurance_premium_vat: number,
    total_discount_insurance_premium: number,
    company: {
      logo: string,
      width: number,
      higth: number,
      code: string,
      name: string
    },
    coverage: {
      damage_to_life_body_health_person: {
        amount: number,
        unit: string
      },
      damage_to_life_body_health_time: {
        amount: number,
        unit: string
      },
      property_damage: {
        amount: number,
        unit: string
      },
      first_part_of_damage: {
        amount: number,
        unit: string
      },
      medical_expenses: {
        amount: number,
        unit: string
      },
      driver_bail_in_criminal: {
        amount: number,
        unit: string
      },
      personal_accidents_person: {
        amount: number,
        unit: string
      },
      personal_accidents_time: {
        amount: number,
        unit: string
      },
      medical_expenses_time: {
        amount: number,
        unit: string
      },
      damage_to_car: {
        amount: number,
        unit: string
      },
      lost_cars_fires: {
        amount: number,
        unit: string
      },
      flood_protection: {
        amount: number,
        unit: string
      }
    },
    tag: {
      tag_insurance_type: string,
      tag_repair_type: string
    }
  }
 
  useEffect(() => {
    if(!isReady) {
      return;
    };
    getInsurancePackages();
    getAllBrands();
    getInsuranceTypeFilters();
  }, [router.isReady])

  const useOnClickOutside = (ref, handler) => {
    useEffect(
      () => {
        const listener = (event) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      [ref, handler]
    );
  }

  useOnClickOutside(ref, () => {
    setFilterDropdown(false);
    setInsuranceTypeDropdown(false)
    setMobFilters(false)
  });

  const getAllBrands = async () => {
    await axiosApiInstance.get(GET_BRANDS,config).then((res) => {
      setBrands(res.data.data.brand.data);
      getModelsByBrand(brand);
    }).catch((err) => err);
  }

  const getModelsByBrand = (brandId) => {
    setSelectedBrand(brandId);
    setActiveBrandId(brandId);
    axiosApiInstance.get(`${GET_BRAND_MODELS}/${brandId}`,config).then((res) => {
      setModels(res.data.data.model.data);
      setSelectedModel(Number(model))
      getYearsByBrandModel(model)
    }).catch((err) => err);
  }

  const getYearsByBrandModel = (modelId) => {
    setActiveModelId(modelId)
    setSelectedModel(modelId)
    axiosApiInstance.get(GET_BRAND_MODELS_YEARS,config).then((res) => {
      setYears(res.data.data.year);
      setSelectedYear(Number(year))
    }).catch((err) => err);
  }

  const getInsurancePackages = () => {
    axiosApiInstance.get(`${GET_INSURANCE_PACKAGES}/${brand}/${model}?page=${PAGINATION.page}&per_page=${PAGINATION.page_size}`,config).then((res) => {
      if(res.data.data.package.data.length > 0) {
        setInsurancePackages(res.data.data.package.data);
        setLoadMore(res.data.data.package.total);
      } else {
        setNoRecordFound(true)
        setInsurancePackages([])
      }
    }).catch(err => err);
  }

  const getInsuranceTypeFilters = () => {
    axiosApiInstance.get(GET_INSURANCE_TYPES,config).then((res) => {
      if(res.data.data.coverage_type.data.length > 0) {
        setInsuranceTypes(res.data.data.coverage_type.data);
      }
    }).catch(err => err);
  }

  const convertIdtoName = (id, searchType) => {
    if(searchType === searchTypes.brand && brands.length > 0) {
      const res = brands.filter((brand) => brand.id === Number(id));
      return res[0]?.name;
    } else {
      if(models.length > 0) {
        const res = models.filter((model) => model.id === Number(id));
        return res[0]?.name;
      }
    }
  }

  const brandName = convertIdtoName(brand, searchTypes.brand)
  const modelName = convertIdtoName(model, searchTypes.model)

  const applyFilters = () => {
    setFilterDropdown(false);
    router.query.brand = activeBrandId;
    router.query.model = activeModelId;
    router.query.year = selectedYear;
    router.push(router, undefined, {scroll: false});
    axiosApiInstance.get(`${GET_INSURANCE_PACKAGES}/${brandIdRef.current}/${modelIdRef.current}?page=${PAGINATION.page}&per_page=${PAGINATION.page_size}`,config).then((res) => {
      if(res.data.data.package.data.length > 0) {
        setInsurancePackages(res.data.data.package.data);
        setNoRecordFound(false)
        setLoadMore(res.data.data.package.total);
        if(res.data.data.package.data.length > 10) {
          setPagination(true);
        }
        setComparePackages([])
      } else {
        setNoRecordFound(true)
        setInsurancePackages([])
        setComparePackages([])
        setLoadMore(0)
      }
    }).catch(err => err);
  }

  const toggleFilterDropdown = () => {
    setFilterDropdown(!filterDropdown);
    setInsuranceTypeDropdown(false)
  }

  const toggleInsuranceTypeDropdown = () => {
    setInsuranceTypeDropdown(!insuranceTypeDropdown);
    setFilterDropdown(false);
  }

  const handleInsuranceTypeSubmit = () => {
    setInsuranceTypeDropdown(false)
    router.query.coverage_type_id = insuranceTypeIdRef.current;
    router.push(router, undefined, {scroll: false});
    axiosApiInstance.get(`${GET_INSURANCE_PACKAGES}/${brand}/${model}?coverage_type_id=${insuranceTypeIdRef.current}&page=${PAGINATION.page}&per_page=${PAGINATION.page_size}`,config).then((res) => {
      if(res.data.data.package.data.length > 0) {
        setInsurancePackages(res.data.data.package.data);
        // setInsuranceTypeIds([])
        setNoRecordFound(false)
        setLoadMore(res.data.data.package.total);
        if(res.data.data.package.data.length > 10) {
          setPagination(true);
        }
        setComparePackages([])
      } else {
        // setInsuranceTypeIds([])
        setNoRecordFound(true)
        setInsurancePackages([])
        setComparePackages([])
        setLoadMore(0)
      }
    }).catch(err => err);
  }

  const applyMobFilters = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobFilters(false)
    router.query.brand = activeBrandId;
    router.query.model = activeModelId;
    router.query.year = selectedYear;
    router.query.coverage_type_id = insuranceTypeIdRef.current;
    router.push(router, undefined, {scroll: false});
    axiosApiInstance.get(`${GET_INSURANCE_PACKAGES}/${activeBrandId}/${activeModelId}?coverage_type_id=${insuranceTypeIdRef.current}&page=${PAGINATION.page}&per_page=${PAGINATION.page_size}`,config).then((res) => {
      if(res.data.data.package.data.length > 0) {
        setInsurancePackages(res.data.data.package.data);
        setNoRecordFound(false)
        setLoadMore(res.data.data.package.total);
        if(res.data.data.package.data.length > 10) {
          setPagination(true);
        }
        setComparePackages([])
      } else {
        setNoRecordFound(true)
        setInsurancePackages([])
        setComparePackages([])
        setLoadMore(0)
      }
    }).catch(err => err);
  }

  const loadMorePackages = () => {
    setCurrentPage(currentPage+1)
    axiosApiInstance.get(`${GET_INSURANCE_PACKAGES}/${brand}/${model}?page=${currentPage}&per_page=${PAGINATION.page_size}`,config).then((res) => {
      if(res.data.data.package.data.length > 0) {
        setInsurancePackages([...(insurancePackages || []), ...res.data.data.package.data]);
      } 
      if(res.data.data.package.data.length < 10) {
        setPagination(false)
      }
    }).catch(err => err);
  }
  
  const handleComparePackage = (e, packageId) => {
    const findPackage = comparePackages.filter(insPackage => insPackage.id === packageId)
    if(e.target.checked === true && findPackage.length === 0) {
      if(comparePackages.length < packagesAllowedForCompare) {
        const filteredPackage = insurancePackages.filter(insPackages => insPackages.id === packageId)
        setComparePackages([...comparePackages, filteredPackage[0]]);
        setCountPackages([...countPackages, packageId])
      } else {
        setComparePackageLimit(true)
        e.target.checked = false;
      }
    } else if (e.target.checked === false && findPackage.length === 1) {
      const filteredPackage = comparePackages.filter(insPackage => insPackage.id !== packageId)
      setComparePackages(filteredPackage)
      const removeCount = countPackages.filter(count => count !== packageId)
      setCountPackages(removeCount);
    }
  }

  const handleOnChange = (e, typeId) => {
    if(e.target.checked) {
      setInsuranceTypeIds([...insuranceTypeIds, typeId])
    } else {
      const filterOnbj = insuranceTypeIdRef.current.filter(obj => obj !== typeId)
      setInsuranceTypeIds(filterOnbj)
    }
  }

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleFilterReset = () => {
    setInsuranceTypeIds([])
  }

  return (
    <div className="packages-list-wrap">
      {isLoading && <div className="dm-loader" />}
      <div className="packages-filters">
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-3">
              <ul className="dropdown-filters">
                <li className="d-sm-block d-none">
                  <img src="/insurance/filter-icon.svg" alt="filter-icon" />
                </li>
                <li className="d-sm-none d-block">
                  <div className="dropdown">
                    <button className="btn p-0" onClick={() => setMobFilters(!mobFilters)}>
                      <img src="/insurance/filter-icon.svg" alt="filter-icon" />
                    </button>
                    { mobFilters &&
                      <form onSubmit={(e) => applyMobFilters(e)} ref={ref}>
                        <div className="filter-bg"></div>
                      <div className="dropdown-menu dropdown-bottom-fixed show" aria-labelledby="dropdownMenuButton">
                        <div className="dropdown-header">Filters
                          <button className="btn-close" onClick={() => setMobFilters(false)}></button>
                        </div>
                        <div className="dropdown-body">
                            <div className="form-group">
                              <label>Brand</label>
                              {brands &&
                                <select onChange={(e) => getModelsByBrand(e.target.value)} value={selectedBrand} className="form-select">
                                  {brands.map((brand) => {
                                    return (
                                      <option value={brand.id} key={brand.id}>{brand.name}</option>
                                    )
                                  })}
                                </select>
                              }
                            </div>
                            <div className="form-group">
                              <label>Model</label>
                              {models &&
                                <select onChange={(e) => { getYearsByBrandModel(e.target.value) }} value={selectedModel} className="form-select">
                                  {models.map((model) => {
                                    return (
                                      <option value={model.id} key={model.id}>{model.name}</option>
                                    )
                                  })}
                                </select>
                              }
                            </div>
                            <div className="form-group">
                              <label>Year</label>
                              {years &&
                                <select className="form-select" onChange={(e)=>{setSelectedYear(e.target.value)}} value={selectedYear}>
                                  {years.map((year) => {
                                    return (
                                      <option value={year} key={year}>{year}</option>
                                    )
                                  })}
                                </select>
                              }
                            </div>
                            <hr />
                            <Accordion square expanded={expanded === 'panel0'} onChange={handleChange('panel0')}>
                              <AccordionSummary aria-controls="panel0d-content" id="panel0d-header">
                                <div className="title3">Insurance Type</div>
                                <span className="icon"></span>
                              </AccordionSummary>
                              <AccordionDetails>
                                { insuranceTypes.length > 0 && insuranceTypes.map((type, index) => {
                                  return (
                                    <div className="form-check" key={index}>
                                      <input 
                                        className="form-check-input" 
                                        type="checkbox"
                                        onChange={(e) => {handleOnChange(e, type.id)}}
                                        checked={insuranceTypeIdRef.current.indexOf(type.id) > -1}
                                        id={type.id} />
                                      <label className="form-check-label" htmlFor={type.id}>{type.name}</label>
                                    </div>
                                  )
                                })}
                              </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className="dropdown-footer">
                          <div className="media">
                            <button type="button" onClick={handleFilterReset} className="btn float-start me-2 ps-0">Reset</button>
                            <div className="media-body text-end">
                              <button type="submit" className="btn btn-primary">Apply Filters</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    } 
                  </div>
                </li>
                <li className="d-none d-sm-block">
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle btn-filter no-after"
                      type="button"
                      onClick={() => { toggleFilterDropdown() }}>
                      <span>{brandName} </span>
                      <span>{modelName} </span>
                      <span>{year} </span>
                    </button>
                    {filterDropdown &&
                      <form className="dropdown-menu show" ref={ref} aria-labelledby="dropdownMenuButton" onSubmit={() => applyFilters()}>
                        <div className="dropdown-body">
                          <div className="form-group">
                            <label>Brand</label>
                            {brands &&
                              <select
                                onChange={(e) => getModelsByBrand(e.target.value)}
                                value={selectedBrand}
                                className="form-select">
                                {brands.map((brand) => {
                                  return (
                                    <option
                                      value={brand.id}
                                      key={brand.id}>{brand.name}</option>
                                  )
                                })}
                              </select>
                            }
                          </div>
                          <div className="form-group">
                            <label>Model</label>
                            {models &&
                              <select
                                onChange={(e) => { getYearsByBrandModel(e.target.value) }}
                                value={selectedModel}
                                className="form-select">
                                {models.map((model) => {
                                  return (
                                    <option
                                      value={model.id}
                                      key={model.id}>{model.name}</option>
                                  )
                                })}
                              </select>
                            }
                          </div>
                          <div className="form-group">
                            <label>Year</label>
                            {years &&
                              <select 
                                className="form-select"
                                onChange={(e)=>{setSelectedYear(e.target.value)}}
                                value={selectedYear}
                                >
                                {years.map((year) => {
                                  return (
                                    <option
                                      value={year}
                                      key={year}>{year}</option>
                                  )
                                })}
                              </select>
                            }
                          </div>
                        </div>
                        <div className="dropdown-footer">
                          <button type="submit" className="btn btn-primary w-100">Apply</button>
                        </div>
                      </form>
                    }
                  </div>
                </li>
                <li className="d-none d-sm-block">
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle btn-filter no-after"
                      type="button"
                      onClick={() => { toggleInsuranceTypeDropdown() }}>
                      { t('PACKAGES_insurance_type') }
                    </button>
                    {insuranceTypeDropdown &&
                      <form className="dropdown-menu show"  ref={ref} onSubmit={() => { handleInsuranceTypeSubmit() }}>
                        <div className="dropdown-body max-height">
                          { insuranceTypes.length > 0 && insuranceTypes.map((type, index) => {
                            return (
                              <div className="form-check" key={index}>
                                <input 
                                  className="form-check-input" 
                                  type="checkbox"
                                  onChange={(e) => {handleOnChange(e, type.id)}}
                                  checked={insuranceTypeIdRef.current.indexOf(type.id) > -1}
                                  id={type.id} />
                                <label className="form-check-label" htmlFor={type.id}>{type.name}</label>
                              </div>
                            )
                          })}
                        </div>
                        <div className="dropdown-footer">
                          <button type="submit" className="btn btn-primary w-100">Apply</button>
                        </div>
                      </form>
                    }
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-sm-4 col-9">
              <button
                className="btn btn-outline-secondary btn-filter float-end"
                type="button"
                onClick={() => { setCompareSwitch(!compareSwitch) }}>
                { t('PACKAGES_compare_packages') }
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="selected-title">{loadMore} { t('PACKAGES_insurance_packages_for') } {brandName} {modelName} {year}</div>
        <div className="row insurance-card-wrap">
          <div className="col">
          { insurancePackages && 
            <>
            <div className="row">
              { insurancePackages.map((insPackage) => {
                return (
                  <div className={compareSwitch? 'col-lg-4 col-md-12 col-sm-12' : 'col-xl-3 col-lg-4 col-md-12 col-sm-12'} key={insPackage.id}>
                    <div className="insurance-card active">
                      {compareSwitch &&
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox"
                            onChange={(e) => { handleComparePackage(e, insPackage.id) }} />
                        </div>
                      }
                      <Link href={`/review?id=${insPackage.id}&brand=${activeBrandId}&model=${activeModelId}&year=${selectedYear}`}>
                        <a className="inner-wrap">
                          <div className="thumb">
                            <img src={insPackage.company.logo} alt="logo" />
                          </div>
                          <div className="title">
                            {insPackage.company.name}
                          </div>
                          <div className="text-detail">
                            {insPackage.description}
                            <br />
                          </div>
                        </a>
                      </Link>
                      <div className="view-detail">
                        <a onClick={() => { handleDetailsDialogOpen(insPackage.id) }}>{ t('PACKAGES_view_package_details') }</a>
                      </div>
                      <Link href={`/review?id=${insPackage.id}&brand=${activeBrandId}&model=${activeModelId}&year=${selectedYear}`}>
                        <a className="inner-wrap">
                          <div className="badges-wrap">
                            <span className="badge rounded-pill bg-success">{insPackage.tag.tag_coverage_type}</span>
                            <span className="badge rounded-pill bg-warning">{insPackage.repair_type_name}</span>
                          </div>
                          <div className="price w-100">
                            <span className="currency">Thb</span>
                            <span className="total">{Number(insPackage.total_insurance_premium).toLocaleString()}</span>
                            <div className="disc">THB {Number(insPackage.total_insurance_premium_vat).toLocaleString()}</div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                  )
                })
              }
              { noRecordFound &&
                <h2 className="text-danger">{ t('PACKAGES_no_package_found') }</h2>
              }
            </div>
            </>
          }
          { !noRecordFound && loadMore > 10 && pagination &&
            <button className="btn btn-light w-100" onClick={() => { loadMorePackages() }}>{ t('PACKAGES_load_more') }</button>
          }
        </div>
        { compareSwitch && 
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 compare-section-col">
            <div className="compare-section">
              <div className="header">
                <div className="title">{ t('PACKAGES_compare_packages')}</div>
                <button className="btn" onClick={() => {setCompareSwitch(false)}}>
                  <img src="/insurance/cross-icon.svg" alt="Compare Close" />
                </button>
              </div>
              <div className="body">
                <div className="title d-block mb-2 text-center">{t('PACKAGES_packages_add_upto', {allowedpackages : packagesAllowedForCompare})}.</div>
                { comparePackages.length > 0 && comparePackages.map((comPackage) => {
                  return (
                    <div className="insurance-card" key={comPackage.id}>
                      <div className="thumb">
                        <img src={comPackage.company.logo} alt="drivemate logo" />
                      </div>
                      <div className="title">{comPackage.company.name}</div>
                      <div className="text-detail">
                        {comPackage.description}
                      </div>
                      <div className="badges-wrap">
                        {/* <span className="badge rounded-pill bg-success">2nd Class</span> */}
                        <span className="badge rounded-pill bg-warning">{comPackage.repair_type_name}</span>
                      </div>
                      <div className="price w-100">
                        <span className="currency">Thb</span>
                        <span className="total">{Number(comPackage.total_insurance_premium).toLocaleString()}</span>
                        <div className="disc">THB {Number(comPackage.total_insurance_premium_vat).toLocaleString()}</div>
                      </div>
                    </div>
                  )
                })
                }
                { comparePackages.length === 0 &&
                  <h5 className="text-center mt-5 text-danger">{ t('PACKAGES_packages_to_compare') }</h5>
                }
              </div>
              <div className="footer">
                  <div className="media">
                    <button className="btn btn-outline-secondary btn-cancel left d-md-none d-sm-block d-block" onClick={() => {setCompareSwitch(false)}}>
                      <img src="/insurance/cross-icon.svg" alt="cancel" />
                    </button>
                    <div className="media-body">
                      <div className="col">
                        <button 
                        className="btn btn-primary w-100"
                        disabled={comparePackages.length < 2 }
                        onClick={() => {router.push(`/compare-packages?brand=${brand}&model=${model}&year=${year}&packages=${countPackages}`)}}>Compare</button>
                      </div>
                    </div>
                  </div>
                  <div className="footer-text d-md-none d-sm-block d-block">
                    { t('COMPARE_PACKAGES_selected', {selectedPackages : comparePackages.length, allowedPackages : packagesAllowedForCompare}) }
                  </div>
                </div>
            </div>
          </div>
        }
        </div>
      </div>
      { insuranceDetails.map((insPackage) => {
        return (
          <Dialog onClose={handleDetailsDialogClose} aria-labelledby="customized-dialog-title" open={detailsDialog} key={insPackage.id}>
            <DialogTitle id="customized-dialog-title" onClose={handleDetailsDialogClose}>{insPackage.company.name}</DialogTitle>
            <DialogContent dividers> 
              <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <div className="title4">{ t('COMPARE_PACKAGES_responsibility_vehicle') }</div>
                  <span className="icon"></span>
                </AccordionSummary>
                { insPackage.coverages.map((coverage, index) => {
                  if(coverage.coverage_list_name.en === coverageSection.responsibilityForVehicle) {
                    return (
                      <AccordionDetails key={index}>
                        <div className="row mb-2">
                          <div className="col-6 text-secondary">{coverage.coverage_name}:</div>
                          <div className="col-6 text-dark text-end">{Number(coverage.coverage_amount).toLocaleString()+' '+coverage.coverage_unit}</div>
                        </div>
                      </AccordionDetails>
                    )
                  }
                })}
                <div className="w-100 d-block mt-4 mb-4 text-secondary">
                  <small>*{ t('COMPARE_PACKAGES_coverage_damage') }</small>
                </div>
              </Accordion>
              <hr className="mt-0" />
              <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                  <div className="title4">{t('COMPARE_PACKAGES_third_party')}</div>
                  <span className="icon"></span>
                </AccordionSummary>
                { insPackage.coverages.map((coverage, index) => {
                  if(coverage.coverage_list_name.en === coverageSection.thirdPartyResponsibility) {
                    return (
                      <AccordionDetails key={index}>
                        <div className="row mb-2">
                          <div className="col-6 text-secondary">{coverage.coverage_name}:</div>
                          <div className="col-6 text-dark text-end">{Number(coverage.coverage_amount).toLocaleString()+' '+coverage.coverage_unit}</div>
                        </div>
                      </AccordionDetails>
                    )
                  }
                })}
              </Accordion>  
              <hr className="mt-0" />
              <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <div className="title4">{t('COMPARE_PACKAGES_attachment_coverage')}</div>
                  <span className="icon"></span>
                </AccordionSummary>
                { insPackage.coverages.map((coverage, index) => {
                  if(coverage.coverage_list_name.en === coverageSection.attachmentCoverage) {
                    return (
                      <AccordionDetails key={index}>
                        <div className="row mb-2">
                          <div className="col-6 text-secondary">{coverage.coverage_name}:</div>
                          <div className="col-6 text-dark text-end">{Number(coverage.coverage_amount).toLocaleString()+' '+coverage.coverage_unit}</div>
                        </div>
                      </AccordionDetails>
                    )
                  }
                })}
              </Accordion>  
            </DialogContent>
          </Dialog>
        )
      })}
    </div>
  )
}

export default InsurancePackages;