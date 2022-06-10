export interface IVehicleInfo {
    brand_id: number;
    brand_name: string;
    model_id: number;
    model_name: string;
    year: number;
    _assetId: string;
    registrationNo: string;
    registrationProvince: string;
    registrationProvince_id: number;
    bodyNo: string;
    engineNo: string;
    coverageStartDate: string;
    coverageEndDate: string;
    registrationDate: string;
    vehicleInfo : {
        brand_id: number;
        brand_name: string;
        model_id: number;
        model_name: string;
        year: number;
        _assetId: string;
        registrationNo: string;
        registrationProvince: string;
        registrationProvince_id: number;
        bodyNo: string;
        engineNo: string;
        coverageStartDate: string;
        coverageEndDate: string;
        registrationDate: string;
    }
}