import { Col, Empty, List, Row, Select, Space, Table, Tag, Typography } from "antd";
import { useFetchTransactionHistoryQuery } from "../../redux/api/feature/report/api";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import VirtualList from 'rc-virtual-list';
import { IPayDetailsSummary } from "../../interface/IPayDetailsSummary";
import { FilterOutlined, FileTextTwoTone, BellTwoTone } from '@ant-design/icons';
import { useMediaQuery } from "react-responsive"

interface ITransactionProps {
  transactionDate: Dayjs
}

export const TransactionReport = ({ transactionDate }: ITransactionProps) => {
  const [totalCollection, setTotalCollection] = useState(0)
  const { data: transactionReport } = useFetchTransactionHistoryQuery(transactionDate.format("YYYY-MM-DD"))
  const [transaction, setTransactions] = useState<IPayDetailsSummary[]>(transactionReport ?? [])
  useEffect(() => {
    if (transactionReport) {
      setTransactions(transactionReport)
    }
  }, [transactionReport])

  useEffect(() => {
    let total = 0
    transaction.forEach((item: IPayDetailsSummary) => (total += item.total))
    setTotalCollection(total)
  }, [transaction])

  return (
    <>
      {transaction.length > 0 ? (
        <List
          header={
            transaction.length > 0 ? (
              <Row>
                <Col md={{ span: 4, offset: 12 }} xs={{ span: 0 }}>
                  {" "}
                  <Select
                    placeholder={"Filter"}
                    style={{ width: "100%" }}
                    suffixIcon={<FilterOutlined />}
                    bordered={false}
                    allowClear={true}
                    onClear={() => setTransactions(transactionReport ?? [])}
                    onSelect={(item) =>
                      setTransactions(transactionReport?.filter((val) => val.paymentMode === item) ?? [])
                    }
                    options={[...new Set(transactionReport?.map((item) => item.paymentMode))]?.flatMap((item) => {
                      return { value: item, label: item }
                    })}
                  />
                </Col>
                <Col md={{ span: 3, offset: 2 }} xs={{ span: 16, offset: 5 }}>
                  <Typography.Text mark>
                    {totalCollection.toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                      style: "currency",
                      currency: "INR",
                    })}
                  </Typography.Text>
                </Col>
              </Row>
            ) : null
          }
          bordered
        >
          <VirtualList height={150} fullHeight={true} data={transaction} itemKey="transaction">
            {(item: IPayDetailsSummary, index) => (
              <List.Item key={index} actions={[<Link to={`/purchaseSummary/${item.paymentId}`}>Details</Link>]}>
                <List.Item.Meta
                  key={index}
                  description={
                    <Row justify={"space-between"} align={"middle"}>
                      <Col md={{ span: 1 }} xs={{ span: 0 }}>
                        {index + 1}.
                      </Col>

                      <Col md={{ span: 6 }}>{dayjs(item.paymentDateTime).format("MMM D, YYYY h:mm A")}</Col>

                      <Col md={{ span: 5 }}>
                        <Space>
                          {item.payType != "EXPENSE" ? (
                            <Link to={`../studentDetails/${item.studentId}`}>{item.studentName}</Link>
                          ) : (
                            <>{item.expenseItems[0].receivedBy}</>
                          )}
                          {item.docs?.length > 0 && <FileTextTwoTone />}
                        </Space>
                      </Col>
                      <Col md={{ span: 2 }}>
                        <Tag color={item?.payType == "FEES" ? "purple" : "volcano"}>{item.payType}</Tag>
                      </Col>

                      <Col md={{ span: 2, offset: 1 }}>
                        <Tag color={item?.paymentMode == "CASH" ? "green" : "cyan"}> {item.paymentMode} </Tag>
                      </Col>

                      {item.dueOpted && (
                        <Col md={{ span: 2, offset: 1 }}>
                          (
                          <>
                            <> -{item.dues.dueAmount} </>
                            <BellTwoTone twoToneColor="#eb2f96" />
                          </>
                          )
                        </Col>
                      )}
                      <Col md={{ span: 3, offset: 1 }}>
                        {item.total.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                          style: "currency",
                          currency: "INR",
                        })}
                      </Col>
                    </Row>
                  }
                ></List.Item.Meta>
              </List.Item>
            )}
          </VirtualList>
        </List>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={"No recorded transactions."} />
      )}
    </>
  )
}