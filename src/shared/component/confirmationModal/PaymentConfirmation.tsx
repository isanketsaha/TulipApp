import { Table, Tag, Typography } from "antd"
import { IPay } from "../../interface/IPay"


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



    return (<>

        {payData?.payType == 'FEES' &&
            <Table columns={feesColumns}
                dataSource={payData?.feeItem}
                pagination={{
                    pageSize: 10, hideOnSinglePage: true, showTotal(total, range) {
                        return `${range[0]}-${range[1]} of ${total} items`
                    }
                }} scroll={{ y: 240 }}
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
        } </>
    )
}