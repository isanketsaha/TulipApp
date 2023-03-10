import { Row, Col, Button, Select } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { StudentBasicDetails } from "../shared/component/StudentBasicDetails"
import { useSearchStudentByNameQuery } from "../shared/redux/api/feature/student/api"
import { useState } from "react"
import { useDebounce } from "../shared/hook/useDebounce"
import { useAppSelector } from "../store"
import { Role } from "../shared/utils/Role"
import { useMediaQuery } from "react-responsive"

export const StudentPage = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
    let navigate = useNavigate();
    const { user } = useAppSelector(state => state.userAuth);
    const [searchValue, setSearchValue] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchValue, 500);
    const { data, isFetching } = useSearchStudentByNameQuery(debouncedSearchTerm, { skip: debouncedSearchTerm == "" });

    return (<>
        <Row >
            {isMobile ? null : <Col span={1} >
                {user?.authority && [Role.ADMIN, Role.PRINCIPAL, Role.STAFF].includes(user?.authority) && <Link to="/admisssion" state={{
                    type: 'student'
                }}>
                    <Button type="primary" htmlType="submit">
                        Student Enrollment
                    </Button>
                </Link>}
            </Col>}
            <Col span={isMobile ? 20 : 6} offset={isMobile ? 2 : 16}>
                <Select
                    allowClear
                    showSearch placeholder="Student Name" size="large"
                    onSelect={(id) => navigate(`../studentDetails/${id}`)}
                    onSearch={(value) => setSearchValue(value)} loading={isFetching} showArrow={false}
                    filterOption={false} style={{ width: '100%' }} notFoundContent={null} options={data?.map((d) => ({
                        value: d.id,
                        label: <Button type="link" onClick={() => navigate(`../studentDetails/${d.id}`)}> {d.name} </Button>,
                    }))} />
            </Col>
        </Row>
        <StudentBasicDetails />
    </>)
}
