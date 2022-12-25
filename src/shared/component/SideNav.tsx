import { Menu, MenuProps, Typography, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { HighlightFilled, EditFilled, SnippetsFilled, DashboardFilled, EyeFilled, IdcardFilled, FolderOpenFilled, LogoutOutlined, FundFilled, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../redux/slices/UserAuthSlice";
interface nav {
    label: string,
    link?: string,
    children?: nav[],
    icon?: React.ReactNode

}
export const SideNav = () => {

    const { Text } = Typography;
    const userAuth = useAppSelector((state) => state.userAuth);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    let [collapsed, setCollapsed] = useState<boolean>(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const logoutUser = () => {
        sessionStorage.removeItem("tulipAuth");
        dispatch(logout());
        navigate("/login");
    }
    const navigatons: nav[] = [
        {
            label: 'Office',
            icon: <SnippetsFilled />,
            children: [
                {
                    label: 'Fees',
                    icon: <DashboardFilled />
                },
                {
                    label: 'Purchase',
                    icon: <HighlightFilled />
                },
                {
                    label: 'Admission',
                    icon: <EditFilled />
                }
            ]
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
        }, {
            label: 'Accounts',
            icon: <FundFilled />,
        }
    ]

    const options: MenuProps['items'] = navigatons.map(
        (item, index) => {
            const key = String(index + 1);
            const url: string = `/${item.label}`.toLowerCase();
            return {
                key: `sub${key}`,
                label: (<Link to={url}> {item.label} </Link>),
                icon: item.icon,
                children: item.children?.map((_, j) => {
                    const subKey = index * 4 + j + 1;
                    const childUrl: string = `/${_.label}`.toLowerCase();
                    return {
                        key: subKey,
                        label: (<Link to={childUrl}> {_.label} </Link>),
                        icon: _.icon
                    };
                }),
            };
        },
    );

    options.push(userAuth.user != null ?
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
                height: '100vh'
            }}>
            <div hidden={collapsed && userAuth.user != null} style={{  textAlign: 'center' ,margin: '5vh' }} >
                <UserOutlined style={{ fontSize: '15vh' }} />
                <div style={{ marginTop: '2vh' }}>
                    <Text strong>{userAuth.user?.userName}</Text>
                    <br/>
                    <Text type="secondary">{userAuth.user?.authority[0].split("_")[1]}</Text>
                </div>
            </div>

            <Menu
                mode="vertical"
                style={{ borderRight: 0 }}
                items={options}
            />
        </Sider>
    );
}