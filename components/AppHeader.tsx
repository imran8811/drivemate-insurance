/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

const AppHeader: FC = () => {
  const router = useRouter();
  const { isReady, asPath, locale } = useRouter();
  const ref = useRef();
  const { t } = useTranslation('common');
  const [listACarDropdown, setListACarDropdown] = useState<Boolean>(false)
  const [langDropdown, setLangDropdown] = useState<Boolean>(false)
  const [profileDropdown, setProfileDropdown] = useState<Boolean>(false)
  const [mobProfileDropdown, setMobProfileDropdown] = useState<Boolean>(false)
  const [baseUrl, setBaseUrl] = useState<string>();
  const [session, setSession] = useState<Boolean>(false)
  const [nextUrl, setNextUrl] = useState<string>();

  useEffect(() => {
    if (!isReady) {return}
    checkSession()
    setNextUrl(window.location.pathname + window.location.search)
    setBaseUrl(window.location.origin !== 'http://localhost:3000' ? window.location.origin : 'https://dev.otoz.biz')
  }, [isReady])

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
    setListACarDropdown(false)
    setLangDropdown(false)
    setProfileDropdown(false)
  });

  const checkSession = () => {
    const res = localStorage.getItem('ACCESS_TOKEN');
    if(res != null) {
      setSession(true)
    } else {
      setSession(false)
    }
  }

  const toggleListACarDropdown = () => {
    setListACarDropdown(!listACarDropdown)
    setLangDropdown(false)
    setProfileDropdown(false)
  }

  const toggleLangDropdown = () => {
    setLangDropdown(!langDropdown)
    setListACarDropdown(false)
    setProfileDropdown(false)
  }

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown)
    setLangDropdown(false)
    setListACarDropdown(false)
  }

  const toggleMobProfileDropdown = () => {
    setMobProfileDropdown(!mobProfileDropdown)
  }

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem('ACCESS_TOKEN')
    localStorage.removeItem('next')
    localStorage.removeItem('DMSure')
    localStorage.removeItem('personalInfo')
    localStorage.removeItem('vehicleInfo')
    localStorage.removeItem('shippingInfo')
    setProfileDropdown(false)
    setMobProfileDropdown(false)
    setSession(false)
    router.push('/brand-selection');
  }

  const handleRedirect = (e, type) => {
    e.preventDefault();
    e.stopPropagation()
    localStorage.setItem("next", nextUrl);
    const loginUrl = baseUrl + process.env.LOGIN_URL;
    const signupUrl = baseUrl + process.env.SIGNUP_URL;
    if(type === 'login') {
      window.location.href = loginUrl;
    } else {
      window.location.href = signupUrl;
    }
  }

  const handleLangChange = (e, lang) => {
    e.preventDefault();
    e.stopPropagation();
    if(locale !== lang) {
      router.push(asPath, '', {locale: lang})
    } else {
      setProfileDropdown(false)
      setMobProfileDropdown(false)
      setLangDropdown(false)
    }
  }

  return (
    <header className="w-100">
      <span className="sec-header"></span>
      <nav className="navbar navbar-expand-lg navbar-light bg-light dm-nav">
        <div className="media">
          <Link href="/">
            <a className="navbar-brand">
              <img src="/insurance/logo.svg" alt="drivemate logo" />
            </a>
          </Link>
          <div className="media-body">
            <div className="row">
              <div className="col-sm-6 d-none d-sm-block"></div>
              <div className="col-sm-6 col-12 col-toggler ps-0">
                <button type="button" className="navbar-toggler float-end" onClick={toggleMobProfileDropdown}>
                { !mobProfileDropdown &&
                  <div className="dd-user">
                    <img src="/insurance/menu-bar.svg" alt="Menu" className="float-start" />
                    <span className="thumb float-start">
                      <img src="/insurance/user-icon.svg" alt="user" className="nav-profile-pic" />
                    </span>
                  </div>
                  }
                  { mobProfileDropdown &&<span className="close-icon"></span>}
                </button>
                <div className="d-none d-sm-none d-md-none d-lg-block">
                  <div className="navbar-collapse">
                    <ul className="navbar-nav float-end" ref={ref}>
                      <li className="nav-item dropdown dd-list">
                        <a className="nav-link dropdown-toggle" onClick={toggleListACarDropdown}>{t('LIST_YOUR_CAR')}</a>
                        { listACarDropdown && 
                          <div className="dropdown-menu dropdown-menu-end">
                            <a href={baseUrl+'/asset-creation/know-before-rentout/Car'} className="dropdown-item">{t('LIST_A_CAR')}</a>
                            <a href={baseUrl+'/asset-creation/know-before-rentout/CarWithDriver'} className="dropdown-item">{t('LIST_CAR_WITH_DRIVER')}</a>
                            <a href={baseUrl+'/asset-creation/know-before-rentout/AirportTransfer'} className="dropdown-item">{t('LIST_CAR_AIRPORT_TRANSFER')}</a>
                          </div>
                        }
                      </li>
                      <li className="nav-item dropdown dd-list">
                        <a className="nav-link dropdown-toggle" onClick={() => {toggleLangDropdown()}}>
                          <img src="/insurance/language-icon.svg" alt="language" />
                        </a>
                        { langDropdown && 
                          <div className="dropdown-menu dropdown-menu-end">
                            <a href="#" className={classNames("dropdown-item", { "selected": locale === 'th' })} onClick={(e) => {handleLangChange(e, 'th')}}>
                              <span className="flag-img">
                                <img src="/insurance/flags/flag-th.svg" alt="Thai" />
                              </span>  ภาษาไทย
                            </a>
                            <a href="#" className={classNames("dropdown-item", { "selected": locale === 'en' })} onClick={(e) => {handleLangChange(e, 'en')}}>
                              <span className="flag-img">
                                <img src="/insurance/flags/flag-en.svg" alt="Eng" />
                              </span> English
                            </a>
                          </div>
                        }
                      </li>
                      <li className="nav-item dropdown dd-user btn-group d-block">
                        <a className="nav-link dropdown-toggle" onClick={() => {toggleProfileDropdown()}}>
                          <img src="/insurance/menu-bar.svg" alt="Menu" className="float-start" />
                          <span className="thumb float-start">
                            <img src="/insurance/user-icon.svg" alt="user" className="nav-profile-pic" />
                          </span>
                        </a>
                        { !session && profileDropdown &&
                          <div className="dropdown-menu dropdown-menu-end">
                            <a href="#" onClick={(e) => handleRedirect(e, 'login')} className="dropdown-item">{t('LOGIN')}</a>
                            <a href="#" onClick={(e) => handleRedirect(e, 'signup')} className="dropdown-item">{t('SIGN_UP')}</a>
                          </div>
                        }
                        { session && profileDropdown && 
                          <div className="dropdown-menu dropdown-menu-end">
                            <a href={baseUrl+'/user-profile-management'} className="dropdown-item">{t('MY_PROFILE')}</a>
                            <a href={baseUrl+'/trips-management/my-trips'} className="dropdown-item">{t('TRIP_HISTORY')}</a>
                            <a href={baseUrl+'/order-management/my-orders'} className="dropdown-item">{t('YOUR_ORDERS')}</a>
                            <a href={baseUrl+'/user-management/manage-assets'} className="dropdown-item">{t('MY_CARS')}</a>
                            <a href={baseUrl+'/requests'} className="dropdown-item">{t('MESSAGES')}</a>
                            <a href={baseUrl+'/reward-points/reward-points-history'} className="dropdown-item">{t('REWARD_POINTS')}</a>
                            <a href={baseUrl+'/user-management/super-host'} className="dropdown-item">{t('SUPER_HOST_DASHBOARD')}</a>
                            <div className="dropdown-divider"></div>
                            <a href={baseUrl+'/user-profile-management'} className="dropdown-item">{t('ACCOUNT_SETTING')}</a>
                            <a href={baseUrl+'/order-management/my-insurance'} className="dropdown-item">{t('MY_INSURANCE')}</a>
                            {/* <a href={baseUrl+'/faqs'} className="dropdown-item">FAQs</a>
                            <a href="https://www.drivemate.asia/blog/" className="dropdown-item">Blog</a>
                            <a href={baseUrl+'/contact-us'} className="dropdown-item">Contact us</a> */}
                            <div className="dropdown-divider d-none d-lg-block"></div>
                            <a href="#" onClick={(e)=> {handleLogout(e)}} className="dropdown-item d-none d-lg-block">{t('LOGOUT')}</a>
                          </div>
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        { mobProfileDropdown &&
          <div className="d-block d-sm-block d-md-block d-lg-none mt-1">
              <div className="navbar-collapse">
                <ul className="navbar-nav float-end" ref={ref}>
                {!session &&
                  <li className="nav-item">
                    <a href="#" onClick={(e) => handleRedirect(e, 'login')} className="dropdown-item">{t('LOGIN')}</a>
                    <a href="#" onClick={(e) => handleRedirect(e, 'signup')} className="dropdown-item">{t('SIGN_UP')}</a>
                  </li>
                }
                { session && 
                  <li className="nav-item">
                    <a href={baseUrl+'/user-profile-management'} className="dropdown-item">{t('MY_PROFILE')}</a>
                    <a href={baseUrl+'/trips-management/my-trips'} className="dropdown-item">{t('TRIP_HISTORY')}</a>
                    <a href={baseUrl+'/order-management/my-orders'} className="dropdown-item">{t('YOUR_ORDERS')}</a>
                    <a href={baseUrl+'/user-management/manage-assets'} className="dropdown-item">{t('MY_CARS')}</a>
                    <a href={baseUrl+'/requests'} className="dropdown-item">{t('MESSAGES')}</a>
                    <a href={baseUrl+'/reward-points/reward-points-history'} className="dropdown-item">{t('REWARD_POINTS')}</a>
                    <a href={baseUrl+'/user-management/super-host'} className="dropdown-item">{t('SUPER_HOST_DASHBOARD')}</a>
                    <div className="dropdown-divider"></div>
                    <a href={baseUrl+'/user-profile-management'} className="dropdown-item">{t('ACCOUNT_SETTING')}</a>
                    <a href={baseUrl+'/order-management/my-insurance'} className="dropdown-item">{t('MY_INSURANCE')}</a>
                  </li>
                }
                <div className="dropdown-divider"></div>
                <li className="nav-item">
                  <a href={baseUrl+'/asset-creation/know-before-rentout/Car'} className="dropdown-item">{t('LIST_A_CAR')}</a>
                  <a href={baseUrl+'/asset-creation/know-before-rentout/CarWithDriver'} className="dropdown-item">{t('LIST_CAR_WITH_DRIVER')}</a>
                  <a href={baseUrl+'/asset-creation/know-before-rentout/AirportTransfer'} className="dropdown-item">{t('LIST_CAR_AIRPORT_TRANSFER')}</a>
                </li>
                <div className="dropdown-divider"></div>
                <li className="nav-item dd-lang">
                  <div className="lang-menu">
                    <a href="#" className={classNames("dropdown-item", { "selected": locale === 'th' })} onClick={(e) => handleLangChange(e, 'th')}>
                      <span className="flag-img">
                        <img src="/insurance/flags/flag-th.svg" alt="Thai" />
                      </span>  ภาษาไทย
                    </a>
                    <a  href="#" className={classNames("dropdown-item", { "selected": locale === 'en' })} onClick={(e) => handleLangChange(e, 'en')}>
                      <span className="flag-img">
                        <img src="/insurance/flags/flag-en.svg" alt="Eng" />
                      </span> English
                    </a>
                  </div>
                </li>
                { session && 
                  <li className="nav-item">
                    <div className="dropdown-divider"></div>
                    <a href="#" onClick={(e)=> {handleLogout(e)}} className="dropdown-item">{t('LOGOUT')}</a>
                  </li>
                }
              </ul>
            </div>
          </div>
        }
      </nav>
    </header>
  )
}

export default AppHeader;