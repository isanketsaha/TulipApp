import { Row, Col, Form, Input, DatePicker, InputNumber, Divider, Select } from "antd"
import { useAppSelector } from "../../../store";

export const AddAdditional = () => {

    const selectList = useAppSelector(state => state.commonData);
    
    return (
        <>
            <Row gutter={[40, 40]}>
                <Col span={12}>
                    <Form.Item name="interviewDate" label="Interview Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="doj" label="Joining On" rules={[{ required: true }]}>
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={[40, 40]}>
                <Col span={12}>
                    <Form.Item name="salary" label="Salary Offered" rules={[{ type: 'number', min: 0, max: 5 }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="role" label="Role Offered" >
                        <Select options={selectList.userRole}/>
                    </Form.Item>
                </Col>
            </Row>
            <Divider plain>Bank Details</Divider>
            <Row gutter={[40, 40]}>
                <Col span={12}>
                    <Form.Item name="accountNumber" label="Account Number" >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="confirmAccountNumber" label="Confirm Account Number" rules={[{ required: true }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[40, 40]}>

                <Col span={12}>
                    <Form.Item name="ifsc" label="IFSC Code" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="bank" label="Bank" >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}