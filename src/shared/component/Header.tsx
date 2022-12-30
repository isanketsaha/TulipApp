import { Col, Row, Select } from "antd"
import { Header } from "antd/es/layout/layout"
import { DateTime } from "./DateTime"
import { useState } from "react"
import MenuItem from "antd/es/menu/MenuItem"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store"


export const AppHeader = () => {

    const selectList = useAppSelector(state => state.commonData);
    


    const [selectedFinancialYear, setSelectedFinancialYear] = useState<MenuItem>();

    return (
        <Header className="header" style={{ background: '#800000', color: 'white' }} >
            <Row style={{ marginTop: '-2vh' }}>
                <Col >
                    <Link to="/">

                        <h1 style={{ fontFamily: 'EB Garamond, serif', fontSize: 'xx-large', color: 'white' }}>Tulip English School </h1>

                    </Link>
                </Col>
                <Col span={2} offset={12}>
                    <Select
                        style={{ width: '100%', marginTop: '4vh' }}
                        value={selectList.selectedSession}
                        options={selectList.sessionList}
                    />
                </Col>
                <Col offset={3}>
                    <DateTime />
                </Col>
            </Row>
        </Header>
    )
} 