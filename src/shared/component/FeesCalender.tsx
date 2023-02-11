import { Card, Divider, Space } from "antd";
import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData'
import isBetween from 'dayjs/plugin/isBetween';
import { useFetchFeesGraphQuery } from "../redux/api/feature/payment/api";
import { useFetchAllfeesCatalogQuery } from "../redux/api/feature/catalog/api";
import { FeesRuleType } from "../utils/FeesRuleType";

interface IFeesGraphProps {
    studentId: number,
    classId: number
}
export const FeesCalender = ({ studentId, classId }: IFeesGraphProps) => {

    dayjs.extend(isBetween)
    const { data } = useFetchFeesGraphQuery({
        studentId, classId
    });

    const { data: feesCatalog } = useFetchAllfeesCatalogQuery(String(classId));

    dayjs.extend(localeData);
    const months = dayjs().localeData().monthsShort().slice(3, 12).concat(dayjs().localeData().monthsShort().slice(0, 3));

    const annualFees = feesCatalog?.filter(item => item.applicableRule == FeesRuleType.Yearly);

    const gridStyle = (item: string) => {
        return {
            width: '8.33%',
            textAlign: 'center',
            background: determineColor(item, FeesRuleType.Monthly)
        }
    };

    const annualGridStyle = (item: number) => {
        return {
            width: '33.33%',
            textAlign: 'center',
            background: determineColor(item, FeesRuleType.Yearly)
        }
    };

    const determineColor = (month: string | number, feesType: FeesRuleType) => {
        const refMonths = dayjs().localeData().monthsShort();
        if (data && feesType === FeesRuleType.Monthly) {
            if (data?.paidMonths?.includes(String(month))) {
                return "lightgreen"; //light green
            }
            else {
                return "lightyellow";
            }
        }

        if (data && feesType === FeesRuleType.Yearly) {
            if (data?.annualFeesPaid?.includes(+month)) {
                return "lightgreen"; //light green
            }
            else {
                return "lightgrey";
            }
        }
    }

    return (
        <><Divider> <h3>Fees </h3></Divider>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Card>

                    {annualFees?.map(_ => {
                        return <Card.Grid style={annualGridStyle(_.id) as React.CSSProperties} key={_.id}>{_.name}</Card.Grid>;
                    })}
                </Card>
                <Card>

                    {months.map(_ => {
                        return <Card.Grid style={gridStyle(_) as React.CSSProperties} key={_}>{_}</Card.Grid>;
                    })}
                </Card>

            </Space>

        </>
    );
}