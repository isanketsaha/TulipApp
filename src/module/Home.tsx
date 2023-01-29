import { Breadcrumb, Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { AppHeader } from '../shared/component/Header';
import { SideNav } from '../shared/component/SideNav';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppFooter } from '../shared/component/Footer';
import { useState } from 'react';

export const Home = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    let [collapsed, setCollapsed] = useState<boolean>(false);

    return (
        <Layout >
            <AppHeader />
            <Layout hasSider>
                <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />
                <Layout style={{ marginLeft: !collapsed ? '30vh' : '10vh' }}>
                    <Content
                        style={{
                            margin: '8vh 3vh',
                            overflow: 'initial',
                            minHeight: '90vh',

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