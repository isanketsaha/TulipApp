import { Button, Card, Col, Descriptions, Divider, Empty, List, Modal, Row, Space, Switch, Table, Tag, Typography, Upload, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { BasicDetails } from "../shared/component/BasicDetails";
import { useBasicSearchByIdQuery } from "../shared/redux/api/feature/student/api";
import { IBasicDetails } from "../shared/interface/IBasicDetails";
import { useDeletePaymentMutation, useEditPaymentMutation, useFetchPaymentDetailsByIdQuery } from "../shared/redux/api/feature/payment/api";
import dayjs from "dayjs";
import { useAppSelector } from "../store";
import { Role } from "../shared/utils/Role";
import { PrinterOutlined, ExclamationCircleFilled, DeleteTwoTone } from '@ant-design/icons';
import { usePrintReceiptMutation } from "../shared/redux/api/feature/exports/api";
import { ColumnsType } from "antd/es/table";
import { IFeesItemSummary } from "../shared/interface/IFeesItemSummary";
import { IPurchaseItemSummary } from "../shared/interface/IPurchaseItemSummary";
import { uploadProps } from "../configs/UploadConfig";
import { Dues } from "../shared/interface/IDues";
import { IPayDetailsSummary } from "../shared/interface/IPayDetailsSummary";

export const PurchaseSummary = () => {
    const { confirm } = Modal;
    const { Text } = Typography;
    const { id } = useParams();
    const { user } = useAppSelector(state => state.userAuth);

    const printReceiptAvailable = ['FEES', 'PURCHASE']

    const deleteAllowedRole = [Role.ADMIN, Role.PRINCIPAL];
    const [printReceipt] = usePrintReceiptMutation();
    const { data: paySummary } = useFetchPaymentDetailsByIdQuery(id ?? ''
        , { skip: id == undefined });
    const [editPayment] = useEditPaymentMutation();
    const [deletePayment] = useDeletePaymentMutation();
    const { data: item } = useBasicSearchByIdQuery(String(paySummary?.studentId) ?? '', { skip: !paySummary?.studentId });

    const showDeleteConfirm = (isLineItem: boolean, lineItem: string, itemId: number, purchaseType: string) => {
        confirm({
            title: isLineItem ? `Are you sure to delete ${lineItem} from this transaction ?` :
                'Are you sure to delete the transaction ?',
            icon: <ExclamationCircleFilled />,
            content: 'This action is dangerous',
            okText: 'Yes',
            centered: true,
            okType: 'danger',
            cancelText: 'No',
            width: 600,
            autoFocusButton: "cancel",
            onOk() {
                isLineItem ? onDelete(itemId, purchaseType) : deletePayment(itemId).then(
                    message.info('Transaction deleted succesfully.'))
            }
        });
    };

    const onDelete = (lineItemId: number, purchaseType: string) => {
        editPayment({
            paymentId: paySummary?.paymentId ?? 0,
            itemId: lineItemId,
            payTypeEnum: purchaseType
        }).then(info =>
            message.info('Updated order succesfully.'))
    }
    const feesColumns = [
      {
        title: "Fees Name",
        dataIndex: "feesTitle",
        key: "feesTitle",
        render: (item: string) => item.toUpperCase(),
        width: "25%",
      },
      {
        title: "Month",
        dataIndex: "month",
        key: "month",
      },
      {
        title: "Fees Type",
        dataIndex: "applicableRule",
        key: "applicableRule",
        responsive: ["md"],
      },
      {
        title: " Unit Price",
        dataIndex: "unitPrice",
        key: "unitPrice",
        responsive: ["md"],
        render: (item: number) => {
          return item.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          })
        },
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (item: number) => {
          return item.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          })
        },
      },
      {
        title: "Action",
        key: "action",
        responsive: ["md"],
        hidden: user?.authority && !deleteAllowedRole.includes(user?.authority),
        render: (_: any, record: any) => (
          <Space size="middle">
            <a onClick={() => showDeleteConfirm(true, record.feesTitle, record.itemId, "FEES")}>Delete</a>
          </Space>
        ),
      },
    ].filter((item) => !item.hidden)


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
            responsive: ['md'],
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
            responsive: ['md'],
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
            responsive: ['md'],
            hidden: user?.authority && !deleteAllowedRole.includes(user?.authority),
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a onClick={() => showDeleteConfirm(true, record.productTitle, record.itemId, 'PURCHASE')}>Delete</a>
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
            width: '20%',

        },
        {
            title: ' Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',

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

    const dueDetailsRow = (pay: IPayDetailsSummary) => {
        return (<Table.Summary.Row >
            <Table.Summary.Cell colSpan={1} index={1}>
                <Tag color={"violet"}>
                    Dues
                </Tag>
            </Table.Summary.Cell>
            <Table.Summary.Cell colSpan={1} index={1}>
                Due Date : {dayjs(pay.dues.dueDate).format('DD/MM/YYYY')}
            </Table.Summary.Cell>

            <Table.Summary.Cell colSpan={2} index={10}>
                <Text>
                    Approved : {pay.dues.approvedBy.toUpperCase()}
                </Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell colSpan={1} index={10}>
                <Text mark>
                    -{(Number(pay.dues.dueAmount)).toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'INR'
                    })}
                </Text>
            </Table.Summary.Cell>
            <Table.Summary.Cell colSpan={2} index={10}>
                <Tag color={pay.dues.status == 'PAID' ? 'green' : 'red'}>
                    {pay.dues.status}
                </Tag>
            </Table.Summary.Cell>
        </Table.Summary.Row>);
    }

    return (<>
        {paySummary ?
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Divider>Payment Summary</Divider>
                <Card key={item?.id}>
                    {paySummary?.payType != 'EXPENSE' && <><BasicDetails data={item ?? {} as IBasicDetails} key={item?.id} />
                        <Divider></Divider>
                    </>
                    }

                    <Descriptions>
                        <Descriptions.Item span={1} label="Transaction Id">
                            {user?.authority && [Role.ADMIN].includes(user?.authority) ? <Space style={{ marginTop: '-5px' }} size={"large"} >
                                {paySummary?.paymentId}
                                <Button type="text" icon={<DeleteTwoTone twoToneColor="red" />} onClick={() =>
                                    showDeleteConfirm(false, '', paySummary?.paymentId, '')}> DELETE </Button>
                            </Space> : paySummary?.paymentId}
                        </Descriptions.Item>
                        <Descriptions.Item span={1} label="Date Time"> {dayjs(paySummary?.paymentDateTime).format('dddd, MMMM D, YYYY h:mm A')}</Descriptions.Item>

                        <Descriptions.Item span={1} label="Purchase Type"> <Space style={{ marginTop: '-5px' }}> <Tag color={"purple"}>
                            {paySummary?.payType}
                        </Tag> {paySummary?.payType && printReceiptAvailable.includes(paySummary?.payType)
                            && <Button type="text" onClick={() => id && printReceipt(id)} icon={<PrinterOutlined />}>Reciept</Button>}</Space></Descriptions.Item>
                    </Descriptions>

                    {paySummary.docs?.length > 0 &&

                        <Upload className="upload-row" {...uploadProps()}
                            fileList={paySummary.docs}
                            listType="text" />}
                </Card>
                {paySummary?.payType == 'FEES' && <Table<IFeesItemSummary> columns={feesColumns as ColumnsType<IFeesItemSummary>}
                    dataSource={paySummary?.feesItem}
                    pagination={{
                        pageSize: 10, hideOnSinglePage: true, showTotal(total, range) {
                            return `${range[0]}-${range[1]} of ${total} items`
                        }
                    }} scroll={{ y: 340 }}
                    summary={() => (
                        <Table.Summary fixed={'bottom'} >
                            {paySummary?.dueOpted && dueDetailsRow(paySummary)}
                            <Table.Summary.Row >

                                <Table.Summary.Cell colSpan={2} index={1}>
                                    Recieved by :  <Tag color="purple">
                                        {paySummary?.createdBy}
                                    </Tag>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell colSpan={2} index={1}>
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

                {(paySummary?.payType == 'PURCHASE') && <Table<IPurchaseItemSummary> columns={purchaseColumns as ColumnsType<IPurchaseItemSummary>}
                    dataSource={paySummary?.purchaseItems}
                    pagination={{
                        pageSize: 10, hideOnSinglePage: true, showTotal(total, range) {
                            return `${range[0]}-${range[1]} of ${total} items`
                        }
                    }} scroll={{ y: 340 }}
                    summary={() => (
                        <Table.Summary fixed={'bottom'} >
                            {paySummary?.dueOpted && dueDetailsRow(paySummary)}
                            <Table.Summary.Row >
                                <Table.Summary.Cell colSpan={2} index={1}>
                                    Recieved by :  <Tag color="purple">
                                        {paySummary?.createdBy}
                                    </Tag>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell colSpan={2} index={1}>
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
                                    <Table.Summary.Cell colSpan={1} index={1}>
                                        Pay Mode :  <Tag color={paySummary?.paymentMode == "CASH" ? "green" : "cyan"}>
                                            {paySummary?.paymentMode}
                                        </Tag>
                                    </Table.Summary.Cell>

                                    <Table.Summary.Cell colSpan={1} index={1}>
                                        Paid by :  <Tag color="purple">
                                            {paySummary?.createdBy}
                                        </Tag>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell colSpan={1} index={1}>
                                        {paySummary?.comments ? <Tag color="default">
                                            {paySummary?.comments}
                                        </Tag> : ""}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell colSpan={1} index={1}>
                                        Recieved By :
                                        <Tag color="blue" style={{ marginLeft: '1vmin' }}>
                                            {paySummary.expenseItems[0].receivedBy}
                                        </Tag>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>
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

                {paySummary.dueOpted && <>
                    <Divider>Due Payments</Divider>
                    <Card>
                    <List
                        bordered
                        dataSource={paySummary.dues.duesPayment}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta description={
                                    <Row justify={"space-around"}>
                                        <Col span={6}>
                                            {dayjs(item.createdDate).format('DD/MM/YYYY')}
                                        </Col>

                                        <Col span={6}>
                                            <Tag>
                                            {item.paymentMode}
                                            </Tag>
                                        </Col>
                                        <Col span={6}>
                                            Fine - {item.penalty}
                                        </Col>
                                        <Col span={6}>
                                            Amount - {item.amount}
                                        </Col>
                                    </Row>}></List.Item.Meta>

                            </List.Item>
                        )}
                    />
                    </Card>
                </>}
            </Space> :
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"No Transaction found."} />
        }

    </>);
}