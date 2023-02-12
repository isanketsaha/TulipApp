import { Card, Descriptions, Divider, Space, Switch, Table, Tag, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { BasicDetails } from "../shared/component/BasicDetails";
import { useBasicSearchByIdQuery } from "../shared/redux/api/feature/student/api";
import { IUserDetails } from "../shared/interface/IUserDetails";
import { IBasicDetails } from "../shared/interface/IBasicDetails";
import { useState } from "react";
import { useFetchPaymentDetailsByIdQuery } from "../shared/redux/api/feature/payment/api";
import dayjs from "dayjs";
import { IFeesItemSummary } from "../shared/interface/IFeesItemSummary";

export const PurchaseSummary = () => {

    const { Text } = Typography;

    const { id } = useParams();


    const { data: paySummary } = useFetchPaymentDetailsByIdQuery(id ?? ''
        , { skip: id == undefined });

    const { data: item } = useBasicSearchByIdQuery(String(paySummary?.studentId) ?? '', { skip: !paySummary?.studentId });

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
        }
    ];


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
        }
    ];

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
            {paySummary?.payType != 'EXPENSE' && <BasicDetails data={item ?? {} as IBasicDetails} key={item?.id} /> }
                <Divider></Divider> 
                <Descriptions>
                    <Descriptions.Item label="Recieved by">{paySummary?.paymentReceivedBy}</Descriptions.Item>
                    <Descriptions.Item label="Date Time"> {dayjs(paySummary?.paymentDateTime).format('dddd, MMMM D, YYYY h:mm A')}</Descriptions.Item>

                    <Descriptions.Item label="Purchase Type">  <Tag color={"purple"}>
                        {paySummary?.payType}
                    </Tag></Descriptions.Item>
                </Descriptions>
            </Card>

            {paySummary?.payType == 'FEES' && <Table columns={feesColumns}
                dataSource={paySummary?.feesItem}
                pagination={{ pageSize: 10, hideOnSinglePage: true, showTotal(total, range) {
                    return `${range[0]}-${range[1]} of ${total} items`
                } }} scroll={{ y: 340 }}
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
                pagination={{ pageSize: 10 ,  hideOnSinglePage: true, showTotal(total, range) {
                    return `${range[0]}-${range[1]} of ${total} items`
                }}} scroll={{ y: 340 }}
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
                pagination={{ pageSize: 10,  hideOnSinglePage: true, showTotal(total, range) {
                    return `${range[0]}-${range[1]} of ${total} items`
                } }} scroll={{ y: 340 }}
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