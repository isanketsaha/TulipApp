import { Button, Col, DatePicker, Form, InputNumber, Row, Select, Space } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';


export const Purchase = () => {

    return (<>
        <Form.List name="puchaseItems">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <Space direction="vertical" style={{ width: '100%' }}>

                            <div key={key}>
                                <Row >
                                    <Col span={1}>
                                        {key + 1}.
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            name={[name, "productTitle"]}
                                            rules={[{ required: true }]}
                                        >
                                            <Select placeholder="Select Product">
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={1} offset={1}>
                                        <Form.Item
                                            name={[name, "size"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber placeholder="Size"/>
                                        </Form.Item>
                                    </Col>

                                    <Col span={1} offset={1}>
                                        <Form.Item
                                            name={[name, "Class"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber placeholder="Class"/>
                                        </Form.Item>
                                    </Col>

                                    <Col span={1} offset={1}>
                                        <Form.Item
                                            name={[name, "qty"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber placeholder="Quantity"/>
                                        </Form.Item>
                                    </Col>
                                   

                                    <Col span={3} offset={3}>
                                        <Form.Item
                                            name={[name, "unitPrice"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber min={1} max={10000} defaultValue={500} bordered={false} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "price"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber defaultValue={2500} bordered={false} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>
                                        <Space>
                                            <Button type="link" disabled={key == 0} onClick={() => remove(name)} icon={<MinusCircleTwoTone style={{ fontSize: '3vh' }} />} />
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