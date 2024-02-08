import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Space, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { ITransactionReport } from "../../interface/ITransactionReport"
import { useFetchTransactionReportQuery } from "../../redux/api/feature/account/api"
import { TransactionReport } from "./TransactionReports"
import { useMediaQuery } from "react-responsive"

interface IFinanceReportProps {
  selectedRange: Dayjs[]
  selectedTransactionMonth: (val: string[]) => void
}

export const FinanceReport = ({ selectedRange, selectedTransactionMonth }: IFinanceReportProps) => {
  const [monthSelected, setMonthSelected] = useState<Dayjs[]>([])
  const [groupByFilter, setGroupByFilter] = useState<string>("MONTHLY")
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" })
  const { data: financeReportData } = useFetchTransactionReportQuery({
    fromDate:
      groupByFilter == "MONTHLY"
        ? selectedRange[0].format("DD-MM-YYYY")
        : monthSelected[0]?.startOf("month").format("DD-MM-YYYY"),
    toDate:
      groupByFilter == "MONTHLY"
        ? selectedRange[1].endOf("month").format("DD-MM-YYYY")
        : monthSelected[0]?.endOf("month").format("DD-MM-YYYY"),
    groupByType: groupByFilter,
  })

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: ITransactionReport[]) => {
      const selectedMonths = selectedRows.map((item) => dayjs(item.transactionDate).format("YYYY-MM-DD"))
      selectedTransactionMonth(selectedMonths)
    },
  }

  const showMonthTransaction = (row: ITransactionReport) => {
    setMonthSelected([dayjs(row.transactionDate)])
    setGroupByFilter("DAILY")
  }

  const columns: ColumnsType<ITransactionReport> = [
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      sorter: (a, b) => new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime(),
      render: (item) =>
        dayjs(item).format(groupByFilter == "MONTHLY" ? (isMobile ? "MMM-YYYY" : "MMMM-YYYY") : "DD-MMM-YYYY"),
    },
    {
      title: "Fees",
      dataIndex: "fees",
      key: "fees",
      render: (item) =>
        item.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }),
      responsive: ["md"],
    },
    {
      title: "Purchase",
      dataIndex: "purchase",
      key: "purchase",
      render: (item) =>
        item.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }),
      responsive: ["md"],
    },
    {
      title: "Expense",
      dataIndex: "expense",
      key: "expense",
      render: (item) =>
        item.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }),
      responsive: ["md"],
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (item) =>
        item.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }),
      sorter: (a, b) => a.total - b.total,
    },
    Table.EXPAND_COLUMN,
    ...(groupByFilter == "MONTHLY" && !isMobile
      ? [
          {
            title: "Action",
            key: "action",
            render: (_: any, record: ITransactionReport) =>
              groupByFilter == "MONTHLY" ? <a onClick={() => showMonthTransaction(record)}>Show </a> : null,
          },
        ]
      : []),
  ]

  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Table<ITransactionReport>
          rowKey="transactionDate"
          dataSource={financeReportData?.reportList}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          expandable={{
            expandedRowRender: (record) => <TransactionReport transactionDate={dayjs(record.transactionDate)} />,
            rowExpandable: () => groupByFilter != "MONTHLY",
          }}
          pagination={{ pageSize: 50 }}
          columns={columns}
          summary={() =>
            !isMobile && (
              <Table.Summary fixed={"bottom"}>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={3} colSpan={2}>
                    {groupByFilter !== "MONTHLY" ? (
                      <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => {
                          setGroupByFilter("MONTHLY")
                        }}
                      >
                        Back
                      </Button>
                    ) : null}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} colSpan={1}>
                    <Tag color={"purple"}>
                      {financeReportData?.feesTotal.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </Tag>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} colSpan={1}>
                    <Tag color={"blue"}>
                      {financeReportData?.purchaseTotal.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </Tag>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} colSpan={1}>
                    <Tag color={"volcano"}>
                      {financeReportData?.expenseTotal.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </Tag>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <Tag color={"green"}>
                      {financeReportData?.amountTotal.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "INR",
                      })}
                    </Tag>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )
          }
          sticky
        />
      </Space>
    </>
  )
}
