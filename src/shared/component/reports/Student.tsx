import { Row, Col, Statistic, Divider, Typography, Space, Button } from "antd"
import { useFetchStudentReportQuery } from "../../redux/api/feature/report/api"
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"

export const StudentReport = () => {
  const { Text } = Typography

  const { data } = useFetchStudentReportQuery()
  return (
    <>
      <Row gutter={16}>
        <Col span={10} offset={4}>
          <h2>Active Student</h2>
        </Col>
        <Col span={10}>
          <Text type="success" style={{ fontSize: "xxx-large" }}>
            {data?.schoolStrength}{" "}
          </Text>
        </Col>
      </Row>
      <Divider>
        <Button type="link">Summary</Button>
      </Divider>
      <Row justify={"space-around"}>
        <Statistic
          prefix={<ArrowUpOutlined />}
          valueStyle={{ color: "orange", textAlign: "center" }}
          suffix={
            <div style={{ marginLeft: "3vmin", color: "red" }}>
              <>{data?.withdrawnThisWeek}</>
              <ArrowDownOutlined />
            </div>
          }
          title="Current Week"
          value={data?.admissionThisWeek}
        />

        <Statistic
          prefix={<ArrowUpOutlined />}
          valueStyle={{ color: "orange", textAlign: "center" }}
          suffix={
            <div style={{ marginLeft: "3vmin", color: "red" }}>
              <>{data?.withdrawnThisMonth}</>
              <ArrowDownOutlined />
            </div>
          }
          title="Current Month"
          value={data?.admissionThisMonth}
        />
      </Row>
    </>
  )
}
