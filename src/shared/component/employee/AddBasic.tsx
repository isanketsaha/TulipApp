import { Row, Col, Form, Input, DatePicker, InputNumber } from "antd";


export const AddBasic = () => {

    return (
        <>
            <Row  gutter={[40, 40]}>
                <Col span={12}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="dob" label="Date Of Birth" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            
            <Row  gutter={[40, 40]}>
                <Col span={12}>
                    <Form.Item name="contact" label="Phone Number" rules={[{ type: 'number', min: 0, max: 12 }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="qualification" label="Qualification" >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row  gutter={[40, 40]}>
                <Col span={12}>
                    <Form.Item name="aadhar" label="Aadhar" >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row  gutter={[40, 40]} >
                <Col span={6}>
                    <Form.Item name="gender" label="Gender" >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="bloodGroup" label="Blood Group" >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="experince" label="Experince"  >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="religion" label="Religion" >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}