import { BaseCurrencies } from 'const/converter/BaseCurrencies';
import { isNumber } from 'utils/helpers/isNumber';


const CONVERTS_STRINGS = ['usd in rub', 'rub in usd'];

const createCompletes = (amount:string) => CONVERTS_STRINGS.map((s) => `${amount} ${s}`);

export interface IAutoComplete {
    isValid: boolean,
    convertFrom?: BaseCurrencies,
    autoCompleteStrings: string[],
}

export const getAutoCompleteList = ({ valueString }:{ valueString: string }):IAutoComplete => {
    const stringSplit = valueString.split(' ');

    if (!isNumber(stringSplit[0])) {
        return {
            isValid: false,
            autoCompleteStrings: [],
        };
    }

    if (stringSplit.length <= 2 && !stringSplit[1]) {
        return {
            isValid: false,
            autoCompleteStrings: createCompletes(stringSplit[0]),
        };
    }
    if (stringSplit.length >= 2 && stringSplit[1]) {
        const testStrings = createCompletes(stringSplit[0]).map((s) => s.slice(0, valueString.length));

        const completeIndex = testStrings.findIndex((s) => s === valueString);

        console.log(stringSplit);
        if (completeIndex === -1) {
            return  {
                isValid: false,
                autoCompleteStrings: [],
            };
        }
        if (completeIndex === 0) {
            return  {
                isValid: true,
                autoCompleteStrings: [`${stringSplit[0]} ${CONVERTS_STRINGS[0]}`],
                convertFrom: BaseCurrencies.USD,
            };
        }
        if (completeIndex === 1) {
            return  {
                isValid: true,
                autoCompleteStrings: [`${stringSplit[0]} ${CONVERTS_STRINGS[1]}`],
                convertFrom: BaseCurrencies.Ruble,
            };
        }
    }

    return {
        isValid: false,
        autoCompleteStrings: [],
    };
};
