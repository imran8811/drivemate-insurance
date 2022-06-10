/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect, useContext, useRef } from 'react';
import useState from 'react-usestateref';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import { Enums } from '@otoz/constants';
import PhoneInputWithCountry from "react-phone-number-input"
import { 
  GET_BRANDS, 
  GET_BRAND_MODELS, 
  GET_INSURANCE_PACKAGES, 
  GET_TENANT_CONFIG, 
  REFRESH_TOKEN, 
  SAVE_INSURANCE_PACKAGE, 
  SIGN_IN, 
  SIGN_UP,
  GET_UPLOAD_URL,
  FORGOT_PASSWORD,
  GET_TENANT_SECRETS
} from '../utilities/endpoints';
import useAxiosInterceptor from '../utilities/axiosApiInstance';
import { useRouter } from 'next/dist/client/router';
import { NAVIGATION, coverageSection, TENANT_ID, PATTERN } from '../utilities/constants';
import { searchTypes } from '../types/search-types';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import BlobStorageService from '../utilities/blobStorageService';
import classNames from 'classnames';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 12,
    right: 'calc(50% + 16px)',
  },
  line: {
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  active: {
  },
  completed: {
    zIndex: 1,
  },
});

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function getSteps(locale) {
  if(locale === 'en') {
    return ['Insurance information', 'Car and insured person information', 'Conclusion '];
  } else {
    return ['ข้อมูลประกันภัย', 'ข้อมูลรถยนต์และผู้เอาประกันภัย', 'สรุป'];
  }
}

