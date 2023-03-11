import { ITransactionReport } from "./ITransactionReport";

export interface ITransactionReportSummary {

     feesTotal: number,
     expenseTotal: number,
     purchaseTotal: number,
     amountTotal: number,
     reportList : ITransactionReport[]
}