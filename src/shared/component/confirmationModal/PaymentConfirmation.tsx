import { Table, Tag, Typography } from "antd"
import { IPay } from "../../interface/IPay"
import dayjs from "dayjs";


interface IPaymentConfirmProps {
    payData: IPay
}
export const PaymentConfirmation = ({ payData }: IPaymentConfirmProps) => {

    const { Text } = Typography;

    const feesColumns = [
        {
            title: 'Fees',
            dataIndex: 'feesTitle',
            key: 'feesTitle',
        },
        {
            title: 'Month',
            dataIndex: 'month',
            key: 'month',
        },
        {
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
            dataIndex: 'size',
            key: 'size',
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



    return (<>

        {payData?.payType == 'FEES' &&
            <Table columns={feesColumns}
                dataSource={payData?.feeItem}
                pagination={{
                    pageSize: 10, hideOnSinglePage: true, showTotal(total, range) {
                        return `${range[0]}-${range[1]} of ${total} items`
                    }
                }} scroll={{ y: 500 }}
                summary={() => (
                    <Table.Summary fixed={'bottom'} >
                        {payData?.dueOpted && <Table.Summary.Row >
                            <Table.Summary.Cell colSpan={1} index={1}>
                                <Tag color={"violet"}>
                                    Dues
                                </Tag>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={1} index={1}>
                                {dayjs(payData.dueInfo.paymentDate).format('DD/MM/YYYY')}
                            </Table.Summary.Cell>

                            <Table.Summary.Cell colSpan={1} index={10}>
                                <Text>
                                    {payData.dueInfo.approvedBy}
                                </Text>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={1} index={10}>
                                <Text mark>
                                    -{(Number(payData.dueInfo.dueAmount)).toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                        style: 'currency',
                                        currency: 'INR'
                                    })}
                                </Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>}
                        {/* {<Table.Summary.Row >
                            <Table.Summary.Cell colSpan={3} index={1}>
                                Pay Mode :  <Tag color={payData?.paymentMode == "CASH" ? "green" : "cyan"}>
                                    {payData?.paymentMode}
                                </Tag>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={1}  index={10}>
                                <Text mark>
                                    {payData?.total.toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                        style: 'currency',
                                        currency: 'INR'
                                    })}
                                </Text>
                            </Table.Summary.Cell>
                        </Table.Summary.Row>} */}
                        <Table.Summary.Row >
                            <Table.Summary.Cell colSpan={3} index={1}>
                                Pay Mode :  <Tag color={payData?.paymentMode == "CASH" ? "green" : "cyan"}>
                                    {payData?.paymentMode}
                                </Tag>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell colSpan={1} index={1}>
                                {payData?.total.toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}
                            </Table.Summary.Cell>
                        </Table.Summary.Row>

                    </Table.Summary>
                )}

            />}

        {(payData?.payType == 'PURCHASE') && <Table columns={purchaseColumns}
            dataSource={payData?.purchaseItems}
            pagination={{
                pageSize: 10, hideOnSinglePage: true, showTotal(total, range) {
                    return `${range[0]}-${range[1]} of ${total} items`
                }
            }} scroll={{ y: 240 }}
            summary={() => (
                <Table.Summary fixed={'bottom'} >
                    {payData?.dueOpted && <Table.Summary.Row >
                        <Table.Summary.Cell colSpan={1} index={1}>
                            <Tag color={"violet"}>
                                Dues
                            </Tag>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={1} index={1}>
                            {dayjs(payData.dueInfo.paymentDate).format('DD/MM/YYYY')}
                        </Table.Summary.Cell>

                        <Table.Summary.Cell colSpan={2} index={10}>
                            <Text>
                                {payData.dueInfo.approvedBy}
                            </Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={1} index={10}>
                            <Text mark>
                                -{(Number(payData.dueInfo.dueAmount)).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}
                            </Text>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>}
                    <Table.Summary.Row >
                        <Table.Summary.Cell colSpan={4} index={1}>
                            Pay Mode :  <Tag color={payData?.paymentMode == "CASH" ? "green" : "cyan"}>
                                {payData?.paymentMode}
                            </Tag>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={1} index={10}>
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
        } </>
    )
}