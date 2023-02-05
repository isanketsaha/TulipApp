import { Col, DatePicker, Row, Select, Space, Table, Tag } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useFetchTransactionReportQuery } from "../../redux/api/feature/account/api";
import { ITransactionReport } from "../../interface/ITransactionReport";
import { ColumnsType } from "antd/es/table";
import { render } from "sass";

interface IFinanceReportProps {
    from: string,
    to: string
}

export const FinanceReport = ({ from, to }: IFinanceReportProps) => {

    const { data: financeReportData } = useFetchTransactionReportQuery({
        page: 0,
        data: { fromDate: from, toDate: to }
    });
    
    const columns : ColumnsType<ITransactionReport> = [
        {
            title: 'Date',
            dataIndex: 'transactionDate',
            key: 'transactionDate',
            sorter: (a, b) => (new Date(a.transactionDate).getTime()) - (new Date(b.transactionDate).getTime()),
            render: (item) => dayjs(item).format("DD/MMM/YYYY")
        },
        {
            title: 'Fees',
            dataIndex: 'fees',
            key: 'fees',
            render: (item) => <Tag color={"green"} >{item}</Tag>
        },
        {
            title: 'Purchase',
            dataIndex: 'purchase',
            key: 'purchase',
            render: (item) => <Tag color={"blue"} >{item}</Tag>
        },
        {
            title: 'Expense',
            dataIndex: 'expense',
            key: 'expense',
            render: (item) => <Tag color={"volcano"} >{item}</Tag>
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            sorter: (a, b) => a.total - b.total
        },
    ];

    return (<>
        <Space direction="vertical" style={{ width: '100%' }}>
            <Row>
                <Col span={4} offset={20}>
                    <Select style={{ width: '100%' }} options={[]}></Select>
                </Col>
            </Row>
          <Table<ITransactionReport> dataSource={financeReportData} columns={columns} />
        </Space>
    </>)
}