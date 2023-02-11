import { Row, Col, Card, DatePicker, Tabs, Space, TabsProps } from "antd";
import { useState } from "react";
import { Audit } from "../shared/component/reports/Audit";
import { FinanceReport } from "../shared/component/reports/FinanceReport";
import dayjs, { Dayjs } from "dayjs";


export const Accounts = () => {

    const { RangePicker } = DatePicker;

    const [fromDate, setFromDate] = useState<string>(dayjs(new Date()).add(-30, 'd').format('DD-MM-YYYY'));
    const [toDate, setToDate] = useState<string>(dayjs(new Date()).format('DD-MM-YYYY'));

    const rangePresets: {
        label: string;
        value: [Dayjs, Dayjs];
    }[] = [
            { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
            { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
            { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
            { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
        ];


    const tabList: TabsProps['items'] = [
        {
            key: '1',
            label: 'Report',
            children: <FinanceReport from={fromDate} to={toDate}/>
        }, {
            key: '2',
            label: 'Audit',
            children: <Audit />
        }
    ];

    const dateRangeChanged = (values: any, formatString: [string, string]) =>{
        setFromDate(formatString[0]);
        setToDate(formatString[1]);
    }


    return (<>

        <Space direction="vertical" style={{ width: '100%' }} size={"large"}>
            <Row >
                <Tabs style={{ width: '100%' }}  size="large" defaultActiveKey="1" 
                tabBarExtraContent={<RangePicker disabled={[false, true]} format={"DD-MM-YYYY"} presets={rangePresets} onChange={dateRangeChanged}
                    defaultValue={[dayjs(new Date()).add(-30, 'd'), dayjs(new Date())]} />} items={tabList} />
            </Row>

        </Space>
      
    </>)
}