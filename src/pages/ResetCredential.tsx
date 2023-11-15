import { Affix, Alert, Button, Card, Col, Form, Input, Layout, Row, Space } from "antd"
import { AppFooter } from "../shared/component/Footer"
import { AppHeader } from "../shared/component/Header"
import { useAppDispatch, useAppSelector } from "../store"
import { useResetPasswordMutation } from "../shared/redux/api/feature/profile/api"
import { logout } from "../shared/redux/slices/UserAuthSlice"
import { useNavigate } from "react-router-dom"

export const ResetCredential = () => {
  const { user } = useAppSelector((app) => app.userAuth)
  const [resetPassword] = useResetPasswordMutation()
  const dispatch = useAppDispatch()
  let navigate = useNavigate()

  const onSubmit = (value: any) => {
    const payload = {
      userId: user?.userId || "",
      password: value.newPassword,
    }
    resetPassword(payload).then((res: any) => {
      if (!res.error) dispatch(logout()) && navigate("/login")
    })
  }

  return (
    <Layout>
      <Affix offsetTop={20}>
        <AppHeader />
      </Affix>
      <Row style={{ minHeight: "80vmin" }} justify="space-around" align="middle">
        <Col lg={8} md={12} sm={4}>
          <Card style={{ width: "100%" }} title="Reset Password">
            <Space direction="vertical" style={{ width: "100%" }}>
              {/* <div hidden={!isError}>
                <Alert message={(error as any)?.data?.detail} type="error" closable />
              </div> */}
              <Form
                name="resetPassword"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 18 }}
                onFinish={onSubmit}
                autoComplete="off"
              >
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  validateDebounce={500}
                  rules={[
                    { required: true, message: "Confirm your password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value && getFieldValue("newPassword") === value) {
                          return Promise.resolve()
                        } else {
                          return Promise.reject(new Error("Password didn't match!"))
                        }
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Row align={"middle"}>
                  <Col md={{ span: 4, offset: 8 }} xs={{ span: 2, offset: 4 }}>
                    <Button type="default" htmlType="reset">
                      Reset
                    </Button>
                  </Col>
                  <Col md={{ span: 8, offset: 2 }} xs={{ span: 2, offset: 6 }}>
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
      <AppFooter />
    </Layout>
  )
}
