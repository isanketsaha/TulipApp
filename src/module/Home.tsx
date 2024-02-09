import { Affix, Layout, theme } from "antd"
import { Content } from "antd/es/layout/layout"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { Outlet, useNavigate } from "react-router-dom"
import { AppFooter } from "../shared/component/Footer"
import { AppHeader } from "../shared/component/Header"
import { SideNav } from "../shared/component/SideNav"

export const Home = () => {
  let navigate = useNavigate()
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" })
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  let [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <Layout>
      <Affix offsetTop={20}>
        <AppHeader />
      </Affix>
      <Layout hasSider>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout style={{ marginLeft: isMobile ? 100 : 260, minHeight: "90vh", marginTop: 80, paddingRight: 10 }}>
          <Content
            style={{
              overflow: "initial",
            }}
          >
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </Layout>
  )
}
