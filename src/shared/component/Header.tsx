import { Col, Row, Select } from "antd"
import { Header } from "antd/es/layout/layout"
import { DateTime } from "./DateTime"
import { useFetchAllFinacialYearQuery, useFetchCurrentFinancialYearQuery } from "../redux/api/feature/financialYear/api"


export const AppHeader = () => {

    const { data : currentOption} = useFetchCurrentFinancialYearQuery();
    const { data : allFinacialOption } =  useFetchAllFinacialYearQuery();


    return (
        <Header className="header" style={{ background: '#800000', color: 'white' }} >
            <Row style={{ marginTop: '-2vh' }}>
                <Col >
                    <h1 style={{ fontFamily: 'EB Garamond, serif', fontSize: 'xx-large', }}>Tulip English School </h1>
                </Col>

                <Col span={2} offset={12}>
                    <Select
                    style={{width: '100%',marginTop: '4vh' }}
                        defaultValue="lucy"
                        options={[
                            {
                              value: 'jack',
                              label: 'Jack',
                            },
                            {
                              value: 'lucy',
                              label: 'Lucy',
                            }]}                      
                    />
                </Col>
                <Col offset={3}>


                    <DateTime />
                </Col>

            </Row>
        </Header>
    )
} 