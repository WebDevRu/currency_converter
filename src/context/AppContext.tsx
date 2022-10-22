import React, {
    useState,
    createContext,
    useContext,
    ReactElement,
    useEffect,
} from 'react';

import { getUserLocale } from 'get-user-locale';

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

    useEffect(() => {
        const myLanguage = getUserLocale();
        const languageSplit = myLanguage.split('-');
        if (languageSplit[0] === 'ru') {
            setAppState({
                isInit: true,
                language: AppLanguages.Russian,
            });
        } else {
            setAppState({
                isInit: true,
                language: AppLanguages.English,
            });
        }
    }, []);

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
