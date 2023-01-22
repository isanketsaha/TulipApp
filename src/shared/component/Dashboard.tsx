import { Button, Card, Col, Row } from "antd"
import { useState } from "react";
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useFetchTransactionHistoryQuery } from "../redux/api/feature/report/api";
import { TransactionReport } from "./reports/TransactionReports";
import { StudentReport } from "./reports/Student";
import { StaffReport } from "./reports/StaffReport";
import { Link } from "react-router-dom";



export const Dashboard = () => {


    return (
        <>

            <div className="site-card-wrapper">
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Row gutter={16}>
                        <Col span={16}>
                            <Card title="Collection Report" extra={<Link to=""><Button >Add Expense</Button></Link>} >
                                <TransactionReport />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Timeline">
                                Card content
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card >
                                <StudentReport/>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card >
                                <StaffReport/>
                            </Card>
                        </Col>
                        {/* <Col span={8} >
                            <Card title="Upcoming Holiday">
                                Card content
                            </Card>
                        </Col> */}
                    </Row>
                    {/* <Row gutter={16}>
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
                </Row> */}
                </Space>
            </div></>
    )

}