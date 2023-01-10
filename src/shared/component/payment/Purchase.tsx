import { Button, Col, DatePicker, Form, InputNumber, Row, Select, Space, Typography } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { useAppSelector } from "../../../store";
import staticMethods from "antd/es/message";


export const Purchase = () => {

    const { Text } = Typography;

    const { productCatalog } = useAppSelector(state => state.catalog);

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
                                            <Select showSearch clearIcon placeholder="Select Product"
                                            filterOption={(input, option) => (option?.title.toUpperCase() ?? '').includes(input.toUpperCase())}
                                            filterSort={(optionA, optionB) =>
                                              (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
                                            }
                                            options={productCatalog?.map((d) => ({
                                                value: d.id,
                                                title:d.itemName,
                                                label: <>
                                                    <Row>
                                                        {d.itemName}
                                                    </Row>
                                                    <Text type="secondary">
                                                        {`${d.std ? d.std : ''} ${d.std && (d.tag || d.size)? " | ": ''} 
                                                        ${d.tag ? d.tag : ''}  ${d.tag ? ' | ' : ''} ${d.size ? d.size:'' } `}
                                                    </Text>
                                                </>,
                                            }))}>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={2} offset={1}>
                                        <Form.Item
                                            name={[name, "size"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber placeholder="Size" disabled={true} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={2} offset={1}>
                                        <Form.Item
                                            name={[name, "qty"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber placeholder="Quantity" style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>


                                    <Col span={3} offset={3}>
                                        <Form.Item
                                            name={[name, "unitPrice"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber min={1} max={10000} bordered={false} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "price"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber bordered={false} disabled={true} />
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