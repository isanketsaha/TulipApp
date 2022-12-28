import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const AddDependent = () => {

    return (<>
        <Form.List name="dependent" initialValue={[{
            name: ''
        }]}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div key={key}>
                            <Row style={{ margin: '2vh' }}>
                                <Col offset={20} span={4}>
                                    <Space>
                                        <Button type="default" onClick={() => remove(name)} icon={<MinusCircleOutlined />} >
                                            Remove
                                        </Button>
                                        <Button type="default" onClick={() => add()} icon={<PlusOutlined />} >
                                            Add
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>

                            <Row gutter={[40, 40]}>
                                <Col span={12}>
                                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="relation" label="Relation">
                                        <Select
                                            style={{ width: '100%' }}
                                            options={[
                                                {
                                                    value: 'father',
                                                    label: 'Father',
                                                },
                                                {
                                                    value: 'mother',
                                                    label: 'Mother',
                                                }
                                            ]}
                                        />

                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={[40, 40]}>
                                <Col span={12}>
                                    <Form.Item name="contact" label="Phone Number" rules={[{ type: 'number', min: 0, max: 12, required: true }]}>
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name="qualification" label="Qualification" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[40, 40]}>
                                <Col span={12}>
                                    <Form.Item name="aadhar" label="Aadhar" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="occupation" label="Occupation" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </>
            )}
        </Form.List>
    </>);
}