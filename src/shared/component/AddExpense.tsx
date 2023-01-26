import { Button, Col, Form, FormInstance, Input, InputNumber, Row, Select, Space } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { useAppSelector } from "/src/store";
import { useAddExpenseMutation } from "../redux/api/feature/payment/api";

interface IExpenseProps {
    onExpenseSubmit : (item: any) => void

}

export const AddExpense = ({onExpenseSubmit}:IExpenseProps) => {

    const [form] = Form.useForm();
    const selectList = useAppSelector(state => state.commonData);

    const reCalculateAmount = (value: string, name: number): void => {
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
        <Form form={form} preserve={false} style={{ marginTop: '3vh' }} name="expense-form" size="large" initialValues={{ expenceItem: [{}] }} onFinish={onExpenseSubmit}>
            <Form.List name="expenceItem">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }, index) => (
                            <Space direction="vertical" key={key} style={{ width: '100%' }}>
                                <div key={key}>
                                    <Row >
                                        <Col span={1}>
                                            {key + 1}.
                                        </Col>

                                        <Col span={5}>
                                            <Form.Item
                                                name={[name, "itemName"]}
                                                rules={[{ required: true, message: "Provide Item Name" }]}
                                            >
                                                <Input placeholder="Item Name" style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>


                                        <Col span={5} offset={1}>
                                            <Form.Item
                                                name={[name, "category"]}
                                                rules={[{ required: true, message: "Select a Category" }]}
                                            >
                                                <Select showSearch clearIcon placeholder="Select Category"
                                                    options={selectList.expenseCategoryOptions}>
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={2} offset={1}>
                                            <Form.Item
                                                name={[name, "amount"]}
                                                rules={[{ required: true, message: "Provide amount" }]}
                                            >
                                                <InputNumber placeholder="Amount" controls={false} style={{ width: '100%' }} onInput={(value) => reCalculateAmount(value, name)} />
                                            </Form.Item>
                                        </Col>

                                        <Col span={2} offset={1}>
                                            <Form.Item
                                                name={[name, "qty"]}
                                                rules={[{ required: true, message: "Enter Quantity" }]}
                                            >
                                                <InputNumber placeholder="Quantity" controls={false} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>


                                        <Col span={3} offset={1}>
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
                                                }} icon={<MinusCircleTwoTone style={{ fontSize: '3vh' }} />} /> : null}
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
            <Row>
                <Col span={2} offset={13}>
                    <Form.Item
                        name={"total"}
                        rules={[{ required: true, message: "Total is required" }]}
                    >
                        <InputNumber placeholder="Total" controls={false} disabled style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col offset={4}>
                <Button htmlType={"submit"} type={"primary"}>Confirm</Button>
                </Col>
            </Row>
        </Form>

    </>)
}