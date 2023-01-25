import { IProductCatlog } from "./IProductCatalog";

export interface IStockReport {

     id: number
     product: IProductCatlog,
     purchasedQty: number,
     availableQty: number
     lowStock: boolean
     vendor: string
     type: string
}