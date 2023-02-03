import { Button, Card, Col, DatePicker, Form, Modal, Row } from "antd"
import { useState } from "react";
import { Space } from 'antd';
import { TransactionReport } from "./reports/TransactionReports";
import { StudentReport } from "./reports/Student";
import { StaffReport } from "./reports/StaffReport";
import { Stock } from "./reports/Stock";
import { AddExpense } from "./AddExpense"
import { useAddExpenseMutation } from "../redux/api/feature/payment/api";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";



export const Dashboard = () => {

   const [transactionDate, setTransactionDate] = useState<Dayjs>(dayjs(new Date()).startOf('date'));
    const [addExpense] = useAddExpenseMutation();
    const [isExpenseModelOpen, setIsExpenseModelOpen] = useState(false);
    const dateFormat = 'DD-MMM-YYYY';

    let navigate = useNavigate();
    const onExpenseSubmit = (value: any) => {
        const payload = value['expenceItem'];
        console.log(payload);
        addExpense(payload).then((id: any) => {
            console.log(id.data)
            navigate(`/purchaseSummary/${id.data}`);
        })
    }
    const disableDate = (currentDate: Dayjs)  =>{
        return currentDate.isAfter(new Date()) || currentDate.isBefore(dayjs().add(-7,"days")) ;
       };

    return (
        <>
            <div className="site-card-wrapper">
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Card title="Collection Report" 
                            extra={ <Space size={"large"}>
                                <DatePicker format={dateFormat} onChange={(date, dateString) => date && setTransactionDate(date.startOf('date'))} disabledDate={disableDate} defaultValue={dayjs(new Date())} />
                                <Button onClick={() => setIsExpenseModelOpen(true)}>Add Expense</Button></Space>} >
                                <TransactionReport transactionDate={transactionDate}/>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                           
                                <Stock />
                           
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card >
                                <StudentReport />
                            </Card>
                        </Col>
                        <Col span={12}>
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

                <Modal destroyOnClose title="Add Expense" open={isExpenseModelOpen}
                    onCancel={() => setIsExpenseModelOpen(false)} width={1200} footer={[

                    ]}>
                    <AddExpense onExpenseSubmit={onExpenseSubmit} />
                </Modal>
            </div></>
    )

}