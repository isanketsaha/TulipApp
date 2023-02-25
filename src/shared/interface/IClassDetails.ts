import { StudentBasicDetails } from "../component/StudentBasicDetails"
import { IBasicDetails } from "./IBasicDetails";
import { IFeesCatalog } from "./IFeesCatalog";
import { IProductCatlog } from "./IProductCatalog";

export interface IClassDetails {
    id: number,
    std: string,
    headTeacher: string,
    session: string,
    students: IBasicDetails[],
    feesCatalogs: IFeesCatalog[],
    productCatalogs: IProductCatlog[],
    sessionId: number
}