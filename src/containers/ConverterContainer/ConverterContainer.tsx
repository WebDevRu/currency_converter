import React from 'react';

import { NS_COMMON } from 'const/app/I18_NAMESPACES';
import { useTranslation } from 'hooks/useTranslation';

import styles from './ConverterContainer.module.less';

const ConverterContainer: React.FC = () => {
    const { t } = useTranslation(NS_COMMON);

    return (
        <div className={styles.cont}>
            {t('test')}
        </div>
    );
};

export default React.memo(ConverterContainer);
