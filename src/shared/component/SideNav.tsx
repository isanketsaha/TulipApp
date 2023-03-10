import { Badge, Menu, MenuProps, Modal, Typography, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { SnippetsFilled, ExclamationCircleFilled, EyeFilled, IdcardFilled, FolderOpenFilled,
     LogoutOutlined, FundFilled, UserOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../redux/slices/UserAuthSlice";
import { Role } from "../utils/Role";
interface nav {
    label: string,
    link?: string,
    children?: nav[],
    icon?: React.ReactNode

}

interface ISliderProps {
    collapsed: boolean
    setCollapsed: (value: boolean) => void
}
export const SideNav = ({ collapsed, setCollapsed }: ISliderProps) => {
    const { confirm } = Modal;
    const { Text } = Typography;
    let { pathname } = useLocation();
    const { user } = useAppSelector((state) => state.userAuth);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const [path, setPath] = useState<number>(0);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const logoutUser = () => {
        dispatch(logout());
        navigate("/login");
    }

    useEffect(() => {
        if (pathname != '/') {
            const value = navigatons.find(item => pathname.toUpperCase().split('/').includes(item.label.toUpperCase()));
            value && setPath(navigatons.indexOf(value) + 1)
        }
        else {
            setPath(1)
        }
    }, [pathname])

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

    const showLogoutConfirm = () => {
        confirm({
          title: `Are you sure to Logout ?`,
          icon: <ExclamationCircleFilled />,
          okText: 'Yes',
          okType: 'danger',
          centered: true,
          cancelText: 'No',
          autoFocusButton:"cancel",
          onOk() {
            setTimeout(logoutUser, 300)
          }
        });
      };

    if (user?.authority && [Role.ADMIN].includes(user?.authority)) {
        navigatons.push({
            label: 'Accounts',
            icon: <FundFilled />,
        })
    }

    const options: MenuProps['items'] = navigatons.map(
        (item, index) => {
            const key = String(index + 1);
            const url: string = item.label == 'Office' ? '/' : `/${item.label}`.toLowerCase();
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
            onClick: showLogoutConfirm,
            icon: <LogoutOutlined />,
            style: {}


        } : null);

    return (
        <Sider width={250} collapsible collapsed={collapsed}
            breakpoint="lg"
            onCollapse={(value) => setCollapsed(value)}
            style={{
                background: colorBgContainer,
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                paddingTop: '15vh'
            }}>
            <div hidden={collapsed && user != null} style={{ textAlign: 'center', margin: '5vh' }} >
                <UserOutlined style={{ fontSize: '15vh' }} />
                <div style={{ marginTop: '2vh' }}>
                    <Text strong>{user?.userName}</Text>
                    <br />
                    {
                        import.meta.env.VITE_ENVIRONMENT ?
                            <Badge.Ribbon color={"blue"} text={`${import.meta.env.VITE_ENVIRONMENT}`}>
                                <Text type="secondary">{user?.authority}</Text>
                            </Badge.Ribbon> :
                            <Text type="secondary">{user?.authority}</Text>
                    }
                </div>
            </div>

            <Menu
                mode="vertical"
                style={{ borderRight: 0 }}
                selectedKeys={[String(path)]}
                items={options}
            />
        </Sider>
    );
}