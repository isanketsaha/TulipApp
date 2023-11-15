import dayjs, { Dayjs } from "dayjs"

export interface ITransportCatalog {
  id: number
  location: string
  amount: number
  distance: number
  pickupTime: Dayjs
  startDate?: Dayjs
  endDate?: Dayjs
}
