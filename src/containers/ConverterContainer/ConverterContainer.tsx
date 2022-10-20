import React from 'react';

import { Typography, Divider } from 'antd';
const { Title } = Typography;

import { Converter } from 'components/Converter';
import { NS_COMMON } from 'const/app/I18_NAMESPACES';
import { useTranslation } from 'hooks/useTranslation';

import styles from './ConverterContainer.module.less';

const ConverterContainer: React.FC = () => {
    const { t } = useTranslation(NS_COMMON);

    return (
        <div className={styles.cont}>
            <Title>
                {t('pages.converter')}
            </Title>
            <Divider />
            <Converter />
        </div>
    );
};

export default React.memo(ConverterContainer);
