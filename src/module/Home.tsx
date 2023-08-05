import { Affix, Layout, theme } from "antd"
import { Content } from "antd/es/layout/layout"
import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { Outlet, useNavigate } from "react-router-dom"
import { AppFooter } from "../shared/component/Footer"
import { AppHeader } from "../shared/component/Header"
import { SideNav } from "../shared/component/SideNav"
import { useAppSelector } from "../store"
import { Role } from "../shared/utils/Role"

export const Home = () => {
  let navigate = useNavigate()
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" })
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  let [collapsed, setCollapsed] = useState<boolean>(false)
  let { user } = useAppSelector((app) => app.userAuth)

  //   useEffect(() => {
  //     if (user?.authority == Role.STAFF) {
  //       navigate(`/office`)
  //     }
  //   }, [])

  return (
    <Layout>
      <Affix offsetTop={20}>
        <AppHeader />
      </Affix>
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
