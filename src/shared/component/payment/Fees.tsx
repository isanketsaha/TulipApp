import { Button, Col, DatePicker, Form, FormInstance, Input, InputNumber, Row, Select, Space, Typography } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useFetchAllfeesCatalogQuery } from "../../redux/api/feature/catalog/api";


interface IFeesPros {
    form: FormInstance,
    classId: string,
    calculate: boolean
}

export const Fees = ({ form, classId, calculate }: IFeesPros) => {

    const { Text } = Typography;

    const { data: feesCatalog } = useFetchAllfeesCatalogQuery(classId);

    const [selectedFees, addSelectedFees] = useState<number[]>([]);

    useEffect(() => {
        if (calculate) {
            calculateTotal();
        }
    }, [calculate])
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
            const monthNumber =  date.diff(currentFees.from, 'month')
            // const monthNumber = input - currentFees.from.get('month');
            calculateAmount(rowKey, monthNumber + 1);
        }
        else if (inputType == 'from' && currentFees.to) {
            const monthNumber =  date.diff(currentFees.to, 'month')
            // const monthNumber = currentFees.to.get('month') - input;
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
                feesTitle: selectedFees?.name,
                rule: selectedFees?.applicableRule,
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
            feesTitle: selectedFees?.name,
            feesId: elementId,
            rule: selectedFees?.applicableRule,
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
        selectedFees?.name && addSelectedFees(oldArray => [...oldArray, selectedFees?.id])
    }

    const calculateTotal = () => {
        let total = 0;
        fetchFeeRows().map((item: any) => {
            if (item?.amount) {
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

    const filterListConstruct = (rowKey: number) => {
        const feeItem = fetchFeeRows();
        const id = feeItem[rowKey].feesId;
        const fees = selectedFees?.filter((item) => {
            return item !== id
        });
        addSelectedFees([...fees]);
    }
    const filteredOptions = feesCatalog?.filter((catalog) => !selectedFees.includes(catalog.id));

    return (<>
        <Form.List name="feeItem">
            {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <Space direction="vertical" key={key} style={{ width: '100%' }}>

                            <div key={key}>
                                <Row justify={"space-between"}>
                                    <Col span={1}>
                                        {name + 1}.
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name={[name, "feesTitle"]}
                                            rules={[{ required: true }]}
                                        >
                                            <Select placeholder="Select Fees" notFoundContent={null}
                                                onSelect={(e) => onSelectFees(e, name)} options={filteredOptions?.map((d) => ({
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
                                    <Col hidden={true}>
                                        <Form.Item
                                            name={[name, "feesId"]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col hidden={true}>
                                        <Form.Item
                                            name={[name, "rule"]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} >
                                        <Form.Item
                                            name={[name, "from"]}
                                            rules={[{ required: true }]}
                                        >
                                            <DatePicker format="MMM-YYYY" placeholder="From Date" onSelect={(value) => onMonthSelection(value, name, "from")} picker="month" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} >
                                        <Form.Item
                                            name={[name, "to"]}
                                            rules={[{ required: true }]}
                                        >
                                            <DatePicker format="MMM-YYYY" picker="month" placeholder="To Date" onSelect={(value) => onMonthSelection(value, name, "to")} disabledDate={(value) => disableDate(value, name)} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={3} >
                                        <Form.Item
                                            name={[name, "unitPrice"]}
                                            rules={[{ required: true }]}>
                                            <InputNumber min={1} max={10000} controls={false} bordered={false} disabled={true} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} >
                                        <Form.Item
                                            name={[name, "amount"]}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber bordered={false} controls={false} placeholder="Amount" disabled={true} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2} >
                                        <Space>
                                            {fields.length > 1 ? <Button type="link" onClick={() => {
                                                filterListConstruct(name);
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