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

            <Row justify={isMobile ? "center" : "space-around"} align={"middle"} style={{ borderBottom: '1px solid'}}>
                <Col >
                    <img width={100} src={logo} />
                </Col>
                <Col > {isMobile ? <h2 style={{ fontFamily: 'EB Garamond, serif' }}>Tulip School Managment System </h2>
                    : <h1 style={{ fontFamily: 'EB Garamond, serif', textAlign: "center"  }}>Tulip School Managment System </h1>}
                    <div> <h4 style={{ fontFamily: 'EB Garamond, serif',  textAlign: "center" }}>Shaping the lives of those, who will shape the nation.</h4></div>
                </Col>
                {!isMobile ? <Col ><DateTime /></Col> : null}</Row>
            <div style={{ marginTop: '5vw' }}>
                <Row justify="center" align={"middle"} style={{fontFamily : 'EB Garamond', textAlign: "center"}}>
                Welcome to Tulip English School, where young minds flourish and dreams take flight!
                <br/>
                <br/>
                Stay connected with us for exciting updates, student achievements, and heartwarming stories. <br/>
                Join our educational journey! </Row>
                <div style={{marginTop: '8vmin'}}>
                <Row justify="center" style={{ margin: '2vmin' }}>
                    <Button icon={<FacebookOutlined />} size="large" href="https://www.facebook.com/TulipEnglishSchool" target="_blank"> Facebook</Button>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                    <Button icon={<InstagramOutlined />} size="large" href="https://www.instagram.com/tulipenglishschool" target="_blank"> Instagram</Button>
                </Row>
                </div>
            </div>
        </>
    );
}