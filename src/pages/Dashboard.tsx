import { Button, Card, Col, DatePicker, Form, Modal, Row, message } from "antd"
import { useState } from "react";
import { Space } from 'antd';
import { TransactionReport } from "../shared/component/reports/TransactionReports";
import { StudentReport } from "../shared/component/reports/Student";
import { StaffReport } from "../shared/component/reports/StaffReport";
import { Stock } from "../shared/component/reports/Stock";
import { AddExpense } from "../shared/component/AddExpense"
import dayjs, { Dayjs } from "dayjs";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "../store";
import { Role } from "../shared/utils/Role";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const { user } = useAppSelector(app => app.userAuth);
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    const [transactionDate, setTransactionDate] = useState<Dayjs>(dayjs(new Date()).startOf('date'));
    const [isExpenseModelOpen, setIsExpenseModelOpen] = useState(false);
    const dateFormat = 'DD-MMM-YYYY';
    let navigate = useNavigate();


    const disableDate = (currentDate: Dayjs) => {
        return user?.authority == Role.ADMIN ? currentDate.isAfter(new Date()) || currentDate.isBefore(dayjs().add(-60, "days"))
            : currentDate.isAfter(new Date()) || currentDate.isBefore(dayjs().add(-7, "days"));
    };

    return (
        <>
            <div className="site-card-wrapper">
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    
                    <Row gutter={16}>
                        <Col span={24}>
                            <Card title="Collection Report"
                                extra={<Space size={"large"}>
                                    <DatePicker allowClear={false} format={dateFormat} onChange={(date, dateString) => date && setTransactionDate(date.startOf('date'))}
                                        disabledDate={disableDate} defaultValue={dayjs(new Date())} />
                                    {isMobile ? null : <Button onClick={() => setIsExpenseModelOpen(true)}>Add Expense</Button>}</Space>} >
                                <TransactionReport transactionDate={transactionDate} />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>

                            <Stock />

                        </Col>
                    </Row>
                    <Row justify={"space-evenly"} gutter={[16, 16]}>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Card >
                                <StudentReport />
                            </Card>
                        </Col>
                        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                            <Card >
                                <StaffReport />

                            </Card>
                        </Col>
                        {/* <Col span={8} >
                            <Card title="Upcoming Holiday">
                                Card content
                            </Card>
                        </Col> */}
                    </Row>
                </Space>

                <Modal destroyOnClose title="Add Expense" open={isExpenseModelOpen} 
                    onCancel={() => setIsExpenseModelOpen(false)} maskClosable={false} width={1300} footer={[
                    ]}>
                    <AddExpense/>
                </Modal>
            </div></>
    )

}