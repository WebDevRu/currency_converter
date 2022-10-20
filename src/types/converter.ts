import { BaseCurrencies } from "../const/converter/BaseCurrencies";

export interface IConvertBaseCurrency {
    amount: number,
    convertFrom: BaseCurrencies,
}

export interface IConvertingState {
    isConverted: boolean,
    isLoading: boolean,
    amount: number,
    convertFrom: BaseCurrencies,
}
