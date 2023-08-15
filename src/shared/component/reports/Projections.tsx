import { Card, DatePicker, Row, Col, Typography, Divider } from "antd"
import dayjs from "dayjs"
import { useMrrQuery, useYrrQuery } from "../../redux/api/feature/vizualize/api"

export const Projections = () => {
  const { data: mrr } = useMrrQuery()
  const { data: yrr } = useYrrQuery()

  return (
    <Card
      title="Projected Recurring Revenue"
      bordered={false}
      extra={
        <DatePicker
          format={"MMM-YYYY"}
          onChange={(d) => console.log(d)}
          picker="month"
          disabled={true}
          defaultValue={dayjs(new Date())}
        />
      }
    >
      <Row justify={"space-around"} align={"middle"} style={{ textAlign: "center" }}>
        <Col>
          <h4>YEARLY</h4>
          <Typography.Text type="success" style={{ fontSize: "x-large" }}>
            {yrr?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "INR",
            })}
          </Typography.Text>
        </Col>
        <Divider type="vertical" style={{ height: "15vmin" }} />
        <Col>
          <h4>MONTHLY</h4>
          <Typography.Text type="success" style={{ fontSize: "x-large" }}>
            {mrr?.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "INR",
            })}
          </Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}
