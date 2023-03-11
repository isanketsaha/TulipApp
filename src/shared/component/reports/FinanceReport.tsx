import { Col, DatePicker, Row, Select, Space, Table, Tag } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useFetchTransactionReportQuery } from "../../redux/api/feature/account/api";
import { ITransactionReport } from "../../interface/ITransactionReport";
import { ColumnsType } from "antd/es/table";
import { render } from "sass";
import { useEffect, useState } from "react";

interface IFinanceReportProps {
    from: string,
    to: string
}

export const FinanceReport = ({ from, to }: IFinanceReportProps) => {

    const { data: financeReportData } = useFetchTransactionReportQuery({
        page: 0,
        data: { fromDate: from, toDate: to }
    });


    const columns: ColumnsType<ITransactionReport> = [
        {
            title: 'Date',
            dataIndex: 'transactionDate',
            key: 'transactionDate',
            sorter: (a, b) => (new Date(a.transactionDate).getTime()) - (new Date(b.transactionDate).getTime()),
            render: (item) => dayjs(item).format("DD-MM-YYYY")
        },
        {
            title: 'Fees',
            dataIndex: 'fees',
            key: 'fees',
            render:(item) => item.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            }),
            responsive: ['md']
        },
        {
            title: 'Purchase',
            dataIndex: 'purchase',
            key: 'purchase',
            render: (item) => item.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            }),
            responsive: ['md']
        },
        {
            title: 'Expense',
            dataIndex: 'expense',
            key: 'expense',
            render: (item) => item.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            }),
            responsive: ['md']
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render:(item) => item.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                style: 'currency',
                currency: 'INR'
            }),
            sorter: (a, b) => a.total - b.total
        },
    ];

    return (<>
        <Space direction="vertical" style={{ width: '100%' }}>
            {/* <Row>
                <Col span={4} offset={20}>
                    <Select style={{ width: '100%' }} options={[]}></Select>
                </Col>
            </Row> */}
            <Table<ITransactionReport> dataSource={financeReportData?.reportList} pagination={{ pageSize: 50 }} columns={columns} summary={() => (
                <Table.Summary fixed={'bottom'}>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={3} colSpan={1}>

                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3} colSpan={1}>
                            <Tag color={"purple"} >
                                {financeReportData?.feesTotal.toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</Tag>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3} colSpan={1}>
                        <Tag color={"blue"} >
                            {financeReportData?.purchaseTotal.toLocaleString('en-IN', {
                                maximumFractionDigits: 2,
                                style: 'currency',
                                currency: 'INR'
                            })}
                            </Tag>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3} colSpan={1}>
                        <Tag color={"volcano"} >
                            {financeReportData?.expenseTotal.toLocaleString('en-IN', {
                                maximumFractionDigits: 2,
                                style: 'currency',
                                currency: 'INR'
                            })}</Tag>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={3}>
                        <Tag color={"green"} >
                            {financeReportData?.amountTotal.toLocaleString('en-IN', {
                                maximumFractionDigits: 2,
                                style: 'currency',
                                currency: 'INR'
                            })}
                            </Tag>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                </Table.Summary>
            )}
                sticky />
        </Space>
    </>)
}