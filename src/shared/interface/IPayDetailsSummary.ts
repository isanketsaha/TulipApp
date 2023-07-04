import { UploadProps } from "antd/es/upload/Upload";
import { IExpenseItem } from "./IExpenseItems";
import { IFeesItemSummary } from "./IFeesItemSummary";
import { IPurchaseItemSummary } from "./IPurchaseItemSummary";
import { UploadFile } from "antd";
import { Dues } from "./IDues";

export interface IPayDetailsSummary {
    studentId: number,
    studentName: string,
    paymentMode: string,
    payType: string,
    purchaseItems: IPurchaseItemSummary[],
    feesItem: IFeesItemSummary[],
    expenseItems: IExpenseItem[],
    docs: any[]
    total: number,
    paymentId: number,
    paymentDateTime: Date,
    createdBy: string,
    comments: string,
    dueOpted: boolean,
    dues: Dues,
}

