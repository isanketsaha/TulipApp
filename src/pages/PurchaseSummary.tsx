import { Card, Descriptions, Divider, Space, Switch, Table, Tag } from "antd";
import { Link, useParams } from "react-router-dom";
import { BasicDetails } from "../shared/component/BasicDetails";
import { useBasicSearchByIdQuery } from "../shared/redux/api/feature/student/api";
import { IUserDetails } from "../shared/interface/IUserDetails";
import { IBasicDetails } from "../shared/interface/IBasicDetails";
import { useState } from "react";
import { useFetchPaymentDetailsByIdQuery } from "../shared/redux/api/feature/payment/api";
import dayjs from "dayjs";

export const PurchaseSummary = () => {
    const { id, payType } = useParams();


    const { data: paySummary } = useFetchPaymentDetailsByIdQuery({
        paymentType: payType ?? '',
        paymentId: Number(id)
    }, { skip: !(payType && id) });

    const { data: item } = useBasicSearchByIdQuery(String(paySummary?.studentId) ?? '', { skip: !paySummary?.studentId });

    const [fixedTop, setFixedTop] = useState(false);

    const feesColumns = [
        {
            title: 'Fees Name',
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
            title: 'Fees Type',
            dataIndex: 'applicableRule',
            key: 'applicableRule',
        }, {
            title: ' Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
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
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        }
    ];


    return (<>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Divider>Purchase Summary</Divider>
            <Card key={item?.id}>
                <BasicDetails data={item ?? {} as IBasicDetails} key={item?.id} />
                <Divider></Divider>
                <Descriptions>
                    <Descriptions.Item label="Recieved by">{paySummary?.paymentReceivedBy}</Descriptions.Item>
                    <Descriptions.Item label="Date Time"> {dayjs(paySummary?.paymentDateTime).format('dddd, MMMM D, YYYY h:mm A')}</Descriptions.Item>

                    <Descriptions.Item label="Purchase Type">  <Tag color={"purple"}>
                                    {paySummary?.payType}
                                </Tag></Descriptions.Item>
                </Descriptions>
            </Card>

            {payType?.toUpperCase() == 'Fees'.toUpperCase() && <Table columns={feesColumns}
                dataSource={paySummary?.feesItem}
                pagination={{ pageSize: 10 }} scroll={{ y: 240 }}
                summary={() => (
                    <Table.Summary fixed={'bottom'} >
                        <Table.Summary.Row >
                            <Table.Summary.Cell colSpan={5} index={1}>
                            Pay Mode :  <Tag color={paySummary?.paymentMode=="CASH" ? "green" : "cyan"}>
                                    {paySummary?.paymentMode}
                                </Tag>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={10}>{paySummary?.total}</Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
                sticky
            />
            }

            {payType?.toUpperCase() == 'PURCHASE'.toUpperCase() && <Table columns={purchaseColumns}
                dataSource={paySummary?.purchaseItems}
                pagination={{ pageSize: 10 }} scroll={{ y: 240 }}
                summary={() => (
                    <Table.Summary fixed={'bottom'} >
                        <Table.Summary.Row >
                            <Table.Summary.Cell colSpan={4} index={1}>
                            Pay Mode :  <Tag color={paySummary?.paymentMode=="CASH" ? "green" : "cyan"}>
                                    {paySummary?.paymentMode}
                                </Tag>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={10}>{paySummary?.total}</Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
                sticky
            />
            }
        </Space>

    </>);
}