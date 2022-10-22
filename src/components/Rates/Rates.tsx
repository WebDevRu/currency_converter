import React, { useEffect, useMemo, useState } from 'react';

import { Table, Select, Typography } from 'antd';

const { Option } = Select;

import { AppLanguages } from 'const/app/AppLanguages';
import { NS_COMMON } from 'const/app/I18_NAMESPACES';
import { BaseCurrencies } from 'const/converter/BaseCurrencies';
import { useApp } from 'context/AppContext';
import { useConverter } from 'context/ConverterContext';
import { useTranslation } from 'hooks/useTranslation';

import styles from './Rates.module.less';

const Rates: React.FC = () => {
    const {
        appState,
    } = useApp();

    const {
        convertingState,
        onLoadCurrencyRates,
    } = useConverter();

    const { t } = useTranslation(NS_COMMON);

    const [rates, setRates] = useState<{
        list: Record<string, number>,
        base: BaseCurrencies,
    }>({
        list: {},
        base: appState.language === AppLanguages.English ? BaseCurrencies.USD : BaseCurrencies.Ruble,
    });

    useEffect(() => {
        setRates((c) => ({
            ...c,
            list: convertingState.rates[c.base],
        }));
    }, [rates.base, convertingState.rates]);

    const COLUMNS = [
        {
            title: t('currency'),
            dataIndex: 'currencyCode',
            key: 'currencyCode',
        },
        {
            title: `1 ${rates.base} =`,
            dataIndex: 'value',
            key: 'value',
        },
    ];

    const dataSource = useMemo(() => {
        const resultArr = [];
        const {
            list,
        } = rates;

        const listCopy = { ...list };

        if (listCopy[BaseCurrencies.USD]) {
            resultArr.push({
                currencyCode: BaseCurrencies.USD,
                value: listCopy[BaseCurrencies.USD],
            });

            delete listCopy[BaseCurrencies.USD];
        }

        if (listCopy[BaseCurrencies.Ruble]) {
            resultArr.push({
                currencyCode: BaseCurrencies.Ruble,
                value: listCopy[BaseCurrencies.Ruble],
            });

            delete listCopy[BaseCurrencies.Ruble];
        }

        for (const key in listCopy) {
            resultArr.push({
                currencyCode: key,
                value: listCopy[key],
            });
        }

        return resultArr;
    }, [rates.list]);

    const onBaseSelectChanged = (value:string) => {
        setRates({
            base: value as BaseCurrencies,
            list: {},
        });
    };

    useEffect(() => {
        onLoadCurrencyRates({
            base: rates.base
        });
    }, [rates.base]);

    return (
        <div>
            <div className={styles.selectRow}>
                <Typography>
                    {t('baseCurrency')}
                </Typography>
                <Select
                    defaultValue={rates.base}
                    onChange={onBaseSelectChanged}
                >
                    <Option value={BaseCurrencies.USD}>{BaseCurrencies.USD}</Option>
                    <Option value={BaseCurrencies.Ruble}>{BaseCurrencies.Ruble}</Option>
                </Select>
            </div>
            <Table dataSource={dataSource} columns={COLUMNS} />;
        </div>
    );
};

export default React.memo(Rates);
