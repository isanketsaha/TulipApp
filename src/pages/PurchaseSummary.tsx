import { Card, Descriptions, Divider, Space, Switch, Table, Tag, Typography, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { BasicDetails } from "../shared/component/BasicDetails";
import { useBasicSearchByIdQuery } from "../shared/redux/api/feature/student/api";
import { IBasicDetails } from "../shared/interface/IBasicDetails";
import { useEditPaymentMutation, useFetchPaymentDetailsByIdQuery } from "../shared/redux/api/feature/payment/api";
import dayjs from "dayjs";
import { useAppSelector } from "../store";
import { Role } from "../shared/utils/Role";

export const PurchaseSummary = () => {

    const { Text } = Typography;

    const { id } = useParams();
    const { user } = useAppSelector(state => state.userAuth);

    const deleteAllowedRole = [Role.ADMIN];

    const { data: paySummary } = useFetchPaymentDetailsByIdQuery(id ?? ''
        , { skip: id == undefined });
     const [editPayment] =  useEditPaymentMutation();
    const { data: item } = useBasicSearchByIdQuery(String(paySummary?.studentId) ?? '', { skip: !paySummary?.studentId });

    const onDelete = (lineItemId: number, purchaseType: string) => {
        console.log(lineItemId, purchaseType);
        editPayment({
            paymentId: paySummary?.paymentId ?? 0,
            itemId: lineItemId,
            payTypeEnum: purchaseType
        }).then(info =>
            message.info('Updated order succesfully.'))
    }
    const feesColumns = [
        {
            title: 'Fees Name',
            dataIndex: 'feesTitle',
            key: 'feesTitle',

        },
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',
        }, {
            title: 'Fees Type',
            dataIndex: 'applicableRule',
            key: 'applicableRule',
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
        }, {
            title: 'Action',
            key: 'action',
            hidden: user?.authority && !deleteAllowedRole.includes(user?.authority),
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a onClick={() => onDelete(record.itemId, 'FEES')}>Delete</a>
                </Space>
            ),
        }
    ].filter(item => !item.hidden);


    const purchaseColumns = [
        {
            title: 'Item',
            dataIndex: 'productTitle',
            key: 'productTitle',
            render: (title: string) => {
                return title.toUpperCase();
            }
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
        }, {
            title: 'Action',
            key: 'action',
            hidden: user?.authority && !deleteAllowedRole.includes(user?.authority),
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a onClick={() => onDelete(record.itemId, 'PURCHASE')}>Delete</a>
                </Space>
            ),
        }
    ].filter(item => !item.hidden);

    const expenseColumns = [
        {
            title: 'Item',
            dataIndex: 'itemName',
            key: 'itemName',
            render: (title: string) => {
                return title.toUpperCase();
            }
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',

        }
        ,
        {
            title: 'Received By',
            dataIndex: 'receivedBy',
            key: 'receivedBy',

        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
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

    return (<>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Divider>Payment Summary</Divider>
            <Card key={item?.id}>
                {paySummary?.payType != 'EXPENSE' && <BasicDetails data={item ?? {} as IBasicDetails} key={item?.id} />}
                <Divider></Divider>
                <Descriptions>
                    <Descriptions.Item span={1} label="Recieved by">{paySummary?.paymentReceivedBy}</Descriptions.Item>
                    <Descriptions.Item span={1} label="Date Time"> {dayjs(paySummary?.paymentDateTime).format('dddd, MMMM D, YYYY h:mm A')}</Descriptions.Item>

                    <Descriptions.Item span={1} label="Purchase Type">  <Tag color={"purple"}>
                        {paySummary?.payType}
                    </Tag></Descriptions.Item>
                </Descriptions>
            </Card>

            {paySummary?.payType == 'FEES' && <Table columns={feesColumns}
                dataSource={paySummary?.feesItem}
                pagination={{
                    pageSize: 10, hideOnSinglePage: true, showTotal(total, range) {
                        return `${range[0]}-${range[1]} of ${total} items`
                    }
                }} scroll={{ y: 340 }}
                summary={() => (
                    <Table.Summary fixed={'bottom'} >
                        <Table.Summary.Row >
                            <Table.Summary.Cell colSpan={4} index={1}>
                                Pay Mode :  <Tag color={paySummary?.paymentMode == "CASH" ? "green" : "cyan"}>
                                    {paySummary?.paymentMode}
                                </Tag>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={10}>
                                <Text mark>
                                    {paySummary?.total.toLocaleString('en-IN', {
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

            {(paySummary?.payType == 'PURCHASE') && <Table columns={purchaseColumns}
                dataSource={paySummary?.purchaseItems}
                pagination={{
                    pageSize: 10, hideOnSinglePage: true, showTotal(total, range) {
                        return `${range[0]}-${range[1]} of ${total} items`
                    }
                }} scroll={{ y: 340 }}
                summary={() => (
                    <Table.Summary fixed={'bottom'} >
                        <Table.Summary.Row >
                            <Table.Summary.Cell colSpan={4} index={1}>
                                Pay Mode :  <Tag color={paySummary?.paymentMode == "CASH" ? "green" : "cyan"}>
                                    {paySummary?.paymentMode}
                                </Tag>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={10}>
                                <Text mark>
                                    {paySummary?.total.toLocaleString('en-IN', {
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

            {
                paySummary?.payType == 'EXPENSE' && <Table columns={expenseColumns}
                    dataSource={paySummary?.expenseItems}
                    pagination={{
                        pageSize: 10, hideOnSinglePage: true, showTotal(total, range) {
                            return `${range[0]}-${range[1]} of ${total} items`
                        }
                    }} scroll={{ y: 340 }}
                    summary={() => (
                        <Table.Summary fixed={'bottom'} >
                            <Table.Summary.Row >
                                <Table.Summary.Cell colSpan={4} index={1}>
                                    Pay Mode :  <Tag color={paySummary?.paymentMode == "CASH" ? "green" : "cyan"}>
                                        {paySummary?.paymentMode}
                                    </Tag>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={10}>
                                    <Text mark>
                                        {paySummary?.total.toLocaleString('en-IN', {
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
        </Space>

    </>);
}