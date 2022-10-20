import React, { ReactElement } from 'react';

import { Layout as LayoutAnt } from 'antd';

const { Content } = LayoutAnt;

import { Sidebar } from '../Sidebar';
import styles from './Layout.module.less';

interface IProps {
    children?: ReactElement | ReactElement[];
}

const Layout:React.FC<IProps> = ({
    children,
}) => {


    return (
        <LayoutAnt style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Content className={styles.content}>
                {children}
            </Content>
        </LayoutAnt>
    );
};

export default Layout;
