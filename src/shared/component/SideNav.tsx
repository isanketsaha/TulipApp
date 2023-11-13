import {
  ExclamationCircleFilled,
  EyeFilled,
  FolderOpenFilled,
  FundFilled,
  HomeOutlined,
  IdcardFilled,
  LogoutOutlined,
  SnippetsFilled,
  UserOutlined,
} from "@ant-design/icons"
import { PiChalkboardTeacher, PiStudentBold } from "react-icons/pi"
import { ImOffice } from "react-icons/im"
import { Avatar, Menu, MenuProps, Modal, Typography, theme } from "antd"
import Sider from "antd/es/layout/Sider"
import React, { useEffect, useState } from "react"
import { BsDatabaseFillGear } from "react-icons/bs"
import { useMediaQuery } from "react-responsive"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store"
import { logout } from "../redux/slices/UserAuthSlice"
import { Role } from "../utils/Role"
import { MdDashboardCustomize, MdOutlineAccountTree } from "react-icons/md"
import { SiGoogleclassroom } from "react-icons/si"

interface nav {
  label: string
  link?: string
  children?: nav[]
  icon?: React.ReactNode
}

interface ISliderProps {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}
export const SideNav = ({ collapsed, setCollapsed }: ISliderProps) => {
  const { confirm } = Modal
  const isMobile = useMediaQuery({ query: "(max-width: 700px)" })
  const { Text } = Typography
  let { pathname } = useLocation()
  const { user } = useAppSelector((state) => state.userAuth)
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  const [path, setPath] = useState<number>(0)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const logoutUser = () => {
    dispatch(logout())
    navigate("/login")
  }

  useEffect(() => {
    if (pathname != "/") {
      const value = navigatons.find((item) => pathname.toUpperCase().split("/").includes(item.label.toUpperCase()))
      value && setPath(navigatons.indexOf(value) + 1)
    } else {
      setPath(1)
    }
  }, [pathname])

  const navigatons: nav[] = [
    {
      label: "Home",
      icon: <MdDashboardCustomize />,
    },
    {
      label: "Office",
      icon: <ImOffice />,
    },
    {
      label: "Students",
      icon: <PiStudentBold />,
    },
    {
      label: "Staffs",
      icon: <PiChalkboardTeacher />,
    },
    {
      label: "Classroom",
      icon: <SiGoogleclassroom />,
    },
    ...(user?.authority && [Role.ADMIN].includes(user?.authority)
      ? [
          {
            label: "Accounts",
            icon: <MdOutlineAccountTree />,
          },
          {
            label: "Data",
            icon: <BsDatabaseFillGear />,
          },
        ]
      : []),
  ]

  const showLogoutConfirm = () => {
    confirm({
      title: `Are you sure to Logout ?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      centered: true,
      cancelText: "No",
      autoFocusButton: "cancel",
      onOk() {
        setTimeout(logoutUser, 300)
      },
    })
  }

  const options: MenuProps["items"] = navigatons.map((item, index) => {
    const key = String(index + 1)
    return {
      key: `${key}`,
      label: item.children ? item.label : <Link to={`/${item.label}`.toLowerCase()}> {item.label} </Link>,
      icon: item.icon,
      children: item.children?.map((item, index) => {
        const key = String(index + 1)
        return {
          key: `${key}`,
          label: <Link to={`/${item.label}`.toLowerCase()}> {item.label} </Link>,
          icon: item.icon,
        }
      }),
    }
  })

  options.push(
    user != null
      ? {
          danger: true,
          key: "logout",
          label: "Logout",
          onClick: showLogoutConfirm,
          icon: <LogoutOutlined />,
          style: {},
        }
      : null
  )

  return (
    <Sider
      width={250}
      breakpoint="lg"
      style={{
        background: colorBgContainer,
        paddingTop: "15vh",
        overflow: "auto",
        minHeight: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div hidden={isMobile && user != null} style={{ textAlign: "center", marginBottom: "3vh" }}>
        <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }} size={150} icon={<UserOutlined />} />
        <div style={{ marginTop: "2vh" }}>
          <Text strong>{user?.userName}</Text>
          <br />
          <Text type="secondary">{user?.authority.split("_")[1]}</Text>
        </div>
      </div>

      <Menu mode="inline" style={{ borderRight: 0 }} selectedKeys={[String(path)]} items={options} />
    </Sider>
  )
}
