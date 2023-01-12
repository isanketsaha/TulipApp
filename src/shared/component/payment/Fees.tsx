import { Button, Col, DatePicker, Form, FormInstance, InputNumber, Row, Select, Space, Typography } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { useAppSelector } from "../../../store";
import { Dayjs } from "dayjs";
import { ValidateStatus } from "antd/es/form/FormItem";
import { useState } from "react";


interface IFeesPros {
    form: FormInstance
}

export const Fees = ({ form }: IFeesPros) => {

    const { Text } = Typography;


    const fetchFeeRows = () => {
        const fields = form.getFieldsValue();
        const { feeItem } = fields;
        return feeItem;
    }
    const onMonthSelection = (date: Dayjs, rowKey: number, inputType: string) => {
        const input = date.get('month');
        const feeItem = fetchFeeRows();
        const currentFees = feeItem[rowKey];
        if (inputType == 'to' && currentFees.from) {
            const monthNumber = input - currentFees.from.get('month');
            calculateAmount(rowKey, monthNumber + 1);
        }
        else if (inputType == 'from' && currentFees.to) {
            const monthNumber = currentFees.to.get('month') - input;
            calculateAmount(rowKey, monthNumber + 1);
        }
    }

    const calculateAmount = (rowKey: number, monthNumber: number) => {
        const feeItem = fetchFeeRows();
        const currentFees = feeItem[rowKey];
        const selectedFees = feesCatalog.find(item => item.id === currentFees.feesId);

        if (monthNumber > 0) {
            feeItem[rowKey] = {
                ...feeItem[rowKey],
                unitPrice: selectedFees?.amount,
                amount: (selectedFees?.applicableRule.toUpperCase() == 'Monthly'.toUpperCase()) ? monthNumber * (selectedFees?.amount ? selectedFees?.amount : 0) : selectedFees?.amount
            }
            form.setFieldsValue({ feeItem: [...feeItem] });
            calculateTotal();
        }
    }

    const onSelectFees = (elementId: number, rowKey: number) => {
        const feeItem = fetchFeeRows();
        const selectedFees = feesCatalog.find(item => item.id === elementId)
        feeItem[rowKey] = {
            ...feeItem[rowKey],
            unitPrice: selectedFees?.amount,
            amount: selectedFees?.amount
        }
        form.setFieldsValue({ feeItem: [...feeItem] });
        calculateTotal();
    }

    const calculateTotal = () => {
        const allForm = form.getFieldsValue();
        let total = 0;
        fetchFeeRows().map((item: any) => {
            total += item.amount ? item.amount : 0;
        });
        form.setFieldsValue({ total });
    }

    const disableDate = (currentDate: Dayjs, rowKey: number) => {
        const feeItem = fetchFeeRows();
        const currentFees = feeItem[rowKey];
        if (currentFees.from) {
            return currentDate.isBefore(currentFees.from);
        }
        return true;
    };

    const { feesCatalog } = useAppSelector(state => state.catalog);


    return (<>
        <Form.List name="feeItem">
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <Space direction="vertical" key={key} style={{ width: '100%' }}>

                            <div key={key}>
                                <Row >
                                    <Col span={1}>
                                        {key + 1}.
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            name={[name, "feesId"]}
                                            rules={[{ required: true }]}
                                        >
                                            <Select placeholder="Select fee type" notFoundContent={null}
                                                onSelect={(e) => onSelectFees(e, name)} options={feesCatalog?.map((d) => ({
                                                    value: d.id,
                                                    label: <>
                                                        <Row>
                                                            {d.name}
                                                        </Row>
                                                        <Text type="secondary">
                                                            {d.description}
                                                        </Text>
                                                    </>,
                                                }))}>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "from"]}
                                            rules={[{ required: true }]}
                                        >
                                            <DatePicker format="MMM-YYYY" onSelect={(value) => onMonthSelection(value, name, "from")} picker="month" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "to"]}
                                            rules={[{ required: true }]}
                                        >

                                            <DatePicker format="MMM-YYYY" picker="month" onSelect={(value) => onMonthSelection(value, name, "to")} disabledDate={(value) => disableDate(value, name)} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "unitPrice"]}
                                            rules={[{ required: true }]}

                                        >
                                            <InputNumber min={1} max={10000} bordered={false} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "amount"]}
                                            rules={[{ required: true }]}

                                        >
                                            <InputNumber bordered={false} placeholder="Amount" disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                        <Space>
                                            {fields.length > 1 ? <Button type="link" onClick={() => {
                                                remove(name);
                                                calculateTotal();
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
    </>)

}