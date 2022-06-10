/* eslint-disable @next/next/no-img-element */
import React, { useEffect, FC, useRef } from 'react';
import useState from 'react-usestateref';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import useAxiosInterceptor from '../utilities/axiosApiInstance';
import { useRouter } from 'next/dist/client/router';
SwiperCore.use([Navigation]);
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { GET_BRANDS, GET_BRAND_MODELS, GET_BRAND_MODELS_YEARS } from '../utilities/endpoints';
import { searchTypes } from '../types/search-types';
import { useTranslation } from 'next-i18next';

const BrandSelection: FC = () => {
  const { isLoading, axiosApiInstance } = useAxiosInterceptor()
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation('common')
  const { query, isReady } = useRouter()
  const [brands, setBrands, brandsRef] = useState([]);
  const [models, setModels, modelsRef] = useState([]);
  const [years, setYears, yearsRef] = useState([]);
  const [dataFilter, setdataFilter, dataFilterRef] = useState([]);
  const [activeBrandId, setActiveBrandId, brandIdRef] = useState(null);
  const [activeModelId, setActiveModelId, modelIdRef] = useState(null);
  const [activeYear, setActiveYear, yearRef] = useState(null);
  const [searchCriteria, setSearchCriteria, searchCriteriaRef] = useState(searchTypes.brand);
  const [brandName, setBrandName, brandNameRef] = useState()
  const [modelName, setModelName, modelNameRef] = useState('')
  const [yearName, setYearName, yearNameRef] = useState('')
  const [trigger, setTrigger, triggerRef] = useState(false)
  const [brandSwiper, setBrandSwiper, brandSwiperRef] = useState(null);
  const [modelSwiper, setModelSwiper, modelSwiperRef] = useState(null);
  const [yearSwiper, setYearSwiper, yearSwiperRef] = useState(null);
  const [activeSearch, setActiveSearch, activeSearchRef] = useState(false);
  const [brandSelectionTranslation, setBrandSelectionTranslation, brandSelectionTranslationRef] = useState(searchTypes.brand);
  const [bannerTransition, setBannerTransition, bannerTransitionRef] = useState(false);
  const [viewportWidth, setViewportWidth, viewportWidthRef] = useState(1920);
  const { brand, model, year } = query;

  const prevRefBrands = useRef<HTMLDivElement>(null)
  const nextRefBrands = useRef<HTMLDivElement>(null)
  const prevRefModels = useRef<HTMLDivElement>(null)
  const nextRefModels = useRef<HTMLDivElement>(null)
  const prevRefYears = useRef<HTMLDivElement>(null)
  const nextRefYears = useRef<HTMLDivElement>(null)
  const scrollToBrandsRef = useRef<HTMLDivElement>(null)
  const config = { Auth: false }

  useEffect(() => {
    if (!isReady) {
      return;
    };
    getAllBrands();
    if (typeof window !== 'undefined') {
      setViewportWidth(window.innerWidth);
    }
  }, [isReady]);

  const duration = 300;

  const defaultStyle = {
    transition: `max-height ${duration}ms ease-in-out`,
    maxHeight: 500,
    overflow: 'hidden'
  }

  const transitionStyles = {
    entering: { maxHeight: 500 },
    entered: { maxHeight: 500 },
    exiting: { maxHeight: 0 },
    exited: { maxHeight: 0 },
  };

  const setLocalStorageItem = (itemName, items) => {
    let previousItems = JSON.parse(localStorage.getItem('DMSure'));
    previousItems = previousItems !== null ? previousItems : []
    if (previousItems) {
      for (let i = 0; i < previousItems.length; i++) {
        if (previousItems[i][itemName] != undefined) {
          previousItems.splice(previousItems.indexOf(previousItems[i]), 1)
        }
      }
      previousItems.push({ [itemName]: items })
      localStorage.setItem("DMSure", JSON.stringify(previousItems))
    }
  }

  const getAllBrands = async () => {
    await axiosApiInstance.get(GET_BRANDS, config).then((res) => {
      setBrands(res.data.data.brand.data);
      setLocalStorageItem('brands', brandsRef.current);
      if (brand != undefined) {
        const brandName = searchEntityByid(brand, 'brands')
        setBrandName(brandName['name'])
        setActiveBrandId(Number(brand))
        getModelsByBrand(brand)
        slideToBrand(brandIdRef.current)
      }
      setdataFilter(res.data.data.brand.data)
    }).catch((err) => err);
    handleTranslation()
  }

  const getModelsByBrand = async (brandId) => {
    setBannerTransition(true)
    setActiveYear(null);
    setActiveModelId(null);
    setModelName('')
    setYearName('')
    await axiosApiInstance.get(`${GET_BRAND_MODELS}/${brandId}`, config).then((res) => {
      setModels(res.data.data.model.data);
      if (triggerRef.current) {
        windowScrollToBrands(scrollToBrandsRef)
        setActiveBrandId(brandId);
        router.query.brand = brandId;
        router.push(router, undefined, { scroll: false });
        const brandName = searchEntityByid(brandId, 'brands')
        setBrandName(brandName['name'])
      }
      if (model !== undefined && !triggerRef.current && !activeSearchRef.current) {
        setActiveModelId(Number(model))
        getYearsByBrandModel(modelIdRef.current)
      }
      setLocalStorageItem('models', modelsRef.current);
      checkSearchCriteria();
      setdataFilter(res.data.data.model.data);
      slideToModel(modelIdRef.current)
    }).catch((err) => err);
  }

  const getYearsByBrandModel = async (modelId) => {
    setActiveYear(null)
    setYearName('')
    await axiosApiInstance.get(GET_BRAND_MODELS_YEARS, config).then((res) => {
      setYears(res.data.data.year);
      setLocalStorageItem('years', yearsRef.current);
      const modelName = searchEntityByid(modelId, 'models')
      setModelName(modelName['name'])
      if (triggerRef.current) {
        setActiveModelId(modelId);
        router.query.model = modelId;
        router.push(router, undefined, { scroll: false });
        const modelName = searchEntityByid(modelId, 'models')
        setModelName(modelName['name'])
      }
      if (year !== undefined && Number(year) > 1992 && !triggerRef.current && !activeSearchRef.current) {
        setActiveYear(Number(year))
        setYearName(year + '')
      }
      checkSearchCriteria();
      const customYear = [];
      yearsRef.current.map((year, index) => {
        customYear.push({
          id: index,
          name: year + ''
        })
      })
      if (searchCriteriaRef.current === 'year') {
        setdataFilter(customYear);
      } else {
        setdataFilter(brandsRef.current)
      }
      slideToYear(yearRef.current)
    }).catch((err) => err);
  }

  const searchEntityByid = (entityId, entityType) => {
    const getStorageData = JSON.parse(localStorage.getItem('DMSure'))
    for (let i = 0; i < getStorageData.length; i++) {
      if (getStorageData[i][entityType] != undefined) {
        var filterObj = getStorageData[i][entityType].filter(entity => entity.id === Number(entityId))
      }
    }
    return filterObj[0];
  }

  const selectYear = (year) => {
    setActiveYear(year);
    router.query.year = year;
    router.push(router, undefined, { scroll: false });
    setYearName(year + '')
    const customYear = [];
    years.map((year, index) => {
      customYear.push({
        id: index,
        name: year + ''
      })
    })
    checkSearchCriteria()
    if (searchCriteriaRef.current === 'year') {
      setdataFilter(customYear);
    } else {
      setdataFilter(brandsRef.current)
    }
  }

  const windowScrollToBrands = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const capFirstLetter = (str: string) =>
    str
      .toLowerCase()
      .split(' ')
      .map(e => `${e.charAt(0).toUpperCase()}${e.slice(1)}`)
      .join(' ')

  // const resetSearch = () => {
  //   setBrands(brands)
  //   setActiveBrandId(null)
  //   setActiveModelId(null)
  //   setActiveYear(null)
  // }

  const slideToBrand = (brandId) => {
    const index = brandsRef.current.findIndex((br) => br.id === brandId);
    if (brandSwiperRef.current) {
      brandSwiperRef.current.slideTo(index);
    }
  }

  const slideToModel = (modelId) => {
    const index = modelsRef.current.findIndex((br) => br.id === modelId);
    if (modelSwiperRef.current) {
      modelSwiperRef.current.slideTo(index);
    }
  }

  const slideToYear = (year) => {
    const index = yearsRef.current.findIndex((br) => br === Number(year));
    if (yearSwiperRef.current) {
      yearSwiperRef.current.slideTo(index);
    }
  }

  const checkSearchCriteria = () => {
    if (brandIdRef.current !== null && modelIdRef.current == null && yearRef.current == null) {
      setSearchCriteria(searchTypes.model);
    } else if (yearRef.current == null && brandIdRef.current != null && modelIdRef.current != null) {
      setSearchCriteria(searchTypes.year);
    } else {
      setSearchCriteria(searchTypes.brand);
    }
    handleTranslation();
  }

  const handleTranslation = () => {
    if (locale === 'th') {
      switch (searchCriteriaRef.current) {
        case 'brand':
          setBrandSelectionTranslation('ยี่ห้อ')
          break;
        case 'model':
          setBrandSelectionTranslation('แบบอย่าง')
          break;
        case 'year':
          setBrandSelectionTranslation('ปี')
          break;
        default:
          setBrandSelectionTranslation('ยี่ห้อ')
      }
    } else {
      switch (searchCriteriaRef.current) {
        case 'brand':
          setBrandSelectionTranslation('Brand')
          break;
        case 'model':
          setBrandSelectionTranslation('Model')
          break;
        case 'year':
          setBrandSelectionTranslation('Year')
          break;
        default:
          setBrandSelectionTranslation('Brand')
      }
    }

  }

  const handleSearch = async (item) => {
    setTrigger(false)
    setActiveSearch(true)
    if (searchCriteriaRef.current === searchTypes.brand) {
      slideToBrand(item.id)
      setActiveBrandId(item.id)
      getModelsByBrand(item.id)
      router.query.brand = item.id;
      router.push(router, undefined, { scroll: false });
      const brandName = searchEntityByid(item.id, 'brands')
      setBrandName(brandName['name'])
      setYears([]);
    } else if (searchCriteriaRef.current === searchTypes.model) {
      slideToModel(item.id)
      setActiveModelId(item.id)
      getYearsByBrandModel(Number(item.id))
      router.query.model = item.id;
      router.push(router, undefined, { scroll: false });
      const modelName = searchEntityByid(item.id, 'models')
      setModelName(modelName['name'])
      setYears([]);
    } else {
      slideToYear(item.name)
      selectYear(Number(item.name))
    }
  }

  const switchSearchCriteria = (searchType) => {
    if (searchType === searchTypes.brand) {
      setSearchCriteria(searchTypes.brand)
      setdataFilter(brandsRef.current)
      setActiveModelId(null)
      setActiveYear(null)
      setModelName('')
      setYearName('')
      handleTranslation()
    } else if (searchType === searchTypes.model) {
      setSearchCriteria(searchTypes.model)
      setdataFilter(modelsRef.current)
      setActiveModelId(null)
      setActiveYear(null)
      setModelName('')
      setYearName('')
      handleTranslation()
    } else {
      setSearchCriteria(searchTypes.year)
      const customYear = [];
      years.map((year, index) => {
        customYear.push({
          id: index,
          name: year + ''
        })
      })
      setdataFilter(customYear)
      setActiveYear(null)
      setYearName('')
      handleTranslation()
    }
  }

  return (
    <div className="bs-wrap" ref={scrollToBrandsRef}>
      {isLoading && <div className="dm-loader" />}
      <div className="container">
        {!activeBrandId &&
          <div className="bs-promo-banner">
            <img src="/insurance/promo-banner.jpg" alt="Drivemate Insurance Promotion" />
          </div>
        }
        <div className="brand-search">
          <div className="row">
            <div className="col-md-6 col-sm-5 col-12">
              <div className="title text-capitalize">{t('BRAND_SELECTION_choose', { name: brandSelectionTranslationRef.current })}</div>
            </div>
            <div className="col-md-6 col-sm-7 col-12">
              <div className="auto-search">
                <div className="bmy-selector">
                  <button type="button" className="btn" onClick={() => { switchSearchCriteria(searchTypes.brand) }}>{brandNameRef.current}</button>
                  <button type="button" className="btn" onClick={() => { switchSearchCriteria(searchTypes.model) }}>{modelNameRef.current}</button>
                  <button type="button" className="btn" onClick={() => { switchSearchCriteria(searchTypes.year) }}>{yearNameRef.current}</button>
                </div>
                <div className="auto-search">
                  <ReactSearchAutocomplete
                    items={dataFilterRef.current}
                    onSelect={handleSearch}
                    styling={{ zIndex: 5 }}
                    placeholder={t('BRAND_SELECTION_search', { name: capFirstLetter(`${brandSelectionTranslationRef.current}`) })} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {brands.length > 0 &&
        <div className="container custom-res-container">
          <div className="brand-section-wrap lg">
            <div ref={prevRefBrands} className="swiper-button-prev"></div>
            <Swiper
              slidesPerView={'auto'}
              navigation={{
                prevEl: prevRefBrands.current!,
                nextEl: nextRefBrands.current!
              }}
              slidesPerGroup={viewportWidthRef.current > 550 ? 5 : 1}
              onInit={setBrandSwiper}>
              {brands.map((brand) => {
                return (
                  <SwiperSlide key={brand.id}>
                    <div
                      className={`brand-card ${brandIdRef.current === brand.id ? 'active' : ''}`}
                      onClick={() => { getModelsByBrand(brand.id); setTrigger(true) }}>
                      <img src={brand.logo} alt="brand image" />
                      <div className="caption">{brand.name}</div>
                      <span className="spr" />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <div ref={nextRefBrands} className="swiper-button-next"></div>
          </div>
        </div>
      }
      {models.length > 0 &&
        <div className="container custom-res-container">
          <div className="brand-section-wrap sm">
            <div ref={prevRefModels} className="swiper-button-prev"></div>
            <Swiper
              slidesPerView={'auto'}
              navigation={{
                prevEl: prevRefModels.current!,
                nextEl: nextRefModels.current!
              }}
              slidesPerGroup={viewportWidthRef.current > 550 ? 8 : 2}
              onInit={setModelSwiper}>
              {models.map((model) => {
                return (
                  <SwiperSlide key={model.id}>
                    <div
                      className={`brand-my-card ${modelIdRef.current === model.id ? 'active' : ''}`}
                      onClick={() => { getYearsByBrandModel(model.id); setTrigger(true) }}>
                      {model.name}
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <div ref={nextRefModels} className="swiper-button-next"></div>
          </div>
        </div>
      }
      {yearsRef.current.length > 0 &&
        <div className="container custom-res-container">
          <div className="brand-section-wrap sm">
            <div ref={prevRefYears} className="swiper-button-prev"></div>
            <Swiper
              slidesPerView={'auto'}
              navigation={{
                prevEl: prevRefYears.current!,
                nextEl: nextRefYears.current!
              }}
              slidesPerGroup={viewportWidthRef.current > 550 ? 9 : 3}
              onInit={setYearSwiper}>
              {years.map((year) => {
                return (
                  <SwiperSlide key={year}>
                    <div
                      className={`brand-my-card ${yearRef.current === year ? 'active' : ''}`}
                      onClick={() => { selectYear(year); setTrigger(true) }}>{year}</div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <div ref={nextRefYears} className="swiper-button-next"></div>
          </div>
        </div>
      }
      {activeBrandId && activeModelId && activeYear &&
        <div className="w-100 d-block text-center ps-3 pe-3">
          <button
            className="btn btn-primary w-xs-100"
            onClick={() => { router.push(`/insurance-packages?brand=${activeBrandId}&model=${activeModelId}&year=${activeYear}`) }}>
            {t('BRAND_SELECTION_get_quote')}
          </button>
        </div>
      }
    </div>
  )
}

export default BrandSelection;