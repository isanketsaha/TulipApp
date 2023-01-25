import { Row, Col, Card, DatePicker, Tabs, Space } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Audit } from "../shared/component/reports/Audit";
import { TransactionReport } from "../shared/component/reports/TransactionReports";


export const Accounts = () => {

    const { RangePicker } = DatePicker;

    const tabList = [
        {
            key: 'transaction',
            tab: 'Transaction',
        },
        {
            key: 'admission',
            tab: 'New Admission',
        },
        {
            key: 'expense',
            tab: 'Expense',
        }
    ];
    const [activeTab, setActiveTab] = useState<string>('transaction');

    const onTabChange = (key: string) => {
        setActiveTab(key);
    };


    const contentList: Record<string, React.ReactNode> = {
        transaction: <TransactionReport/>,
        admission: <p>content2</p>,

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
        <Space direction="vertical" style={{ width: '100%' }} size={"large"}>
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
            <Row>
                <Card

                    style={{ width: '100%' }}>
                    <Audit />
                </Card>
            </Row>
        </Space>
    </>)
}