
import React, { FC, useEffect } from 'react';
import useState from 'react-usestateref';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import { GET_PROVINCE, GET_DISTRICT, GET_SUBDISTRICT, SAVE_PERSONALINFO, REFRESH_TOKEN } from '../utilities/endpoints';
import { Controller, useForm } from 'react-hook-form';
import PhoneInputWithCountry from "react-phone-number-input"
import classNames from 'classnames';
import InputMask from "react-input-mask"
import { TextField } from '@material-ui/core';
import { GENDER, NAVIGATION, PATTERN, PREFIX, MONTHS, DATETIME_FORMATS } from '../utilities/constants';
import useAxiosInterceptor from '../utilities/axiosApiInstance';
import { useRouter } from 'next/dist/client/router';
import { IPurchaser, ISigninDataModel } from '../interfaces';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

const PersonalInfo: FC = () => {
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
    if (locale === 'en') {
      return ['Insurance information', 'Car and insured person information', 'Conclusion '];
    } else {
      return ['ข้อมูลประกันภัย', 'ข้อมูลรถยนต์และผู้เอาประกันภัย', 'สรุป'];
    }
  }

  const { register, handleSubmit, control, formState: { errors, isValid }, setValue, trigger, watch } = useForm({
    mode: 'onChange',
  });
  const { isLoading, axiosApiInstance } = useAxiosInterceptor();
  const { t } = useTranslation();
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subdistrict, setSubdistrict] = useState([]);
  const [province_id, setProvinceID] = useState<string>();
  const [userData, setUserData, userDataRef] = useState<ISigninDataModel>();
  const [purchaserData, setPurchaserData, PurchaserDataRef] = useState<IPurchaser>();
  const [baseUrl, setBaseUrl] = useState<string>();

  const router = useRouter();
  const { query, isReady, locale } = useRouter();
  const { brand, model, year, id, ins_id } = query;

  useEffect(() => {
    setBaseUrl(window.location.origin !== 'http://localhost:3000' ? window.location.origin : 'https://dev.otoz.biz')
    getAllProvince();
  }, [isReady]);
  
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
    setProvinceID(provinceId);
    const config = {
      Auth:false
    } 
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

  const setPersonalInfo = async () => {
    setValue('prefix', PurchaserDataRef.current.personalInfo.prefix);
    setValue('firstName', PurchaserDataRef.current.personalInfo.firstName);
    setValue('lastName', PurchaserDataRef.current.personalInfo.lastName);
    setValue('email', PurchaserDataRef.current.personalInfo.email);
    setValue('contactNumber', PurchaserDataRef.current.personalInfo.contactNumber);
    setValue('address', PurchaserDataRef.current.personalInfo.address);
    setValue('gender', PurchaserDataRef.current.personalInfo.gender);
    setValue('homeNumber', PurchaserDataRef.current.personalInfo.homeNumber);
    setValue('zipCode', PurchaserDataRef.current.personalInfo.zipCode);
    setValue('province_id', PurchaserDataRef.current.personalInfo.province_id);
    await getDistrict(PurchaserDataRef.current.personalInfo.province_id);
    setValue('district_id', PurchaserDataRef.current.personalInfo.district_id);
    await getSubDistrict(PurchaserDataRef.current.personalInfo.province_id, PurchaserDataRef.current.personalInfo.district_id);
    setValue('subdistrict_id', PurchaserDataRef.current.personalInfo.subdistrict_id);
    setValue('idCardNo', PurchaserDataRef.current.personalInfo.idCardNo);
    setValue('year', dayjs(PurchaserDataRef.current.personalInfo.DOB).get('year'));
    setValue('month', dayjs(PurchaserDataRef.current.personalInfo.DOB).get('month'));
    setValue('day', dayjs(PurchaserDataRef.current.personalInfo.DOB).get('date'));
    trigger(['prefix', 'firstName', 'lastName', 'email', 'contactNumber', 'address', 'gender'
      , 'homeNumber', 'zipCode', 'province_id', 'district_id', 'subdistrict_id', 'idCardNo'
      , 'year', 'month', 'day'])
  }

  const setUserInfo = async () => {
    setValue('firstName', userDataRef.current.userData.firstName);
    setValue('lastName', userDataRef.current.userData.lastName);
    setValue('email', userDataRef.current.userData.email);
    setValue('contactNumber', userDataRef.current.userData.phoneNumber.replace(/-/g, ""));
    setValue('gender', userDataRef.current.userData.gender);
    setValue('year', dayjs(userDataRef.current.userData.dateOfBirth).get('year'));
    setValue('month', dayjs(userDataRef.current.userData.dateOfBirth).get('month'));
    setValue('day', dayjs(userDataRef.current.userData.dateOfBirth).get('date'));

    trigger(['firstName', 'lastName', 'email', 'contactNumber', 'gender'])

  }

  const checkSession = () => {
    const session = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
    if (!session) {
      const loginUrl = baseUrl + process.env.LOGIN_URL;
      window.location.href = loginUrl;
    }
    setUserData(session);
    const personalInfo = JSON.parse(localStorage.getItem('personalInfo'));
    if (!personalInfo) {
      setUserInfo();
    }
    else {
      setPurchaserData(personalInfo);
      setPersonalInfo();
    }
  }

  const classes = useStyles();
  const [activeStep] = React.useState(1);
  const steps = getSteps(locale);

  const createDaysItems = () => {
    let items = [];
    for (let i = 1; i <= 31; i++) {
      items.push(<option key={i} value={i}>{i}</option>);
    }
    return items;
  }

  const createYearItems = () => {
    let items = [];
    let year = new Date().getFullYear();
    for (let i = year; i >= 1900; i--) {
      items.push(<option key={i} value={i}>{i}</option>);
    }
    return items;
  }

  const onSubmit = (data) => {
    const d = new Date(data.year, data.month, data.day)
    let idCard;
    const pName = province.filter(p => p.id === Number(data.province_id))[0].name;
    const dName = district.filter(d => d.id === Number(data.district_id))[0].name;
    const subdName = subdistrict.filter(p => p.id === Number(data.subdistrict_id))[0].name;
    const newdate = dayjs(d).format(DATETIME_FORMATS.CALENDAR_DATE_FORMAT);
    let card;
    card = data.idCardNo.toString();
    if (card.includes('-')) {
      idCard = data.idCardNo.replaceAll("-", "");
    }
    else {
      idCard = data.idCardNo;
    }


    const personalInfo = {
      prefix: data.prefix,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contactNumber: data.contactNumber,
      address: data.address,
      gender: data.gender,
      homeNumber: data.homeNumber,
      DOB: new Date(newdate),
      idCardNo: Number(idCard),
      province_id: Number(data.province_id),
      district_id: Number(data.district_id),
      subdistrict_id: Number(data.subdistrict_id),
      province: pName,
      district: dName,
      subdistrict: subdName,
      zipCode: data.zipCode,
      purchaserType: userDataRef.current.userData.type,
    }

    savePersonalInfo(personalInfo)
  }

  const savePersonalInfo = (data) => {
    const config = {
      Auth:true
    } 
    axiosApiInstance.patch(`${SAVE_PERSONALINFO}/${id}`,data,config).then((res) => {
        const personalInfo = { personalInfo: data }
        localStorage.setItem("personalInfo", JSON.stringify(personalInfo));
        router.push(`${NAVIGATION.VEHICLE_INFO}?id=${id}&ins_id=${ins_id}&brand=${brand}&model=${model}&year=${year}`)
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
          <div className="title">{t('PERSONAL_INFORMATION')}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <label>{t('PREFIX')}</label>
                  <select className={classNames("form-select", { "is-invalid": errors.prefix })} id="prefix" name="prefix"
                    {...register('prefix', { required: t("THIS_VALUE_IS_REQUIRED") as string })}>
                    <option value="">{t('SELECT')}</option>
                    {PREFIX.map((e, key) => {
                      return <option key={key} value={e.value}>{e.name}</option>;
                    })}
                  </select>
                  {errors.prefix && (
                    <div className="invalid-feedback">{errors.prefix.message}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <label>{t('FIRST_NAME')}</label>
                  <input type="text" className={classNames("form-control", { "is-invalid": errors.firstName })} placeholder="Type here..." id="firstName" name="firstName" {...register('firstName', { required: t("THIS_VALUE_IS_REQUIRED") as string })} />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName.message}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <label>{t('LAST_NAME')}</label>
                  <input type="text" className={classNames("form-control", { "is-invalid": errors.lastName })} placeholder="Type here..." id="lastName" name="lastName" {...register('lastName', { required: t("THIS_VALUE_IS_REQUIRED") as string })} />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName.message}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <label>{t('GENDER')}</label>
                  <select className={classNames("form-select", { "is-invalid": errors.gender })} id="gender" name="gender" {...register('gender', { required: t("THIS_VALUE_IS_REQUIRED") as string })}>
                    <option value="">{t('SELECT')}</option>
                    {GENDER.map((e, key) => {
                      return <option key={key} value={e.value}>{t([e.name])}</option>;
                    })}
                  </select>
                  {errors.gender && (
                    <div className="invalid-feedback">{errors.gender.message}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <label>{t('DATE_OF_BIRTH')}</label>
                  <div className="input-group form-dmy">
                    <select className="form-select d" id="day" name="day" {...register('day')}>
                      {createDaysItems()}
                    </select>
                    <select className="form-select m" id="month" name="month" {...register('month')}>
                      {MONTHS.map((e, key) => {
                        return <option key={key} value={e.value}>{t([e.name])}</option>;
                      })}
                    </select>
                    <select className="form-select y" id="year" name="year" {...register('year')}>
                      {createYearItems()}
                    </select>
                  </div>
                  <div className="invalid-feedback">This value is required.</div>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <label>{t('NATIONAL_IDENTITY_CARD_NUMBER')}</label>
                  <Controller
                    render={(props) => (
                      <InputMask mask="9-9999-99999-99-9"
                        value={props.field.value}
                        maskChar=""
                        onChange={props.field.onChange}>
                        {() => <TextField placeholder="Type here..." error={Boolean(errors.idCardNo)} helperText={errors.idCardNo?.message} variant="outlined"
                        />}
                      </InputMask>
                    )}
                    name="idCardNo"
                    control={control}
                    rules={{
                      required: t("THIS_VALUE_IS_REQUIRED") as string, minLength: {
                        value: 17,
                        message: t("LIMIT_13_DIGIT", { value: 13 })
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <label>{t('EMAIL')}</label>
                  <input type="email" className={classNames("form-control", { "is-invalid": errors.email })} placeholder="sample@sample.com" id="email" name="email" {...register('email', {
                    required: t("THIS_VALUE_IS_REQUIRED") as string, pattern: {
                      value: PATTERN.EMAIL,
                      message: t("INVALID_EMAIL_ADDRESS")
                    }
                  })} />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <label>{t('CONTACT_NUMBER')}</label>
                  <div className={classNames("form-control", { "is-invalid": errors.contactNumber })}>

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
                      name="contactNumber"
                      control={control}
                      rules={{ required: t("THIS_VALUE_IS_REQUIRED") as string, maxLength: {
                        value: 13,
                        message: t("MAX_LENGTH", { value: 10 })
                      }}}
                    />
                  </div>
                  {errors.contactNumber && (
                    <div className="invalid-feedback">{errors.contactNumber.message}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <label>{t('HOME_NUMBER')}</label>
                  <input type="text" className={classNames("form-control", { "is-invalid": errors.homeNumber })} placeholder="Home Number" autoComplete="off" id="homeNumber" name="homeNumber" {...register('homeNumber', {
                    required: t("THIS_VALUE_IS_REQUIRED") as string, pattern: {
                      value: PATTERN.ALPHABET_WITH_SPECIAL_CHARACTERS,
                      message: t("ONLY_ALPHA_NUMERIC")
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
                  <input type="text" className={classNames("form-control", { "is-invalid": errors.address })} placeholder="Type here..." id="address" name="address" {...register('address', { required: t("THIS_VALUE_IS_REQUIRED") as string })} />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address.message}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12">
                <div className="form-group">
                  <label>{t('PROVINCE')}</label>
                  <select className={classNames("form-select", { "is-invalid": errors.province_id })}
                    id="province_id" name="province_id" {...register('province_id', { required: t("THIS_VALUE_IS_REQUIRED") as string })}
                    onChange={(e) => getDistrict(e.target.value)}>
                    <option value="">{t('SELECT')}</option>
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
                  <select className={classNames("form-select", { "is-invalid": errors.district_id })} id="district_id" name="district_id" {...register('district_id', { required: t("THIS_VALUE_IS_REQUIRED") as string })} onChange={(e) => getSubDistrict(province_id, e.target.value)}>
                    <option value="">{t('SELECT')}</option>
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
                    <option value="">{t('SELECT')}</option>
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
                  <input type="text" className={classNames("form-control", { "is-invalid": errors.zipCode })} placeholder="Type here..." id="zipCode" name="zipCode"
                    {...register('zipCode', {
                      required: t("THIS_VALUE_IS_REQUIRED") as string, pattern: {
                        value: PATTERN.ONLY_NUMBER,
                        message: t("ONLY_NUMBERS_ARE_ALLOWED")
                      }, minLength: {
                        value: 5,
                        message: t("MIN_LENGTH", { value: 5 })
                      }, maxLength: {
                        value: 5,
                        message: t("MAX_LENGTH", { value: 5 })
                      }
                    })} />
                  {errors.zipCode && (
                    <div className="invalid-feedback">{errors.zipCode.message}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-100 d-block text-center">
              <button className="btn btn-primary" type="submit" disabled={!isValid}>{t('PACKAGE_DETAILS_continue')}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo;
