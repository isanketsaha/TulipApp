import { Link, useNavigate, useParams } from "react-router-dom";
import { IBasicDetails } from "../../interface/IBasicDetails"
import { BasicDetails } from "../BasicDetails"
import { useDuesPaymentMutation, useFetchPaymentDetailsByIdQuery } from "../../redux/api/feature/payment/api";
import { useBasicSearchByIdQuery } from "../../redux/api/feature/student/api";
import { Button, Card, Col, DatePicker, Descriptions, Divider, Form, Input, InputNumber, Row, Select, Space, Tag, Upload, message } from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "/src/store";

export const DuePayment = () => {

    const { id } = useParams();
    let navigate = useNavigate();
    const { paymentOptions } = useAppSelector(state => state.commonData);
    const { data: paySummary } = useFetchPaymentDetailsByIdQuery(id ?? ''
        , { skip: id == undefined });
    const [form] = Form.useForm();
    const [duesPayment] = useDuesPaymentMutation();
    const { data: item } = useBasicSearchByIdQuery(String(paySummary?.studentId) ?? '', { skip: !paySummary?.studentId });
    const pendingFees = (paySummary?.dues.dueAmount ?? 0) - (paySummary?.dues?.duesPayment?.reduce((sum, item) => sum + item.amount, 0) ?? 0);
    const submit = () => {
        const formValues = form.getFieldsValue(true);
        const value = {
            ...formValues,
            dueId: paySummary?.dues.id,
            transactionId: paySummary?.paymentId
        }
        console.log(value);
        duesPayment(value).then((val) => {
            if (val) {
                navigate(`/purchaseSummary/${paySummary?.paymentId}`)
            }
            else{
                message.error('Due Payment Failed')
            }
        })
    }

    const calcTotal = () => {
        const total = ((form.getFieldValue('amount') ?? 0) + (form.getFieldValue('penalty') ?? 0)) ?? 0;
        form.setFieldsValue({
            totalAmount: total
        })
    }



    return (<>

        <Card>
            <BasicDetails data={item ?? {} as IBasicDetails} key={item?.id} />
            <Divider>Bill Details</Divider>
            <Descriptions>
                <Descriptions.Item span={1} label="Transaction Id">
                    <Link to={`/purchaseSummary/${paySummary?.paymentId}`}>{paySummary?.paymentId}</Link>
                </Descriptions.Item>
                <Descriptions.Item span={1} label="Purchase Type">
                    <Tag color={"purple"}>
                        {paySummary?.payType}
                    </Tag>
                </Descriptions.Item>
                <Descriptions.Item span={1} label="Bill Amount">
                    {paySummary?.payType.toUpperCase() == 'FEES' ? paySummary.feesItem.reduce((sum, item) => sum + item.amount, 0).toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                    }) :
                        paySummary?.payType.toUpperCase() == 'PURCHASE' ? paySummary.purchaseItems.reduce((sum, item) => sum + item.amount, 0).toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR'
                        }) : 'NULL'}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions>
                <Descriptions.Item span={1} label="Due Date">
                    {dayjs(paySummary?.dues.dueDate).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item span={1} label="Paid Amount">
                    {paySummary?.dues.duesPayment.reduce((sum, item) => sum + item.amount, 0).toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                    })}
                </Descriptions.Item>
                <Descriptions.Item span={1} label="Due Amount">
                    <Tag color={"blue"}>
                        -{paySummary?.dues.dueAmount.toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                            style: 'currency',
                            currency: 'INR'
                        })}
                    </Tag>
                </Descriptions.Item>
            </Descriptions>
        </Card>

        <Divider>Due Payment</Divider>
        <Card>
            <Form form={form}
                name="duePayment"
                autoComplete="off"
                size="large"
                onFinish={submit}
                initialValues={{ dueId: paySummary?.dues.id }}
            >

                <Row justify={"space-around"}>
                    <Col span={6}>
                        <Form.Item
                            label="Payment Mode"
                            name="paymentMode"
                            style={{ width: '90%' }}
                            rules={[{ required: true, message: 'Payment Mode required' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                options={paymentOptions} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Penalty"
                            name="penalty"

                        >
                            <InputNumber controls={false} style={{ width: '70%' }} defaultValue={0} onChange={calcTotal} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item

                            label="Amount"
                            name="amount"
                            rules={[{ required: true, message: 'Amount required' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (pendingFees >= value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Payment amount is greater than outstanding due.'));
                                },
                            })]}
                        >
                            <InputNumber controls={false} style={{ width: '70%' }} defaultValue={0} onChange={calcTotal} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="Total Amount"
                            name="totalAmount"
                        >
                            <InputNumber controls={false} style={{ width: '70%' }} disabled={true} defaultValue={0} min={1}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"end"}>
                    <div style={{ margin: '0 2vmin' }}>
                        <Button style={{ width: '100%' }} htmlType={"submit"} type={"primary"}>Confirm</Button>
                    </div>
                </Row>
            </Form>
        </Card>

    </>)
}