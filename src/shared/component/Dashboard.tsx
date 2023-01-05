import { Card, Col, Row } from "antd"
import { useState } from "react";
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';



export const Dashboard = () => {

    

    

    return (
        <>
           
            <div className="site-card-wrapper">
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Student Strength">
                            Card content
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Staff Strength">
                            Card content
                        </Card>
                    </Col>
                    <Col span={8} >
                    <Card title="Upcoming Holiday">
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
                </Space>
            </div></>
    )

}