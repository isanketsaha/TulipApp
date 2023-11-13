import { Space, Tag } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { IDuesPayment } from "../../interface/IDuesPayment"
import { IPayDetailsSummary } from "../../interface/IPayDetailsSummary"

export const Dues: FC<{ data: IPayDetailsSummary[] }> = (props) => {
  let navigate = useNavigate()
  const columns: ColumnsType<IPayDetailsSummary> = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
      render: (_, record, item) => <Link to={`../studentDetails/${record.studentId}`}>{record.studentName}</Link>,
    },
    {
      title: "Due Date",
      dataIndex: ["dues", "dueDate"],
      key: "dueDate",
    },
    {
      title: "Paid Amount",
      dataIndex: ["dues", "duesPayment"],
      key: "paidAmount",
      render: (duePayment: IDuesPayment[]) =>
        duePayment
          .reduce((sum, a) => sum + a.amount, 0)
          .toLocaleString("en-IN", {
            maximumFractionDigits: 2,
            style: "currency",
            currency: "INR",
          }),
    },
    {
      title: "Due Amount",
      dataIndex: ["dues", "dueAmount"],
      key: "amount",
      render: (value) =>
        value.toLocaleString("en-IN", {
          maximumFractionDigits: 2,
          style: "currency",
          currency: "INR",
        }),
    },

    {
      title: "Status",
      key: "status",
      dataIndex: ["dues", "status"],
      render: (status) => <Tag color={status == "PAID" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              navigate(`/duePayment/${_.paymentId}`)
            }}
          >
            Payment
          </a>
          <Link to={`/purchaseSummary/${record.paymentId}`}>Details</Link>
        </Space>
      ),
    },
  ]

  return <Table<IPayDetailsSummary> columns={columns} dataSource={props.data} />
}
