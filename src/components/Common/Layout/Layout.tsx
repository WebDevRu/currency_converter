import React, { ReactElement } from 'react';

import { Layout as LayoutAnt, Spin } from 'antd';

const { Content } = LayoutAnt;

import { useApp } from 'context/AppContext';

import { Sidebar } from '../Sidebar';
import styles from './Layout.module.less';

interface IProps {
    children?: ReactElement | ReactElement[];
}

const Layout:React.FC<IProps> = ({
    children,
}) => {
    const {
        appState,
    } = useApp();

    return (
        <LayoutAnt style={{ minHeight: '100vh' }}>
            {appState.isInit ? (
                <>
                    <Sidebar />
                    <Content className={styles.content}>
                        {children}
                    </Content>
                </>
            ):(
                <div className={styles.loaderCont}>
                    <Spin />
                </div>
            )}
        </LayoutAnt>
    );
};

export default Layout;
