import { FeesRuleType } from "../utils/FeesRuleType";

export interface IFeesCatalog{
     id: number,
     name: string,
    amount:number,
     description: string,
   applicableRule: FeesRuleType,
}