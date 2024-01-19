import { Avatar, Button, Card, Col, DatePicker, List, Modal, Row, Space, Typography } from "antd"
import dayjs, { Dayjs } from "dayjs"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useNavigate } from "react-router-dom"
import { AddExpense } from "../shared/component/AddExpense"
import { Dues } from "../shared/component/reports/Dues"
import { TransactionReport } from "../shared/component/reports/TransactionReports"
import { useAllDuesQuery } from "../shared/redux/api/feature/payment/api"
import { Role } from "../shared/utils/Role"
import { useAppSelector } from "../store"
import { StaffReport } from "../shared/component/reports/StaffReport"
import { StudentReport } from "../shared/component/reports/Student"
import { AcademicCalender } from "../shared/component/AcademicCalender"

export const Office = () => {
  const { user } = useAppSelector((app) => app.userAuth)
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" })
  const [transactionDate, setTransactionDate] = useState<Dayjs>(dayjs(new Date()).startOf("date"))
  const [isExpenseModelOpen, setIsExpenseModelOpen] = useState(false)
  const dateFormat = "DD-MMM-YYYY"
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
            <Col span={18}>
              <Card
                style={{ height: "100%" }}
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
            <Col span={6}>
              <Row align={"middle"}>
                <AcademicCalender />
              </Row>
            </Col>
          </Row>

          {data && data?.length > 0 && (
            <Row>
              <Col xs={{ span: 24 }}>
                <Dues data={data} />
              </Col>
            </Row>
          )}
          <Row justify={"space-evenly"} align={"bottom"} gutter={[16, 16]}>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Card>
                <StudentReport />
              </Card>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Card>
                <StaffReport />
              </Card>
            </Col>
          </Row>
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
