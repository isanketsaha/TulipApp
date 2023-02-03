import { Row, Col, Divider, Statistic, Typography } from "antd";
import { useFetchStaffReportQuery } from "../../redux/api/feature/report/api";
import { useEffect, useState } from "react";

export const StaffReport = () => {

    const { Text } = Typography;

    const { data } = useFetchStaffReportQuery();


    return (<>
        <Row gutter={16}>
            <Col span={10} offset={4}>
                <h3>Active Employee</h3>
            </Col>
            <Col span={10}>
                <Text style={{ fontSize: 'xxx-large' }}>{data?.staffCount} </Text>
            </Col>
        </Row>
        <Divider>Summary</Divider>
        <Row gutter={16}>
            <Col span={10} offset={2}>
                <Statistic title={'Staff'} value={data?.staffTypeCount.STAFF} />
            </Col>
            <Col span={10} offset={2}>
                <Statistic title={'Teacher'} value={data?.staffTypeCount.TEACHER} />
            </Col>
        </Row>
    </>);

}