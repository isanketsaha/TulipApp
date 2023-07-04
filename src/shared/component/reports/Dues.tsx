import Table, { ColumnsType } from "antd/es/table";
import { useAllDuesQuery } from "../../redux/api/feature/payment/api"
import { IPayDetailsSummary } from "../../interface/IPayDetailsSummary";
import { Modal, Space, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IDuesPayment } from "../../interface/IDuesPayment";
import { useState } from "react";
import { useBasicSearchByIdQuery } from "../../redux/api/feature/student/api";
import { BasicDetails } from "../BasicDetails";
import { IBasicDetails } from "../../interface/IBasicDetails";

export const Dues = () => {

  const { data } = useAllDuesQuery();
  let navigate = useNavigate();
  const columns: ColumnsType<IPayDetailsSummary> = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
      render: (_, record, item) => <Link to={`../studentDetails/${record.studentId}`}>{record.studentName}</Link>
    },
    {
      title: 'Due Date',
      dataIndex: ['dues', 'dueDate'],
      key: 'dueDate',
    },
    {
      title: 'Paid Amount',
      dataIndex: ['dues', 'duesPayment'],
      key: 'paidAmount',
      render: (duePayment: IDuesPayment[]) => duePayment.reduce((sum, a) => sum + a.amount, 0).toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
      })
    },
    {
      title: 'Due Amount',
      dataIndex: ['dues', 'dueAmount'],
      key: 'amount',
      render: (value) => value.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
      })
    },

    {
      title: 'Status',
      key: 'status',
      dataIndex: ['dues', 'status'],
      render: (status) => <Tag color={status == 'PAID' ? 'green' : 'red'}>{status}</Tag>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            navigate(`/duePayment/${_.paymentId}`)
          }}>Payment</a>
          <Link to={`/purchaseSummary/${record.paymentId}`}>Details</Link>
        </Space>
      ),
    },
  ];

  return <Table<IPayDetailsSummary> columns={columns} dataSource={data} />
    
}