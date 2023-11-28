import { Avatar, Button, Card, Col, DatePicker, List, Modal, Row, Space, Typography } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"
import { AddExpense } from "../shared/component/AddExpense"
import { Dues } from "../shared/component/reports/Dues"
import { Stock } from "../shared/component/reports/Stock"
import { TransactionReport } from "../shared/component/reports/TransactionReports"
import { useAllDuesQuery } from "../shared/redux/api/feature/payment/api"
import { Role } from "../shared/utils/Role"
import { useAppSelector } from "../store"
import { useFetchAllTransportCatalogQuery } from "../shared/redux/api/feature/catalog/api"
import { ITransportCatalog } from "../shared/interface/ITransportCatalog"
import VirtualList from "rc-virtual-list"

export const Office = () => {
  const { user } = useAppSelector((app) => app.userAuth)
  const { selectedSession } = useAppSelector((app) => app.commonData)
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" })
  const [transactionDate, setTransactionDate] = useState<Dayjs>(dayjs(new Date()).startOf("date"))
  const [isExpenseModelOpen, setIsExpenseModelOpen] = useState(false)
  const dateFormat = "DD-MMM-YYYY"
  let navigate = useNavigate()
  const { data } = useAllDuesQuery()
  const { data: transport, isLoading } = useFetchAllTransportCatalogQuery(selectedSession.value, {
    skip: !selectedSession.value,
  })

  const disableDate = (currentDate: Dayjs) => {
    return user?.authority == Role.ADMIN
      ? currentDate.isAfter(new Date()) || currentDate.isBefore(dayjs().add(-60, "days"))
      : currentDate.isAfter(new Date()) || currentDate.isBefore(dayjs().add(-7, "days"))
  }

  return (
    <>
      <div className="site-card-wrapper">
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Row gutter={16}>
            <Col span={24}>
              <Card
                title="Collection Report"
                extra={
                  <Space size={"large"}>
                    <DatePicker
                      allowClear={false}
                      format={dateFormat}
                      onChange={(date, dateString) => date && setTransactionDate(date.startOf("date"))}
                      disabledDate={disableDate}
                      defaultValue={dayjs(new Date())}
                    />
                    {isMobile ? null : <Button onClick={() => setIsExpenseModelOpen(true)}>Add Expense</Button>}
                  </Space>
                }
              >
                <TransactionReport transactionDate={transactionDate} />
              </Card>
            </Col>
          </Row>
          <Row justify={"space-between"}>
            <Col span={17}>
              <Stock />
            </Col>
            <Col span={6}>
              <Card loading={isLoading} bordered={false} title="Transport Fees">
                {transport && (
                  <List>
                    <VirtualList data={transport} height={300} itemKey="transportCatalog">
                      {(item: ITransportCatalog) => (
                        <List.Item key={item.id} style={{ borderBlockEnd: 0 }}>
                          <List.Item.Meta title={item.location} />
                          <div>{item.amount}</div>
                        </List.Item>
                      )}
                    </VirtualList>
                  </List>
                )}
              </Card>
            </Col>
          </Row>
          {data && data?.length > 0 && (
            <Row>
              <Col xs={{ span: 24 }}>
                <Dues data={data} />
              </Col>
            </Row>
          )}
        </Space>

        <Modal
          destroyOnClose
          title="Add Expense"
          open={isExpenseModelOpen}
          onCancel={() => setIsExpenseModelOpen(false)}
          maskClosable={false}
          width={1300}
          footer={[]}
        >
          <AddExpense />
        </Modal>
      </div>
    </>
  )
}
