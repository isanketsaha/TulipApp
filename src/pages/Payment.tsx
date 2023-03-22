import { Button, Card, Col, Divider, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Table, Tag, Typography } from "antd"
import { BasicDetails } from "../shared/component/BasicDetails";
import { useBasicSearchByIdAndClassQuery } from "../shared/redux/api/feature/student/api";
import { useNavigate, useParams } from "react-router-dom";
import { Fees } from "../shared/component/payment/Fees";
import { Purchase } from "../shared/component/payment/Purchase";
import { useAppSelector } from "../store";
import { IPay } from "../shared/interface/IPay";
import { usePaymentMutation } from "../shared/redux/api/feature/payment/api";
import { useState } from "react";
import { PaymentConfirmation } from "../shared/component/confirmationModal/PaymentConfirmation";
import { FeesRuleType } from "../shared/utils/FeesRuleType";
import dayjs, { Dayjs } from "dayjs";

export const Payment = () => {
    const { id, classId } = useParams();
    const { paymentOptions } = useAppSelector(state => state.commonData);
    const [openConfirmPayment, setOpenConfirmPayment] = useState(false);
    const [payData, setPayData] = useState<IPay>();

    const { data: studentDetails } = useBasicSearchByIdAndClassQuery({ id, classId }, { skip: !(id && classId) });
    const [form] = Form.useForm();
    let navigate = useNavigate();

    let paymentTypeValue = Form.useWatch('payType', form);

    const [payment] = usePaymentMutation();



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
            total: Number(value.total.replace(/[^0-9-]+/g, "")) / 100,
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

    const submitPayment = () => {

        payData && payment(payData).then((id: any) => {
            if (id?.data) {
                navigate(`/purchaseSummary/${id.data}`);
            }
        });
    }

    return (
        <><Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row>
                <Divider> <h3>Payment</h3> </Divider>
                <Card>
                    {studentDetails && <BasicDetails data={studentDetails} key={studentDetails?.id} />}
                </Card>
            </Row>

            <Form form={form} name="fees-collection-form" size="large" onFinish={submit}
                initialValues={{ payType: 'FEES', feeItem: [{}], purchaseItems: [{}] }}>
                <Card>


                    <Space direction="vertical" style={{ width: '100%' }} size={"large"}>
                        <Row>
                            <Col offset={20}>
                                <Form.Item name="payType">
                                    <Radio.Group>
                                        <Radio.Button value="FEES">Fees</Radio.Button>
                                        <Radio.Button value="PURCHASE">Purchase</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        {paymentTypeValue == 'FEES' && studentDetails && <Fees form={form} classId={studentDetails?.classId} calculate={paymentTypeValue == 'FEES'} />}
                        {paymentTypeValue == 'PURCHASE' && studentDetails && <Purchase form={form} classId={studentDetails?.classId} calculate={paymentTypeValue == 'PURCHASE'} />}
                        <Row>
                            <Col span={6}>
                                <Form.Item label="Mode Of Payment" name={"paymentMode"} rules={[{ required: true }]}>
                                    <Select
                                        style={{ width: '100%' }}
                                        options={paymentOptions} />
                                </Form.Item>
                            </Col>

                            <Col span={3} offset={12}>
                                <Form.Item name={"total"}>
                                    <InputNumber disabled={true} controls={false} style={{ fontWeight: 'bold', width: '100%' }} placeholder="Total" bordered={false} />
                                </Form.Item>
                            </Col>
                            <Col span={1} offset={1}>
                                <Button htmlType={"submit"} type={"primary"}>Confirm</Button>
                            </Col>
                        </Row>
                    </Space>

                </Card>

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