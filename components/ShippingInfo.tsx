/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from 'react';
import useState from 'react-usestateref';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import { GET_PROVINCE, GET_DISTRICT, GET_SUBDISTRICT, SAVE_SHIPPINGINFO, GET_INSURANCE_SUMMARY, REFRESH_TOKEN } from '../utilities/endpoints';
import { useForm } from 'react-hook-form';
import 'react-phone-number-input/style.css'
import classNames from 'classnames';
import { NAVIGATION, PATTERN } from '../utilities/constants';
import useAxiosInterceptor from '../utilities/axiosApiInstance';
import { useRouter } from 'next/dist/client/router';
import { IShippingInfo, ISigninDataModel } from '../interfaces';
import { useTranslation } from 'next-i18next';

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

const ShippingInfo: FC = () => {
  const { isLoading, axiosApiInstance } = useAxiosInterceptor();
  const { register, handleSubmit, control, formState: { errors, isDirty, isValid }, setValue, trigger, watch } = useForm({
    mode: 'onChange',
  });
  const { t } = useTranslation();
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subdistrict, setSubdistrict] = useState([]);
  const [province_id, setProvinceID] = useState([]);
  const [shippingData, setShippingData, ShippingDataRef] = useState<IShippingInfo>();
  const router = useRouter();
  const { query, isReady, locale } = useRouter();
  const { brand, model, year, id, ins_id } = query;
  const [userData, setUserData, userDataRef] = useState<ISigninDataModel>();
  const [baseUrl, setBaseUrl] = useState<string>();


  const classes = useStyles();
  const [activeStep] = React.useState(1);
  const steps = getSteps(locale);

  useEffect(() => {
    setBaseUrl(window.location.origin !== 'http://localhost:3000' ? window.location.origin : 'https://dev.otoz.biz')
    setValue('shipAddress', 'shipAddress');
    getAllProvince();
   
  }, [setValue]);
 
  const checkSession = () => {
    const session = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    if (!session) {
      const loginUrl = baseUrl + process.env.LOGIN_URL;
      window.location.href = loginUrl;
    }
    setUserData(session);
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));
    if(shippingInfo){
        setShippingData(shippingInfo);
        setShippingInfo();
    }
  
  }

  const setShippingInfo = async () => {
    
    setValue('electronic', ShippingDataRef.current.shippingInfo.isElectronicShipping);
    setValue('shipAddress', ShippingDataRef.current.shippingInfo.shipToInsuredAddress?'shipAddress':'alternateAddress');

    if(ShippingDataRef.current.shippingInfo.alternateAddress){ 

      setValue('address', ShippingDataRef.current.shippingInfo.address);
      setValue('homeNumber', ShippingDataRef.current.shippingInfo.homeNumber);
      setValue('province_id', ShippingDataRef.current.shippingInfo.province_id);
      await getDistrict(ShippingDataRef.current.shippingInfo.province_id);
      setValue('district_id', ShippingDataRef.current.shippingInfo.district_id);
      await getSubDistrict(ShippingDataRef.current.shippingInfo.province_id,ShippingDataRef.current.shippingInfo.district_id);
      setValue('subdistrict_id', ShippingDataRef.current.shippingInfo.subdistrict_id);
      setValue('zipCode', ShippingDataRef.current.shippingInfo.zipCode);

      trigger(['address','homeNumber','province_id','district_id','subdistrict_id','zipCode'])
    }

    
}


  const getAllProvince = async () => {
    const config = {
      Auth:false
    } 
    await axiosApiInstance.get(GET_PROVINCE,config).then((res) => {
      setProvince(res.data.data.province);
      checkSession();
    }).catch((err) => err);
  }

  const getDistrict = async (provinceId) => {
    const config = {
      Auth:false
    } 
    setProvinceID(provinceId)
    return axiosApiInstance.get(`${GET_DISTRICT}/${provinceId}`,config).then((res) => {
      setDistrict(res.data.data.district);
    }).catch((err) => err);
  }

  const getSubDistrict = async (provinceId, districtId) => {
    const config = {
      Auth:false
    } 
    return axiosApiInstance.get(`${GET_SUBDISTRICT}/${provinceId}/${districtId}`,config).then((res) => {
      setSubdistrict(res.data.data.sub_district);
    }).catch((err) => err);
  }

  const gotoVehicleInfo = () =>{
    router.push(`${NAVIGATION.VEHICLE_INFO}?id=${id}&ins_id=${ins_id}&brand=${brand}&model=${model}&year=${year}`)
}   

  const onSubmit = (data) => {
    let pName = "";
    let dName = "";
    let subdName = "";

    if (data.shipAddress === 'alternateAddress') {
      pName = province.filter(p => p.id === Number(data.province_id))[0].name;
      dName = district.filter(d => d.id === Number(data.district_id))[0].name;
      subdName = subdistrict.filter(p => p.id === Number(data.subdistrict_id))[0].name;
    }

    const shippingInfo = {
      isElectronicShipping: data.electronic,
      shipToInsuredAddress: data.shipAddress === 'shipAddress' ? true : false,
      alternateAddress: data.shipAddress === 'alternateAddress' ? true : false,
      address: data.address,
      homeNumber: data.homeNumber,
      province_id: Number(data.province_id),
      district_id: Number(data.district_id),
      subdistrict_id: Number(data.subdistrict_id),
      province: pName,
      district: dName,
      subdistrict: subdName,
      zipCode: data.zipCode,
    }
    saveShippingDetials(shippingInfo)
  }

  const saveShippingDetials = (data) => {
    const config = {
      Auth:true
    } 
    axiosApiInstance.patch(`${SAVE_SHIPPINGINFO}/${id}`, data,config).then((res) => {
      const shippingInfo = {shippingInfo:data}
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
      router.push(`${NAVIGATION.SUMMARY}?id=${id}&ins_id=${ins_id}&brand=${brand}&model=${model}&year=${year}`)
    }).catch((err) => err);
      
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
      <div className="card mb-5">
        <div className="card-body insurance-form">
          <div className="title">
            <button className="btn"><img src="/insurance/back-icon.svg" alt="backIcon" onClick={() => gotoVehicleInfo()} /></button>
            {t('SHIPPING_INFORMATION')}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="electronic" name="electronic" {...register('electronic')} />
              <label className="form-check-label" htmlFor="electronic">{t('ELECTRONIC')}</label>
              <div className="optional-text">
              {t('POLICY_ELECTRONICALLY_EMAIL')}                
              </div>
            </div>
            <hr />
            <div className="form-check">
              <input type="radio" className="form-check-input" value="shipAddress" name="shipAddress" id="insured" {...register('shipAddress')} />
              <label className="form-check-label" htmlFor="insured">{t('SHIP_TO_ADDRESS_OF_INSURED')}</label>
            </div>
            <div className="form-check">
              <input type="radio" className="form-check-input" value="alternateAddress" name="shipAddress" id="alternate" {...register('shipAddress')} />
              <label className="form-check-label" htmlFor="alternate">{t('SHIP_TO_ALTERNATE_ADDRESS')}</label>
            </div>
            {watch().shipAddress === "alternateAddress" ?
              <div className="row">
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>{t('HOME_NUMBER')}</label>
                    <input type="text" className={classNames("form-control", { "is-invalid": errors.homeNumber })} placeholder="Home Number" autoComplete="off" id="homeNumber" name="homeNumber" {...register('homeNumber', {
                      required: t("THIS_VALUE_IS_REQUIRED") as string, pattern: {
                        value: PATTERN.ONLY_NUMBER,
                        message: t("ONLY_NUMBERS_ARE_ALLOWED")
                      }
                    })} />
                    {errors.homeNumber && (
                      <div className="invalid-feedback">{errors.homeNumber.message}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-8 col-sm-12 col-12">
                  <div className="form-group">
                    <label>{t('ADDRESS')}</label>
                    <input type="text" className={classNames("form-control", { "is-invalid": errors.address })} placeholder="Address" id="address" name="address" {...register('address', { required: t("THIS_VALUE_IS_REQUIRED") as string })} />
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address.message}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>{t('PROVINCE')}</label>
                    <select className={classNames("form-select", { "is-invalid": errors.province_id })} {...register('province_id', { required: t("THIS_VALUE_IS_REQUIRED") as string })} onChange={(e) => getDistrict(e.target.value)}>
                      <option value="">Select</option>
                      {province.map((e, key) => {
                        return <option key={key} value={e.id}>{e.name}</option>;
                      })}
                    </select>
                    {errors.province_id && (
                      <div className="invalid-feedback">{errors.province_id.message}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>{t('DISTRICT')}</label>
                    <select className={classNames("form-select", { "is-invalid": errors.district_id })} {...register('district_id', { required: t("THIS_VALUE_IS_REQUIRED") as string })} onChange={(e) => getSubDistrict(province_id, e.target.value)}>
                      <option value="">Select</option>
                      {district.map((e, key) => {
                        return <option key={key} value={e.id}>{e.name}</option>;
                      })}
                    </select>
                    {errors.district_id && (
                      <div className="invalid-feedback">{errors.district_id.message}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>{t('SUB_DISTRICT')}</label>
                    <select className={classNames("form-select", { "is-invalid": errors.subdistrict_id })} {...register('subdistrict_id', { required: t("THIS_VALUE_IS_REQUIRED") as string })}>
                      <option value="">Select</option>
                      {subdistrict.map((e, key) => {
                        return <option key={key} value={e.id}>{e.name}</option>;
                      })}
                    </select>
                    {errors.subdistrict_id && (
                      <div className="invalid-feedback">{errors.subdistrict_id.message}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <div className="form-group">
                    <label>{t('ZIP_CODE')}</label>
                    <input type="text" className={classNames("form-control", { "is-invalid": errors.zipCode })} placeholder="Zip Code" id="zipCode" name="zipCode"
                      {...register('zipCode', {
                        required: t("THIS_VALUE_IS_REQUIRED") as string, pattern: {
                          value: /^[0-9]*$/,
                          message: t("ONLY_NUMBERS_ARE_ALLOWED")
                        }, minLength: {
                          value: 5,
                          message: t("MIN_LENGTH", { value:5 })
                        }, maxLength: {
                          value: 5,
                          message: t("MAX_LENGTH", { value:5 })
                        }
                      })} />
                    {errors.zipCode && (
                      <div className="invalid-feedback">{errors.zipCode.message}</div>
                    )}
                  </div>
                </div>
              </div> : null
            }
            <hr />
            <div className="w-100 d-block text-center mt-5">
              <button className="btn btn-primary" disabled={watch().shipAddress === "shipAddress"?false:!isValid}>{t('PACKAGE_DETAILS_continue')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ShippingInfo;