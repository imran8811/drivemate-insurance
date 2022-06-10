export interface IShippingInfo {
    isElectronicShipping: boolean;
    shipToInsuredAddress: boolean;
    alternateAddress: string;
    homeNumber: string;
    province_id: number;
    district_id: number;
    subdistrict_id: number;
    province: string;
    district: string;
    subdistrict: string;
    zipCode: string;
    shippingInfo : {
        isElectronicShipping: boolean;
        shipToInsuredAddress: boolean;
        alternateAddress: string;
        homeNumber: string;
        province_id: number;
        district_id: number;
        subdistrict_id: number;
        province: string;
        district: string;
        subdistrict: string;
        zipCode: string;
        address: string;
    }
};