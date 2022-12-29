import { Row, Col, Form, Input, DatePicker, InputNumber, Select } from "antd";
import { useAppSelector } from "../../../store";


export const AddBasic = () => {

   const selectList = useAppSelector(state => state.commonData);
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
                    <Form.Item name="contact" label="Phone Number" rules={[{ required: true }]}>
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
                    <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select
                        options={selectList.gender}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true }]} >
                    <Select
                        options={selectList.bloodGroup}
                        />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="experince" label="Experince" rules={[{ required: true }]} >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="religion" label="Religion" rules={[{ required: true }]} >
                    <Select
                        options={selectList.religion}
                        />
                    </Form.Item>
                </Col>
            </Row>
            
        </>
    );
}