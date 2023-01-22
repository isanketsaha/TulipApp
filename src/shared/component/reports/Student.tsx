import { Row, Col, Statistic, Divider, Typography } from "antd"
import { useFetchStudentReportQuery } from "../../redux/api/feature/report/api"

export const StudentReport = () => {
const { Text } = Typography;

    const { data } = useFetchStudentReportQuery()
    return (<>

        <Row gutter={16}>
            <Col span={10} offset={4}>
                <h3>Active Student</h3>
            </Col>
            <Col span={10}>
                <Text type="success" style={{ fontSize:  'xxx-large'}}>{data?.schoolStrength} </Text>
            </Col>
        </Row>
        <Divider>Admission</Divider>
        <Row gutter={16}>
            <Col span={10} offset={2}>
                <Statistic title="Current Week" value={data?.studentAdmissionCountThisWeek} />
            </Col>
            <Col span={12}>

                <Statistic title="Current Month" value={data?.studentAdmissionCountThisMonth} />
            </Col>
        </Row>


    </>)
}