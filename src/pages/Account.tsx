import { Row, Col, Card, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";


export const Accounts = () => {

    const { RangePicker } = DatePicker;

    const dateFormat = 'DD-MM-YY';

    const tabList = [
        {
            key: 'fees',
            tab: 'Fees Collected',
        },
        {
            key: 'admission',
            tab: 'New Admission',
        },
        {
            key: 'expense',
            tab: 'Expense',
        },
        {
            key: 'purchase',
            tab: 'Purchases',
        },
    ];
    const [activeTab, setActiveTab] = useState<string>('fees');

    const onTabChange = (key: string) => {
        setActiveTab(key);
    };


    const contentList: Record<string, React.ReactNode> = {
        tab1: <p>content1</p>,
        tab2: <p>content2</p>,
    };

    const rangePresets: {
        label: string;
        value: [Dayjs, Dayjs];
    }[] = [
            { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
            { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
            { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
            { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
        ];

    return (<>
        <Row>
           
                <Card
                
                    style={{ width: '100%' }}
                    tabList={tabList}
                    extra={<div style={{ marginTop: '2vh' }}><RangePicker disabled={[false, true]} presets={rangePresets}
                        defaultValue={[dayjs(new Date()).add(-30, 'd'), dayjs(new Date())]} /> </div>}
                    activeTabKey={activeTab}
                    onTabChange={(key) => {
                        onTabChange(key);
                    }}
                >
                    {contentList[activeTab]}
                </Card>
            

        </Row>
    </>)
}