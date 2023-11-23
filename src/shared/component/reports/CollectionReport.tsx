import { Button, Col, Divider, Row, Statistic, Typography } from "antd"
import { useFetchSalesReportQuery, useFetchTransportReportQuery } from "../../redux/api/feature/report/api"
import dayjs from "dayjs"
import { useState } from "react"

export const CollectionReport = () => {
  const { Text } = Typography
  const [date, setDate] = useState(dayjs("10/06/2023"))

  const { data } = useFetchSalesReportQuery(date.format("DD/MM/YYYY"))

  return (
    <>
      {data && (
        <>
          <Row gutter={16} justify={"space-around"}>
            <h2>Sales</h2>

            <Text type="success" style={{ fontSize: "xx-large" }}>
              {data &&
                Object.values(data!).reduce(
                  (outerAcc, innerRecord) =>
                    outerAcc + Object.values(innerRecord).reduce((innerAcc, number) => innerAcc + number, 0),
                  0
                )}
            </Text>
          </Row>
          <Divider>
            <Button type="link">Summary</Button>
          </Divider>

          {data &&
            Object.entries(data).map(([key, value]) => {
              return Object.entries(value).map(([innerKey, innerValue]) => {
                return (
                  <Row gutter={16} justify={"space-around"}>
                    <Statistic title={key} value={innerValue} valueStyle={{ textAlign: "center" }} />
                  </Row>
                )
              })
            })}
        </>
      )}
    </>
  )
}
