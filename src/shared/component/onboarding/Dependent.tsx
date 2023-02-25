import { Button, Checkbox, Col, Divider, Form, Input, InputNumber, Row, Select, Space, Upload, UploadProps, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from "../../../store";
import { WhatsAppOutlined, InboxOutlined } from '@ant-design/icons';
import { MultipleUpload } from "../MultiUpload";
export const AddDependent = () => {

    const selectList = useAppSelector(state => state.commonData);

    const prefixSelector = (name: number) => (
        <Form.Item name={[name, "whatsappAvailable"]} valuePropName="checked" noStyle>
            <Checkbox><WhatsAppOutlined /></Checkbox>
        </Form.Item>);

    return (<>
        <Form.List name="dependent" initialValue={[{}]}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key}>
                            <Row style={{ margin: '2vh' }}>
                                <Col offset={20} span={4}>
                                    <Space>
                                        <Button disabled={index === 0} type="default" onClick={() => remove(name)} icon={<MinusCircleOutlined />} >
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
                                    <Form.Item name={[name, "name"]} label="Name" rules={[{ required: true },
                                    {
                                        pattern: new RegExp("[A-Za-z ]+$"),
                                        message: "Name does not accept numbers or special character"
                                    }]}>
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
                                        <InputNumber addonBefore={prefixSelector(name)} controls={false} style={{ width: '100%' }} />
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
                                    <Form.Item name={[name, "aadhaar"]} label="Aadhar Number" rules={[{ required: true }, {
                                        pattern: new RegExp("^[0-9]*$"),
                                        message: "No Alphabets Allowed"
                                    }]}>
                                        <Input maxLength={12} style={{ width: '100%' }} />
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