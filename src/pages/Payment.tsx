import { Button, Card, Col, Descriptions, Divider, Form, Input, InputNumber, Radio, Row, Select, Space } from "antd"
import { BasicDetails } from "../shared/component/BasicDetails";
import { useBasicSearchByIdQuery } from "../shared/redux/api/feature/student/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Fees } from "../shared/component/payment/Fees";
import { Purchase } from "../shared/component/payment/Purchase";
import { useAppSelector } from "../store";
import { useFetchAllfeesCatalogMutation, useFetchAllProductCatalogMutation } from "../shared/redux/api/feature/catalog/api";
import { IPay } from "../shared/interface/IPay";
import { usePaymentMutation } from "../shared/redux/api/feature/payment/api";


export const Payment = () => {

    const { id } = useParams();
    const { paymentOptions, selectedSession } = useAppSelector(state => state.commonData);
    const [studentId, setStudentId] = useState<string>("");
    const { data: studentDetails } = useBasicSearchByIdQuery(studentId, { skip: studentId == '' });
    const [form] = Form.useForm();

    let paymentTypeValue = Form.useWatch('payType', form);

    const [fetchAllfeesCatalog] = useFetchAllfeesCatalogMutation();
    const [fetchAllProductCatalog] = useFetchAllProductCatalogMutation();

    const [payment] = usePaymentMutation();

    const submit = (value: any) => {
        console.log(value);

        const payData = {
            ...value,
            studentId: studentDetails?.id,
            feeItem: value.feeItem ? value.feeItem.map((item: any) => {
                return {
                    ...item,
                    from: item.from.format("MMM/YYYY"),
                    to: item.to.format("MMM/YYYY")
                }
            }) : []

        } as IPay;

        payment(payData).then(id => {
            console.log(id);
        });
    }


    useEffect(() => {
        if (id) {
            setStudentId(id);
        }
        if (studentDetails?.std && paymentTypeValue == 'fees') {
            fetchAllfeesCatalog({
                std: studentDetails?.std,
                session: Number(selectedSession.value),
            });
        }
        if (studentDetails?.std && paymentTypeValue == 'purchase') {
            fetchAllProductCatalog({
                std: studentDetails?.std,
                session: Number(selectedSession.value),
            });
        }
    }, [selectedSession, paymentTypeValue])

    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row>
                <Divider> <h3>Payment</h3> </Divider>
                <Card>
                    {studentDetails && <BasicDetails data={studentDetails} key={studentDetails?.id} />}
                </Card>
            </Row>

            <Form form={form} name="fees-collection-form" size="large" onFinish={submit}
                initialValues={{ payType: 'fees', feeItem: [{}], purchaseItems: [{}] }}>
                <Card>


                    <Space direction="vertical" style={{ width: '100%' }} size={"large"}>
                        <Row>
                            <Col offset={20}>
                                <Form.Item name="payType">
                                    <Radio.Group >
                                        <Radio.Button value="fees">Fees</Radio.Button>
                                        <Radio.Button value="purchase">Purchase</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        {paymentTypeValue == 'fees' && <Fees form={form} />}
                        {paymentTypeValue == 'purchase' && <Purchase form={form} />}
                        <Row>
                            <Col span={5} >
                                <Form.Item label="Mode Of Payment" name={"paymentMode"} rules={[{ required: true }]}>
                                    <Select
                                        style={{ width: '100%' }}
                                        options={paymentOptions} />
                                </Form.Item>
                            </Col>

                            <Col span={3} offset={13}>
                                <Form.Item name={"total"}>
                                    <InputNumber disabled={true} style={{ fontWeight: 'bold' }} placeholder="Total" bordered={false} />
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                                <Button htmlType={"submit"} type={"primary"}>Confirm</Button>
                            </Col>
                        </Row>
                    </Space>

                </Card>

            </Form>
        </Space>

    )

}