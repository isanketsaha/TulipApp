import { Button, Col, DatePicker, Form, InputNumber, Row, Select, Space } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';

export const Fees = () => {

    return (<>
        <Form.List name="feeItem">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <Space direction="vertical" style={{ width: '100%' }}>
                            
                            <div key={key}>
                                <Row >
                                    <Col span={1}>
                                        {key+1}.
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            name={[name, "feesTitle"]}
                                            rules={[{ required: true }]}
                                        >
                                            <Select placeholder="Select fee type">
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "from"]}
                                            rules={[{ required: true }]}
                                        >
                                            <DatePicker picker="month" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "to"]}
                                            rules={[{ required: true }]}
                                        >
                                            <DatePicker picker="month" />
                                        </Form.Item>
                                    </Col>

                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "unitPrice"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber min={1} max={10000} defaultValue={500} bordered={false} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "totalPrice"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber defaultValue={2500} bordered={false} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <Space>
                                            <Button type="link" disabled={key==0} onClick={() => remove(name)} icon={<MinusCircleTwoTone style={{ fontSize: '3vh' }} />} />
                                            <Button type="link" onClick={() => add()} icon={<PlusCircleTwoTone style={{ fontSize: '3vh' }} />} />
                                        </Space>
                                    </Col>
                                </Row>
                            </div>
                        </Space>
                    ))}
                </>
            )}
        </Form.List>
    </>)

}