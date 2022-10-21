import React, { useState } from 'react';


import { AutoComplete, Form, Typography, Spin } from 'antd';

import { NS_COMMON } from 'const/app/I18_NAMESPACES';
import { BaseCurrencies } from 'const/converter/BaseCurrencies';
import { useConverter } from 'context/ConverterContext';
import { useTranslation } from 'hooks/useTranslation';
import { getAutoCompleteList, IAutoComplete } from 'utils/converter/getAutoCompleteList';

import styles from './Converter.module.less';

const Converter: React.FC = () => {
    const [form] = Form.useForm();

    const { t } = useTranslation(NS_COMMON);

    const {
        onConvertBaseCurrency,
        convertingState,
        onCleanConvertingResult,
    } = useConverter();

    const [validateStatus, setValidateStatus] = useState<'success' | 'error'>('success');

    const [formState, setFormState] = useState<IAutoComplete>({
        isValid: false,
        autoCompleteStrings: [],
    });

    const onSearch = (searchText: string) => {
        const result = getAutoCompleteList({
            valueString: searchText,
        });
        setFormState(result);
    };

    const onSubmit = async () => {
        if (formState.isValid) {
            onConvertBaseCurrency({
                amount: formState.amount || 0,
                convertFrom: formState.convertFrom as BaseCurrencies,
            });
        } else {
            setValidateStatus('error');
        }
    };

    const onChange = (value:string) => {
        onSearch(value);
        onCleanConvertingResult();
        setValidateStatus('success');
    };

    return (
        <div className={styles.cont}>
            <Form
                layout="vertical"
                form={form}
                onFinish={onSubmit}
            >
                <div className={styles.inputCont}>
                    <Form.Item
                        name='entities'
                        validateStatus={validateStatus}
                        rules={[{
                            required: true,
                            message: t('validError')
                        }]}
                    >
                        <AutoComplete
                            allowClear
                            //value={categoriesOptions.searchValue}
                            style={{ width: 200 }}
                            onChange={onChange}
                            placeholder={t('enterCurrency')}
                            options={!formState.isValid ? formState.autoCompleteStrings.map((option) => ({
                                value: option,
                                label: option,
                            })) : []}
                        />
                    </Form.Item>
                    {convertingState.isLoading ? (
                        <Spin />
                    ) : (
                        <Typography className={styles.resultText}>
                            {`= ${convertingState.amount.toFixed(2)}`}
                        </Typography>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default React.memo(Converter);
