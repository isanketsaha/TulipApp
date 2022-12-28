import { Button, Col, Row } from "antd";
import { EmployeeBasicDetails } from "../shared/component/EmployeeBasicDetails";
import { Link } from "react-router-dom";


export const EmployeePage = () => {


    return (
        <>
            <Row>
                <Col offset={20}>
                    <Link to="/onboarding">
                    <Button type="primary" htmlType="submit">
                        Onboard Employee
                    </Button>
                    </Link>
                </Col>
            </Row>
            <EmployeeBasicDetails />
        </>);
}