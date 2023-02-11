import { Menu, MenuProps, Typography, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { HighlightFilled, EditFilled, SnippetsFilled, DashboardFilled, EyeFilled, IdcardFilled, FolderOpenFilled, LogoutOutlined, FundFilled, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../redux/slices/UserAuthSlice";
import { Role } from "/src/Role";
interface nav {
    label: string,
    link?: string,
    children?: nav[],
    icon?: React.ReactNode

}

interface ISliderProps{
    collapsed: boolean
     setCollapsed : (value: boolean) => void
}
export const SideNav = ({collapsed, setCollapsed}: ISliderProps) => {

    const { Text } = Typography;
    const {user} = useAppSelector((state) => state.userAuth);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const logoutUser = () => {
        dispatch(logout());
        navigate("/login");
    }
    const navigatons: nav[] = [
        {
            label: 'Office',
            icon: <SnippetsFilled />,
        },
        {
            label: 'Students',
            icon: <IdcardFilled />,
        }, {
            label: 'Staffs',
            icon: <EyeFilled />,
        }, {
            label: 'Classroom',
            icon: <FolderOpenFilled />,
        }
    ]

    if(user?.authority && [Role.ADMIN].includes(user?.authority)){
        navigatons.push({
            label: 'Accounts',
            icon: <FundFilled />,
        })
    }

    const options: MenuProps['items'] = navigatons.map(
        (item, index) => {
            const key = String(index + 1);
            const url: string = item.label=='Office'?  '/': `/${item.label}`.toLowerCase();
            return {
                key: `${key}`,
                label: (<Link to={url}> {item.label} </Link>),
                icon: item.icon
            };
        },
    );

    options.push(user != null ?
        {
            danger: true,
            key: 'logout',
            label: 'Logout',
            onClick: logoutUser,
            icon: <LogoutOutlined />,
            style: {}


        } : null);

    return (
        <Sider width={250} collapsible collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{
                background: colorBgContainer,
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                paddingTop:'8vh'
            }}>
            <div hidden={collapsed && user != null} style={{  textAlign: 'center' ,margin: '5vh' }} >
                <UserOutlined style={{ fontSize: '15vh' }} />
                <div style={{ marginTop: '2vh' }}>
                    <Text strong>{user?.userName}</Text>
                    <br/>
                    <Text type="secondary">{user?.authority}</Text>
                </div>
            </div>

            <Menu
                mode="vertical"
                style={{ borderRight: 0 }}
                defaultSelectedKeys={['1']}
                items={options}
            />
        </Sider>
    );
}