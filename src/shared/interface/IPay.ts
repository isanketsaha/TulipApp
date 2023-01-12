import { IFeePay } from "./IFeePay";
import { IPurchasePay } from "./IPurchasePay"

export interface IPay{
studentId: number;
paymentMode: string,
payType: string,
purchaseItems : IPurchasePay[],
feeItem : IFeePay[], 
total: number,
}

