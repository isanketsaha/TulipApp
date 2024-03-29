import { Button, Col, Divider, Row, Statistic, Typography } from "antd"
import { useFetchStaffReportQuery } from "../../redux/api/feature/report/api"

export const StaffReport = () => {
  const { Text } = Typography

  const { data } = useFetchStaffReportQuery()

  return (
    <>
      <Row gutter={16}>
        <Col span={10} offset={4}>
          <h2>Active Employee</h2>
        </Col>
        <Col span={10}>
          <Text type="success" style={{ fontSize: "xxx-large" }}>
            {data?.staffCount}{" "}
          </Text>
        </Col>
      </Row>
      <Divider>
        {" "}
        <Button type="link">Summary</Button>
      </Divider>
      <Row gutter={16} justify={"space-around"}>
        <Statistic title={"Staff"} value={data?.staffTypeCount.STAFF} valueStyle={{ textAlign: "center" }} />

        <Statistic title={"Teacher"} value={data?.staffTypeCount.TEACHER} valueStyle={{ textAlign: "center" }} />
      </Row>
    </>
  )
}
