import React, {
    createContext,
    ReactElement,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';

import { publicConfig } from 'configs/publicConfig';
import { BaseCurrencies } from 'const/converter/BaseCurrencies';
import { CB_RU_LATEST_API } from 'const/externalServices/CB_RU_API_URL';
import { OPEN_EXC_LATEST_API } from 'const/externalServices/OPEN_EXCHAGES_API_URL';
import { RequestMethods, RequestStatuses } from 'const/http';
import { useRequest } from 'hooks/useRequest';
import { ILatestRatesResponse } from 'types/app';
import { IConvertBaseCurrency, IConvertingState } from 'types/converter';

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

export const ConverterProvider = (props: PropsInterface) => {
    const { children } = props;
    const [convertingState, setConvertingState] = useState<IConvertingState>({
        amount: 0,
        isConverted: false,
        isLoading: false,
        convertFrom: BaseCurrencies.USD,
        rates: {
            RUB: {},
            USD: {},
        }
    });

    const {
        state: openExchangeLatestResponse,
        onRequest: onGetOpenExchangeLatestRequest,
    } = useRequest({
        method: RequestMethods.Get,
        url: OPEN_EXC_LATEST_API,
    });

    const {
        state: CBRULatestResponse,
        onRequest: onGetCBRULatestRequest,
    } = useRequest({
        method: RequestMethods.Get,
        url: CB_RU_LATEST_API,
    });

    const onConvertBaseCurrency = useCallback((data:IConvertBaseCurrency) => {
        setConvertingState((c) => ({
            ...c,
            isLoading: true,
        }));

        if (data.convertFrom === BaseCurrencies.USD) {
            onGetOpenExchangeLatestRequest({
                params: {
                    base: data.convertFrom,
                    app_id: publicConfig.openExchangeAppID,
                },
                requestData: {
                    isConvert: true,
                    amount: data.amount,
                }
            });
        } else {
            onGetCBRULatestRequest({
                requestData: {
                    isConvert: true,
                    amount: data.amount,
                }
            });
        }
    }, []);

    const onCleanConvertingResult = useCallback(() => {
        setConvertingState((c) => ({
            ...c,
            amount: 0,
            isConverted: false,
            isLoading: false,
            convertFrom: BaseCurrencies.USD,
        }));
    }, []);

    useEffect(() => {
        const {
            status,
            result,
            request: {
                requestData,
            },
        } = openExchangeLatestResponse;

        const response = result as ILatestRatesResponse;

        if (status === RequestStatuses.Succeeded) {
            setConvertingState((c) => {
                if (requestData.isConvert) {
                    return {
                        isConverted: true,
                        amount: response.rates.RUB * requestData.amount,
                        isLoading: false,
                        convertFrom: BaseCurrencies.USD,
                        rates: {
                            ...c.rates,
                            USD: response.rates,
                        }
                    };
                } else {
                    return {
                        ...c,
                        rates: {
                            ...c.rates,
                            USD: response.rates,
                        }
                    };
                }
            });
        }
    }, [openExchangeLatestResponse.status]);

    useEffect(() => {
        const {
            status,
            result,
            request: {
                requestData,
            },
        } = CBRULatestResponse;

        const response = result as ILatestRatesResponse;

        if (status === RequestStatuses.Succeeded) {
            setConvertingState((c) => {
                if (requestData.isConvert) {
                    return {
                        isConverted: true,
                        amount: response.rates.USD * requestData.amount,
                        isLoading: false,
                        convertFrom: BaseCurrencies.Ruble,
                        rates: {
                            ...c.rates,
                            RUB: response.rates,
                        }
                    };
                } else {
                    return {
                        ...c,
                        rates: {
                            ...c.rates,
                            RUB: response.rates,
                        }
                    };
                }
            });
        }
    }, [CBRULatestResponse.status]);

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
