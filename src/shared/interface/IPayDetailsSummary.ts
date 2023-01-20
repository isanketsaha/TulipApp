import { IFeesItemSummary } from "./IFeesItemSummary";
import { IPurchaseItemSummary } from "./IPurchaseItemSummary";

export interface IPayDetailsSummary {
    studentId: number,
    studentName: string,
    paymentMode: string,
    payType: string,
    purchaseItems: IPurchaseItemSummary[],
    feesItem: IFeesItemSummary[],
    total: number,
    paymentId: number,
    paymentDateTime: Date,
    paymentReceivedBy: string
}

