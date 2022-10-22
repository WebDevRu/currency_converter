import React from 'react';

import { Typography, Divider } from 'antd';
const { Title } = Typography;

import { Rates } from 'components/Rates';
import { NS_COMMON } from 'const/app/I18_NAMESPACES';
import { useTranslation } from 'hooks/useTranslation';

import styles from './CurrenciesListContainer.module.less';

const ProfileEditorContainer: React.FC = () => {
    const { t } = useTranslation(NS_COMMON);

    return (
        <div className={styles.cont}>
            <Title>
                {t('pages.currenciesRates')}
            </Title>
            <Divider />
            <Rates />
        </div>
    );
};

export default React.memo(ProfileEditorContainer);
