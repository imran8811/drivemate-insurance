export interface IInsurancePaymentDetails {
    totalPackagePriceToPay: number;
    totalPackagePrice: number;
    platformCommissionPct: number;
    platformCommission: number;
    insuranceBrokerEarningPct: number;
    insuranceBrokerEarning: number;
    paymentStatus: string;
    paymentStatusMessage?: string;
  }
