import { Button, Col, DatePicker, Form, FormInstance, InputNumber, Row, Select, Space, Typography } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { useAppSelector } from "../../../store";
import { Dayjs } from "dayjs";
import { ValidateStatus } from "antd/es/form/FormItem";
import { useState } from "react";
import { IFeesCatalog } from "../../interface/IFeesCatalog";
import { useFetchAllfeesCatalogQuery } from "../../redux/api/feature/catalog/api";


interface IFeesPros {
    form: FormInstance,
    classId: string
}

export const Fees = ({ form, classId }: IFeesPros) => {

    const { Text } = Typography;

    const { data: feesCatalog } = useFetchAllfeesCatalogQuery(classId);

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
        const selectedFees = feesCatalog?.find(item => item.id === currentFees.feesId);

        if (monthNumber > 0) {
            feeItem[rowKey] = {
                ...feeItem[rowKey],
                unitPrice: selectedFees?.amount.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                }),
                amount: ((selectedFees?.applicableRule.toUpperCase() == 'Monthly'.toUpperCase())
                    ? (monthNumber * (selectedFees?.amount ? selectedFees?.amount : 0)).toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                    }) : selectedFees?.amount.toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                    }))
            }
            form.setFieldsValue({ feeItem: [...feeItem] });
            calculateTotal();
        }
    }

    const onSelectFees = (elementId: number, rowKey: number) => {
        const feeItem = fetchFeeRows();
        const selectedFees = feesCatalog?.find(item => item.id === elementId)
        feeItem[rowKey] = {
            ...feeItem[rowKey],
            unitPrice: selectedFees?.amount.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            }),
            amount: selectedFees?.amount.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })
        }
        form.setFieldsValue({ feeItem: [...feeItem] });
        calculateTotal();
    }

    const calculateTotal = () => {
        const allForm = form.getFieldsValue();
        let total = 0;
        fetchFeeRows().map((item: any) => {
            if (item.amount) {
                const amount: number = Number(item.amount.replace(/[^0-9-]+/g, "")) / 100;
                total += amount;
            }
        });

        form.setFieldsValue({
            total: total.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })
        });
    }

    const disableDate = (currentDate: Dayjs, rowKey: number) => {
        const feeItem = fetchFeeRows();
        const currentFees = feeItem[rowKey];
        if (currentFees.from) {
            return currentDate.isBefore(currentFees.from);
        }
        return true;
    };



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
                                            <InputNumber min={1} max={10000} bordered={false} disabled={true} style={{ width: '100%' }}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "amount"]}
                                            rules={[{ required: true }]}

                                        >
                                            <InputNumber bordered={false} placeholder="Amount" disabled={true} style={{ width: '100%' }}/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={2} offset={1}>
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