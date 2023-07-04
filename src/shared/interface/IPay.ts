import { IFeePay } from "./IFeePay";
import { IPurchasePay } from "./IPurchasePay"

export interface IPay {
    dueOpted: boolean,
    dueInfo: any,
    studentId: number;
    paymentMode: string,
    subTotal: number,
    payType: string,
    purchaseItems: IPurchasePay[],
    feeItem: IFeePay[],
    total: number,
}

