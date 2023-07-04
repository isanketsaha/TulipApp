import { Dayjs } from "dayjs"
import { IDuesPayment } from "./IDuesPayment"

export interface Dues {
    id: number,
    dueDate: Dayjs,
    dueAmount: number,
    approvedBy: string,
    duesPayment: IDuesPayment[]
    status: string,
    penalty: number,
    createdDate: Dayjs,
}