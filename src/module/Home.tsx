import { Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { AppHeader } from '../shared/component/Header';
import { SideNav } from '../shared/component/SideNav';
import { Outlet } from 'react-router-dom';
import { AppFooter } from '../shared/component/Footer';

export const Home = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <AppHeader />
            <Layout>
                <SideNav />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            overflow: 'initial',
                            minHeight: '80vh',
                            background: colorBgContainer,
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