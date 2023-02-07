import { Card, Col, Pagination, Row, Space } from "antd";
import { BasicDetails } from "./BasicDetails";
import { useFetchAllStudentQuery } from "../redux/api/feature/student/api";
import { Link } from "react-router-dom";
import { useState } from "react";


export const StudentBasicDetails = () => {

    const [page, setPage] = useState<number>(0);
    const { data } = useFetchAllStudentQuery(page);

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            {data?.content?.map((item, index) => {
                return (<Card title={item.name} key={item.id} extra={<Link to={`../studentDetails/${item.id}`}> Detail</Link>} style={{ width: '100%', margin: '2vh 0' }}>
                    <BasicDetails data={item} key={item.id} />
                </Card>)
            })}
            <Row>
                <Col offset={17} span={7}>
                    <Pagination simple showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`} defaultCurrent={page + 1} pageSize={15} total={data?.totalElements} onChange={(index) => setPage(index - 1)} />
                </Col>
            </Row>
        </Space>
    )
}