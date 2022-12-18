import { Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { HighlightFilled, EditFilled, SnippetsFilled, DashboardFilled, EyeFilled, IdcardFilled, FolderOpenFilled, FundFilled, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
interface nav {
    label: string,
    link?: string,
    children?: nav[],
    icon?: React.ReactNode

}
export const SideNav = () => {

    let [collapsed, setCollapsed] = useState<boolean>(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
                },
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



    return (
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: colorBgContainer }}>
            <div hidden={collapsed} style={{ margin: '5vh' }} >
                <UserOutlined style={{ fontSize: '15vh' }} />
            </div>

            <Menu
                mode="vertical"
                style={{ height: '100%', borderRight: 0 }}
                items={options}
            />
        </Sider>
    );
}