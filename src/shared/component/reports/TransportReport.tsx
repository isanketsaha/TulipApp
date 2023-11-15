import { Button, Col, Divider, Row, Statistic, Typography } from "antd"
import { useFetchTransportReportQuery } from "../../redux/api/feature/report/api"

export const TransportReport = () => {
  const { Text } = Typography

  const { data } = useFetchTransportReportQuery()

  return (
    <>
      <Row gutter={16}>
        <Col span={10} offset={4}>
          <h2>Transport Service</h2>
        </Col>
        <Col span={10}>
          <Text type="success" style={{ fontSize: "xxx-large" }}>
            {data && Object.entries(data!).reduce((acc, [key, value]) => acc + value, 0)}
          </Text>
        </Col>
      </Row>
      <Divider>
        <Button type="link">Summary</Button>
      </Divider>
      <Row gutter={16} justify={"space-around"}>
        {data &&
          Object.entries(data!).map(([key, value]) => {
            return <Statistic title={key} value={value} valueStyle={{ textAlign: "center" }} />
          })}
      </Row>
    </>
  )
}
