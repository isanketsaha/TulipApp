import { Button, Card, Col, Descriptions, Divider, Form, Input, Radio, Row, Select, Space } from "antd"
import Search from "antd/es/input/Search"
import { FeesLineItem } from "../shared/component/FeesLineItem";
import { BasicDetails } from "../shared/component/BasicDetails";
import { useBasicSearchByIdQuery } from "../shared/redux/api/feature/student/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Fees } from "../shared/component/payment/Fees";
import { Purchase } from "../shared/component/payment/Purchase";
import { useAppSelector } from "../store";


export const Payment = () => {

    const { id } = useParams();
    const{ paymentOptions} = useAppSelector(state=> state.commonData);
    const [studentId, setStudentId] = useState<string>("");
    const { data } = useBasicSearchByIdQuery(studentId, { skip: studentId == '' });
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
    };

    let paymentTypeValue = Form.useWatch('payType', form);
    let totalFeesAmount = Form.useWatch('fees', form);

    const onFinish = (values: any) => {
        console.log('Received values from form: ', values);
    };
    useEffect(() => {
        if (id) {
            setStudentId(id);
        }

    }, [])
    return (

        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row>
                <Divider> <h3>Payment</h3> </Divider>
                <Card>
                    {data && <BasicDetails data={data} key={data.id} />}
                </Card>
            </Row>

            <Form form={form} name="fees-collection-form" size="large" onFinish={onFinish} initialValues={{ payType: 'fees', feeItem: [{}], puchaseItems: [{}] }}>
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
                        {totalFeesAmount}
                        {paymentTypeValue == 'fees' && <Fees />}
                        {paymentTypeValue == 'purchase' && <Purchase/>}
                        <Row>
                            <Col span={4} offset={1}>
                                <Form.Item label="Paid By" name={"paidBy"} rules={[{ required: true }]}>
                                    <Select
                                        style={{ width: '100%' }}
                                        options={paymentOptions} />
                                </Form.Item>
                            </Col>

                            <Col span={3} offset={13}>
                                <Form.Item name={"total"}>
                                    <Input disabled={true} placeholder="Total" bordered={false} />
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                                <Button type={"primary"}>Confirm</Button>
                            </Col>
                        </Row>
                    </Space>

                </Card>

            </Form>
        </Space>

    )

}