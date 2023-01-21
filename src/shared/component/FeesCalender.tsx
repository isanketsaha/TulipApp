import { Card, Divider } from "antd";
import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData'
import isBetween from 'dayjs/plugin/isBetween';
import { useFetchFeesGraphQuery } from "../redux/api/feature/payment/api";
import { getArchtype } from "immer/dist/internal";

interface IFeesGraphProps {
    studentId: number,
    classId: number
}
export const FeesCalender = ({ studentId, classId }: IFeesGraphProps) => {

    dayjs.extend(isBetween)
    const { data } = useFetchFeesGraphQuery({
        studentId, classId
    });

    dayjs.extend(localeData);
    const months = dayjs().localeData().monthsShort().slice(3, 12).concat(dayjs().localeData().monthsShort().slice(0, 3));

    const gridStyle = (item: string) => {
        return {
            width: '8.33%',
            textAlign: 'center',
            background: determineColor(item)
        }
    };

    const determineColor = (month: string) => {
        const refMonths = dayjs().localeData().monthsShort();
        if (data) {
            if (data.paidMonths.includes(month)) {
                return "lightgreen"; //light green
            }
            else {
                return "lightyellow";
            }
        }
        return "lightyellow";
    }

    return (
        <><Divider> <h3>Fees </h3></Divider>
            <Card>

                {months.map(_ => {
                    return <Card.Grid style={gridStyle(_) as React.CSSProperties} key={_}>{_}</Card.Grid>;
                })}
            </Card></>
    );
}