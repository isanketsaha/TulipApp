import { Button, Col, Form, FormInstance, Input, InputNumber, Row, Select, Space, Typography } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { IProductCatlog } from "../../interface/IProductCatalog";
import { useFetchAllProductCatalogQuery } from "../../redux/api/feature/catalog/api";
import { useEffect, useState } from "react";

interface IPurchaseProps {
  form: FormInstance
  classId: number
  calculate: boolean
  duesAmount: number
  calculatePriceBreakDown: (subTotal: number, dueAmount: number) => void
}


export const Purchase = ({ form, classId, calculate, calculatePriceBreakDown , duesAmount}: IPurchaseProps) => {

    const { data: productCatalog } = useFetchAllProductCatalogQuery(classId);

    const { Text } = Typography;

    const [selectedItems, addSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        if (calculate || duesAmount) {
            calculateTotal();
        }

    }, [calculate, duesAmount])


    const fetchProductRows = () => {
        const fields = form.getFieldsValue();
        const { purchaseItems } = fields;
        return purchaseItems;
    }

    const onSelectProduct = (elementId: number, rowKey: number) => {
        let products = fetchProductRows();
        const selectedProduct = productCatalog?.find((item: IProductCatlog) => item.id === elementId);
        if (selectedProduct?.type === 'PLACEHOLDER') {
            products = products.filter((item: any, index: number) =>
                index != rowKey
            )
            const productList: IProductCatlog[] | undefined = productCatalog?.filter((item: IProductCatlog) =>
                item.std === selectedProduct.std && item.type !== 'PLACEHOLDER');
            productList?.forEach(item => {
                products.push({
                    productId: item?.id,
                    productName: item?.itemName,
                    unitPrice: item?.price.toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                    }),
                    size: `${item.tag ? item.tag : ''}  ${item.tag && item.size ? ' | ' : ''} ${item.size ? item.size : ''}`,
                    qty: 1,
                    amount: item?.price.toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                    })
                })
            })

        }
        else {
            products[rowKey] = {
                ...products[rowKey],
                productId: selectedProduct?.id,
                productName: selectedProduct?.itemName,
                unitPrice: selectedProduct?.price.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                }),
                size: `${selectedProduct?.tag ? selectedProduct.tag : ''}  ${selectedProduct?.tag && selectedProduct?.size ? ' | ' : ''} ${selectedProduct?.size ? selectedProduct.size : ''}`,
                qty: 1,
                amount: selectedProduct?.price.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                })
            }
        }
        form.setFieldsValue({ purchaseItems: [...products] });
        const selectedId: number[] = products.map((item: any) => item.productId);
        selectedProduct?.id && addSelectedItems(oldArray => [...oldArray, ...selectedId])
        calculateTotal();

    }

    const reCalculateAmount = (qty: string, rowKey: number) => {
        const products = fetchProductRows();
        const selectedProduct = productCatalog?.find(item => item.id === products[rowKey].productId)
        products[rowKey] = {
            ...products[rowKey],
            productId: selectedProduct?.id,
            productName: selectedProduct?.itemName,
            amount: (((selectedProduct?.price ?? 0) * Number(qty)).toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            }))
        }
        form.setFieldsValue({ purchaseItems: [...products] });
        calculateTotal();
    }

    const removeLineItem = (index: number) => {
        calculateTotal();
    }

    const calculateTotal = () => {
        let total: number = 0;
        let subTotal = 0;
        fetchProductRows().map((item: any) => {
            if (item.amount) {
                const amount: number = Number(item.amount.replace(/[^0-9-]+/g, "")) / 100;
                total += amount;
            }
        });
        subTotal = total;
        const fields = form.getFieldsValue();
        const { dueOpted } = fields;
        const { dueInfo } = fields;
        if (dueOpted == true) {
            if (total >= dueInfo[0].dueAmount) {
                total = total - dueInfo[0].dueAmount;
            }
            else {
                form.setFields([
                    {
                        name: ['total'],
                        errors: ['Due Amount is greater than total.'],
                    }
                ]
                );
            }
        }
        form.setFieldsValue({
            total: total.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })
        });
          calculatePriceBreakDown(subTotal, dueOpted && subTotal >= dueInfo[0]?.dueAmount ? -dueInfo[0].dueAmount : 0);
    }

    const filterListConstruct = (rowKey: number) => {
        const products = fetchProductRows();
        const id = products[rowKey].productId;
        const items = selectedItems?.filter((item) => {
            return item !== id
        });
        addSelectedItems([...items]);
    }

    const filteredOptions = productCatalog?.filter((catalog) => !selectedItems.includes(catalog.id));

    return (<>
        <Form.List name="purchaseItems">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <Space direction="vertical" key={key} style={{ width: '100%' }}>
                            <div key={key}>
                                <Row justify={"space-between"}>
                                    <Col span={1}>
                                        {name + 1}.
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item
                                            name={[name, "productName"]}
                                            rules={[{ required: true, message: "Select a product" }]}
                                        >
                                            <Select showSearch clearIcon placeholder="Select Product"
                                                onSelect={(e) => onSelectProduct(e, name)}
                                                filterOption={(input, option) => (option?.title.toUpperCase() ?? '').includes(input.toUpperCase())}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
                                                }
                                                options={filteredOptions?.map((d) => ({
                                                    value: d.id,
                                                    title: d.itemName,
                                                    label: <>
                                                        <Row>
                                                            {d.itemName}
                                                        </Row>
                                                        <Text type="secondary">
                                                            {`${d.std ? d.std : ''} ${d.std && (d.tag || d.size) ? " | " : ''} 
                                                        ${d.tag ? d.tag : ''}  ${d.tag ? ' | ' : ''} ${d.size ? d.size : ''} `}
                                                        </Text>
                                                    </>,
                                                }))}>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col hidden={true}>
                                        <Form.Item
                                            name={[name, "productId"]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={4} >
                                        <Form.Item
                                            name={[name, "size"]}

                                        >
                                            <InputNumber placeholder="Description" min={0} controls={false} disabled={true} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={3}>
                                        <Form.Item
                                            name={[name, "qty"]}
                                            rules={[{ required: true, message: "Enter Quantity" }]}
                                        >
                                            <InputNumber min={1} onStep={(value: number) => reCalculateAmount(String(value), name)} onInput={(value) => reCalculateAmount(value, name)} placeholder="Quantity" style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>


                                    <Col span={3} >
                                        <Form.Item
                                            name={[name, "unitPrice"]}
                                            rules={[{ required: true, message: "Unit Price is required" }]}
                                        >
                                            <InputNumber min={1} max={10000} controls={false} bordered={false} disabled={true} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item
                                            name={[name, "amount"]}
                                            rules={[{ required: true, message: "Amount is required" }]}
                                        >
                                            <InputNumber bordered={false} controls={false} disabled={true} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>

                                        <Space>
                                            {fields.length > 1 ? <Button type="link" onClick={() => {
                                                filterListConstruct(name);
                                                remove(name);
                                                removeLineItem(name);

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