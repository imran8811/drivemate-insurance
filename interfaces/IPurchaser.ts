export interface IPurchaser {
    prefix: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    address: string;
    gender: string;
    homeNumber: string;
    DOB: string;
    idCardNo: number;
    province_id: number;
    district_id: number;
    subdistrict_id: number;
    province: string;
    district: string;
    subdistrict: string;
    zipCode: string;
    personalInfo : {
        prefix: string;
        firstName: string;
        lastName: string;
        email: string;
        contactNumber: string;
        address: string;
        gender: string;
        homeNumber: string;
        DOB: string;
        idCardNo: number;
        province_id: number;
        district_id: number;
        subdistrict_id: number;
        province: string;
        district: string;
        subdistrict: string;
        zipCode: string;
    }
}
