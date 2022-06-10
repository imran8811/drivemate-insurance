/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from 'react';
import useState from 'react-usestateref';
import Link from 'next/link'
import useAxiosInterceptor from '../utilities/axiosApiInstance';
import { GET_BRANDS, GET_BRAND_MODELS, GET_INSURANCE_PACKAGES, GET_BRAND_MODELS_YEARS } from '../utilities/endpoints';
import { useRouter } from 'next/dist/client/router';
import { searchTypes } from '../types/search-types';
import { useTranslation } from 'next-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

const ComparePackages: FC = () => {
  const { isLoading, axiosApiInstance } = useAxiosInterceptor();
  const router = useRouter();
  const { query, isReady } = useRouter()
  const { t } = useTranslation('common')
  const { brand, model, year, packages } = query;
  const [comparePackage, setComparePackage, compareRef] = useState([])
  const [insurancePackages, setInsurancePackages, packageRef] = useState([])
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [viewportWidth, setViewportWidth, viewportWidthRef] = useState(1920);
  const [compSwiper, setCompSwiper, compSwiperRef] = useState(null);
  const [selectPackages, setSelectPackages, selectPackagesRef] = useState([]);
  const config = {Auth:false} 

  useEffect(() => {
    if (!isReady) return;
    getInsurancePackages()
    getAllBrands();  
    window.addEventListener('resize', checkForChanges);   
  }, [isReady])

  const checkForChanges = () =>{
    if(window.innerWidth > 550){
      comparePackages()
    }else{
      setSelectPackages([compareRef.current[0]]); 
    } 

  }

  const getAllBrands = async () => {
    await axiosApiInstance.get(GET_BRANDS,config).then((res) => {
      setBrands(res.data.data.brand.data);
      getModelsByBrand(brand);
    }).catch((err) => err);
  }

  const getModelsByBrand = (brandId) => {
    axiosApiInstance.get(`${GET_BRAND_MODELS}/${brandId}`,config).then((res) => {
      setModels(res.data.data.model.data);
      getYearsByBrandModel(brand, model)
    }).catch((err) => err);
  }

  const getYearsByBrandModel = (brandId, modelId) => {
    axiosApiInstance.get(GET_BRAND_MODELS_YEARS,config).then((res) => {
      setYears(res.data.data.year);
    }).catch((err) => err);
  }

  const getInsurancePackages = () => {
    axiosApiInstance.get(`${GET_INSURANCE_PACKAGES}/${brand}/${model}`,config).then((res) => {
      setInsurancePackages(res.data.data.package.data);
      comparePackages();
      checkForChanges();
    }).catch(err => err);
  }

  const convertIdtoName = (id, searchType) => {
    if (searchType === searchTypes.brand && brands.length > 0) {
      const res = brands.filter((brand) => brand.id === Number(id));
      return res[0].name;
    } else {
      if (models.length > 0) {
        const res = models.filter((model) => model.id === Number(id));
        return res[0].name;
      }
    }
  }

  const brandName = convertIdtoName(brand, searchTypes.brand)
  const modelName = convertIdtoName(model, searchTypes.model)

  const comparePackages = () => {
    const strToArr = JSON.parse("[" + packages + "]");
    const filterObject = packageRef.current.filter(object => strToArr.includes(object.id))
    setComparePackage(filterObject);
    setSelectPackages(filterObject);

  }

  const swipMobilecomparePackages = (event) => {
    setSelectPackages([comparePackage[event.activeIndex]]);
  }

  return (
    <div className="packages-list-wrap">
      {isLoading && <div className="dm-loader" />}
      <div className="container">
        <div className="selected-title">
          <button className="btn" onClick={() => router.back()}><img src="/insurance/back-icon.svg" alt="back" /></button>
          <span>{t('COMPARE_PACKAGES_comparing_for')}</span> {brandName} {modelName} {year}</div>
      </div>
      <div className="bg-gray sticky-top compare-policies-sticky">
        <div className="container custom-res-container">
          <div className="compare-policies-section border-bottom-0">
            <div className="insurance-card-wrap">
                <div className="swiper-web">
                {comparePackage.length > 0 && comparePackage.map((comPackage) => {
                return (
                  <Link href={`/review?id=${comPackage.id}&brand=${brand}&model=${model}&year=${year}`} key={comPackage.id} passHref>
                    <a className="insurance-card">
                      <div className="thumb">
                        <img src={comPackage.company.logo} alt="drivemate logo" />
                      </div>
                      <div className="title mb-0 pt-0">{comPackage.company.name}</div>
                      <div className="price w-100">
                        <span className="currency">Thb</span>
                        <span className="total">{Number(comPackage.total_insurance_premium).toLocaleString()}</span>
                        <div className="disc">THB {Number(comPackage.total_insurance_premium_vat).toLocaleString()}</div>
                      </div>
                    </a>
                  </Link>
                )})}
              </div>
              <div className="swiper-responsive">
                    <Swiper onSlideChange={(e) => swipMobilecomparePackages(e)}
                    onInit={setCompSwiper}
                    slidesPerView={'auto'}
                    slidesPerGroup={1}>
                    {comparePackage.map((comPackage) => {
                      return (
                        <SwiperSlide key={comPackage.id}>
                          <Link href={`/review?id=${comPackage.id}&brand=${brand}&model=${model}&year=${year}`} key={comPackage.id} passHref>
                            <a className="insurance-card">
                              <div className="thumb">
                                <img src={comPackage.company.logo} alt="drivemate logo" />
                              </div>
                              <div className="title mb-0 pt-0">{comPackage.company.name}</div>
                              <div className="price w-100">
                                <span className="currency">Thb</span>
                                <span className="total">{Number(comPackage.total_insurance_premium).toLocaleString()}</span>
                                <div className="disc">THB {Number(comPackage.total_insurance_premium_vat).toLocaleString()}</div>
                              </div>
                            </a>
                          </Link>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <hr className="mt-2 mb-1" />
        <div className="compare-policies-section">
          <div className="title">{t('COMPARE_PACKAGES_responsibility_vehicle')}
            <span>{t('COMPARE_PACKAGES_coverage_damage')}</span>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                {selectPackages.length > 0 && selectPackages.map((comPackage) => {
                  return (
                    <div key={comPackage.id} className="col col-cps">
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[0].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">{Number(comPackage?.coverages[0].coverage_amount).toLocaleString()} {comPackage?.coverages[0].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="cps">
                          <div className="row">
                            <div className="col-sm-12 col-6">
                              <span className="label">Car Type:</span>
                            </div>
                            <div className="col-sm-12 col-6">
                              <div className="caption">Not Available</div>
                            </div>
                          </div>
                        </div> */}
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[1].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">THB {Number(comPackage?.coverages[1].coverage_amount).toLocaleString()} {comPackage?.coverages[1].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[2].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">THB {Number(comPackage?.coverages[2].coverage_amount).toLocaleString()} {comPackage?.coverages[2].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[3].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">THB {Number(comPackage?.coverages[3].coverage_amount).toLocaleString()} {comPackage?.coverages[3].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
                }
              </div>
            </div>
          </div>
        </div>
        <div className="compare-policies-section">
          <div className="title">{t('COMPARE_PACKAGES_third_party')}</div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                {selectPackages.length > 0 && selectPackages.map((comPackage) => {
                  return (
                    <div key={comPackage.id} className="col col-cps">
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[4].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">THB {Number(comPackage?.coverages[4].coverage_amount).toLocaleString()} {comPackage?.coverages[4].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[5].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">THB {Number(comPackage?.coverages[5].coverage_amount).toLocaleString()} {comPackage?.coverages[5].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[6].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">THB {Number(comPackage?.coverages[6].coverage_amount).toLocaleString()} {comPackage?.coverages[6].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[7].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">THB {Number(comPackage?.coverages[7].coverage_amount).toLocaleString()} {comPackage?.coverages[7].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="compare-policies-section border-bottom-0 pb-0">
          <div className="title">{t('COMPARE_PACKAGES_attachment_coverage')}</div>
          <div className="card mb-0">
            <div className="card-body">
              <div className="row">
                {selectPackages.length > 0 && selectPackages.map((comPackage) => {
                  return (
                    <div key={comPackage.id} className="col col-cps">
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[8].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">THB {Number(comPackage?.coverages[8].coverage_amount).toLocaleString()} {comPackage?.coverages[8].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[9].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">THB {Number(comPackage?.coverages[9].coverage_amount).toLocaleString()} {comPackage?.coverages[9].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[10].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">THB {Number(comPackage?.coverages[10].coverage_amount).toLocaleString()} {comPackage?.coverages[10].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                      <div className="cps">
                        <div className="row">
                          <div className="col-sm-12 col-6">
                            <span className="label">{comPackage?.coverages[11].coverage_name}:</span>
                          </div>
                          <div className="col-sm-12 col-6">
                            <div className="caption">{Number(comPackage?.coverages[11].coverage_amount).toLocaleString()} {comPackage?.coverages[11].coverage_unit}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComparePackages;