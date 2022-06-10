/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Accessories {
  _id: string
  name: string
  dealerCode: string
  description: string
  category: CodeDisplayName
  partNo: string
  price: number
  supplier: string
  installationMode: CodeDisplayName
  compatibleModels: CodeDisplayName[]
  residualValueAdder: number

  /** Status of each Accessory whether its active or not. */
  isActive: boolean

  /** @format date-time */
  createdAt: string

  /** @format date-time */
  updatedAt: string
}

export interface AccessoryRequest {
  description: string
  name: string
  category: CodeDisplayName
  partNo: string
  price: number
  supplier: string
  installationMode: CodeDisplayName
  compatibleModels: CodeDisplayName[]
  residualValueAdder: number

  /** Status of each Accessory whether its active or not. */
  isActive: boolean
}

export interface AddNewDealerFee {
  chargeCode: string
  chargeDisplayName: string
  state: CodeDisplayName[]
  financialProduct: CodeDisplayName[]
  defaultAmount: number
  isActive: boolean
  isTaxable: boolean
  tagName: string
}

export interface AddNewDealership {
  name: string
  dealerCode: string
  email: string
  address: string
  city: string
  state: CodeDisplayName
  zipCode: string
  contactNo: string
  digitalRetailEnabled: boolean
  digitalRetailWebsite: string
  isActive: boolean
  county: string
}

export interface AddOns {
  item: string
  price: number
  rv: number
}

/**
 * Represents an address (mailing, garaging) of a customer.
 * @example {"city":"LOS ANGELES","state":"CA","streetAddress":"2171 SHERINGHAM LANE","zipCode":"90077"}
 */
export interface Address {
  /** Short code of a state (eg. 'CA') */
  state: string

  /** 5-digit zip code */
  zipCode: string
  city: string
  streetAddress: string

  /** Number of an apartment or suite */
  apartmentOrSuite: string
}

export interface ApplicableFeesSchema {
  chargeCode: string
  chargeDisplayName: string
  amount: number
}

export interface Approvals {
  bank_account: boolean
  four_eyes_for_car: boolean
  four_eyes_for_funds_transfer: boolean
  four_eyes_for_user: boolean
}

export interface AssetPricingAlerts {
  batchSize: number
}

export interface AssetsSortingFactors {
  distance: Distance[]
}

export interface AssetsSortingFactorsWeights {
  review: number
  trip: number
  rating: number
  responseRate: number
  acceptanceRate: number
  gps: number
  instant: number
  calendarUpdate: number
  listingTime: number
  pricing: number
  adjustment: number
  distance: number
}

export interface AuthenticationMechanism {
  isFacebookLoginEnabled: boolean
  isAppleLoginEnabled: boolean
}

export interface BackupCars {
  years_gap_high: number
  years_gap_low: number
  display_count: number
}

export interface BodyVerifyDriversLicenseLicenseVerificationVerifyPost {
  /**
   * Image of the front of the license
   * @format binary
   */
  front: File

  /**
   * Image of the back of the license
   * @format binary
   */
  back: File

  /** Extracted barcode data */
  pdf417: string
}

export interface Booking {
  timeToRespond: number
  hoursCushionBeforePickup: number
  hoursCushionBeforeReturn: number
}

export interface BulkUpdateAccessory {
  bulkUpdateInventory: BulkUpdateParams[]
}

export interface BulkUpdateAccessoryResponse {
  /** A successful message for successful update and error message in case of any error. */
  message: string
}

export interface BulkUpdateParams {
  vin: string
  accessories: VehicleAccessories[]
  publish: boolean
}

/**
 * BusinessParty Type
 */
export enum BusinessPartyType {
  Customer = 'Customer',
  Dealer = 'Dealer',
}

/**
 * A structure for holding a cancellation details of the order.
 */
export interface CancelOrder {
  cancellationReason: string
  orderCancelledBy: string

  /** @format date-time */
  orderCancelledAt: string
  orderCancelledByUsername: string
  orderCancelledByUserType: string
}

export interface Charges {
  _id: string
  chargeCode: string
  chargeDisplayName: string
  isActive: boolean
  tagName: string

  /** @format date-time */
  createdAt: string

  /** @format date-time */
  updatedAt: string
}

export interface CodeDisplayName {
  code: string
  displayName: string
}

export interface Configuration {
  charges: TCharges
  suggested_rate: SuggestedRate
  frontOfficeUrls: FrontOfficeUrls
  backup_cars: BackupCars
  verifications: Verifications
  verificationConfig: VerificationConfig
  verificationDurations: VerificationDurations
  approvals: Approvals
  points_calculation: PointsCalculation
  insurance: Insurance
  units: Units
  driver: Driver
  owner: Owner
  discount: Discount
  booking: Booking
  theme: Theme
  images: Images
  localization: Localization
  assetsSortingFactorsWeights: AssetsSortingFactorsWeights
  mobileApplications: MobileApplications
  backOfficeUrl: string
  emailVerifyLink: string
  locales: Locales
  domain: string
  rental_request_priority_duration: number
  assetsSortingFactors: AssetsSortingFactors
  payments: Payments
  deliveryLocationRadius: number
  priceSliderBoundaryPercentage: number
  authenticationMechanism: AuthenticationMechanism
  assetPricingAlerts: AssetPricingAlerts
  defaultDealerConfig: DefaultDealerConfig
}

export interface ContractDocument {
  _id: string
  name: string
  isSignedByCustomer: boolean
  isSignedByDealer: boolean
  displayName: string
  path?: string
  updatedAt: string
}

export interface CreatePaymentAccount {
  dealerCode: string
  email: string
  debitCardMaxAmount?: number
  creditCardMaxAmount?: number
  achMaxAmount?: number
}

export interface CustomerDetails {
  _id: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string

  /** @format date-time */
  createdAt: string

  /** @format date-time */
  updatedAt: string

  /** Represents an address (mailing, garaging) of a customer. */
  mailingAddress: Address

  /** Represents an address (mailing, garaging) of a customer. */
  parkingAddress: Address
  drivingLicenseDetails: DrivingLicenseDetails
}

export interface DateTimeFormat {
  time_zone: string
  long_date_format: string
  short_date_format: string
  time_format: string
}

export interface DealerAccounts {
  _id: string
  isNewUser: boolean
  dealerCode: string
  firstName: string
  lastName: string
  email: string
  jobTitle: string
  phoneNumber: string
  isActive: boolean

  /** @format date-time */
  updatedAt: string
  roleCode: string
  roleDisplayName: string
}

export interface DealerDocsDownloadAudit {
  _orderId: string
  _documentId: string
}

/**
 * Response when dealer downloads original docs.
 */
export interface DealerDocsDownloadAuditResult {
  success: boolean
}

export interface DealerDomainsRequest {
  email: string
}

export interface DealerDomainsResponse {
  digitalRetailWebsite: string
  digitalRetailAdminWebsite: string
}

export interface DealerFeesConfig {
  _id: string
  chargeCode: string
  chargeDisplayName: string
  state: CodeDisplayName[]
  financialProduct: CodeDisplayName[]
  defaultAmount: number
  isActive: boolean
  isTaxable: boolean
  tagName: string

  /** @format date-time */
  updatedAt?: string

  /** @format date-time */
  createdAt?: string
}

export interface DealerFnIProduct {
  penDealerId: number
  productId: number
  providerProductCode: string
  ContractPrefixOverride: string
  productName: string
  productType: string
  providerDealerCodeFormat: string
  providerDealerCodeName: string
  providerId: number
  ratingMethods: RatingMethod[]
  regExpValidator: string
  validatorPrompt: string
  productDescription: string
  providerName: string
  isActive: boolean
  dealerCode: string
  providerDealerCode: string
  ratingProperties: string[]
  markup: number
}

export interface DealerForgotPasswordDto {
  email: string
}

export interface DealerForgotPasswordResponse {
  email: string
  userID: string
}

export interface DealerSignUpDto {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  dealerCode: string
  jobTitle: string
  roleCode: string
  roleDisplayName: string
  isActive: boolean
}

export interface DealerSignUpResponse {
  accessToken: string
  userId: string
  email: string
}

export interface DealershipAllConfig {
  dealerCode: string

  /** An object representing general configuration of a single dealership. */
  generalConfiguration: DealershipGeneralConfig

  /** An object representing payment configuration of a single dealership. */
  paymentConfiguration: DealershipPaymentConfig
  dealerFees: DealerFeesConfig[]

  /** An object representing trade-in configuration of a single dealership. */
  tradeinConfiguration: DealershipTradeinConfig

  /** @format date-time */
  createAt: string

  /** @format date-time */
  updatedAt: string
}

/**
 * An object representing general configuration of a single dealership.
 */
export interface DealershipGeneralConfig {
  availableProducts: CodeDisplayName[]
  defaultProduct: CodeDisplayName
  assetsAutoPublished: boolean
  defaultMileageOnVDP: number
  defaultLeaseTermsOnVDP: number
  defaultFinanceTermsOnVDP: number
  leaseDownPaymentLowerLimit: number
  financeDownPaymentLowerLimit: number
  minimumFinancedAmount: number
  defaultDownPayment: number

  /** An enumeration. */
  scheduledOptions: ScheduledOptions
  dealershipAddress: string
  state: CodeDisplayName
  city: string
  zipCode: string
  contactNumber: string
  customerSupportNumber: string

  /** IANA timezone name, eg. 'America/New_York' */
  dealerTimezone: string
  fax: number
  contactName: string
  website: string
  observesDayLightSaving: boolean
  penDealerId: number
  county: string
}

/**
 * An object representing payment configuration of a single dealership.
 */
export interface DealershipPaymentConfig {
  stripePublicKey: string
  stripePrivateKey: string
}

/**
 * An object representing trade-in configuration of a single dealership.
 */
export interface DealershipTradeinConfig {
  provider: string
  percentage: number
}

export interface Dealerships {
  _id: string
  name: string
  dealerCode: string
  email?: string
  address: string
  address2?: string
  city: string
  state: CodeDisplayName
  zipCode: string
  digitalRetailEnabled: boolean
  digitalRetailWebsite: string
  digitalRetailAdminWebsite: string
  contactNo: string
  isActive: boolean

  /** @format date-time */
  createdAt: string

  /** @format date-time */
  updatedAt: string
  pickupDateTimeSlots: VehicleHandOverObject[]
  deliveryDateTimeSlots: VehicleHandOverObject[]
}

export interface DefaultDealerConfig {
  defaultDownPaymentPercentage: number
  defaultMinimumFinancedAmount: number
  defaultVehicleHandOverMode: string
}

export interface DeliveryAddress {
  address: string
  address2?: string
  city: string
  state: string
  zipCode: string
}

export interface Discount {
  level: string
}

export interface Distance {
  _id: string
  rangeStart: number
  rangeEnd: number
  indexValue: number
}

export interface Driver {
  hours_per_day: number
  rate_per_day: number
  overtime_rate_per_hour: number
  information_required: boolean
  kyc_required: boolean
}

/**
 * @example {"firstName":"tamoor","lastName":"afzal","licenseNo":"D87989515","issuingState":"CA","expiryDate":"2025-07-02T00:00:00.000Z","dateOfBirth":"1990-07-02T00:00:00.000Z","updatedAt":"2020-10-26T13:54:01.358Z","createdAt":"2020-10-26T13:54:01.358Z"}
 */
export interface DrivingLicenseDetails {
  firstName: string
  lastName: string
  licenseNo: string
  issuingState: string
  licenseDocs: LicenseDocuments
  licenseDocsCropped: LicenseDocuments

  /** @format date-time */
  expiryDate: string

  /** @format date-time */
  updatedAt: string

  /** @format date-time */
  createdAt: string
}

export interface Email {
  forgotPasswordTokenExpiry: number
  tokenVerifyLink: string
}

/**
 * Used when a transition does not require any input.
 */
export type EmptyTransition = object

export interface EnableDisableDealership {
  isActive: boolean
}

/**
 * A structure for holding a single fee on the order.
 */
export interface Fee {
  /** This is used in backend to track the fee */
  chargeCode: string

  /** This contains human-readable version of the fee. It must be sent in the save request! */
  chargeDisplayName: string

  /** Dollar amount of the fee */
  amount: number

  /** This contains fee taxable */
  isTaxable: boolean

  /** This contains vendor name of the fee. */
  vendorName?: string

  /** Tag Name of each fee. */
  tagName: string
}

/**
 * A structure used for saving order fees.
 **Note that it requires chargeDisplayName to be saved as well.**
 */
export interface FeeInput {
  /** This is used in backend to track the fee */
  chargeCode: string

  /** This contains human-readable version of the fee. It must be sent in the save request! */
  chargeDisplayName: string

  /** Dollar amount of the fee */
  amount: number

  /** This contains fee taxable */
  isTaxable: boolean

  /** This contains vendor name of the fee. */
  vendorName?: string

  /** Tag Name of each fee. */
  tagName: string
}

export interface Fees {
  item: string
  price: number
  isTaxAble: boolean
}

export interface FnI {
  item: string
  price: number
}

export interface FnIProductImage {
  name: string
}

export interface FnIProducts {
  formId: number
  penProductId: number
  rateId: number
  sessionId: string
  retailPrice: number
  name: string
  mileage: number
  term: number
  deductibleAmount: number
  coverageName: string
  description: string
  dealerCost: number
  deductibleType: string
  deductibleDescription: string
  fiMarkup: number
  maxRetailPrice: number
  minRetailPrice: number
  reducedAmount: number
  contractNumber: string
  dealIdentifier: string
  contractDocument: ContractDocument
  isDealPosted: boolean
}

export interface FormFieldsRequest {
  label: string
  type: string
  values: string[]
  isActive: boolean
}

export interface FormRequest {
  formTypeCode: string
  formTypeDisplayName: string
  isActive: boolean
  formFields: FormFieldsRequest[]
}

export interface FormResponse {
  formTypeCode: string
  formTypeDisplayName: string
  isActive: boolean
  formFields: FormFieldsRequest[]
}

export interface FrontOfficeUrls {
  bookingDetails: string
  orderDetails: string
  uploadPayslip: string
  assetDetails: string
  reviewsAboutMe: string
  reviewsByMe: string
  bankAccountDetails: string
  makePayment: string
  downloadPDF: string
}

export interface GetPricingDetails {
  dealType: number
  dealerCode: string
  odometer: number
  annualMileage: number
  isNew: boolean
  VIN: string
  totalScore: number
  sellingPrice: number
  term: number
  downPayment: number
  fees: Fees[]
  addOns: AddOns[]
  FnIProducts?: FnI[]

  /** Represents an address (mailing, garaging) of a customer. */
  customerAddress: Address
  residualValue?: number
  APR?: number
  rebateAndPromotions?: number
  taxes?: PricingTaxRates
  tradeInBalance?: number
  updatedTaxes?: UpdateTaxesParams
}

export interface GetPricingDetailsResponse {
  /** @format date-time */
  dueDate: string
  grossCapitalizedCost: number
  capitalizedCostReduction: number
  adjustedCapitalizedCost: number
  monthlyLeaseCharge: number
  monthlyDeprecation: number
  baseMonthlyPayment: number
  monthlySalesUseTax: number
  monthlyPayment: number
  totalOfMonthlyPayments: number
  upfrontTaxesAndFees: number
  tradeInBalance: number
  dueAtSigning: number
  rebateAndPromotions: number
  totalScore: number
  residualValue: number
  term: number
  downPayment: number
  programId: string
  APR: number
  totalSellingPrice: number
  taxOnCapitalizedCostReduction: number
  taxOnDownPayment: number
  taxOnDiscount: number
  taxOnTradeIn: number
  totalSalesUseTax: number
  taxOnDealerFee: number
  taxOnNegativeTradeIn?: number
  taxOnFnIProducts?: number
  taxOnSellingPrice?: number
  taxOnPositiveTradeIn?: number
  salesTaxOnSellingPriceLessCostReduction: number
  totalTaxes: number
  assetResidualValue: number
  addOnRv: number
  taxes: PricingTaxRates
  amountFinanced: number
  taxTotal: number
}

export interface GetUploadUrls {
  sasToken: string
  containerName: string
  filename: string
  storageBlobName: string
  blobName: string
  blobPath: string
  url: string
}

export interface GetUploadUrlsPayload {
  filenames: string[]
  namingfields?: string[]
  imageType: string
}

export interface HTTPValidationError {
  detail?: ValidationError[]
}

/**
 * An enumeration.
 */
export enum HandOverMode {
  Pickup = 'Pickup',
  Delivery = 'Delivery',
}

export interface IDealerSocialLinks {
  facebook: string
  google: string
  instagram: string
  linkedin: string
  twitter: string
  youtube: string
}

/**
 * A result of all insurance details against any order
 */
export interface IInsurance {
  providerName: string
  contactNumber: string
  policyNumber?: string

  /** @format date-time */
  expiryDate?: string
  address?: string
  city?: string
  state?: CodeDisplayName
  zipCode?: string
  document?: string
  documentURL?: string
}

export interface IMenuLinks {
  name: string
  webUrl: string

  /** An enumeration. */
  position: MenuPosition
  order: number
}

export interface ISocialLinkObj {
  /** An enumeration. */
  name: SocialMedia
  webUrl: string
  icon: string
  order: number
}

export interface Images {
  max_count: number
  max_size: number
}

export interface Insurance {
  is_required: boolean
  company_api_url: string
  company_api_key: string
}

export interface InventoryAccessories {
  makeModel: string
  vin: string
  accessories: VehicleAccessories[]
}

export interface InventoryManagement {
  _id: string
  vin: string
  make: string
  model: string
  transmissionType: string
  internetPrice: number
  mileage: number
  msrp: number
  engineDescription: string
  photoUrls: string[]
  dailyInventoryUpdate: boolean
  makeModel: string
  publish: boolean
  status: string
  accessories: VehicleAccessories[]

  /** @format date-time */
  loadedOn: string

  /** @format date-time */
  updatedAt: string
}

export interface InventoryManagementUpdateDailyParams {
  vehicleUpdateParams: UpdateDailyParams[]
}

export interface InventoryManagementUpdateParams {
  vehicleUpdateParams: UpdateParams[]
}

export interface LatestOrderState {
  _id: string
  state: string
}

export interface LicenseDocuments {
  front: string
  back: string
  licenseDocsFrontUrl: string
  licenseDocsBackUrl: string
}

/**
* Status of a license verification.

There are four statuses:

* `not-started` - verification was not attempted yet, go ahead
* `in-progress` - in this state you can show "come back later" message. Manual verification is in progress.
* `verified` - verification completed
* `failed` - verification has failed, you can try again

## Failed Verification

When verification moves to a `failed` status there are two additional fields available:

* `retryAt` - the next date and time when you can retry verification
* `reasons` - an array of reason codes for why the verification failed

`retryAt` can be null, which means you can try to verify again right away. Otherwise
you need to show a message for the user to come back in X days.

`reasons` are documented at https://developer.us.mitekcloud.com/.
*/
export interface LicenseVerificationStatus {
  status: string | string | string | string

  /** @format date-time */
  retryAt?: string
  reasons?: string[]
}

export interface Locales {
  _id: string
  locale: string
  name: string
}

export interface Localization {
  dateTimeFormat: DateTimeFormat
  primaryLanguage: string
  secondaryLanguages: string[]
  defaultCountry: string
  defaultCurrency: string
  defaultDecimalPlaceTypeCode: string
}

export interface Lookups {
  code: string
  name: string
  description: string
  displayName: string
  isActive: boolean
  additionalInfo: object

  /** @format date-time */
  createdOn: string

  /** @format date-time */
  updatedOn: string
}

/**
 * An enumeration.
 */
export enum MenuPosition {
  Header = 'Header',
  Footer = 'Footer',
}

export interface Mobile {
  maxIncorrectPinAttempts: number
  maxResendPinAttempts: number
  pinExpiryInMinutes: number
  haltVerificationInMintues: number
  consecutiveResendPinsLimitInMinutes: number
}

export interface MobileApplications {
  android: MobileOS
  ios: MobileOS
}

export interface MobileOS {
  version: string
  isForceFulUpdate: boolean
  isUnderMaintenance: boolean
}

export interface OdoStatementDto {
  OdoReflectsVehicleMileage: boolean
  OdoReflectsExcMechLimits: boolean
  OdoNotActualVehicleMileage: boolean
}

export interface Order {
  vehicle: VehicleDetails

  /**
   * Those are details of a single order. It'll be returned
   * in multiple places in the app.
   */
  order: OrderDetails
  customer: CustomerDetails
}

export interface OrderAccessories {
  name: string
  price: number
  residualValueAdder: number
  installationMode: CodeDisplayName
  description: string
  category: CodeDisplayName
  partNo: string
  supplier: string
}

/**
* Those are details of a single order. It'll be returned
in multiple places in the app.
*/
export interface OrderDetails {
  _id: string

  /** @format date-time */
  createdAt: string

  /** @format date-time */
  updatedAt: string

  /**
   * Order is managed by a state machine. This enum contains all possible states
   * in which order can be.
   *
   * Please refer to the transition diagram to understand it better.
   */
  state: OrderState

  /** VIN number of the car in order */
  vin: string

  /** An enumeration. */
  productCode: ProductCode

  /** Human-readable name of the product like Finance or Lease */
  productDisplayName: string
  _customerId: string
  additionalFee: number
  mileage: number
  additionalMileageAmount: number
  fees: Fee[]
  taxes: Tax[]
  contractDocs?: ContractDocument[]
  watermarkedContractDocs?: WatermarkedContractDocument[]

  /** An enumeration. */
  vehicleHandOverMode: HandOverMode
  proposedDateTimeSlots: string[]

  /** @format date-time */
  selectedDateTimeSlot?: string

  /** @format date-time */
  financedDate: string

  /** @format date-time */
  orderPlaceAt: string
  pricing: SaveOrderPricing
  deliveryAddress: DeliveryAddress
  isDeliveryAddressSameAsParkingAddress: boolean
  odometer: number
  dealerCode: string
  IsNew: boolean
  dealType: number
  dueAtSigning: number
  orderId: number
  accessories: OrderAccessories[]
  paymentStatus: string

  /** A structure for holding a cancellation details of the order. */
  orderCancellationDetails?: CancelOrder
  tradeInVehicle: OrderTradeIn
  tradeInRemovalDetails: RemoveOrderTradeIn
  vehiclePrimaryUse: string
  fniProducts: FnIProducts[]
  fniProductsSum: number
  individualizedAgreement?: string
  referenceNumber: string
  odoStatement: OdoStatementDto
  updatedTaxesWithTradeIn?: UpdateTaxesParams
  updatedTaxesWithoutTradeIn?: UpdateTaxesParams
}

/**
* Order is managed by a state machine. This enum contains all possible states
in which order can be.

Please refer to the transition diagram to understand it better.
*/
export enum OrderState {
  Draft = 'Draft',
  Inquiry = 'Inquiry',
  NotAvailable = 'NotAvailable',
  Available = 'Available',
  Confirmed = 'Confirmed',
  WaitingForCreditDecision = 'WaitingForCreditDecision',
  Rejected = 'Rejected',
  Approved = 'Approved',
  CreditError = 'CreditError',
  CreditStipulated = 'CreditStipulated',
  WaitingForContractDecision = 'WaitingForContractDecision',
  ContractRejected = 'ContractRejected',
  ContractApproved = 'ContractApproved',
  DocumentsSigned = 'DocumentsSigned',
  PaymentFailed = 'PaymentFailed',
  PaymentPerformed = 'PaymentPerformed',
  VehicleHandOverModeSelected = 'VehicleHandOverModeSelected',
  NotAvailableAfterPayment = 'NotAvailableAfterPayment',
  TimeSlotsProposed = 'TimeSlotsProposed',
  AppointmentScheduled = 'AppointmentScheduled',
  Delivered = 'Delivered',
  Complete = 'Complete',
  Cancelled = 'Cancelled',
  RescheduleTimeSlotsByCustomer = 'RescheduleTimeSlotsByCustomer',
  RescheduleTimeSlotsByDealer = 'RescheduleTimeSlotsByDealer',
}

export interface OrderTradeIn {
  year: number
  makeId: number
  make: string
  modelId: number
  model: string
  trimId: number
  trim: string
  odometer: number
  vin: string
  zipCode: string
  KBBValue: number
  offer: number
  comment?: string
  previousOffer?: number
  isTradeInUpdated?: boolean
  condition: string
  tradeInDocs: OrderTradeInDocs[]
  isVehicleDriveable: boolean
  tradeInVehicleOptions: TradeInVehicleOptions[]
  tradeInLeaseBalance: TradeInLeaseBalance
  tradeInAssetCondition: TradeInAssetCondition[]
}

export interface OrderTradeInDocs {
  name: string
  path: string
}

export interface Owner {
  cancellations_allowed_per_month: number
  block_duration: number
}

/**
 * @example {"code":"Technology Package","options":["Sirius XM","Bluetooth"]}
 */
export interface Package {
  code: string
  options: string[]
}

/**
 * Wraps an object in a response suitable for pagination.
 */
export interface PaginatedAccessories {
  pageData: Accessories[]
  page: number
  total: number
  limit: number
  pages: number
}

/**
 * Wraps an object in a response suitable for pagination.
 */
export interface PaginatedDealerAccounts {
  pageData: DealerAccounts[]
  page: number
  total: number
  limit: number
  pages: number
}

/**
 * Wraps an object in a response suitable for pagination.
 */
export interface PaginatedDealerFeesConfig {
  pageData: DealerFeesConfig[]
  page: number
  total: number
  limit: number
  pages: number
}

/**
 * Wraps an object in a response suitable for pagination.
 */
export interface PaginatedDealerFnIProduct {
  pageData: DealerFnIProduct[]
  page: number
  total: number
  limit: number
  pages: number
}

/**
 * Wraps an object in a response suitable for pagination.
 */
export interface PaginatedDealerships {
  pageData: Dealerships[]
  page: number
  total: number
  limit: number
  pages: number
}

/**
 * Wraps an object in a response suitable for pagination.
 */
export interface PaginatedInventoryManagement {
  pageData: InventoryManagement[]
  page: number
  total: number
  limit: number
  pages: number
}

/**
 * An enumeration.
 */
export enum PaymentGateway {
  Omise = 'Omise',
  Stripe = 'Stripe',
}

export interface Payments {
  rollbackDepositAfterBookCompletionInMinutes: number
  is3dSecureEnabled: boolean
}

export interface PaymentsAccount {
  paymentGatewayAccountId: string
  dealerCode: string
  type: string
  email: string
  status: string
  disabledReason: string

  /** An enumeration. */
  paymentGateway: PaymentGateway
  debitCardMaxAmount?: number
  creditCardMaxAmount?: number
  achMaxAmount?: number
}

export interface PenMarketingMaterial {
  name: string
  url: string
}

/**
 * Details of a products from PEN SOAP call.
 */
export interface PenProduct {
  name: string
  productId: number
  productType: string
  providerDealerCodeFormat: string
  providerDealerCodeName: string
  providerId: number
  ratingMethods: RatingMethod[]
  ratingProperties: string[]
  regExpValidator: string
  validatorPrompt: string
}

/**
 * Details of a providers from PEN SOAP call.
 */
export interface PenProvider {
  name: string
  providerId: number
}

export interface PointsCalculation {
  batch_size: number
  division_factor: number
}

export interface PricingTaxRates {
  capitalCostReductionTax: number
  rebateTax: number
  salesTax: number
  useTax: number
  tradeInTax: number
}

/**
 * An enumeration.
 */
export enum ProductCode {
  Lease = 'Lease',
  Finance = 'Finance',
  Cash = 'Cash',
  EasyRide = 'EasyRide',
}

export interface RatingMethod {
  ratingMethod: string
}

export interface ReferenceData {
  _id: string
  isActive: boolean

  /** Types of the Reference Data. */
  typeCode: ReferenceDataTypes
  typeName: string
  typeDisplayName: string
  typeDescription: string

  /** @format date-time */
  createdAt: string

  /** @format date-time */
  updatedAt: string
  lookups: Lookups[]
}

/**
 * Types of the Reference Data.
 */
export enum ReferenceDataTypes {
  Country = 'Country',
  PreferredMethodOfContact = 'PreferredMethodOfContact',
  DecimalPlace = 'DecimalPlace',
  Unit = 'Unit',
  ResidenceType = 'ResidenceType',
  Salutation = 'Salutation',
  EmploymentType = 'EmploymentType',
  TimeZone = 'TimeZone',
  LongDateFormat = 'LongDateFormat',
  ShortDateFormat = 'ShortDateFormat',
  DealerRole = 'DealerRole',
  VehicleHandOverMode = 'VehicleHandOverMode',
  DefaultFinanceTerms = 'DefaultFinanceTerms',
  DefaultLeaseTerms = 'DefaultLeaseTerms',
  DefaultMileage = 'DefaultMileage',
  FinancialProduct = 'FinancialProduct',
  USAState = 'USAState',
  Category = 'Category',
  CompatibleModels = 'CompatibleModels',
  InstallationMode = 'InstallationMode',
  FniCustomerProductType = 'FniCustomerProductType',
}

export interface RemoveOrderTradeIn {
  reason: string
  removedByUserId: string
  removedByUserName: string

  /** @format date-time */
  removedAt: string
}

export interface SaveOrderPricing {
  term: number
  downPayment: number
  totalScore: number
  sellingPrice: number
  residualValue: number
  APR: number
  rebateAndPromotions: number
  taxes: SaveOrderPricingTax
  tradeInBalance?: number
}

export interface SaveOrderPricingResponse {
  sellingPrice: number

  /** @format date-time */
  dueDate: string
  grossCapitalizedCost: number
  capitalizedCostReduction: number
  adjustedCapitalizedCost: number
  monthlyLeaseCharge: number
  monthlyDeprecation: number
  baseMonthlyPayment: number
  monthlySalesUseTax: number
  monthlyPayment: number
  totalOfMonthlyPayments: number
  upfrontTaxesAndFees: number
  tradeInBalance: number
  dueAtSigning: number
  rebateAndPromotions: number
  totalScore: number
  residualValue: number
  term: number
  downPayment: number
  programId: number
  APR: number
  totalSellingPrice: number
  taxOnCapitalizedCostReduction: number
  taxOnDownPayment: number
  taxOnDiscount: number
  taxOnPositiveTradeIn: number
  taxOnTradeIn: number
  totalSalesUseTax: number
  taxOnDealerFee: number
  salesTaxOnSellingPriceLessCostReduction: number
  totalTaxes: number
  assetResidualValue: number
  addOnRv: number
  taxes: SaveOrderPricingResponseTaxSet
}

export interface SaveOrderPricingResponseTaxData {
  rate: number
  name: string
  additionalInfo: string
}

export interface SaveOrderPricingResponseTaxSet {
  salesTax: SaveOrderPricingResponseTaxData
  costReductionTax: SaveOrderPricingResponseTaxData
  rebateTax: SaveOrderPricingResponseTaxData
  tradeInTax: SaveOrderPricingResponseTaxData
}

export interface SaveOrderPricingTax {
  capitalCostReductionTax: number
  rebateTax: number
  salesTax: number
  useTax: number
  tradeInTax: number
}

export interface SaveOrderRequest {
  vin: string
  productCode: string
  productDisplayName: string
  mileage: number
  odometer: number
  dealerCode: string
  IsNew: boolean
  pricing: SaveOrderPricing
}

export interface SaveOrderResponse {
  additionalFee: number
  proposedDateTimeSlots: string[]
  _id: string
  vin: string
  productCode: string
  productDisplayName: string
  mileage: number
  odometer: number
  dealerCode: string
  IsNew: boolean
  dealType: number
  pricing: SaveOrderPricingResponse
  _customerId: string
  state: string
  fees: ApplicableFeesSchema[]

  /** @format date-time */
  createdAt: string

  /** @format date-time */
  updatedAt: string
}

export interface SaveOrderTradeInRequest {
  vehicleId: string
  year: number
  makeId: string
  make: string
  modelId: string
  model: string
  trimId: string
  trim: string
  odometer: number
  vin: string
  zipCode: string
  condition: string
  tradeInDocs: OrderTradeInDocs[]
  isVehicleDriveable: boolean
  tradeInVehicleOptions: TradeInVehicleOptions[]
}

/**
* Represents a schedule information received from backend for
given order.
*/
export interface Schedule {
  slots: TimeSlot[]

  /**
   * First slot in a day (format: hh:mm)
   * @pattern ^\d{2}:\d{2}$
   */
  firstSlot: string

  /**
   * Last slot in a day (format: hh:mm)
   * @pattern ^\d{2}:\d{2}$
   */
  lastSlot: string
  intervalInMinutes: number
}

/**
 * An enumeration.
 */
export enum ScheduledOptions {
  Pickup = 'Pickup',
  Delivery = 'Delivery',
  PickupDelivery = 'Pickup & Delivery',
}

export interface Secrets {
  APPINSIGHTS_INSTRUMENTATIONKEY?: string
  STORAGE_ACCOUNT_URL?: string
}

/**
 * Details of a set dealer product PEN SOAP call request.
 */
export interface SetDealerProductRequest {
  penDealerId: number
  productId: number
  providerProductCode?: string
  ContractPrefixOverride?: string
  productName: string
  productType: string
  providerDealerCodeFormat: string
  providerDealerCodeName: string
  providerId: number
  ratingMethods: RatingMethod[]
  regExpValidator: string
  validatorPrompt: string
  dealerCode: string
  productNameForCustomer: string
  productDescription: string
  providerName: string
  isActive: boolean
  markup: number
  action: string
  marketing?: PenMarketingMaterial[]
  images: FnIProductImage[]
  providerDealerCode?: string
  dealerFniProductId?: string
  customerProductType: CodeDisplayName
}

/**
 * Details of a set dealer PEN SOAP call request.
 */
export interface SetDealerRequest {
  action: string
  penDealerId: number
  dealershipName: string
  address1: string
  address2: string
  city: string
  state: string
  zipCode: string
  phone: string
  fax: string
  email: string
  contactName: string
  website: string
  timeZone: string
  observesDayLightSaving: boolean
  isTestDealer: boolean
  dealerCode: string
}

/**
* Details of a set dealer PEN SOAP call response. It'll be returned
in register/update/un-register dealer.
*/
export interface SetDealerResponse {
  penDealerId: number
}

export interface SignContractRequest {
  _orderId: string
  _documentId: string

  /** BusinessParty Type */
  userType: BusinessPartyType
}

export interface SignatureRequest {
  /** Signature Type */
  type: SignatureType
  imageName: string

  /** BusinessParty Type */
  userType: BusinessPartyType
}

/**
 * Signature Type
 */
export enum SignatureType {
  Initial = 'Initial',
  FullName = 'FullName',
}

/**
 * An object representing user signatures.
 */
export interface Signatures {
  initial?: string
  fullName?: string
  initialUrl?: string
  fullNameUrl?: string
}

/**
 * An object representing general configuration of a single dealership.
 */
export interface SignaturesConfig {
  /** An object representing user signatures. */
  signatures: Signatures
}

/**
 * An enumeration.
 */
export enum SocialMedia {
  Facebook = 'facebook',
  Google = 'google',
  Instagram = 'instagram',
  Linkedin = 'linkedin',
  Twitter = 'twitter',
  Youtube = 'youtube',
}

export interface SuggestedRate {
  allowed_gap: boolean
}

export interface TCharges {
  over_travelled_charges: number
}

export interface Tax {
  taxCode: string
  taxDisplayName: string
  amount: number
}

export interface TenantConfig {
  _id: string
  configuration: Configuration
  isActive: boolean
  name: string
  tenantId: string
  privateStorageContainerName: string
  publicStorageContainerName: string

  /** @format date-time */
  createdAt: string

  /** @format date-time */
  updatedAt: string
}

export interface Theme {
  banners: string[]
  color: string
  logo: string
}

export interface TimeSlot {
  /** @format date-time */
  timeSlot: string

  /**
   * State of a slot in schedule.
   *
   * At some point dealer will pick several time slots when a customer
   * can pick up their car (or when it  can be delivered).
   *
   * Those slots will be displayed in three states:
   *
   * 1. `free`: slot is completely free
   * 2. `unconfirmed`: given slot was proposed to some customers, but nothing was scheduled
   *   at that slot yet.
   * 3. `taken`: there is at least one pickup/delivery scheduled in this time slot.
   */
  state: TimeSlotState
}

/**
* State of a slot in schedule.

At some point dealer will pick several time slots when a customer
can pick up their car (or when it  can be delivered).

Those slots will be displayed in three states:

1. `free`: slot is completely free
2. `unconfirmed`: given slot was proposed to some customers, but nothing was scheduled
  at that slot yet.
3. `taken`: there is at least one pickup/delivery scheduled in this time slot.
*/
export enum TimeSlotState {
  Taken = 'Taken',
  UnConfirmed = 'UnConfirmed',
  Free = 'Free',
}

export interface TimeSlotsProposedInput {
  proposedDateTimeSlots: string[]
}

export interface TradeInAssetCondition {
  label: string
  selectedValue: string
}

export interface TradeInAssetConditionForm {
  formFieldsValues: TradeInAssetCondition[]
}

export interface TradeInLeaseBalance {
  contractNo: string
  lenderName: string
  lenderPhysicalAddress: string
  lenderPhoneNo: string
  leaseBalance: number
  previousLeaseBalance?: number
}

export interface TradeInMake {
  makeId: string
  makeName: string
}

export interface TradeInModel {
  modelId: string
  modelName: string
  modelMarketName: string
  makeId: string
  makeName: string
}

export interface TradeInOptionsFilter {
  vehicleId: string
  year: string
  makeId: string
  modelId: string
  trimId: string
}

export interface TradeInTrim {
  trimId: string
  trimName: string
  vehicleClass: string
  modelYearId: string
  yearId: string
  makeId: string
  makeName: string
  modelId: string
  modelName: string
  modelPlusTrimName: string
  sortOrder: number
}

export interface TradeInValuesFilter {
  yearId: string
  makeId: string
  modelId: string
}

export interface TradeInVehicleOptions {
  vehicleOptionId: string
  optionType: string
  optionName: string
  categoryGroup: string
  categoryName: string
  sortOrder: number
  isConsumer: boolean
  isTypical: boolean
  isConfigurable: boolean
  hasRelationships: boolean
}

export interface TradeInYear {
  yearId: string
}

/**
 * A result of all transition calls.
 */
export interface TransitionResult {
  success: boolean
}

export interface Units {
  distance: string
  fuel: string
}

export interface UpdateDailyParams {
  vin: string
  dailyInventoryUpdate: boolean
}

export interface UpdateOrderRequest {
  mileage: number
  odometer: number
}

export interface UpdateOrderTradeInRequest {
  comment?: string
  tradeInBalance: number
  leaseBalance?: number
}

export interface UpdateParams {
  vin: string
  publish: boolean
}

export interface UpdatePriceParams {
  vin: string
  internetPrice: number
}

export interface UpdateTaxesParams {
  taxOnSellingPrice?: number
  taxOnDealerFee?: number
  taxOnFnIProducts?: number
  taxOnNegativeTradeIn?: number
  taxOnCapitalizedCostReduction?: number
}

export interface VINDecodedVehicle {
  vehicleId: string
  makeId: string
  modelId: string
  trimId: string
  year: number
  make: string
  model: string
  trim: string
}

export interface ValidationError {
  loc: string[]
  msg: string
  type: string
}

export interface VehicleAccessories {
  _accessoryId: string
  description: string
  name: string
  category: CodeDisplayName
  price: number
  supplier: string
  installationMode: CodeDisplayName
  residualValueAdder: number
}

export interface VehicleDetails {
  _id: string
  stockNumber: string
  optionalDescription: string[]
  vin: string
  year: number
  make: string
  model: string
  makeModel: string
  bodyStyle: string
  trimDescription?: string
  dealerCode: string
  transmissionType: string
  internetPrice: number
  mileage: number
  msrp: number
  doingBusinessAs: string
  addressTitle?: string
  address: string
  city: string
  state: string
  zip: number
  phoneNumber: number
  fax: number
  email: string
  contactName: string
  dealerURL: string
  price2: number
  exteriorColorDescription: string
  interiorColorDescription: string
  vehicleComments: string
  type: number
  bodyType: string
  transmissionSpeed?: number
  transmissionDescription: string
  engineCylinders: number
  doors: number
  engineDescription: string
  vehicleClass?: string
  enginePower: number
  engineConfiguration: string
  engineDisplacement: number
  engineInduction: string
  fuelType: string
  warranty: string

  /** @format date-time */
  lastModified: string
  exteriorColorManufacturerCode: string
  interiorColorManufacturerCode: string
  packagesAndOptionDescription: Package[]
  stockPhotos: string[]
  photoUrls: string[]
  vehicleURL: string[]
  isDeleted: boolean
  isUpdated: boolean
  containerFileName: string
  publish: boolean
  status: string

  /** @format date-time */
  loadedOn: string

  /** @format date-time */
  createdAt: string

  /** @format date-time */
  updatedAt: string
  generalConfigurations: object
  nonPackageOptionCodes?: string[]
  nonPackageOptionDescriptions?: string[]
  vehicleDisplayName?: string
  driveTrain?: string
  commentsFromMini?: string
}

export interface VerificationConfig {
  mobile: Mobile
  email: Email
}

export interface VerificationDurations {
  emailTokenValidity: number
  phoneNumberTokenValidity: number
}

export interface Verifications {
  email: boolean
  mobile: boolean
}

export interface WatermarkedContractDocument {
  _id: string
  name: string
  path?: string
}

export interface VehicleHandOverObject {
  _orderIds: string[]
  state: string

  /** @format date-time */
  timeSlot: string
}

export interface IndividualizedAgreement {
  _id: string
  agreement: string
  isDefault: boolean
}
