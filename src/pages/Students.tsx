import { Row, Col, Button } from "antd"
import Search from "antd/es/input/Search"
import { Link } from "react-router-dom"
import { BasicDetails } from "../shared/component/BasicDetails"
import { StudentBasicDetails } from "../shared/component/StudentBasicDetails"

export const StudentPage = () => {

    return (<>
        <Row>
            <Col span={1} >
                <Link to="/onboarding" state={{
                    type: 'student'
                }}>
                    <Button type="primary" htmlType="submit">
                       New Admission
                    </Button>
                </Link>
            </Col>
            <Col span={6} offset={16}>
                    <Search placeholder="Student Name / ID" enterButton="Search" allowClear size="large" />
                </Col>
        </Row>
        <StudentBasicDetails/>
    </>)
}