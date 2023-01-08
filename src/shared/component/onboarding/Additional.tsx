import { Row, Col, Form, Input, DatePicker, InputNumber, Divider, Select } from "antd"
import { useAppSelector } from "../../../store";

export const AddAdditional = () => {

    const selectList = useAppSelector(state => state.commonData);

    return (
        <><Form.List name="interview" initialValue={[{}]}>
            {(fields) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div key={key}><Row gutter={[40, 40]}>
                            <Col span={12}>
                                <Form.Item name={[name, "interviewDate"]} label="Interview Date" rules={[{ required: true }]}>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={[name, "doj"]} label="Joining On" rules={[{ required: true }]}>
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row><Row gutter={[40, 40]}>
                                <Col span={12}>
                                    <Form.Item name={[name, "salary"]} label="Salary Offered" rules={[{ type: 'number' }]}>
                                        <InputNumber maxLength={5}   style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={[name, "role"]} label="Role Offered">
                                        <Select options={selectList.userRoleList} />
                                    </Form.Item>
                                </Col>
                            </Row></div>))}
                </>
            )}
        </Form.List><Form.List name="bank" initialValue={[{}]}>
                {(fields) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key}><Divider plain> <h3>Bank Details</h3></Divider><Row gutter={[40, 40]}>
                                <Col span={12}>
                                    <Form.Item name={[name, "accountNumber"]} label="Account Number">
                                        <InputNumber maxLength={12} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={[name, "confirmAccountNumber"]} label="Confirm Account Number" rules={[{ required: true }]}>
                                        <InputNumber maxLength={12} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row><Row gutter={[40, 40]}>

                                    <Col span={12}>
                                        <Form.Item name={[name, "ifsc"]} label="IFSC Code" rules={[{ required: true }]}>
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={[name, "bankName"]} label="Bank">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row></div>))}
                    </>)}
            </Form.List></>);

}