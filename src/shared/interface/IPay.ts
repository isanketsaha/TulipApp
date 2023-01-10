import { IPurchasePay } from "./IPurchasePay"

export interface IPay{
paidBy: string,
payType: string,
puchaseItems : IPurchasePay[],
total: number,
}

