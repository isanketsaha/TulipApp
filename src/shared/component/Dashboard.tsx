import { Card, Col, Row } from "antd"
import { useState } from "react";
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';



export const Dashboard = () => {

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
            key: 'vouchers',
            tab: 'Vouchers',
        },
        {
            key: 'purchase',
            tab: 'Purchases',
        },
    ];

    const contentList: Record<string, React.ReactNode> = {
        tab1: <p>content1</p>,
        tab2: <p>content2</p>,
    };
    const [activeTab, setActiveTab] = useState<string>('fees');

    const onTabChange = (key: string) => {
        setActiveTab(key);
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

    return (
        <>
            <Row>
                <Col span={15}>
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
                </Col>

                <Col span={8} offset={1} >
                    <Card title="Upcoming Holiday">
                        Card content
                    </Card>
                </Col>
            </Row>
            <div className="site-card-wrapper">
                <Row gutter={16} style={{ margin: '4vh' }}>
                    <Col span={12}>
                        <Card title="Student Strength">
                            Card content
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Staff Strength">
                            Card content
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Pending Fees">
                            Card content
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Student Withdrawn">
                            Card content
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Upcoming Function">
                            Card content
                        </Card>
                    </Col>
                </Row>
            </div></>
    )

}