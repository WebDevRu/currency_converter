import React, { useEffect, useState } from 'react';

import {
    UnorderedListOutlined,
    ControlOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { Sider } = Layout;

import {
    HOME_PAGE,
    CURRENCIES_LIST,
} from 'const/app/CLIENT_URL';
import { NS_COMMON } from 'const/app/I18_NAMESPACES';
import { useTranslation } from 'hooks/useTranslation';

const Sidebar: React.FC = () => {
    const { t } = useTranslation(NS_COMMON);
    const router = useRouter();

    const [selectedItemKey, setSelectedItemKey] = useState<string>('1');

    useEffect(() => {
        if (router.pathname === HOME_PAGE) {
            setSelectedItemKey('1');
        }
        if (router.pathname === CURRENCIES_LIST) {
            setSelectedItemKey('2');
        }
    }, [router.pathname]);

    return (
        <Sider collapsible>
            <Menu
                theme="dark"
                defaultSelectedKeys={[selectedItemKey]}
                selectedKeys={[selectedItemKey]}
                mode="inline"
            >
                <Menu.Item key="1" icon={<ControlOutlined />}>
                    <Link
                        href={HOME_PAGE}
                    >
                        <a href={HOME_PAGE} >
                            {t('pages.converter')}
                        </a>
                    </Link>
                </Menu.Item>
                <Menu.Item key='2' icon={<UnorderedListOutlined />}>
                    <Link
                        href={CURRENCIES_LIST}
                    >
                        <a href={CURRENCIES_LIST} >
                            {t('pages.currenciesList')}
                        </a>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default React.memo(Sidebar);
