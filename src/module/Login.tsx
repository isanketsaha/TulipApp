import { Alert, Button, Card, Checkbox, Col, Form, Input, Row, Space } from "antd"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "../shared/component/DateTime"
import { LoginDTO } from "../shared/interface/login";
import { useAppDispatch, useAppSelector } from "../store";
import { useLoginUserMutation } from "../shared/redux/api/feature/auth/loginApi";
import logo from '../assets/logo.png'
import { useMediaQuery } from "react-responsive";

export const Login = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
    let navigate = useNavigate();
    const userAuth = useAppSelector((state) => state.userAuth);
    const dispatch = useAppDispatch();
    const [loginUser, {
        data,
        isSuccess,
        isError,
        error,
    }] = useLoginUserMutation();


    const onFinish = (values: any) => {
        console.log('Success:', values);
        auth(values as LoginDTO);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const auth = async (value: LoginDTO) => {
        try {
            await loginUser(value);
        } catch (err) {
            console.error('Failed to save the post: ', err)
        }
    }

    useEffect(() => {
        if (userAuth.user != null) {
            navigate("/", { replace: true });
        }
    }, [userAuth.user])



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
            <div style={{ marginTop: '10vw' }}>
                <Row justify="space-around" align="middle">
                    <Col lg={7} md={12} sm={4} >
                        <Card style={{ width: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <div hidden={!isError}>
                               
                                    <Alert message={(error as any)?.data?.detail} type="error" closable />
                              
                            </div>
                            <Form
                                name="login"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ rememberMe: false }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Row align={"middle"}>
                                    <Col md={{ span: 4, offset: 8 }} xs={{ span: 2, offset: 4 }} >
                                        <Button type="default" htmlType="reset">
                                            Reset
                                        </Button>
                                    </Col>
                                    <Col md={{ span: 8, offset: 2 }} xs={{ span: 2, offset: 6 }} >
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Col>

                                </Row>

                            </Form>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div></>
    )
}