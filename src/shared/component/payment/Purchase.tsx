import { Button, Col, DatePicker, Form, FormInstance, InputNumber, Row, Select, Space, Typography } from "antd"
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
import { useAppSelector } from "../../../store";
import staticMethods from "antd/es/message";
import { IProductCatlog } from "../../interface/IProductCatalog";
import { useFetchAllProductCatalogQuery } from "../../redux/api/feature/catalog/api";

interface IPurchaseProps {
    form: FormInstance,
    classId: string
}


export const Purchase = ({ form, classId }: IPurchaseProps) => {

    const { data: productCatalog } = useFetchAllProductCatalogQuery(classId);

    const { Text } = Typography;

    const fetchProductRows = () => {
        const fields = form.getFieldsValue();
        const { purchaseItems } = fields;
        return purchaseItems;
    }

    const onSelectProduct = (elementId: number, rowKey: number) => {
        const products = fetchProductRows();
        const selectedProduct = productCatalog?.find(item => item.id === elementId)
        products[rowKey] = {
            ...products[rowKey],
            unitPrice: selectedProduct?.price.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            }),
            size: selectedProduct?.size ? selectedProduct?.size : '',
            qty: 1,
            amount: selectedProduct?.price.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            })
        }
        form.setFieldsValue({ purchaseItems: [...products] });
        calculateTotal();
    }

    const reCalculateAmount = (qty: string, rowKey: number) => {
        const products = fetchProductRows();
        const selectedProduct = productCatalog?.find(item => item.id === products[rowKey].productTitle)
        products[rowKey] = {
            ...products[rowKey],
            amount: (((selectedProduct?.price ?? 0) * Number(qty)).toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            }))
        }
        form.setFieldsValue({ purchaseItems: [...products] });
        calculateTotal();
    }

    const calculateTotal = () => {
        let total: number = 0;
        fetchProductRows().map((item: any) => {
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


    return (<>
        <Form.List name="purchaseItems">
            {(fields, { add, remove }) => (
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
                                            name={[name, "productTitle"]}
                                            rules={[{ required: true, message: "Select a product" }]}
                                        >
                                            <Select showSearch clearIcon placeholder="Select Product"
                                                onSelect={(e) => onSelectProduct(e, name)}
                                                filterOption={(input, option) => (option?.title.toUpperCase() ?? '').includes(input.toUpperCase())}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
                                                }
                                                options={productCatalog?.map((d) => ({
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

                                    <Col span={2} offset={1}>
                                        <Form.Item
                                            name={[name, "size"]}

                                        >
                                            <InputNumber placeholder="Size" disabled={true} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>

                                    <Col span={2} offset={1}>
                                        <Form.Item
                                            name={[name, "qty"]}
                                            rules={[{ required: true, message: "Enter Quantity" }]}
                                        >
                                            <InputNumber onInput={(value) => reCalculateAmount(value, name)} placeholder="Quantity" style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>


                                    <Col span={3} offset={3}>
                                        <Form.Item
                                            name={[name, "unitPrice"]}
                                            rules={[{ required: true, message: "Unit Price is required" }]}
                                        >
                                            <InputNumber min={1} max={10000} bordered={false} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={3} offset={1}>
                                        <Form.Item
                                            name={[name, "amount"]}
                                            rules={[{ required: true, message: "Amount is required" }]}
                                        >
                                            <InputNumber bordered={false} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}>

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