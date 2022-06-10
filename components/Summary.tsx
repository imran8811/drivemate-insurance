/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from 'react';
import useState from 'react-usestateref';
import { makeStyles, Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import useAxiosInterceptor from '../utilities/axiosApiInstance';
import Image from 'next/image';
import logo from '../public/assets/images/logo.svg';
import { CREATE_CARD, GET_EXISTING_CARDS, GET_INSURANCE_PACKAGES, GET_INSURANCE_SUMMARY, PAYMENT_BANKTRANSFER, PERFORM_TEST_TRANSACTION, PROCESS_PAYMENT, REFRESH_TOKEN, SAVE_CREDIT_CARD } from '../utilities/endpoints';
import { coverageSection, DATETIME_FORMATS, InsurancePaymentMethod, InsurancePaymentStatus, InsuranceStatus, NAVIGATION, PATTERN, PREFIX } from '../utilities/constants';
import dayjs from 'dayjs'
import { useRouter } from 'next/dist/client/router';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { ICard, IOmiseResponse, ISigninDataModel } from '../interfaces';

import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import classNames from 'classnames';
import { Controller, useForm } from 'react-hook-form';
import { useOmise } from 'use-omise';
import InputMask from "react-input-mask"
import { TextField } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { ToastContainer, toast } from 'react-toastify';
import useInsurance from '../hooks/useInsurance';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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

const Summary: FC = () => {
  const { isLoading, axiosApiInstance } = useAxiosInterceptor();
  const { register, handleSubmit, control, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
  });
  const router = useRouter();
  const { query, isReady, locale } = useRouter();
  const { brand, model, year, id, ins_id } = query;

  const { t } = useTranslation();
  
  const classes = useStyles();
  const [activeStep,setActiveStep] = React.useState(2);
  const steps = getSteps(locale);

  const [summaryDetail, setSummary, summaryDataRef] = useState<any>({});
  const [insuranceDetails, setInsurancePackages] = useState<any>({});
  const [open, setOpen] = useState(false);
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [userData, setUserData, userDataRef] = useState<ISigninDataModel>();
  const [tenantData, setTenantData, tenantDataRef] = useState<any>();
  const [secure3d, set3dsecure, secure3dRef] = useState<boolean>(false);
  const [newCard, setNewCard, newCardRef] = useState<any>();
  const [cardData, setCardData, cardDataRef] = useState<ICard[]>();
  const [cardDetail, setCardDetail, cardDetailRef] = useState("");
  const [errorDetail, setErrorDetail, errorDetailRef] = useState("");
  const [bankCheckbox, setBankCheckbox, bankCheckboxRef] = useState<boolean>(false);
  const [baseUrl, setBaseUrl] = useState<string>();
  const { createTokenPromise, createToken } = useOmise({
    publicKey: tenantDataRef.current,
  });

  useEffect(() => {
    if (!isReady) {
      return;
    };
    checkSession();
    getInsurancePackage();
    getExistingCards();
    getInsurance();
    const timer = setTimeout(() => {
      getInsurance();
    }, 5000);
    setBaseUrl(window.location.origin !== 'http://localhost:3000' ? window.location.origin : 'https://dev.otoz.biz');
    return () => clearTimeout(timer);
  }, [isReady]);

  const getInsurance = async () => {
    const config = {
      Auth:true
    } 
    await axiosApiInstance.get(`${GET_INSURANCE_SUMMARY}?_id=${id}`, config)
      .then((res) => {
        setSummary(res.data.pageData[0]);
        if(summaryDataRef?.current.insurancePaymentDetails?.paymentMethod){
          setActiveStep(3)
        }
      }).catch((err) => err)
  }

  const checkSession = () => {
    const tenantConfig = JSON.parse(localStorage.getItem('Tenant-Configuration'));
    setTenantData(tenantConfig.configuration.secrets.omise.omisePublicKey);
    set3dsecure(tenantConfig.configuration.payments.is3dSecureEnabled)

    const session = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    setUserData(session);
  }

  const getInsurancePackage = async () => {
    const config = {
      Auth:false
    } 
    await axiosApiInstance.get(`${GET_INSURANCE_PACKAGES}/${brand}/${model}?id=${ins_id}`,config)
      .then((res) => {
        setInsurancePackages(res.data.data.package.data[0]);
      }).catch((err) => err);
  }

  const getExistingCards = async () => {
    const config = {
      Auth:true
    } 
    await axiosApiInstance.get(`${GET_EXISTING_CARDS}`, config)
      .then((res) => {

        setCardData(res.data);
        if (res.data.length > 0) {
          setCardDetail(res.data[0]._id);
        }
        else {
          setCardDetail("new");
        }
      }).catch((err) => err)
  }

  const handleClickOpen = (id) => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleGetInsuranceClickOpen = (id) => {
    setInsuranceOpen(true);
  }
  const handleGetInsuranceClose = () => {
    setInsuranceOpen(false);
  }

  const editPolicy = () => {
    router.push(`${NAVIGATION.PERSONAL_INFO}?id=${id}&ins_id=${ins_id}&brand=${brand}&model=${model}&year=${year}`)
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const getCardInfo = (event) => {
    setCardDetail(event)
  }


  const doTestTransaction = async (cardId: string) => {
    const payment = {
      insuranceId: id,
      userId: userDataRef.current.userID,
      _cardId: cardId
    }
    const config = {
      Auth:true
    } 
    await axiosApiInstance.post(`${PERFORM_TEST_TRANSACTION}`, payment, config)
      .then((res) => {
        doProcessPayment(cardId);
      }).catch((err) => err)
  }

  const doProcessPayment = async (cardId: string) => {
    const payment = {
      insuranceId: id,
      userId: userDataRef.current.userID,
      _cardId: cardId
    }
    const config = {
      Auth:true
    } 
    await axiosApiInstance.post(`${PROCESS_PAYMENT}`, payment, config)
      .then((res) => {
        if(res.data){
          setInsuranceOpen(false);
          getInsurance();
          setActiveStep(3);
        }        
      }).catch((err) => err)
  }


  const onSubmit = async (data) => {

    if (cardDetail === "new") {

      const omiseResponse = await getTokenId(data);
      if (omiseResponse.isValid) {

           if(secure3dRef.current){
            const returnURL = `${NAVIGATION.INSURANCE}${NAVIGATION.SUMMARY}/?id=${id}&ins_id=${ins_id}&brand=${brand}&model=${model}&year=${year}`
            const path: any = window.location.origin + returnURL;
            saveCreditCard(id, omiseResponse.token, path);           

           }else{
             await createCreditCard(omiseResponse.token);
             if (newCardRef.current) {
              doProcessPayment(newCardRef.current);
            }
          }

      }else {
          // if token is invalid
          setErrorDetail(omiseResponse.message);
          toast.error(omiseResponse.message, { 
            position: "bottom-right",
           });
        }

    } else {
      doProcessPayment(cardDetail);
    }
  }

  const saveCreditCard = async (insuranceId, tokenId, returnUri) => {
    const secure3d = {
      insuranceId: insuranceId,
      tokenId: tokenId,
      returnUri: returnUri
    }
    const config = {
      Auth:true
    } 
    await axiosApiInstance.post(`${SAVE_CREDIT_CARD}`, secure3d, config)
      .then((res) => {
        const authorizationURL = res.data.authorizeUri;
        window.location.href = authorizationURL;   
        setActiveStep(3); 
      }).catch((err) => err)
  }

  const createCreditCard = async (token) => {
    const config = {
      Auth:true
    } 
    await axiosApiInstance.post(`${CREATE_CARD}`, {insuranceId: id,tokenId:token}, config)
      .then((res) => {
        setNewCard(res.data._id);
        setInsuranceOpen(false);
       
      }).catch((err) => err)
  }

  const getTokenId = (data): Promise<IOmiseResponse> => {
    let monthyear = data.expiryDate.split('/');
    const promise = new Promise<IOmiseResponse>((resolve) => {
      const card = {
       name: data.nameOnCard,
       number: parseInt(data.cardNumber.replace(/\s/g, '')),
       expiration_month: parseInt(monthyear[0]),
       expiration_year: parseInt(monthyear[1]),
       security_code: parseInt(data.securityCode)
       };

    createToken('card', card, (statusCode, response) => {

      if (statusCode === 200) {
        resolve({ isValid: true, token: response.id, message: '' });
      } else {
        resolve({ isValid: false, token: '', message: `${response.message}` });
      }
    });
  });
  return promise;
}

  const BankTransferProcessPayment = async () => {
  if(!bankCheckboxRef.current){
    setBankCheckbox(false);
  }
  if(bankCheckboxRef.current){
    const config = {
      Auth:true
    } 
    await axiosApiInstance.patch(`${PAYMENT_BANKTRANSFER}/${id}`, {paymentMethod: InsurancePaymentMethod.BankTransfer}, config)
      .then((res) => {
        setSummary(res.data);
        setInsuranceOpen(false);
        setActiveStep(3);
      }).catch((err) => err)
    }
  }

  const goToInsurance = () => {
    const myInsuranceUrl = baseUrl + process.env.MY_INSURANCE;
    window.location.href = myInsuranceUrl;
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
      <div className="row insurance-detail-wrap">
        <div className="col-lg-4 col-md-5 col-sm-6 insurance-detail-col float-end">
          <div className="insurance-card no-hover">
            <div className="thumb">
              {/* <Image src={logo} alt="drivemate logo" /> */}
              <img src={summaryDetail?.insurancePackageDetails?.company?.logo} alt="logo" />
            </div>
            <div className="title no-wrap">
              {summaryDetail?.insurancePackageDetails?.company_name}
            </div>
            <div className="text-detail mb-0">
              {summaryDetail?.insurancePackageDetails?.name}
            </div>
            <div className="view-detail">
              <a onClick={() => { handleClickOpen(id) }}>{t('PACKAGES_view_package_details')}</a>
            </div>
            <hr />
            <div className="w-100 d-inline-block text-align-auto">
              <div className="media mb-2">
                <div className="float-start me-2 text-secondary">{t('PACKAGE_DETAILS_vehicle')}:</div>
                <div className="media-body text-end">{summaryDetail?.vehicleDetails?.brand_name} {summaryDetail?.vehicleDetails?.model_name} {summaryDetail?.vehicleDetails?.year}</div>
              </div>
              <div className="media mb-2">
                <div className="float-start me-2 text-secondary">{t('PACKAGE_DETAILS_insurance_coverage')}:</div>
                <div className="media-body text-end">
                  <span className="badge rounded-pill bg-success text-end">{summaryDetail?.insurancePackageDetails?.tag?.tag_coverage_type}</span>
                </div>
              </div>
              <div className="w-100 d-block text-end">
                <span className="badge rounded-pill bg-warning text-end">{summaryDetail?.insurancePackageDetails?.tag?.tag_repair_type}</span>
              </div>
              <hr />
              <div className="w-100 d-inline-block">
                <div className="row mb-2">
                  <div className="col-4 text-dark pt-2">{t('PACKAGE_DETAILS_total')}:</div>
                  <div className="col-8 price lg text-end">
                    <span className="currency">Thb</span>
                    <span className="total">{Number(summaryDetail?.insurancePackageDetails?.insurance_premium).toLocaleString()}</span>
                    <div className="disc">THB {Number(summaryDetail?.insurancePackageDetails?.total_insurance_premium_vat).toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <hr />
              {!summaryDetail?.insurancePaymentDetails?.paymentMethod &&
              <>
              <button className="btn btn-primary w-100" onClick={handleGetInsuranceClickOpen}>{t('GET_INSURANCE')}</button>
              <button className="btn btn-outline-secondary w-100 mt-3" onClick={() => editPolicy()}>{t('EDIT_POLICY')}</button>
              </>
              }
              {summaryDetail?.insurancePaymentDetails?.paymentMethod &&
              <div className="w-100 d-block text-center text-secondary mb-2">
                {t('GO_TO')} <a role="button" onClick={goToInsurance} className="text-primary">{t('MY_INSURANCE')}</a>
              </div>
              }
            </div>
          </div>
        </div>
        <div className="col-lg-8 col-md-7 col-sm-6 insurance-detail-col float-start">
          <div className="card mb-5">
            <div className="card-body">
            {summaryDetail?.insurancePaymentDetails?.paymentMethod &&
              <>
              <div className="w-100 d-inline-block text-center">
                <b className="w-100 d-inline-block">{t('INSURANCE_ID')}</b>
                <b className="w-100 d-inline-block title3 text-primary mb-2">{summaryDetail?.insuranceLeadId}</b>
                <div className="w-100 d-inline-block mb-3">
                  {summaryDetail?.status === InsuranceStatus.Incomplete &&
                  <span className="badge rounded-pill badge-incomplete">{t([summaryDetail?.status])}</span>
                  }
                  {summaryDetail?.status === InsuranceStatus.PendingPayment &&
                  <span className="badge rounded-pill badge-pending-payment">{t([summaryDetail?.status])}</span>
                  }
                  {summaryDetail?.status === InsuranceStatus.PendingConfirmation &&
                  <span className="badge rounded-pill badge-pending-confirmation">{t([summaryDetail?.status])}</span>
                  }
                  {summaryDetail?.status === InsuranceStatus.CancelledByBroker &&
                  <span className="badge rounded-pill badge-cancelled">{t([summaryDetail?.status])}</span>
                  }
                  {summaryDetail?.status === InsuranceStatus.Confirmed &&
                  <span className="badge rounded-pill badge-completed">{t([summaryDetail?.status])}</span>
                  }
                </div>
                
                <div className="w-100 d-inline-block text-secondary">
                  <small>{t('PAYMENT_SUCCESSFULLY')}</small>
                </div>
              </div>
              <hr />
              </>
            }
              <div className="title3 w-100 d-block mb-3">{t('PERSONAL_INFORMATION')}</div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('Name')}</div>
                <div className="col-md-6 col-sm-12 text-dark">{PREFIX.find(p => p.value == summaryDetail?.purchaserPersonalDetails?.prefix)?.name} {summaryDetail?.purchaserPersonalDetails?.firstName} {summaryDetail?.purchaserPersonalDetails?.lastName}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('GENDER')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.purchaserPersonalDetails?.gender}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('DATE_OF_BIRTH')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{dayjs(summaryDetail?.purchaserPersonalDetails?.DOB).format(DATETIME_FORMATS.MMMM_D_YYYY)}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('NATIONAL_IDENTITY_CARD_NUMBER')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.purchaserPersonalDetails?.idCardNo}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('EMAIL')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.purchaserPersonalDetails?.email}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('CONTACT_NUMBER')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.purchaserPersonalDetails?.contactNumber}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('HOME_NUMBER')}: </div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.purchaserPersonalDetails?.homeNumber}</div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12 text-secondary">{t('ADDRESS')}: </div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.purchaserPersonalDetails?.address}</div>
              </div>
              <hr />
              <div className="title3 w-100 d-block mb-3">{t('VEHICLE_INFORMATION')}</div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('PACKAGE_DETAILS_vehicle')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.vehicleDetails?.brand_name} {summaryDetail?.vehicleDetails?.model_name} {summaryDetail?.vehicleDetails?.year}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('REGISTRATION_NUMBER')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.vehicleDetails?.registrationNo}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('REGISTRATION_DATE')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{dayjs(summaryDetail?.vehicleDetails?.registrationDate).format(DATETIME_FORMATS.MMMM_D_YYYY)}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('PROVINCE_OF_REGISTRATION')}: </div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.vehicleDetails?.registrationProvince}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('COVERAGE_DATE_RANGE')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{dayjs(summaryDetail?.vehicleDetails?.coverageStartDate).format(DATETIME_FORMATS.MONTH_DATE_YEAR_WITH_FORWARDSLASH)} - {dayjs(summaryDetail?.vehicleDetails?.coverageEndDate).format('MM/DD/YYYY')}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('VIN_NUMBER')}: </div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.vehicleDetails?.bodyNo}</div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12 text-secondary">{t('ENGINE_NUMBER')}: </div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.vehicleDetails?.engineNo}</div>
              </div>
              <hr />
              <div className="title3 w-100 d-block mb-3">{t('INSURANCE_PACKAGE_INFORMATION')}</div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('COMPANY')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.insurancePackageDetails?.company.name}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('PACKAGES_insurance_type')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.insurancePackageDetails?.tag?.tag_coverage_type}</div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('INSURANCE_CLASS')}: </div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.insurancePackageDetails?.tag?.tag_repair_type}</div>
              </div>
              {/* <div className="row">
                  <div className="col-md-6 col-sm-12 text-secondary">Policy Date: </div>
                  <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.insurancePackageDetails?.company_name}</div>
                </div> */}
              <hr />
              {summaryDetail?.insurancePaymentDetails?.paymentMethod &&
              <>
              <div className="media mb-3">
                <div className="media-body">
                  <div className="title3">{t('PAYMENT_DETAILS')}</div>
                </div>
                
                {summaryDetail?.insurancePaymentDetails?.paymentStatus === InsurancePaymentStatus.Completed &&
                <span className="badge rounded-pill badge-completed float-end">{summaryDetail?.insurancePaymentDetails?.paymentStatus}</span>
                }
                {summaryDetail?.insurancePaymentDetails?.paymentStatus === InsurancePaymentStatus.Failed &&
                <span className="badge rounded-pill badge-cancelled float-end">{summaryDetail?.insurancePaymentDetails?.paymentStatus}</span>
                }
                {summaryDetail?.insurancePaymentDetails?.paymentStatus === InsurancePaymentStatus.Pending &&
                <span className="badge rounded-pill badge-pending-payment float-end">{summaryDetail?.insurancePaymentDetails?.paymentStatus}</span>
                }
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-sm-12 text-secondary">{t('PAYMENT_METHOD')}:</div>
                <div className="col-md-6 col-sm-12 text-dark">{summaryDetail?.insurancePaymentDetails?.paymentMethod}</div>
              </div>
              {/* <div className="row mb-3">
                <div className="col-md-6 col-sm-12 text-secondary">Card Number:</div>
                <div className="col-md-6 col-sm-12 text-dark">**** **** **** 0000</div>
              </div> */}
              <div className="row">
                <div className="col-md-6 col-sm-12 text-dark">{t('TOTAL_AMOUNT')}:</div>
                <div className="col-md-6 col-sm-12 price">
                  <span className="currency">THB</span> <span className="total">{Number(summaryDetail?.insurancePaymentDetails?.totalPackagePriceToPay).toLocaleString()}</span>
                </div>
              </div>
              </>
              }          
            </div>
          </div>
        </div>
      </div>
      {insuranceDetails && Object.keys(insuranceDetails).length &&
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} key={insuranceDetails.id}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>{insuranceDetails.company.name}</DialogTitle>
          <DialogContent dividers>
            <div className="title3 w-100 d-block mb-3">{t('COMPARE_PACKAGES_responsibility_vehicle')}</div>
            {insuranceDetails?.coverages.map((coverage, index) => {
              if (coverage.coverage_list_name.en === coverageSection.responsibilityForVehicle) {
                return (
                  <div className="row mb-2" key={index}>
                    <div className="col-6 text-secondary">{coverage.coverage_name}:</div>
                    <div className="col-6 text-dark text-end">{Number(coverage.coverage_amount).toLocaleString() + ' ' + coverage.coverage_unit}</div>
                  </div>
                )
              }
            })}
            <div className="w-100 d-block text-secondary mt-5 mb-5">
              <small>*{t('COMPARE_PACKAGES_coverage_damage')}</small>
            </div>
            <hr />
            <div className="title3 w-100 d-block mb-3">{t('COMPARE_PACKAGES_third_party')}</div>
            {insuranceDetails?.coverages.map((coverage, index) => {
              if (coverage.coverage_list_name.en === coverageSection.thirdPartyResponsibility) {
                return (
                  <div className="row mb-2" key={index}>
                    <div className="col-6 text-secondary">{coverage.coverage_name}:</div>
                    <div className="col-6 text-dark text-end">{Number(coverage.coverage_amount).toLocaleString() + ' ' + coverage.coverage_unit}</div>
                  </div>
                )
              }
            })}
            <hr />
            <div className="title3 w-100 d-block mb-3">{t('COMPARE_PACKAGES_attachment_coverage')}</div>
            {insuranceDetails?.coverages.map((coverage, index) => {
              if (coverage.coverage_list_name.en === coverageSection.attachmentCoverage) {
                return (
                  <div className="row mb-2" key={index}>
                    <div className="col-6 text-secondary">{coverage.coverage_name}:</div>
                    <div className="col-6 text-dark text-end">{Number(coverage.coverage_amount).toLocaleString() + ' ' + coverage.coverage_unit}</div>
                  </div>
                )
              }
            })}
          </DialogContent>
        </Dialog>
      }
      {/*************** Get Insurance ***************/}
      <Dialog onClose={handleGetInsuranceClose} aria-labelledby="customized-dialog-title" open={insuranceOpen}>
        <DialogTitle id="customized-dialog-title" onClose={handleGetInsuranceClose}>
        {t('GET_INSURANCE')}
        </DialogTitle>
        <DialogContent dividers>
          <div className="authentication-dialog">
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="Payment Types">
                  <Tab label={t('CREDIT_CARD')} {...a11yProps(0)} />
                  <Tab label={t('BANK_TRANSFER')} {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <div className="media mb-2 fw-normal fs-6">
                  <img src="/insurance/lock-icon.svg" alt="lock icon" className="float-start me-1" />
                  <div className="media-body text-secondary">
                    <small><span className="text-dark me-1">{t('SECURE_PAYMENT')}</span>
                    - {t('CARD_INFORMATION')}</small>
                    <br />
                    <div className="row mt-3">
                      <div className="col-md-7 mb-1">
                        <span className="text-dark float-start me-2">{t('AVAILABLE_PAYMENT_METHODS')}: </span>
                      </div>
                      <div className="col-md-5 ps-0">
                        <img src="/insurance/credit-card/mastercard.svg" alt="mastercard" className="float-start me-1" />
                        <img src="/insurance/credit-card/visa-logo.svg" alt="visa" className="float-start me-1" />
                        <img src="/insurance/credit-card/jcb.svg" alt="jcb" className="float-start" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">{t('CHOOSE_CREDIT_CARD')}</label>
                  <select id="creditCard" className="form-select" onChange={(e) => getCardInfo(e.target.value)}>
                    {cardData?.map?.((e, key) => {
                      return <option key={key} value={e._id}>{e.brandName} •••• {e.lastFourDigits}
                        | Expire: {e.expirationMonth}/{e.expirationYear}</option>
                    })}
                    <option value="new">{t('ADD_NEW_CREDIT_CARD')}</option>
                  </select>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {cardDetailRef.current === "new" &&
                    <div>
                      <div className="form-group">
                        <label htmlFor="firstName">{t('CARD_NUMBER')}</label>
                        <input type="text" id="cardNumber" className={classNames("form-control", { "is-invalid": errors.cardNumber })} placeholder="0000 - 0000 - 0000 - 0000"
                          name="cardNumber" {...register('cardNumber', {
                            required: t("THIS_VALUE_IS_REQUIRED") as string, pattern: {
                              value: PATTERN.ONLY_NUMBER,
                              message: t("ONLY_NUMBERS_ARE_ALLOWED")
                            }, maxLength: {
                              value: 16,
                              message: t("MAX_LENGTH",{value:16})
                            }, minLength: {
                              value: 16,
                              message: t("MIN_LENGTH",{value:16})
                            }
                          })} />
                        {errors.cardNumber && (
                          <div className="invalid-feedback">{errors.cardNumber.message}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="firstName">{t('NAME_ON_CARD')}</label>
                        <input type="text" id="nameOnCard" className={classNames("form-control", { "is-invalid": errors.nameOnCard })} placeholder="Type here..."
                          name="nameOnCard" {...register('nameOnCard', {
                            required: t("THIS_VALUE_IS_REQUIRED") as string, pattern: {
                              value: PATTERN.ALPHABET_WITH_SPACE,
                              message: t("ONLY_ALPHABETS_ARE_ALLOWED")
                            }
                          })} />
                        {errors.nameOnCard && (
                          <div className="invalid-feedback">{errors.nameOnCard.message}</div>
                        )}
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="contactNumber">{t('EXPIRY_DATE')}</label>
                            {/* <input type="text" id="expiryDate" className={classNames("form-control", { "is-invalid": errors.expiryDate })} placeholder="MM / YYYY"
                              name="expiryDate" {...register('expiryDate', { required: "This value is required." })} />
                            {errors.nameOnCard && (
                              <div className="invalid-feedback">{errors.nameOnCard.message}</div>
                            )} */}
                            <Controller
                              render={(props) => (
                                <InputMask mask="99/9999"
                                  value={props.field.value}
                                  maskChar=""
                                  onChange={props.field.onChange}>
                                  {() => <TextField placeholder="MM/YYYY" error={Boolean(errors.expiryDate)} helperText={errors.expiryDate?.message} variant="outlined"
                                  />}
                                </InputMask>
                              )}
                              name="expiryDate"
                              control={control}
                              rules={{ required: t("THIS_VALUE_IS_REQUIRED") as string, minLength: {
                                value: 7,
                                message: t("MM_YYYY_FORMAT")
                              } }}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="contactNumber">{t('SECURITY_CODE')}</label>
                            <input type="text" id="securityCode" className={classNames("form-control", { "is-invalid": errors.securityCode })} placeholder="111"
                              name="securityCode" {...register('securityCode', {
                                required: t("THIS_VALUE_IS_REQUIRED") as string, pattern: {
                                  value: PATTERN.ONLY_NUMBER,
                                  message: t("ONLY_NUMBERS_ARE_ALLOWED")
                                }, maxLength: {
                                  value: 3,
                                  message: t("MAX_LENGTH",{value:3})
                                }
                              })} />
                            {errors.securityCode && (
                              <div className="invalid-feedback">{errors.securityCode.message}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  <div className="form-check">
                    <input type="checkbox" className={classNames("form-check-input", { "is-invalid": errors.agree })} id="agree" name="agree"
                      {...register('agree', { required: t("THIS_VALUE_IS_REQUIRED") as string })} />
                    <label className="form-check-label d-inline fw-normal fs-6" htmlFor="agree">
                    {/* {t("AGREE_DRIVEMATES")} <Link href="/"><a className="text-primary">{t("TERM_OF_SERVICE")}</a></Link> {t("AND")} <Link href="/"><a className="text-primary">{t("PRIVACY_POLICY")}</a></Link> {t("PAYING_INSURANCE")}  */}
                    {t("AGREE_DRIVEMATES")} <a href={baseUrl+NAVIGATION.TERMS_OF_USE} className="ms-1">{t("TERM_OF_SERVICE")}</a> {t("AND")}  <a href={baseUrl+NAVIGATION.PRIVACY_POLICY} className="text-primary">{t("PRIVACY_POLICY")}</a> {t("PAYING_INSURANCE")} 
                    </label>
                    {errors.agree && (
                      <div className="invalid-feedback">{errors.agree.message}</div>
                    )}
                  </div>

                  <button className="btn btn-primary w-100 mb-3" type="submit">{t("CONFIRM")} &#38; {t("PAY")} THB {Number(summaryDetail?.insurancePackageDetails?.insurance_premium).toLocaleString()}</button>
                </form>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="w-100 mb-3 text-secondary fw-normal fs-6">
                {t("DEPOSIT")} <span className="text-dark">THB {Number(summaryDetail?.insurancePackageDetails?.insurance_premium).toLocaleString()}</span> {t("PURCHASE_INSURANCE")} <Link href="mailto:accautosmart@gmail.com"><a className="text-dark" target="_blank">accautosmart@gmail.com</a></Link>. {t("ASSISTANCE")} <Link href="tel:02-270-5555"><a className="text-dark" target="_blank">02-270-5555</a></Link>. {t("ACCOUNT_DETAILS")};
                </div>
                <div className="w-100 mb-4 d-inline-block fw-normal fs-6">
                  <div className="row">
                    <div className="col-md-6 col-sm-12 text-secondary">{t("BANK_NAME")}:</div>
                    <div className="col-md-6 col-sm-12 text-dark">Kasikorn Bank</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 text-secondary">{t("ACCOUNT_TITLE")}:</div>
                    <div className="col-md-6 col-sm-12 text-dark">Auto Smart Broker Co., Ltd</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12 text-secondary">{t("ACCOUNT_NUMBER")}:</div>
                    <div className="col-md-6 col-sm-12 text-dark">781-2-02800-0</div>
                  </div>
                </div>
                <div className="form-check check-policy">
                  <input type="checkbox" className={classNames("form-check-input", { "is-invalid": bankCheckboxRef.current===false })} id="agree" name="agree" onChange={e => setBankCheckbox(e.target.checked)}/>
                  <label className="form-check-label d-inline fw-normal fs-6" htmlFor="agree">
                  {/* {t("AGREE_DRIVEMATES")} <Link href="/"><a className="text-primary">{t("TERM_OF_SERVICE")}</a></Link> and <Link href="/"><a className="text-primary">{t("PRIVACY_POLICY")}</a></Link> {t("PAYING_INSURANCE")} */}
                  {t("AGREE_DRIVEMATES")} <a href={baseUrl+NAVIGATION.TERMS_OF_USE} className="ms-1">{t("TERM_OF_SERVICE")}</a> {t("AND")} <a href={baseUrl+NAVIGATION.PRIVACY_POLICY} className="text-primary">{t("PRIVACY_POLICY")}</a> {t("PAYING_INSURANCE")}
                  </label>
                  {bankCheckboxRef.current === false && <div className="invalid-feedback">{t("THIS_VALUE_IS_REQUIRED")}</div>}
                </div>
                <button className="btn btn-primary w-100 mb-3" disabled={!bankCheckboxRef.current} onClick={BankTransferProcessPayment}>{t("PACKAGE_DETAILS_continue")}</button>
              </TabPanel>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  )
}

export default Summary;