
  if(typeof window !== 'undefined') {
    var BASE_URL = window.location.origin !== 'http://localhost:3000' ? window.location.origin+'/api' : 'https://dev.otoz.biz/api';
  }

  //configs
  export const GET_TENANT_CONFIG  = BASE_URL + '/tenants/configs/getConfig/drivemate';
  export const GET_UPLOAD_URL  = BASE_URL + '/tenants/configs/getUploadUrls';

  export const GET_BRANDS  = BASE_URL + '/insurance-lead-generation/get-brands';
  export const GET_BRAND_MODELS = BASE_URL + '/insurance-lead-generation/get-brand-models';
  export const GET_BRAND_MODELS_YEARS = BASE_URL + '/insurance-lead-generation/get-brand-model-years';
  export const GET_INSURANCE_TYPES = BASE_URL + '/insurance-lead-generation/get-insurance-package-type';
  export const GET_INSURANCE_PACKAGES = BASE_URL + '/insurance-lead-generation/get-insurance-packages';
  export const GET_PROVINCE = BASE_URL + '/insurance-lead-generation/get-province';
  export const GET_DISTRICT = BASE_URL + '/insurance-lead-generation/get-district';
  export const GET_SUBDISTRICT = BASE_URL + '/insurance-lead-generation/get-subdistrict';
  export const SAVE_PERSONALINFO = BASE_URL + '/insurance-lead-generation/save-purchaser-profile';
  export const SAVE_SHIPPINGINFO = BASE_URL + '/insurance-lead-generation/save-shipping-details';
  export const GET_INSURANCE_SUMMARY = BASE_URL + '/insurance-lead-generation/get-insurance';
  export const SAVE_VEHICLE_DETAIL = BASE_URL + '/insurance-lead-generation/save-vehicle-details';
  export const SAVE_INSURANCE_PACKAGE = BASE_URL + '/insurance-lead-generation/save-insurance-package';
  export const REFRESH_TOKEN = BASE_URL + '/authentication/refresh-token';
  export const GET_EXISTING_CARDS = BASE_URL + '/payment-management/cards/get-user-cards';
  export const PERFORM_TEST_TRANSACTION = BASE_URL + '/payment-management/insurance-lead-generation-payments/perform-test-transaction';
  export const PROCESS_PAYMENT = BASE_URL + '/payment-management/insurance-lead-generation-payments/process-payment';
  export const PAYMENT_BANKTRANSFER = BASE_URL + '/insurance-lead-generation/add-insurance-payment-method';
  export const CREATE_CARD = BASE_URL + '/payment-management/insurance-lead-generation-payments/cards/create'
  export const SAVE_CREDIT_CARD = BASE_URL + '/payment-management/insurance-lead-generation-payments/cards/save/3d-secure';
  //Authentication
  export const SIGN_IN = BASE_URL + '/authentication/passport-sign-in';
  export const SIGN_UP = BASE_URL + '/authentication/sign-up';
  export const FORGOT_PASSWORD = BASE_URL + '/authentication/forgot-password';
  export const GET_TENANT_SECRETS = BASE_URL + '/tenants/configs/getSecrets';