const Review: FC = () => {
  const { isLoading, axiosApiInstance } = useAxiosInterceptor();
  type IUserSession = {
    accessToken : string,
    refreshToken : string,
    userID : string,
    userData : {}
  }
  const router = useRouter();
  const { t } = useTranslation();
  const { query, isReady, locale } = useRouter();
  const [value, setValue] = useState(0);
  const { brand, model, year, id } = query;
  const [reviews, setReviews, reviewsRef] = useState<any>({});
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [nextUrl, setNextUrl] = useState<string>();
  const [baseUrl, setBaseUrl] = useState<string>();
  const [userId, setUserId, userIdRef] = useState<string>('');
  const [userSession, setUserSession, userSessionRef] = useState<IUserSession>();

  const [authDialog, setAuthDialog] = useState(false);
  const [loginDialog, setLoginDialog] = useState(true);
  const [signupStep1, setSignupStep1] = useState(false);
  const [signupStep2, setSignupStep2] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  const [passwordVisible, setPasswordVisible, passwordVisibleRef] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false)
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState('')
  const [profileImage, setProfileImage, profileImageRef] = useState('/insurance/default-profile-pic.png')
  const [profileImageValidation, setProfileImageValidation, profileImageValidationRef] = useState(false)
  const [tabType, setTabType, tabTypeRef] = useState('individual')
  const [azureStorageUri, setAzureStorageUri, azureStorageUriRef] = useState<any>({});
  const classes = useStyles();
  const [activeStep] = React.useState(0);
  const steps = getSteps(locale);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const uploadFiles = (file) => {
    const data = {
      file: file[0],
      filenames: [file[0].name],
      namingfields : [],
      imageType : 'PROFILE'
    }
    getUploadUrl(data);

    const tenantConfig = JSON.parse(localStorage.getItem('Tenant-Configuration'));
    setAzureStorageUri(tenantConfig.configuration.secrets.azure.azureStorageURI);
  }

  const blobStorage = new BlobStorageService();

  const getUploadUrl = (data) => {
    const config = {
      Auth:false
    } 
    axiosApiInstance.post(`${GET_UPLOAD_URL}/${TENANT_ID}`, data, config).then(res => {
      res.data.map(async ({ blobName, storageBlobName, sasToken, url }) => {
        await uploadFile(data.file, blobName, storageBlobName, sasToken, url);
      })
    }).catch(err => {
      console.log(err)
    })
  }

  const uploadFile = async (file: File, blobName: string, storageBlobName: string, storageAccessToken: string, url: string, tenantId: string = TENANT_ID) => {
    try {
      await blobStorage.uploadToBlobStorage(file, {containerName: tenantId, storageUri: azureStorageUriRef.current, storageAccessToken: storageAccessToken, blobName: storageBlobName}, 'File');
      setProfileImage(url)
    } catch (error) { 
    }
  }

  const showFileDialog = () => inputFileRef.current && inputFileRef.current.click();

  const getInsurance = async () => {
    const config = {
      Auth:false
    } 
    await axiosApiInstance.get(`${GET_INSURANCE_PACKAGES}/${brand}/${model}?id=${id}`,config)
      .then((res) => {
        setReviews(res.data.data.package.data[0]);
      }).catch((err) => err);
  }

  useEffect(() => {
    if (!isReady) {
      return;
    };
    getInsurance();
    getAllBrands();
    setNextUrl(window.location.pathname + window.location.search)
    setBaseUrl(window.location.origin !== 'http://localhost:3000' ? window.location.origin : 'https://dev.otoz.biz');
    getTenantConfig();
  }, [isReady]);

  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({mode: 'onChange'});
  const { 
    register: registerSignup, 
    handleSubmit:  handleSubmitSignup,
    trigger: triggerSignup,
    control: controlSignup,
    formState: { 
      errors : errorsSignup, 
      isDirty : isDirtySignup,
      isValid : isValidSignup
    } 
  } = useForm();

  const { 
    register: registerForgotPassword, 
    handleSubmit:  handleForgotPasswordSubmit,
    trigger: triggerForgotPassword,
    control: controlForgotPassword,
    formState: { 
      errors : errorsForgotPassword, 
      isDirty : isDirtyForgotPassword,
      isValid : isValidForgotPassword
    } 
  } = useForm();

  const getTenantConfig = () => {
    const config = {
      Auth:false
    } 
    axiosApiInstance.get(GET_TENANT_CONFIG,config).then(res => {
      localStorage.setItem('Tenant-Configuration', JSON.stringify(res.data));
      getSecrets();
    }).catch(err => {
      console.log(err)
    })
  }

  const getSecrets = () => {
    const config = {
      Auth:false
    } 
    axiosApiInstance.get(`${GET_TENANT_SECRETS}/${Enums.Tenant.SecretType.AppInsightsKey},` +
    `${Enums.Tenant.SecretType.FacebookAppClientId},` +
    `${Enums.Tenant.SecretType.GoogleMapsWebApiKey},` +
    `${Enums.Tenant.SecretType.OmisePublicApiKey},` +
    `${Enums.Tenant.SecretType.PusherClusterName},` +
    `${Enums.Tenant.SecretType.PusherPublicApiKey},` +
    `${Enums.Tenant.SecretType.StorageAccountUrl},` +
    `${Enums.Tenant.SecretType.AppInsightsKey}`,config).then(res => {
      let tenantConfig = JSON.parse(localStorage.getItem('Tenant-Configuration'));
      const tConfig = {
        ...tenantConfig,
        configuration:{...tenantConfig.configuration, secrets:{
        appInsights: {instrumentationKey: res.data.APPINSIGHTS_INSTRUMENTATIONKEY},
        azure: {azureStorageConnectionString: "", azureStorageURI: res.data.STORAGE_ACCOUNT_URL},      
        google: {googleApiKey: res.data.GOOGLE_MAPS_WEB_API_KEY},
        omise: {omisePublicKey: res.data.OMISE_PUBLIC_API_KEY},
        pusher: {pushserApiKey: res.data.PUSHER_PUBLIC_API_KEY, pusherCluster: res.data.PUSHER_CLUSTER_NAME}
        }
      }
      }
      localStorage.setItem('Tenant-Configuration', JSON.stringify(tConfig))
    }).catch(err => {
      console.log(err)
    })
  }

  const getAllBrands = async () => {
    const config = {
      Auth:false
    } 
    await axiosApiInstance.get(GET_BRANDS,config).then((res) => {
      setBrands(res.data.data.brand.data);
      getModelsByBrand(brand);
    }).catch((err) => err);
  }

  const getModelsByBrand = (brandId) => {
    const config = {
      Auth:false
    } 
    axiosApiInstance.get(`${GET_BRAND_MODELS}/${brandId}`,config).then((res) => {
      setModels(res.data.data.model.data);
    }).catch((err) => err);
  }

  const convertIdtoName = (id, searchType) => {
    if (searchType === searchTypes.brand && brands.length > 0) {
      const res = brands.filter((brand) => brand.id === Number(id));
      return res[0]?.name;
    } else {
      if (models.length > 0) {
        const res = models.filter((model) => model.id === Number(id));
        return res[0]?.name;
      }
    }
  }

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible)
  }

  const brandName = convertIdtoName(brand, searchTypes.brand);
  const modelName = convertIdtoName(model, searchTypes.model);

  const checkSession = () => {
    const session = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    if (!session) {
      setAuthDialog(true)
    } else {
      setUserSession(session);
      setUserId(session.userID);
      savePackage();
    }
  }

  const savePackage = () => {
    const session = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    setUserSession(session);
    setUserId(session.userID);
    const savePackage = {
      insurancePackageDetails: {
        ...reviews
      },
      userID: userIdRef.current,
      vehicleDetails: {
        brand_id: Number(brand),
        brand_name: brandName,
        model_id: Number(model),
        model_name: modelName,
        year: Number(year),
      }
    }

    const config = {
      Auth:true
    } 
   
    axiosApiInstance.post(`${SAVE_INSURANCE_PACKAGE}`, savePackage,config).then((res) => {
        router.push(`${NAVIGATION.PERSONAL_INFO}?id=${res.data._id}&ins_id=${id}&brand=${brand}&model=${model}&year=${year}`, undefined, {shallow : false})
      }).catch((error) => {
          toast.error(error.response.data.message, { 
          position: "bottom-right",
         });
      });
  }

  const handleSignupDialog = (e, step) => {
    e.stopPropagation()
    e.preventDefault()
    if(step === 1) {
      setLoginDialog(false)
      setSignupStep2(false)
      setForgotPassword(false)
      setSignupStep1(true)
    } else {
      setSignupStep1(false)
      setSignupStep2(true)
    }
  }

  const onSubmit = (data) => {
    const config = {
      Auth:false
    } 
    axiosApiInstance.post(SIGN_IN, data,config).then(res => {
      localStorage.setItem('ACCESS_TOKEN', JSON.stringify(res.data))
      const session = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
      setUserSession(session);
      setUserId(session.userID);
      setAuthDialog(false);
      savePackage()
    }).catch((error) => {
      setAuthError(error.response.data.message)
    })
  }

  const onSubmitSignup = (data) => {
    setSignupStep1(false)
    setSignupStep2(true)
    if(profileImage === '/insurance/default-profile-pic.png' && signupStep2) {
      setProfileImageValidation(true)
    } else {
      setProfileImageValidation(false)
    }
    
    const { email, password, firstName, lastName, contactNo, terms, corpContactNo, companyName } = data;
    
    const payloadData = {
      email: email,
      password: password,
      confirmPassword: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: tabTypeRef.current === 'individual'? contactNo : corpContactNo,
      companyName: companyName,
      isCorporateUser: tabTypeRef.current === 'corporate'? true : false,
      countryCode: '+66',
      termsAndCondition: terms,
      imagePath: profileImage,
      memberRegisteredFromSource: 'InsurancePlatform'
    }
    if(signupStep2 && !profileImageValidationRef.current) {
      const config = {
        Auth:false
      } 
      axiosApiInstance.post(SIGN_UP, payloadData,config).then(res => {
        toast.success('Signed up Successfully');
        if(res.data?.userID !== '') {
          localStorage.setItem('ACCESS_TOKEN', JSON.stringify(res.data))
          setAuthDialog(false);
          savePackage();
        }
      }).catch(err => {
        setAuthError(err.response.data.message)
      })
    }
  }

  const closeAuthDialog = () => { setAuthDialog(false); }

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setLoginDialog(false)
    setSignupStep1(false)
    setForgotPassword(true)
  }

  const handleLoginStep = (e) => {
    e.preventDefault();
    setSignupStep1(false)
    setSignupStep2(false)
    setForgotPassword(false)
    setLoginDialog(true)
  }

  const onSubmitForgotPassword = (data) => {
    const config = {
      Auth:false
    } 
    axiosApiInstance.post(FORGOT_PASSWORD, {email: data.email},config).then(res => {
      if(res.data?.userId !== ''){
        setForgotPasswordMsg(`A verification email is sent to ${res.data.email} email address, please follow the link in that email to verify your Email ID. This link is valid for ${res.data.expiredInMinutes} minutes`)
      }
    })
  }

  const handleTabChange = (params) => {
    setTabType(params)
  }

  return (
    <div className="container">
      {isLoading && <div className="dm-loader" />}
      <div className={classes.root}>
        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      {reviewsRef.current &&
        <>
          <div className="row insurance-detail-wrap">
            <div className="col-lg-4 col-md-5 col-sm-6 insurance-detail-col float-end">
              <div className="insurance-card no-hover">
                <div className="thumb">
                  <img src={reviewsRef.current.company?.logo} alt="drivemate logo" />
                </div>
                <div className="title no-wrap">
                  {reviewsRef.current.company?.name}
                </div>
                <div className="text-detail mb-0">
                  {reviewsRef.current.name}
                  {/* <br />
              <span className="text-dark">THB 1,00,000</span> */}
                </div>
                <hr />
                <div className="w-100 d-inline-block text-align-auto">
                  <div className="media mb-2">
                    <div className="float-start me-2 text-secondary">{t('PACKAGE_DETAILS_vehicle')}:</div>
                    <div className="media-body text-end">{brandName} {modelName} {year}</div>
                  </div>
                  <div className="media mb-2">
                    <div className="float-start me-2 text-secondary">{t('PACKAGE_DETAILS_insurance_coverage')}:</div>
                    <div className="media-body text-end">
                    <span className="badge rounded-pill bg-success text-end">{reviewsRef.current.tag?.tag_coverage_type}</span>
                    </div>
                  </div>
                  <div className="w-100 d-block text-end">
                    <span className="badge rounded-pill bg-warning text-end">{reviewsRef.current.tag?.tag_repair_type}</span>
                  </div>
                  <hr />
                  <div className="w-100 d-inline-block">
                    <div className="row mb-2">
                      <div className="col text-dark pt-2">{t('PACKAGE_DETAILS_total')}:</div>
                      <div className="col price lg text-end">
                        <span className="currency">Thb</span>
                        <span className="total">{Number(reviewsRef.current.insurance_premium).toLocaleString()}</span>
                        <div className="disc">THB {Number(reviewsRef.current.total_insurance_premium_vat).toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <button onClick={() => checkSession()} className="btn btn-primary w-100">{t('PACKAGE_DETAILS_continue')}</button>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-sm-6 insurance-detail-col float-start">
              <div className="card mb-5">
                <div className="card-body">
                  <div className="title3 w-100 d-block mb-3">{t('COMPARE_PACKAGES_responsibility_vehicle')}</div>
                  { reviewsRef.current.coverages?.map((coverage, index) => {
                    if(coverage.coverage_list_name.en === coverageSection.responsibilityForVehicle) {
                      return (
                        <div className="row mb-2" key={index}>
                          <div className="col-6 text-secondary">{coverage.coverage_name}:</div>
                          <div className="col-6 text-dark text-end">{Number(coverage.coverage_amount).toLocaleString()+' '+coverage.coverage_unit}</div>
                        </div>
                      )
                    }
                  })}
                  <div className="w-100 d-block text-secondary mt-5 mb-5">
                    <small>*{t('COMPARE_PACKAGES_coverage_damage')}</small>
                  </div>
                  <hr />
                  <div className="title3 w-100 d-block mb-3">{t('COMPARE_PACKAGES_third_party')}</div>
                  { reviewsRef.current.coverages?.map((coverage, index) => {
                    if(coverage.coverage_list_name.en === coverageSection.thirdPartyResponsibility) {
                      return (
                        <div className="row mb-2" key={index}>
                          <div className="col-6 text-secondary">{coverage.coverage_name}:</div>
                          <div className="col-6 text-dark text-end">{Number(coverage.coverage_amount).toLocaleString()+' '+coverage.coverage_unit}</div>
                        </div>
                      )
                    }
                  })}
                  <hr />
                  <div className="title3 w-100 d-block mb-3">{t('COMPARE_PACKAGES_attachment_coverage')}</div>
                  { reviewsRef.current.coverages?.map((coverage, index) => {
                    if(coverage.coverage_list_name.en === coverageSection.attachmentCoverage) {
                      return (
                        <div className="row mb-2" key={index}>
                          <div className="col-6 text-secondary">{coverage.coverage_name}:</div>
                          <div className="col-6 text-dark text-end">{Number(coverage.coverage_amount).toLocaleString()+' '+coverage.coverage_unit}</div>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      }
      <Dialog onClose={closeAuthDialog} aria-labelledby="customized-dialog-title" open={authDialog}>
        <DialogTitle className="text-center" id="customized-dialog-title">
          { signupStep2 &&
            <button className="btn btn-back" onClick={(e) => handleSignupDialog(e, 1)}></button>
          }
          { (signupStep1 || signupStep2) && <span>{t('CREATE_ACCOUNT')}</span> }
          { loginDialog && <span>{t('LOGIN')}</span> }
          <button className="btn btn-dialog-close" onClick={closeAuthDialog}>
            <img src="/insurance/cross-icon.svg" alt="signup Close" />
          </button>
        </DialogTitle>
        <DialogContent dividers> 
          { loginDialog &&
            <div className="authentication-dialog">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="email">{t('EMAIL')}</label>
                  <input type="email" id="email" className={classNames("form-control", { "is-invalid": errors.email })} name="email" {...register('email', {
                    required: t("THIS_VALUE_IS_REQUIRED") as string, pattern: {
                      value: PATTERN.EMAIL,
                      message: t("INVALID_EMAIL_ADDRESS")
                    }
                  })}  placeholder="sample@sample.com" />
                  { errors.email &&
                    <div className="text-danger">{errors.email.message}</div>
                  }
                </div>
                <div className="form-group">
                  <label htmlFor="password">{t("PASSWORD")}</label>
                  <div className="input-group btn-icon">
                    <input type={passwordVisibleRef.current? 'text' : 'password'} id="password" className="form-control" {...register('password', {required: true})} placeholder="Type here..." />
                    <button type="button" className="btn" onClick={togglePassword}>
                      {!passwordVisible &&
                        <img src="/insurance/eye-icon.svg" alt="View" />
                      }
                      {passwordVisible &&
                        <img src="/insurance/cross-icon.svg" alt="View" />
                      }
                    </button>
                  </div>
                  { errors.password &&
                    <div className="text-danger">{t("THIS_VALUE_IS_REQUIRED")}</div>
                  }
                  { authError != '' &&
                    <div className="text-danger mb-3">{authError}</div>
                  }
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-3 mt-2">{t('LOGIN')}</button>
              </form>
              <div className="w-100 text-center d-block">
                <a href="#" onClick={(e) => handleForgotPassword(e)}>{t('FORGOT_PASSWORD')}</a>
              </div>
              <div className="spr">
                <span>or</span>
                <hr />
              </div>
              {/* <button className="btn btn-outline-secondary btn-social w-100 mb-3">
                <img src="/insurance/fb-icon.svg" alt="Facebook" /> Login with Facebook
              </button> */}
              <div className="w-100 text-center d-block">{t('NOT_MEMBER')} &nbsp; 
                <a href="#" onClick={(e) => { handleSignupDialog(e, 1) }}>{t('CREATE_ACCOUNT')}</a>
              </div>
            </div>
          }
          {forgotPassword &&
            <div className="authentication-dialog">
              <form onSubmit={handleForgotPasswordSubmit(onSubmitForgotPassword)}>
                <div className="form-group">
                  <label htmlFor="email">{t('EMAIL')}</label>
                  <input type="email" id="email" className="form-control" name="email" {...registerForgotPassword('email', {required: true})} placeholder="sample@sample.com" />
                  { errorsForgotPassword.email &&
                    <div className="text-danger">{t('THIS_VALUE_IS_REQUIRED')}</div>
                  }
                </div>
                {forgotPasswordMsg != '' &&
                  <p className="text-info mb-3">{forgotPasswordMsg}</p>
                }
                <button type="submit" className="btn btn-primary w-100 mb-3 mt-2">{t('SUBMIT')}</button>
              </form>
              <div className="spr">
                <span>or</span>
                <hr />
              </div>
              <div className="w-100 text-center d-block">{t('NOT_MEMBER')} &nbsp; 
                <a href="#" onClick={(e) => { handleSignupDialog(e, 1) }}>{t('CREATE_ACCOUNT')}</a>
              </div>
            </div>
          }
          <form onSubmit={handleSubmitSignup(onSubmitSignup)}>
            { signupStep1 && 
              <div className="authentication-dialog">
                <div className="form-group">
                  <label htmlFor="email">{t('ENTER_EMAIL_ADDRESS')}</label>
                  <input type="email" id="email" className={classNames("form-control", { "is-invalid": errors.email })} {...registerSignup('email', {required: true})} placeholder="sample@sample.com" />
                  { errorsSignup.email &&
                    <div className="text-danger">{t('THIS_VALUE_IS_REQUIRED')}</div>
                  }
                </div>
                <div className="form-group">
                  <label htmlFor="password">{t('CREATE_PASSWORD')}</label>
                  <div className="input-group btn-icon">
                    <input type="password" id="password" className="form-control" {...registerSignup('password', {required: true})} placeholder="Type here..." />
                    {/* <button type="button" className="btn"><img src="/insurance/eye-icon.svg" alt="View" /></button> */}
                  </div>
                  { errorsSignup.password &&
                    <div className="text-danger">{t('THIS_VALUE_IS_REQUIRED')}</div>
                  }
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" {...registerSignup('terms', {required: true})} />
                  <label className="form-check-label d-inline" htmlFor="flexCheckChecked">{t('USING_SERVICES')} 
                  <a href={baseUrl+NAVIGATION.TERMS_OF_USE} className="ms-1">{t("TERM_OF_SERVICE")}</a> {t("AND")} <a href={baseUrl+NAVIGATION.PRIVACY_POLICY}>{t("PRIVACY_POLICY")}</a>
                  </label>
                  {/* <label className="form-check-label d-inline" htmlFor="flexCheckChecked">{t('USING_SERVICES')} 
                    <a className="ms-1">Terms of Services</a> and <a href={baseUrl+NAVIGATION.PRIVACY_POLICY}>{t("PRIVACY_POLICY")}</a>
                  </label> */}
                  {/* <label className="form-check-label d-inline fw-normal fs-6" htmlFor="agree">
                    {t("AGREE_DRIVEMATES")} <a href={baseUrl+NAVIGATION.PRIVACY_POLICY} className="text-primary">{t("PRIVACY_POLICY")}</a> {t("PAYING_INSURANCE")} 
                  </label> */}
                  { errorsSignup.terms &&
                    <div className="text-danger">*Please accept Terms &amp; conditions</div>
                  }
                </div>
                { authError != '' &&
                  <div className="text-danger mb-3">{authError}</div>
                }
                <button type="submit" className="btn btn-primary w-100 mb-2">{t('PACKAGE_DETAILS_continue')}</button>
                {/* <div className="spr">
                  <span>or</span>
                  <hr />
                </div> */}
                {/* <button className="btn btn-outline-secondary btn-social w-100 mb-3">
                  <img src="/insurance/fb-icon.svg" alt="Facebook" /> Register with Facebook
                </button> */}
                <div className="w-100 text-center d-block">
                {t('ALREADY_MEMBER')} <a href="#" onClick={(e) => handleLoginStep(e)}>{t('LOGIN')}</a>
                </div>
              </div>
            }
            { signupStep2 &&
              <div className="authentication-dialog">
                <div className="upload-profile-image">
                  <div className="form-group text-center">
                    <input
                      style={{ display: 'none' }}
                      ref={inputFileRef}
                      type="file"
                      multiple={false}
                      onChange={e => uploadFiles(e.target.files)}
                    /> 
                    <div className="thumb" onClick={() => showFileDialog()}>
                      <img src={ profileImageRef.current !== ''? profileImageRef.current : '/insurance/default-profile-pic.png' } alt="profileImage" />
                    </div>
                    { profileImageValidationRef.current &&
                      <div className="text-danger">Profile image is required</div> 
                    }
                  </div>
                </div>
                <div className={classes.root}>
                  <div className="MuiPaper-root MuiAppBar-root MuiAppBar-positionStatic MuiAppBar-colorPrimary MuiPaper-elevation4 p-2 mb-3">
                    <div className="MuiTabs-root">
                      <div className="MuiTabs-flexContainer row">
                        <button type="button" className={"MuiButtonBase-root MuiTab-root MuiTab-textColorInherit MuiTab-fullWidth col " + (tabTypeRef.current === 'individual'? 'Mui-selected' : '')} onClick={() => handleTabChange('individual')}>
                          Individual
                        </button>
                        <button type="button" className={"MuiButtonBase-root MuiTab-root MuiTab-textColorInherit MuiTab-fullWidth col " + (tabTypeRef.current === 'corporate'? 'Mui-selected' : '')} onClick={() => handleTabChange('corporate')}>
                          Corporate
                        </button>
                      </div>
                    </div>
                  </div>
                  { tabTypeRef.current === 'individual' &&
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name</label>
                          <input type="text" id="firstName" className="form-control" {...registerSignup('firstName', {required: true})} placeholder="Type here..." />
                          { errorsSignup.firstName &&
                            <div className="text-danger">*Required</div>
                          }
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name</label>
                          <input type="text" id="lastName" className="form-control" {...registerSignup('lastName', {required: true})} placeholder="Type here..." />
                          { errorsSignup.lastName &&
                            <div className="text-danger">*Required</div>
                          }
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="contactNo">Contact Number</label>
                          <div id="contactNo" className={classNames("form-control", { "is-invalid": errorsSignup.contactNo })}>
                            <Controller
                              render={(props) => {
                                return (
                                  <PhoneInputWithCountry
                                    international
                                    defaultCountry="TH"
                                    name={props.field.name}
                                    value={props.field.value}
                                    onChange={props.field.onChange} />
                                )
                              }}
                              name="contactNo"
                              control={controlSignup}
                              rules={{ 
                                required: t("REQUIRED") as string, 
                                maxLength: {
                                  value: 13,
                                  message: t("MAX_LENGTH", { value: 10 })
                                }
                              }}
                            />
                            </div>
                              {errorsSignup.contactNo && (
                                <div className="text-danger">{errorsSignup.contactNo.message}</div>
                              )}
                            </div>
                          </div>
                          { authError != '' &&
                            <div className="text-danger mb-3">{authError}</div>
                          }
                        <div className="col-12">
                          <button type="submit" className="btn btn-primary w-100 mb-3 mt-2">Sign up</button>
                        </div>
                    </div>
                  }
                  { tabTypeRef.current === 'corporate' &&
                    <div className="row">
                      <div className="form-group col-12">
                        <label htmlFor="companyName">Company Name</label>
                        <input type="text" id="companyName" className="form-control" {...registerSignup('companyName', {required: true})} placeholder="Type here..." />
                        { errorsSignup.companyName &&
                          <div className="text-danger">*Required</div>
                        }
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="corpContactNo">Contact Number</label>
                        <div id="corpContactNo" className={classNames("form-control", { "is-invalid": errorsSignup.corpContactNo })}>
                          <Controller
                            render={(props) => {
                              return (
                                <PhoneInputWithCountry
                                  international
                                  defaultCountry="TH"
                                  name={props.field.name}
                                  value={props.field.value}
                                  onChange={props.field.onChange} />
                              )
                            }}
                            name="corpContactNo"
                            control={controlSignup}
                            rules={{ 
                              required: t("REQUIRED") as string, 
                              maxLength: {
                                value: 13,
                                message: t("MAX_LENGTH", { value: 10 })
                              }
                            }}
                          />
                        </div>
                        {errorsSignup.corpContactNo && (
                          <div className="text-danger">{errorsSignup.corpContactNo.message}</div>
                        )}
                      </div>
                      { authError != '' &&
                        <div className="text-danger">{authError}</div>
                      }
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 mb-3 mt-2">Sign up</button>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  )
}

export default Review;