import { Card, Divider } from "antd";
import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData'

export const FeesCalender = () => {


    dayjs.extend(localeData);
    const months = dayjs().localeData().monthsShort().slice(3, 12).concat(dayjs().localeData().monthsShort().slice(0, 3));

    const gridStyle: React.CSSProperties = {
        width: '8.33%',
        textAlign: 'center',
        background: "lightyellow"
    };


    return (

        <><Divider> <h3>Fees </h3></Divider>
            <Card>
                {months.map(_ => {
                    return <Card.Grid style={gridStyle} key={_}>{_}</Card.Grid>;
                })}
            </Card></>
    );
}