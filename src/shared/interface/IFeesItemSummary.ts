import { FeesRuleType } from "../utils/FeesRuleType";

export interface IFeesItemSummary {

    feesId: number,
    feesTitle: string,
    unitPrice: number,
    amount: number,
    applicableRule: FeesRuleType,
    from: Date,
    to: Date
}