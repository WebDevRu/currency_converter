import { AppLanguages } from 'const/app/AppLanguages';
import { BaseCurrencies } from 'const/converter/BaseCurrencies';

export interface IAppState {
    language: AppLanguages,
    isInit: boolean,
}

export interface ILatestRatesResponse {
    disclaimer: string,
    license?: string,
    timestamp: number,
    base?: BaseCurrencies,
    rates: Record<string, number>
}
