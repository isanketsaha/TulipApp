import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Space, Upload } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from "../../../store";

export const AddDependent = () => {

    const selectList = useAppSelector(state => state.commonData);

    return (<>
        <Form.List name="dependent" initialValue={[{
           
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
                                    <Form.Item name={[name, "name"]} label="Name" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={[name, "relation"]} label="Relation" rules={[{ required: true }]}>
                                        <Select
                                            options={selectList.relationList}
                                        />

                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={[40, 40]}>
                                <Col span={12}>
                                    <Form.Item name={[name, "contact"]} label="Phone Number" rules={[{ type: 'number', required: true }]}>
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item name={[name, "qualification"]} label="Qualification">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[40, 40]}>
                                <Col span={12}>
                                    <Form.Item name={[name, "aadhaar"]} label="Aadhar Number" rules={[{ required: true }]}>
                                        <InputNumber maxLength={12} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={[name, "occupation"]} label="Occupation" rules={[{ required: true }]}>
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