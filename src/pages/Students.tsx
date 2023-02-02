import { Row, Col, Button, Select } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { StudentBasicDetails } from "../shared/component/StudentBasicDetails"
import { useSearchStudentByNameQuery } from "../shared/redux/api/feature/student/api"
import { useState } from "react"
import { useDebounce } from "../shared/hook/useDebounce"

export const StudentPage = () => {
    let navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchValue, 500);
    const { data, isFetching } = useSearchStudentByNameQuery(debouncedSearchTerm,{ skip: debouncedSearchTerm == "" });

    return (<>
        <Row >
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
                <Select
                    allowClear
                    showSearch placeholder="Student Name" size="large"
                    onSelect={(id)=>navigate(`../studentDetails/${id}`)}
                    onSearch={(value) => setSearchValue(value)} loading={isFetching} showArrow={false}
                    filterOption={false} style={{ width: '100%' }} notFoundContent={null} options={data?.map((d) => ({
                        value: d.id,
                        label: <Button type="link" onClick={()=>navigate(`../studentDetails/${d.id}`)}> {d.name} </Button>,
                    }))} />
            </Col>
        </Row>
        <StudentBasicDetails />
    </>)
}
