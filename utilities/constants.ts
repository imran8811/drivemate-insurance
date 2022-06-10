export const packagesAllowedForCompare = 3;

export const TENANT_ID = 'drivemate'

//export const azureStorageUri = 'https://odevseast01.blob.core.windows.net';

export const PATTERN = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  ONLY_NUMBER: /^[0-9]*$/,
  SPECIAL_CHARACTER: /^[a-z]*$/,
  ALPHABET_WITH_SPACE: /^[a-zA-Z |\u0E00-\u0E7F |\u4E00-\u9FCC]*$/,
  ALPHABET_WITH_SPECIAL_CHARACTERS: /^[a-zA-Z0-9 &()\\\-_.,"\/ |\u0E00-\u0E7F |\u4E00-\u9FCC]*$/,
  ONLY_ALPHA_NUMERIC: /^[a-zA-Z0-9|\u0E00-\u0E7F|\u4E00-\u9FCC]*$/,
};

export const PAGINATION = {
  page : 1,
  page_size: 10
}

export const PREFIX = [
  { value: '2', name: 'นางสาว' },
  { value: '3', name: 'นาง' },
  { value: '4', name: 'นาย' },
  { value: '8', name: 'บริษัท' },
  { value: '9', name: 'ห้างหุ้นส่วนจำกัด' },
  ];

export const GENDER = [
    { value: 'male', name: 'Male' },
    { value: 'female', name: 'Female' },
    //{ value: 'other', name: 'Other' },
  ];

  export const NAVIGATION = {
    HOME: '/',
    PERSONAL_INFO: '/personal-info',
    VEHICLE_INFO: '/vehicle-info',
    SHIPPING_INFO: '/shipping-info',
    SUMMARY: '/summary',
    INSURANCE: '/insurance',
    INSURANCE_PACKAGES: '/insurance-packages',
    ABOUT_US: '/about-us',
    CONTACT_US: '/contact-us',
    RENT_A_CAR: '/rent-a-car',
    ENTERPRISE: '/enterprise',
    PROMOTION: '/promotion',
    LIST_A_CAR: '/list-a-car',
    TERMS_OF_USE: '/insurance/terms-of-services',
    PRIVACY_POLICY: '/privacy-policy',
    FAQS: '/faqs',
    SWITCH: '/switch',
    SWITCH_HOW_IT_WORKS: '/switch/how-it-works',
    SWITCH_PRICING: '/switch/pricing',
    SWITCH_FAQ: '/switch/faq',
    SWITCH_REGISTER: '/switch/register',
    AIRPORT_TRANSFER_PAYMENT_DETAILS: '/asset-booking/airport-transfer/payment-details',
    AIRPORT_TRANSFER: '/airport-transfer',
    CAR_RENTAL: '/car-rental',
    CAR_WITH_DRIVER: '/limo-service',
    BLOG: '/blog/.',
    MONTHLY_RENTAL: '/monthly-rental',
    REGISTER_PACKAGE: '/monthly-rental/register-package',
    MONTHLY_RENTAL_STEPS: '/monthly-rental/monthly-rental-steps',
    RENTAL_AGREEMENT: '/rental-agreement',
    VEHICLE_INVENTORY: '/user-management/vehicle-inventory',
    SUPERHOST_DASHBOARD: '/user-management/super-host',
    SUPER_HOST : '/super-host',
    INSTANT_BOOKING : '/instant-booking',
    BMW : '/bmw',
    MY_INSURANCE: '/order-management/my-insurance',
    INSURANCE_BRAND_SELECTION: 'insurance/brand-selection',
    INSURANCE_PERSONAL_INFO: 'insurance/personal-info',
    INSURANCE_VEHICLE_INFO: 'insurance/vehicle-info',
    INSURANCE_SHIPPING_INFO: 'insurance/shipping-info',
    INSURANCE_SUMMARY: 'insurance/summary',
  }

  export const DATETIME_FORMATS = {
    DATE_FORMAT: 'DD-MM-YYYY HH:mm',
    CALENDAR_DATE_FORMAT: 'YYYY-MM-DD',
    MONTH_DATE_YEAR: 'MM-DD-YYYY',
    MONTH_DATE_YEAR_HOUR_MINUTS: 'MM-DD-YYYY HH:mm',
    MONTH_DATE_YEAR_WITH_FORWARDSLASH: 'MM/DD/YYYY',
    DATE_MONTH_YEAR: 'DD-MM-YYYY',
    SMALL_DATE_MONTH_YEAR: 'd-m-Y',
    SMALL_DATE_MONTH_YEAR_HOUR_MINUTS: 'd-m-Y H:i',
    START_OF_BUSNESS: '06:00',
    END_OF_BUSNESS: '21:00',
    DAYS_IN_NUMBER: 'dd',
    DAY_IN_WORDS: 'EEEE',
    MONTH_IN_WORDS: 'MMMM',
    SHORT_YEAR: 'yyyy',
    DAYS_OF_YEARS: 'D',
    SHORT_MONTH_YEAR: 'MMM yy',
    FULL_MONTH_YEAR: 'MMMM yyyy',
    SHORT_DAY: 'E',
    HOURS_MINUTS: 'HH:mm',
    SHORT_DAY_WITH_DATE_MONTH_YEAR: 'E, dd MMM yyyy',
    dd_MMM_yyyy_HH_mm: 'dd, MMM yyyy HH:mm',
    dd_MMM_yyyy: 'dd, MMM yyyy',
    YEAR: 'YYYY',
    MONTH: 'M',
    DAY: 'D',
    SHORT: 'short',
    MMM_D_Y_H_MM_SS_A: 'MMM. d, y, h:mm:ss a',
    MMM_D_Y_HH_MM_A: 'MMM. d, y, HH:mm a',
    mm_ss: 'mm:ss',
    d_M_yy_h_mm_a: 'd/M/yy, h:mm a',
    MMMM_Y: 'MMMM y',
    dd_MM_yyyy_HH_mm: 'dd-MM-yyyy HH:mm',
    MMMM_D_YYYY: 'MMMM D, YYYY'
  };

  export const MONTHS = [
    { value: '0', name: 'January' },
    { value: '1', name: 'February' },
    { value: '2', name: 'March' },
    { value: '3', name: 'April' },
    { value: '4', name: 'May' },
    { value: '5', name: 'June' },
    { value: '6', name: 'July' },
    { value: '7', name: 'August' },
    { value: '8', name: 'September' },
    { value: '9', name: 'October' },
    { value: '10', name: 'November' },
    { value: '11', name: 'December' },
  ];

  export const coverageSection = {
    responsibilityForVehicle : 'Responsibility for Vehicle',
    thirdPartyResponsibility : 'Third Party Responsibility',
    attachmentCoverage : 'Attachment Coverage'
  }

  export const InsurancePaymentMethod = {
    CreditCard : 'CreditCard',
    BankTransfer :'BankTransfer',
  }

  export const InsuranceStatus = {
    Incomplete : 'Incomplete',
    PendingPayment : 'PendingPayment',
    PendingConfirmation : 'PendingConfirmation',
    CancelledByBroker : 'CancelledByBroker',
    Confirmed : 'Confirmed',
  }

  export const InsurancePaymentStatus = {
    Completed: 'Completed',
    Failed: 'Failed',
    Pending: 'Pending',
  }
