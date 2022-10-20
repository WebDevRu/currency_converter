import React, { ReactElement } from 'react';

import { AppProvider } from 'context/AppContext';
import { ConverterProvider } from 'context/ConverterContext';

interface PropsAppContextProvider {
    children: ReactElement | ReactElement[];
}

const AppContextProvider: React.FC<PropsAppContextProvider> = ({
    children,
}) => {
    return (
        <AppProvider>
            <ConverterProvider>
                {children}
            </ConverterProvider>
        </AppProvider>
    );
};

export default React.memo(AppContextProvider);
