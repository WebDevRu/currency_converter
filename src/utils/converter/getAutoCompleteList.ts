import { BaseCurrencies } from 'const/converter/BaseCurrencies';
import { isNumber } from 'utils/helpers/isNumber';


const CONVERTS_STRINGS = ['usd in rub', 'rub in usd'];

const createCompletes = (amount:string) => CONVERTS_STRINGS.map((s) => `${amount} ${s}`);

export interface IAutoComplete {
    isValid: boolean,
    convertFrom?: BaseCurrencies,
    autoCompleteStrings: string[],
    amount?: number,
}

export const getAutoCompleteList = ({ valueString }:{ valueString: string }):IAutoComplete => {
    const stringSplit = valueString.split(' ');

    const amount = stringSplit[0];

    if (!isNumber(amount)) {
        return {
            isValid: false,
            autoCompleteStrings: [],
        };
    }

    if (stringSplit.length <= 2 && !stringSplit[1]) {
        return {
            isValid: false,
            autoCompleteStrings: createCompletes(amount),
        };
    }
    if (stringSplit.length >= 2 && stringSplit[1]) {
        const testStrings = createCompletes(amount).map((s) => s.slice(0, valueString.length));

        const completeIndex = testStrings.findIndex((s) => s === valueString);

        if (completeIndex === -1) {
            return  {
                isValid: false,
                autoCompleteStrings: [],
            };
        }
        if (completeIndex === 0) {
            return  {
                isValid: `${amount} ${CONVERTS_STRINGS[0]}` === valueString,
                autoCompleteStrings: [`${amount} ${CONVERTS_STRINGS[0]}`],
                convertFrom: BaseCurrencies.USD,
                amount: +amount,
            };
        }
        if (completeIndex === 1) {
            return  {
                isValid:`${amount} ${CONVERTS_STRINGS[1]}` === valueString,
                autoCompleteStrings: [`${amount} ${CONVERTS_STRINGS[1]}`],
                convertFrom: BaseCurrencies.Ruble,
                amount: +amount,
            };
        }
    }

    return {
        isValid: false,
        autoCompleteStrings: [],
    };
};
