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
import { Controller, useForm } from 'react-hook-form';
import 'react-phone-number-input/style.css'
import classNames from 'classnames';
import { GET_BRANDS, GET_BRAND_MODELS, GET_PROVINCE, REFRESH_TOKEN, SAVE_VEHICLE_DETAIL } from '../utilities/endpoints';
import useAxiosInterceptor from '../utilities/axiosApiInstance';
import { DATETIME_FORMATS, NAVIGATION, PATTERN } from '../utilities/constants';
import { useRouter } from 'next/dist/client/router';
import { searchTypes } from '../types/search-types';
import { ISigninDataModel, IVehicleInfo } from '../interfaces';
import { TextField } from '@material-ui/core';
import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
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
    if (locale === 'en') {
        return ['Insurance information', 'Car and insured person information', 'Conclusion '];
    } else {
        return ['ข้อมูลประกันภัย', 'ข้อมูลรถยนต์และผู้เอาประกันภัย', 'สรุป'];
    }
}

const VehicleInfo: FC = () => {
    const { register, handleSubmit, control, formState: { errors, isDirty, isValid }, setValue, trigger, watch } = useForm({
        mode: "onChange",
    });

    const { isLoading, axiosApiInstance } = useAxiosInterceptor();
    const { t } = useTranslation();
    const [province, setProvince] = useState([]);
    const router = useRouter();
    const { query, isReady, locale } = useRouter()
    const { brand, model, year, id, ins_id } = query;
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [vehicleData, setVehicleData, VehicleDataRef] = useState<IVehicleInfo>();
    const [userData, setUserData, userDataRef] = useState<ISigninDataModel>();
    const [baseUrl, setBaseUrl] = useState<string>();

    useEffect(() => {
        setBaseUrl(window.location.origin !== 'http://localhost:3000' ? window.location.origin : 'https://dev.otoz.biz')
        getAllProvince();
        getAllBrands();

    }, [isReady]);


    const checkSession = () => {
        const session = JSON.parse(localStorage.getItem('ACCESS_TOKEN'));
        if (!session) {
            const loginUrl = baseUrl + process.env.LOGIN_URL;
            window.location.href = loginUrl;
        }
        setUserData(session);
        const vehicleInfo = JSON.parse(localStorage.getItem('vehicleInfo'));
        if (vehicleInfo) {
            setVehicleData(vehicleInfo);
            setVehicleInfo();
        }

    }


    const setVehicleInfo = async () => {
        const registrationArr = VehicleDataRef.current.vehicleInfo.registrationNo.split("-");
        setValue('regCode', registrationArr?.[0]);
        setValue('regNum', registrationArr?.[1]);
        setValue('province_id', VehicleDataRef.current.vehicleInfo.registrationProvince_id);
        setValue('bodyNumber', VehicleDataRef.current.vehicleInfo.bodyNo);
        setValue('engineNumber', VehicleDataRef.current.vehicleInfo.engineNo);
        setValue('coverageStartDate', dayjs(VehicleDataRef.current.vehicleInfo.coverageStartDate).format(DATETIME_FORMATS.CALENDAR_DATE_FORMAT));
        setValue('coverageEndDate', dayjs(VehicleDataRef.current.vehicleInfo.coverageEndDate).format(DATETIME_FORMATS.CALENDAR_DATE_FORMAT));
        setValue('regDate', dayjs(VehicleDataRef.current.vehicleInfo.registrationDate).format(DATETIME_FORMATS.CALENDAR_DATE_FORMAT));


        trigger(['regCode', 'regNum', 'province_id', 'bodyNumber', 'engineNumber', 'coverageStartDate', 'coverageEndDate', 'regDate'])

    }

    const getAllBrands = async () => {
        const config = {
            Auth: false
        }
        await axiosApiInstance.get(GET_BRANDS, config).then((res) => {
            setBrands(res.data.data.brand.data);
            getModelsByBrand(brand);
        }).catch((err) => err);
    }

    const getModelsByBrand = (brandId) => {
        const config = {
            Auth: false
        }
        axiosApiInstance.get(`${GET_BRAND_MODELS}/${brandId}`, config).then((res) => {
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

    const brandName = convertIdtoName(brand, searchTypes.brand);
    const modelName = convertIdtoName(model, searchTypes.model);

    const getAllProvince = async () => {
        const config = {
            Auth: false
        }
        await axiosApiInstance.get(GET_PROVINCE, config).then((res) => {
            setProvince(res.data.data.province);
            checkSession();
        }).catch((err) => err);
    }
    const classes = useStyles();
    const [activeStep] = React.useState(1);
    const steps = getSteps(locale);

    const gotoPersonalInfo = () => {
        router.push(`${NAVIGATION.PERSONAL_INFO}?id=${id}&ins_id=${ins_id}&brand=${brand}&model=${model}&year=${year}`)
    }

    const onSubmit = (data) => {
        const pName = province.filter(p => p.id === Number(data.province_id))[0].name;
        const vehicleDetails = {
            brand_id: Number(brand),
            brand_name: brandName,
            model_id: Number(model),
            model_name: modelName,
            year: Number(year),
            registrationNo: `${data.regCode}-${data.regNum}`,
            registrationProvince: pName,
            registrationProvince_id: Number(data.province_id),
            bodyNo: data.bodyNumber,
            engineNo: data.engineNumber,
            coverageStartDate: dayjs(data.coverageStartDate).toISOString(),
            coverageEndDate: dayjs(data.coverageEndDate).toISOString(),
            _assetId: undefined,
            registrationDate: dayjs(data.regDate).toISOString(),
        }
        saveVehicleDetail(vehicleDetails)
    }

    const saveVehicleDetail = (data) => {
        const config = {
            Auth: true
        }
        axiosApiInstance.patch(`${SAVE_VEHICLE_DETAIL}/${id}`, data, config).then((res) => {
            if (res) {
                const vehicleInfo = { vehicleInfo: data }
                localStorage.setItem("vehicleInfo", JSON.stringify(vehicleInfo));
                router.push(`${NAVIGATION.SHIPPING_INFO}?id=${id}&ins_id=${ins_id}&brand=${brand}&model=${model}&year=${year}`);
            }
        }).catch((err) => err)
    }

    const adjustTimeByDuration = (date: Date) => {
        const newYear = dayjs(date).add(1, 'year');
        return newYear;
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
                        <button className="btn"><img src="/insurance/back-icon.svg" alt="backIcon" onClick={() => gotoPersonalInfo()} /></button>
                        {t('VEHICLE_INFORMATION')}</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>{t('REGISTRATION_NUMBER')}</label>
                                    <div className="row align-items-center">
                                        <div className="col-4 pe-0">
                                            <input type="text" className={classNames("form-control", { "is-invalid": errors.regCode })}
                                                placeholder="AAA" id="regCode" name="regCode" {...register('regCode', {
                                                    required: t("REQUIRED") as string
                                                })} />
                                            {errors.regCode && (<div className="invalid-feedback">{errors.regCode.message}</div>)}
                                        </div>
                                        <div className="col-1 p-0 text-center">
                                            -
                                        </div>
                                        <div className="col-7 ps-0">
                                            <input type="text" className={classNames("form-control", { "is-invalid": errors.regNum })}
                                                placeholder="000" id="regNum" name="regNum" {...register('regNum', { required: t("THIS_VALUE_IS_REQUIRED") as string })} />
                                            {errors.regNum && (<div className="invalid-feedback">{errors.regNum.message}</div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>{t('REGISTRATION_DATE')}</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Controller
                                            render={(props) => (
                                                <KeyboardDatePicker
                                                    openTo="year"
                                                    views={["year", "month", "date"]}
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    format="MM/dd/yyyy"
                                                    value={props.field.value}
                                                    onChange={props.field.onChange}
                                                    error={Boolean(errors.regDate)}
                                                    helperText={errors.regDate?.message}
                                                    placeholder='Registration Date'
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            )}
                                            name="regDate"
                                            control={control}
                                            defaultValue={new Date()}
                                            rules={{ required: t("THIS_VALUE_IS_REQUIRED") as string }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>{t('PROVINCE_OF_REGISTRATION')}</label>
                                    <select className={classNames("form-select", { "is-invalid": errors.province_id })} {...register('province_id', { required: t("THIS_VALUE_IS_REQUIRED") as string })}>
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
                                    <label>{t('COVERAGE_START_DATE')}</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Controller
                                            render={(props) => (
                                                <KeyboardDatePicker
                                                    openTo="year"
                                                    views={["year", "month", "date"]}
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    format="MM/dd/yyyy"
                                                    value={props.field.value}
                                                    onChange={(e) => {
                                                        props.field.onChange(e);
                                                        setValue("coverageEndDate", adjustTimeByDuration(e))
                                                    }
                                                    }
                                                    error={Boolean(errors.coverageStartDate)}
                                                    helperText={errors.coverageStartDate?.message}
                                                    placeholder='Coverage Start Date'
                                                    minDate={new Date()}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            )}
                                            name="coverageStartDate"
                                            control={control}
                                            defaultValue={new Date()}
                                            rules={{ required: t("THIS_VALUE_IS_REQUIRED") as string }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>{t('COVERAGE_END_DATE')}</label>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                        <Controller
                                            render={(props) => (
                                                <KeyboardDatePicker
                                                    openTo="year"
                                                    views={["year", "month", "date"]}
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    format="MM/dd/yyyy"
                                                    value={props.field.value}
                                                    onChange={props.field.onChange}
                                                    error={Boolean(errors.coverageEndDate)}
                                                    helperText={errors.coverageEndDate?.message}
                                                    placeholder='Coverage End Date'
                                                    minDate={watch().coverageStartDate}
                                                    disabled={true}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            )}
                                            name="coverageEndDate"
                                            control={control}
                                            defaultValue={adjustTimeByDuration(new Date())}
                                            rules={{ required: t("THIS_VALUE_IS_REQUIRED") as string }}

                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>{t('VIN_NUMBER')}</label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.bodyNumber })} placeholder="Vin Number" id="bodyNumber" name="bodyNumber" {...register('bodyNumber', {
                                        required: t("THIS_VALUE_IS_REQUIRED") as string, minLength: {
                                            value: 5,
                                            message: t("MIN_LENGTH", { value: 5 })
                                        }
                                    })} />
                                    {errors.bodyNumber && (
                                        <div className="invalid-feedback">{errors.bodyNumber.message}</div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 col-12">
                                <div className="form-group">
                                    <label>{t('ENGINE_NUMBER')}</label>
                                    <input type="text" className={classNames("form-control", { "is-invalid": errors.engineNumber })} placeholder="Engine Number" id="engineNumber" name="engineNumber" {...register('engineNumber', { required: t("THIS_VALUE_IS_REQUIRED") as string })} />
                                    {errors.engineNumber && (
                                        <div className="invalid-feedback">{errors.engineNumber.message}</div>
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

export default VehicleInfo;
