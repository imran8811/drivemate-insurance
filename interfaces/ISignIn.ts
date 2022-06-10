export interface IUserData {
    email: string;
    firstName: string;
    joiningDate: string;
    lastName: string;
    phoneNumber: string;
    profilePicture: string;
    type: string;
    userID: string;
    ownerTypeCode: string;
    ownerTypeDisplayName: string;
    companyName: string;
    isGuestUser: boolean;
    firstTimeUser: boolean;
    gender: string;
    dateOfBirth: string;
  }
  
  export class UserData implements IUserData {
    email = '';
    firstName = '';
    joiningDate = '';
    lastName = '';
    phoneNumber = '';
    profilePicture = '';
    type = '';
    userID = '';
    ownerTypeCode = '';
    ownerTypeDisplayName = '';
    companyName = '';
    isGuestUser: boolean;
    firstTimeUser: boolean;
    gender = '';
    dateOfBirth = '';
  }
  
  export interface ISigninDataModel {
    refreshToken: string;
    accessToken: string;
    userID: string;
    userData: IUserData;
  }
  
  export class SigninDataModel implements ISigninDataModel {
    refreshToken = '';
    accessToken = '';
    userID = '';
    userData = new UserData();
  }
  