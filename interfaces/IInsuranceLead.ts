import { IInsurancePaymentDetails } from "./IInsurancePaymentDetails";
import { IPurchaser } from "./IPurchaser";
import { IShippingInfo } from "./IShippingInfo";
import { IVehicleInfo } from "./IVehicleInfo";

export interface IInsuranceLead {
    _id: string;
    userID: string;
    status: string;
    insurancePackageDetails?: any;
    purchaserPersonalDetails?: IPurchaser;
    vehicleDetails?: IVehicleInfo;
    shippingDetails?: IShippingInfo;
    job_id?: number;
    insurancePaymentDetails?: IInsurancePaymentDetails;
}