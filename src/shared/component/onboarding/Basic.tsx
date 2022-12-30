import { Row, Col, Form, Input, DatePicker, InputNumber, Select } from "antd";
import { useAppSelector } from "../../../store";
import { useLocation } from "react-router-dom";


export const AddBasic = () => {
    const { state } = useLocation();
    const selectList = useAppSelector(state => state.commonData);
    return (
        <>
            <Row gutter={[40, 40]}>
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

            <Row gutter={[40, 40]}>
                <Col span={12}>
                    <Form.Item name="contact" label="Phone Number" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            {   state.type == 'student' ?
           
            <Row gutter={[40, 40]} >
                <Col span={8}>
                    <Form.Item name="std" label="Class" rules={[{ required: true }]}>
                        <Select
                            options={selectList.genderList}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="session" label="Session" rules={[{ required: true }]} >
                        <Select
                            options={selectList.sessionList}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="previousSchool" label="Previous School" >
                        <Input />
                    </Form.Item>
                </Col>
                
            </Row>
            : <Row gutter={[40, 40]}>
            <Col span={8}>
                <Form.Item name="aadhaar" label="Aadhaar" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item name="qualification" label="Qualification" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
            </Col>
            <Col span={8}>
                    <Form.Item name="experince" label="Experince" >
                        <Input />
                    </Form.Item>
                </Col>
        </Row>
        
}
            <Row gutter={[40, 40]} >
                <Col span={8}>
                    <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select
                            options={selectList.genderList}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name="bloodGroup" label="Blood Group" rules={[{ required: true }]} >
                        <Select
                            options={selectList.bloodGroupList}
                        />
                    </Form.Item>
                </Col>
                
                <Col span={8}>
                    <Form.Item name="religion" label="Religion" >
                        <Select
                            options={selectList.religionList}
                        />
                    </Form.Item>
                </Col>
            </Row>

        </>
    );
}