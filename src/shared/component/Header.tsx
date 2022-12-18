import { Col, Row } from "antd"
import { Header } from "antd/es/layout/layout"
import { DateTime } from "./DateTime"


export const AppHeader = () => {
    return (
        <Header className="header" style={{ background: '#800000', color: 'white' }} >
            <Row style={{ marginTop: '-2vh' }}>
                <Col >
                    <h1 style={{ fontFamily: 'EB Garamond, serif', fontSize: 'xx-large', }}>Tulip English School </h1>
                </Col>
                <Col offset={17}>
                    <DateTime />
                </Col>
            </Row>
        </Header>
    )
} 