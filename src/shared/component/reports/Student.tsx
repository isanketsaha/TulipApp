import { Row, Col, Statistic, Divider, Typography, Space } from "antd"
import { useFetchStudentReportQuery } from "../../redux/api/feature/report/api"
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export const StudentReport = () => {
    const { Text } = Typography;

    const { data } = useFetchStudentReportQuery()
    return (<>

        <Row gutter={16}>
            <Col span={10} offset={4}>
                <h3>Active Student</h3>
            </Col>
            <Col span={10}>
                <Text type="success" style={{ fontSize: 'xxx-large' }}>{data?.schoolStrength} </Text>
            </Col>
        </Row>
        <Divider>Admission</Divider>
        <Row gutter={16}>
            <Col span={10} offset={2}>
                <Statistic prefix={<ArrowUpOutlined />} valueStyle={{ color: 'orange' }} suffix ={ <div style={{marginLeft:'3vmin', color: 'red'}}><>{data?.withdrawnThisWeek}</><ArrowDownOutlined /></div>}  title="Current Week" value={data?.admissionThisWeek} />
            </Col>
            <Col span={10} offset={2}>
            <Row>
                <Statistic prefix={<ArrowUpOutlined />}  valueStyle={{ color: 'orange' }} suffix ={ <div style={{marginLeft:'3vmin', color: 'red'}}><>{data?.withdrawnThisMonth}</><ArrowDownOutlined /></div>} title="Current Month" value={data?.admissionThisMonth} />
                </Row>
            </Col>
        </Row>


    </>)
}