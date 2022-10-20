import React from 'react';

import styles from './ConverterContainer.module.less';

const ConverterContainer: React.FC = () => {

    return (
        <div className={styles.cont}>
            CurrenciesList
        </div>
    );
};

export default React.memo(ConverterContainer);
