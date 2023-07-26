import { Layout, theme } from "antd"
import { Content } from "antd/es/layout/layout"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"
import { Outlet } from "react-router-dom"
import { AppFooter } from "../shared/component/Footer"
import { AppHeader } from "../shared/component/Header"
import { SideNav } from "../shared/component/SideNav"

export const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" })
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  let [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <Layout>
      <AppHeader />
      <Layout hasSider>
        <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout style={{ marginLeft: !collapsed ? "16vw" : "5vw" }}>
          <Content
            style={{
              margin: isMobile ? "12vh 3vh" : "10vh 3vh",
              overflow: "initial",
              minHeight: "90vh",
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
