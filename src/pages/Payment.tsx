import { Button, Card, Col, Divider, Form, Input, InputNumber, Modal, Radio, Row, Select, Space, Table, Tag, Typography } from "antd"
import { BasicDetails } from "../shared/component/BasicDetails";
import { useBasicSearchByIdAndClassQuery } from "../shared/redux/api/feature/student/api";
import { useNavigate, useParams } from "react-router-dom";
import { Fees } from "../shared/component/payment/Fees";
import { Purchase } from "../shared/component/payment/Purchase";
import { useAppSelector } from "../store";
import { IPay } from "../shared/interface/IPay";
import { usePaymentMutation } from "../shared/redux/api/feature/payment/api";
import { useState } from "react";

export const Payment = () => {

    const { Text } = Typography;
    const { id, classId } = useParams();
    const { paymentOptions } = useAppSelector(state => state.commonData);
    const [openConfirmPayment, setOpenConfirmPayment] = useState(false);
    const [payData, setPayData] = useState<IPay>();

    const { data: studentDetails } = useBasicSearchByIdAndClassQuery({ id, classId }, { skip: !(id && classId) });
    const [form] = Form.useForm();
    let navigate = useNavigate();

    let paymentTypeValue = Form.useWatch('payType', form);

    const [payment] = usePaymentMutation();

    const feesColumns = [
        {
            title: 'Fees',
            dataIndex: 'feesTitle',
            key: 'feesTitle',
        },
        {
            title: 'From Month',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'To Month',
            dataIndex: 'to',
            key: 'to',
        }, {
            title: ' Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            render: (item: number) => {
                return item.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                })
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (item: number) => {
                return item.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                })
            }
        }
    ];


    const purchaseColumns = [
        {
            title: 'Item',
            dataIndex: 'productName',
            key: 'productName',

        },
        {
            title: 'Size',
            dataIndex: 'productSize',
            key: 'productSize',
            render: (size: string) => {
                return size ? size : 'N/A';
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
        }, {
            title: ' Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            render: (item: number) => {
                return item.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                })
            }
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (item: number) => {
                return item.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                })
            }
        }
    ];


    const submit = (value: any) => {
        console.log(value);

        const pay = {
            ...value,
            total: Number(value.total.replace(/[^0-9-]+/g, "")) / 100,
            studentId: studentDetails?.id,
            purchaseItems: value.purchaseItems ? value.purchaseItems.map((item: any) => {
                return {
                    ...item,
                    unitPrice: Number(item.unitPrice.replace(/[^0-9-]+/g, "")) / 100,
                    amount: Number(item.amount.replace(/[^0-9-]+/g, "")) / 100
                }

            }) : [],
            feeItem: value.feeItem ? value.feeItem.map((item: any) => {
                return {
                    ...item,
                    unitPrice: Number(item.unitPrice.replace(/[^0-9-]+/g, "")) / 100,
                    amount: Number(item.amount.replace(/[^0-9-]+/g, "")) / 100,
                    from: item.from.format("MMM/YYYY"),
                    to: item.to.format("MMM/YYYY")
                }
            }) : []

        } as IPay;
        setPayData(pay);
        setOpenConfirmPayment(true);

    }

    const submitPayment = () => {
        payData && payment(payData).then((id: any) => {
            if (id?.data) {
                navigate(`/purchaseSummary/${id.data}`);
            }
        });
    }

    const confirmPaymentModal = () => {
        return (<Modal
            title="Confirm Payment"
            centered
            open={openConfirmPayment}
            destroyOnClose
            okText={"Payment Recieved"}
            onOk={submitPayment} onCancel={() => setOpenConfirmPayment(false)}
            width={1000}
        >
            {payData?.payType == 'FEES' && <Table columns={feesColumns}
                dataSource={payData?.feeItem}
                pagination={{ pageSize: 10, showTotal(total, range) {
                    return `${range[0]}-${range[1]} of ${total} items`
                } }} scroll={{ y: 240 }}
                summary={() => (
                    <Table.Summary fixed={'bottom'} >
                        <Table.Summary.Row >
                            <Table.Summary.Cell colSpan={4} index={1}>
                                Pay Mode :  <Tag color={payData?.paymentMode == "CASH" ? "green" : "cyan"}>
                                    {payData?.paymentMode}
                                </Tag>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={10}>
                                <Text mark>
                                    {payData?.total.toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                        style: 'currency',
                                        currency: 'INR'
                                    })}
                                </Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
                sticky
            />
            }

            {(payData?.payType == 'PURCHASE') && <Table columns={purchaseColumns}
                dataSource={payData?.purchaseItems}
                pagination={{ pageSize: 10 , showTotal(total, range) {
                    return `${range[0]}-${range[1]} of ${total} items`
                }}} scroll={{ y: 240 }}
                summary={() => (
                    <Table.Summary fixed={'bottom'} >
                        <Table.Summary.Row >
                            <Table.Summary.Cell colSpan={4} index={1}>
                                Pay Mode :  <Tag color={payData?.paymentMode == "CASH" ? "green" : "cyan"}>
                                    {payData?.paymentMode}
                                </Tag>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={10}>
                                <Text mark>
                                    {payData?.total.toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                        style: 'currency',
                                        currency: 'INR'
                                    })}
                                </Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
                sticky
            />
            }
        </Modal>)

    }

    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Row>
                <Divider> <h3>Payment</h3> </Divider>
                <Card>
                    {studentDetails && <BasicDetails data={studentDetails} key={studentDetails?.id} />}
                </Card>
            </Row>

            <Form form={form} name="fees-collection-form" size="large" onFinish={submit}
                initialValues={{ payType: 'FEES', feeItem: [{}], purchaseItems: [{}] }}>
                <Card>


                    <Space direction="vertical" style={{ width: '100%' }} size={"large"}>
                        <Row>
                            <Col offset={20}>
                                <Form.Item name="payType">
                                    <Radio.Group >
                                        <Radio.Button value="FEES">Fees</Radio.Button>
                                        <Radio.Button value="PURCHASE">Purchase</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        {paymentTypeValue == 'FEES' && studentDetails && <Fees form={form} classId={studentDetails?.classId} calculate={paymentTypeValue == 'FEES'} />}
                        {paymentTypeValue == 'PURCHASE' && studentDetails && <Purchase form={form} classId={studentDetails?.classId} calculate={paymentTypeValue == 'PURCHASE'} />}
                        <Row>
                            <Col span={6} >
                                <Form.Item label="Mode Of Payment" name={"paymentMode"} rules={[{ required: true }]}>
                                    <Select
                                        style={{ width: '100%' }}
                                        options={paymentOptions} />
                                </Form.Item>
                            </Col>

                            <Col span={3} offset={12}>
                                <Form.Item name={"total"}>
                                    <InputNumber disabled={true} controls={false} style={{ fontWeight: 'bold', width: '100%' }} placeholder="Total" bordered={false} />
                                </Form.Item>
                            </Col>
                            <Col span={1} offset={1}>
                                <Button htmlType={"submit"} type={"primary"}>Confirm</Button>
                            </Col>
                        </Row>
                    </Space>

                </Card>

            </Form>
            {confirmPaymentModal()}
        </Space>

    )

}