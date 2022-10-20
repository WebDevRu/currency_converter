import React from 'react';

import styles from './CurrenciesListContainer.module.less';

const ProfileEditorContainer: React.FC = () => {

    return (
        <div className={styles.cont}>
            CurrenciesList
        </div>
    );
};

export default React.memo(ProfileEditorContainer);
