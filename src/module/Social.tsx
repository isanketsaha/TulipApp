import { Row, Col, Button, Space } from "antd";
import { DateTime } from "../shared/component/DateTime";
import logo from '../assets/logo.png'
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

export const Social = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
    let navigate = useNavigate();
    return (
        <>
            <Row justify="space-around" align={"middle"}>
                <Col lg={{ span: 2, order: 1, offset: 3 }} md={{ span: 12, order: 2, offset: 6 }} xs={{ span: 12, order: 2, offset: 6 }} >
                    <img width={100} src={logo} />
                </Col>
                <Col lg={{ span: 10, order: 2, offset: 2 }} md={{ span: 20, order: 1, offset: 4 }} xs={{ span: 24, order: 1, offset: 5 }}> {isMobile ? <h2 style={{ fontFamily: 'EB Garamond, serif' }}>Tulip School Managment System </h2>
                    : <h1 style={{ fontFamily: 'EB Garamond, serif' }}>Tulip School Managment System </h1>}
                    <div> <h4 style={{ fontFamily: 'EB Garamond, serif', marginLeft: '4vmin' }}>Shaping the lives of those, who will shape the nation.</h4></div>
                </Col>
                {!isMobile ? <Col lg={{ span: 4, order: 3, offset: 1 }} md={{ span: 12, order: 3, offset: 4 }} ><DateTime /></Col> : null}</Row>
          <Space>
                <Row><Button icon={<FacebookOutlined />}> Facebook</Button></Row>
                <Row><Button icon={<InstagramOutlined />}> instagram</Button></Row>
                </Space>
        </>
    );
}