import { Dayjs } from "dayjs";

export interface IDuesPayment{
    id: number,
    amount: number,
    penalty: number,
    paymentMode: number,
    createdDate: Dayjs,
}