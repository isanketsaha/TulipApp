import { Alert, Button, Card, Checkbox, Col, Form, Input, Row, Space } from "antd"
import { useEffect, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DateTime } from "../shared/component/DateTime"
import { LoginDTO } from "../shared/interface/login";
import { useLoginUserMutation } from "../shared/redux/api/auth/loginApi";
import { login } from "../shared/redux/slices/UserAuth";
import { useAppDispatch, useAppSelector } from "../store";


export const Login = () => {
    let navigate = useNavigate();
   const userAuth = useAppSelector((state) => state?.userAuth);
   const dispatch =  useAppDispatch();
    const [loginUser, {
        data,
        isLoading,
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

    if(userAuth?.idToken != null){
        navigate("/home");
    }

    useMemo(() => {
        dispatch(login(data));
    }, [data])


    return (
        <>
            <Row style={{ marginTop: '3vh' }}>
                <Col span={2} offset={5}>
                    <img width={100} src="../src/assets/logo.png" />
                </Col>
                <Col span={8} offset={2}> <h1 style={{ fontFamily: 'EB Garamond, serif' }}>Tulip School Managment System </h1></Col>
                <Col span={3} offset={3}><DateTime /></Col></Row>
            <div style={{ marginTop: '20vh' }}>
                <Row>

                    <Col span={8} offset={9}>

                        <Card style={{ width: 400 }}>

                            <div hidden={!isError} style={{margin: ' 2vh 0'}}>
                                <Space  direction="vertical" style={{ width: '100%' }}>
                                    <Alert message="Incorect Username or password" type="error" />
                                </Space>
                            </div>

                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ rememberMe: true }}
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
                                <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="default" htmlType="reset" style={{ marginRight: '4vh' }}>
                                        Reset
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div></>
    )
}