import { Button, Card, Col, DatePicker, Modal, Row, Space } from "antd"
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

export const Office = () => {
  const { user } = useAppSelector((app) => app.userAuth)
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" })
  const [transactionDate, setTransactionDate] = useState<Dayjs>(dayjs(new Date()).startOf("date"))
  const [isExpenseModelOpen, setIsExpenseModelOpen] = useState(false)
  const dateFormat = "DD-MMM-YYYY"
  let navigate = useNavigate()
  const { data } = useAllDuesQuery()

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
          <Row>
            <Col span={24}>
              <Stock />
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
