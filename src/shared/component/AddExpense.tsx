import { Button, Col, Form, FormInstance, Input, InputNumber, Row, Select, Space } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { useAppSelector } from "/src/store";

interface IExpenseProps {
    onExpenseSubmit: (item: any) => void

}

export const AddExpense = ({ onExpenseSubmit }: IExpenseProps) => {

    const [form] = Form.useForm();
    const selectList = useAppSelector(state => state.commonData);

    const reCalculateAmount = (): void => {
        let total = 0;
        const { expenceItem } = form.getFieldsValue();
        expenceItem.map((item: any) => {
            if (item.amount) {
                const amount: number = Number(item.amount);
                total += amount;
            }
        })
        form.setFieldsValue({
            total: total.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })
        });
    };

    return (<>
        <Form form={form} preserve={true} style={{ marginTop: '3vh' }} name="expense-form" size="large"
            initialValues={{ expenceItem: [{}] }} onFinish={onExpenseSubmit}>
            <Form.List name="expenceItem">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }, index) => (
                            <Space direction="vertical" key={key} style={{ width: '100%' }}>

                                <Row justify={"space-around"}>
                                    <Col span={1}>
                                        {name + 1}.
                                    </Col>

                                    <Col span={5}>
                                        <Form.Item
                                            name={[name, "itemName"]}
                                            rules={[{ required: true, message: "Provide Item Name" }]}
                                        >
                                            <Input placeholder="Item Name" style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>


                                    <Col span={5} >
                                        <Form.Item
                                            name={[name, "category"]}
                                            rules={[{ required: true, message: "Select a Category" }]}
                                        >
                                            <Select showSearch clearIcon placeholder="Select Category"
                                                options={selectList.expenseCategoryOptions}>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={3} >
                                        <Form.Item
                                            name={[name, "amount"]}
                                            rules={[{ required: true, message: "Provide amount" }]}
                                        >
                                            <InputNumber placeholder="Amount" min={1} controls={false} style={{ width: '100%' }} onInput={(value) => reCalculateAmount()} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={2} >
                                        <Form.Item
                                            name={[name, "qty"]}
                                            rules={[{ required: true, message: "Enter Quantity" }]}
                                        >
                                            <InputNumber placeholder="Quantity" min={1} controls={false} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>


                                    <Col span={4} >
                                        <Form.Item
                                            name={[name, "receivedBy"]}
                                            rules={[{ required: true, message: "Receiver name is required" }]}
                                        >
                                            <Input placeholder="Received By" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2} >

                                        <Space>
                                            {fields.length > 1 ? <Button type="link" onClick={() => {
                                                remove(name);
                                                reCalculateAmount();
                                            }} icon={<MinusCircleTwoTone style={{ fontSize: '3vh' }} />} /> : null}
                                            <Button type="link" onClick={() => add()} icon={<PlusCircleTwoTone style={{ fontSize: '3vh' }} />} />
                                        </Space>
                                    </Col>
                                </Row>
                            </Space>
                        ))}
                    </>
                )}
            </Form.List>
            <Row>
                <Col span={3} offset={12}>
                    <Form.Item
                        name={"total"}
                        rules={[{ required: true, message: "Total is required" }]}
                    >
                        <InputNumber placeholder="Total" controls={false} disabled style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col offset={3} span={4}>
                    <Button htmlType={"submit"} style={{width: '100%'}} type={"primary"}>Confirm</Button>
                </Col>
            </Row>
        </Form>

    </>)
}