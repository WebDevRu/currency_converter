/* eslint-disable import/order */
import React, {
    createContext,
    ReactElement,
    useCallback,
    useContext,
    useState
} from 'react';

import { IConvertBaseCurrency, IConvertingState } from 'types/converter';
import { BaseCurrencies } from 'const/converter/BaseCurrencies';
import { useRequest } from 'hooks/useRequest';
import { RequestMethods } from 'const/http';
import { CONVERT_API } from 'const/externalServices/OPEN_EXCHAGES_API_URL';
import { publicConfig } from 'configs/publicConfig';


interface IContext {
    convertingState: IConvertingState,
    onConvertBaseCurrency: (data:IConvertBaseCurrency) => void,
    onCleanConvertingResult: () => void,
}

const ConverterContext = createContext({} as IContext);
export const useConverter = () => useContext(ConverterContext);

interface PropsInterface {
    children: ReactElement | ReactElement[];
}

const INITIAL_STATE = {
    amount: 0,
    isConverted: false,
    isLoading: false,
    convertFrom: BaseCurrencies.USD,
};

export const ConverterProvider = (props: PropsInterface) => {
    const { children } = props;
    const [convertingState, setConvertingState] = useState<IConvertingState>(INITIAL_STATE);


    const {
        state: convertResponse,
        onRequest: onConvertRequest,
    } = useRequest({
        method: RequestMethods.Get,
        url: CONVERT_API,
    });

    const onConvertBaseCurrency = useCallback((data:IConvertBaseCurrency) => {
        setConvertingState((c) => ({
            ...c,
            isLoading: true,
        }));

        onConvertRequest({
            nestedId: {
                value: data.amount,
                from: data.convertFrom,
                to: data.convertFrom === BaseCurrencies.USD ? BaseCurrencies.USD : BaseCurrencies.Ruble,
            },
            params: {
                app_id: publicConfig.openExchangeAppID,
            }
        });
    }, []);

    const onCleanConvertingResult = useCallback(() => {
        setConvertingState(INITIAL_STATE);
    }, []);

    return (
        <ConverterContext.Provider
            value={{
                onConvertBaseCurrency,
                convertingState,
                onCleanConvertingResult,
            }}
        >
            {children}
        </ConverterContext.Provider>
    );
};
