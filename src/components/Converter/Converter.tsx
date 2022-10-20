import React, { useState } from 'react';


import { AutoComplete, Form } from 'antd';

import { NS_COMMON } from 'const/app/I18_NAMESPACES';
import { useTranslation } from 'hooks/useTranslation';
import { getAutoCompleteList, IAutoComplete } from 'utils/converter/getAutoCompleteList';

import styles from './Converter.module.less';

const Converter: React.FC = () => {
    const [form] = Form.useForm();

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

    const onSubmit = async (values:Record<string, string>) => {
        console.log(values);
    };

    return (
        <div>
            <Form
                layout="vertical"
                form={form}
                onFinish={onSubmit}
            >
                <Form.Item
                    name='entities'
                >
                    <AutoComplete
                        allowClear
                        //value={categoriesOptions.searchValue}
                        className={styles.categoriesSelect}
                        style={{ width: 200 }}
                        onSearch={onSearch}
                        placeholder='Select entities'
                        options={formState.autoCompleteStrings.map((option) => ({
                            value: option,
                            label: option,
                        }))}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default React.memo(Converter);
