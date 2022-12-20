import { Col, Descriptions, Divider, Form, Input, Row, Select } from "antd"
import Search from "antd/es/input/Search"
import { FeesLineItem } from "../shared/component/FeesLineItem";


export const Fees = () => {

    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 14 },
      };

    const onFinish = (values: any) => {
        console.log('Received values from form: ', values);
    };

    return (
        <>
            <Row>
                <Col span={6} offset={18}>
                    <Search placeholder="Student Name / ID" enterButton="Search" allowClear size="large" />
                </Col>
            </Row>

            <Row>
                <Divider />
                <Descriptions title="Student Details">
                    <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Class">3</Descriptions.Item>
                    <Descriptions.Item label="Fees Paid Upto">May</Descriptions.Item>
                    <Descriptions.Item label="Address">
                        No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                    </Descriptions.Item>
                </Descriptions>
                <Divider />
            </Row>

            <Form form={form} wrapperCol= {{span:14}} labelCol={{span:8}} name="fees-collection-form" size="large" onFinish={onFinish}>

                <FeesLineItem />

            </Form>
        </>
    )

}