export interface ICard {
    _id: string;
    cardHolderName: string;
    brandName: string;
    lastFourDigits: number;
    expirationMonth: number;
    expirationYear: number;
}
export class Card implements ICard {
    _id: string;
    cardHolderName: string;
    brandName: string;
    lastFourDigits: number;
    expirationMonth: number;
    expirationYear: number;
}