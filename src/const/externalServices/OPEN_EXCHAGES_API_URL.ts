import { BaseCurrencies } from '../converter/BaseCurrencies';

const ROOT_API_URL = 'https://openexchangerates.org/api';

export const CONVERT_API = ({
    value,
    from,
    to
}:{
    value?: number,
    from?: BaseCurrencies,
    to?: BaseCurrencies,
}) => `${ROOT_API_URL}/convert/${value}/${from}/${to}`;

export const LATEST_API = `${ROOT_API_URL}/latest.json`;
