import React, {
    useState,
    createContext,
    useContext,
    ReactElement,
} from 'react';

import { IAppState } from 'types/app';

import { AppLanguages } from '../const/app/AppLanguages';


interface IContext {
    appState: IAppState,
}

const AppContext = createContext({} as IContext);
export const useApp = () => useContext(AppContext);

interface PropsInterface {
    children: ReactElement | ReactElement[];
}

export const AppProvider = (props: PropsInterface) => {
    const { children } = props;
    const [appState, setAppState] = useState<IAppState>({
        isInit: false,
        language: AppLanguages.English,
    });

    return (
        <AppContext.Provider
            value={{
                appState,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
