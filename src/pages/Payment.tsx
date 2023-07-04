import { Button, Card, Col, DatePicker, Descriptions, Divider, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Switch, Table, Tag, Typography, Upload } from "antd"
import { BasicDetails } from "../shared/component/BasicDetails";
import { useBasicSearchByIdAndClassQuery } from "../shared/redux/api/feature/student/api";
import { Search, useNavigate, useParams } from "react-router-dom";
import { Fees } from "../shared/component/payment/Fees";
import { Purchase } from "../shared/component/payment/Purchase";
import { useAppSelector } from "../store";
import { IPay } from "../shared/interface/IPay";
import { usePaymentMutation } from "../shared/redux/api/feature/payment/api";
import { useState } from "react";
import { PaymentConfirmation } from "../shared/component/confirmationModal/PaymentConfirmation";
import { FeesRuleType } from "../shared/utils/FeesRuleType";
import dayjs, { Dayjs } from "dayjs";
import { CloseCircleTwoTone, UploadOutlined } from '@ant-design/icons';
import { PriceBreakDown } from "../shared/component/payment/PriceBreakdown";
import { allowedFieldType, uploadProps } from "../configs/UploadConfig";


interface IBreakdownPrice {
    total: number,
    dues: number,
    subTotal: number
}

export const Payment = () => {
    const { Search } = Input;
    const { id, classId } = useParams();
    const [priceBreakDown, setPriceBreakdown] = useState<IBreakdownPrice>({
        total: 0,
        dues: 0,
        subTotal: 0
    })

    const { paymentOptions } = useAppSelector(state => state.commonData);
    const [openConfirmPayment, setOpenConfirmPayment] = useState(false);
    const [payData, setPayData] = useState<IPay>();

    const { data: studentDetails } = useBasicSearchByIdAndClassQuery({ id, classId }, { skip: !(id && classId) });
    const [form] = Form.useForm();
    let navigate = useNavigate();
    const [dueAmount, setDueAmount] = useState<number>(0);

    let paymentTypeValue = Form.useWatch('payType', form);
    const [payment] = usePaymentMutation();

    const addDue = (ind: boolean) => {

        form.setFieldsValue({
            ...(ind ? { dueInfo: [{}] } : { dueInfo: [] }),
        });
        if (!ind) {
            setDueAmount(0);
        }
    }

    const calculatePriceBreakDown = (subTotal: number, duesAmount: number) => {
        setPriceBreakdown({
            total: form.getFieldValue('total'),
            dues: duesAmount,
            subTotal
        });
    }

    const submit = (value: any) => {
        console.log(value);
        const feesLineItem: { feesId: any; unitPrice: number; amount: number; month?: string; feesTitle: string }[] = [];
        value.feeItem ? value.feeItem.map((item: any) => {
            if (item.rule != FeesRuleType.Yearly) {
                feesLineItem.push(...mapNonAnnualFees(item));
            }
            else {
                feesLineItem.push({
                    feesId: item.feesId,
                    feesTitle: item.feesTitle,
                    unitPrice: Number(item.unitPrice.replace(/[^0-9-]+/g, "")) / 100,
                    amount: Number(item.amount.replace(/[^0-9-]+/g, "")) / 100,

                })
            }

        }) : [];

        const pay = {
            ...value,
            dueInfo: value.dueInfo ? value.dueInfo[0] : null,
            subTotal: priceBreakDown.subTotal,
            total: Number(String(priceBreakDown.total).replace(/[^0-9-]+/g, "")) / 100,
            studentId: studentDetails?.id,
            purchaseItems: value.purchaseItems ? value.purchaseItems.map((item: any) => {
                return {
                    ...item,
                    unitPrice: Number(item.unitPrice.replace(/[^0-9-]+/g, "")) / 100,
                    amount: Number(item.amount.replace(/[^0-9-]+/g, "")) / 100
                }

            }) : [],
            feeItem: feesLineItem

        } as IPay;
        setPayData(pay);
        setOpenConfirmPayment(true);

    }

    const mapNonAnnualFees = (item: any) => {
        let fromMonth = item.from;
        const allMonth: Dayjs[] = [fromMonth];
        while (fromMonth.format("MMM/YYYY") != item.to.format("MMM/YYYY")) {
            fromMonth = fromMonth.add(1, 'Month');
            allMonth.push(fromMonth);
        }
        return allMonth.map(value => {
            return {
                feesId: item.feesId,
                feesTitle: item.feesTitle,
                unitPrice: Number(item.unitPrice.replace(/[^0-9-]+/g, "")) / 100,
                amount: Number(item.unitPrice.replace(/[^0-9-]+/g, "")) / 100,
                month: value.format("MMM/YYYY")
            }
        })
    }

    const calculateDue = (amount: number | null) => {
        if (amount && amount > 0) {
            setDueAmount(amount);
        }
    }

    const submitPayment = () => {

        payData && payment(payData).then((id: any) => {
            if (id?.data) {
                navigate(`/purchaseSummary/${id.data}`);
            }
        });
    }
    const disabledDate = (current: Dayjs) => {
        return current && current < dayjs().endOf('day'); // Disable future dates
    };

    return (
        <><Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row>
                <Divider> <h3>Payment</h3> </Divider>
                <Card>
                    {studentDetails && <BasicDetails data={studentDetails} key={studentDetails?.id} />}
                </Card>
            </Row>

            <Form form={form} name="fees-collection-form" size="large" onFinish={submit}
                initialValues={
                    {
                        payType: 'FEES', feeItem: [{}], purchaseItems: [{}]
                    }}>
                <Row justify={"space-between"} align={"top"}>
                    <Col span={19}>
                        <Card>
                            <Space direction="vertical" style={{ width: '100%' }} size={"large"}>
                                <Row justify={"end"}>
                                        <Form.Item name="payType">
                                            <Radio.Group>
                                                <Radio.Button value="FEES">Fees</Radio.Button>
                                                <Radio.Button value="PURCHASE">Purchase</Radio.Button>
                                            </Radio.Group>
                                        </Form.Item>
                                 
                                </Row>
                                {paymentTypeValue == 'FEES' && studentDetails &&
                                    <Fees form={form} classId={studentDetails?.classId}
                                        duesAmount={dueAmount} calculate={paymentTypeValue == 'FEES'} calculatePriceBreakDown={calculatePriceBreakDown} />}
                                {paymentTypeValue == 'PURCHASE' && studentDetails && <Purchase form={form}
                                    classId={studentDetails?.classId} duesAmount={dueAmount} calculate={paymentTypeValue == 'PURCHASE'} calculatePriceBreakDown={calculatePriceBreakDown} />}
                                <Form.List name="dueInfo" >
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }, index) => (

                                                <div key={key} style={{ margin: '0 5vmin' }}>
                                                    <Row justify={"space-between"}>
                                                        <Col span={2}>
                                                            <Input defaultValue={"DUE"} disabled={true} />
                                                        </Col>
                                                        <Col>
                                                            <Form.Item
                                                                name={[name, "paymentDate"]}
                                                                rules={[{ required: true, message: 'Payment Date is Manditory.' }]}
                                                            >
                                                                <DatePicker placeholder="Pay Date" format={'DD-MM-YYYY'} disabledDate={disabledDate} />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col >
                                                            <Form.Item
                                                                name={[name, "dueDocs"]}
                                                                rules={[{ required: true, message: 'Document is Manditory.' }]}
                                                            >
                                                                <Upload {...uploadProps()} showUploadList={true}
                                                                    listType="text" name="documents" accept={allowedFieldType}>
                                                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                                                </Upload>
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={4}>
                                                            <Form.Item
                                                                name={[name, "approvedBy"]}
                                                                rules={[{ required: true, message: 'Approved by is Manditory.' }]}
                                                            >
                                                                <Input placeholder="Approved By" />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={3} style={{ marginRight: "5vmin" }}>
                                                            <Form.Item
                                                                name={[name, "dueAmount"]}
                                                                rules={[{ required: true, message: 'Due amount is manditory' },
                                                                ({ getFieldValue }) => ({
                                                                    validator(_, value) {
                                                                        if (!value || priceBreakDown.subTotal >= value) {
                                                                            return Promise.resolve();
                                                                        }
                                                                        return Promise.reject(new Error('Due limit exceded.'));
                                                                    },
                                                                }),

                                                                ]}
                                                            >
                                                                <InputNumber max={10000} controls={false}
                                                                    placeholder="Amount" onChange={calculateDue}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </Form.List>
                                <Row className="paymant-details" justify={"space-around"}>

                                    <Col span={8}>
                                        <Form.Item label="Mode Of Payment" name={"paymentMode"} rules={[{ required: true }]}>
                                            <Select
                                                style={{ width: '100%' }}
                                                options={paymentOptions} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <Form.Item name={"dueOpted"}>
                                            <Switch checkedChildren="Dues" unCheckedChildren="No Dues" defaultChecked={false}
                                                onChange={addDue} />
                                        </Form.Item>

                                    </Col >
                                    <Col span={6}>

                                        {/* <Space.Compact style={{ width: '100%' }}>
                                            <Input placeholder="Discount Coupon" />
                                            <Button type="primary">Apply</Button>
                                        </Space.Compact> */}
                                    </Col>
                                </Row>
                            </Space>

                        </Card>
                    </Col>
                    <Col span={5} >
                        <div style={{ margin: '0 2vmin' }}>

                            <PriceBreakDown breakdown={priceBreakDown} />
                            <Button style={{ width: '100%' }} htmlType={"submit"} type={"primary"}>Confirm</Button>

                        </div>
                    </Col>
                </Row>
            </Form>

        </Space>
            <Modal zIndex={1}
                title="Confirm Payment"
                centered
                open={openConfirmPayment}
                destroyOnClose
                maskClosable={false}
                okText={"Payment Recieved"}
                onOk={() => {
                    setOpenConfirmPayment(false);
                    submitPayment()
                }}
                onCancel={() => setOpenConfirmPayment(false)}
                width={1000}
            >
                {payData && <PaymentConfirmation payData={payData} />}
            </Modal>
        </>

    )

}