import React from 'react';

import type { NextPage, NextPageContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from 'components/Common/Layout';
import { NS_COMMON } from 'const/app/I18_NAMESPACES';
import { CurrenciesListContainer } from 'containers/CurrenciesListContainer';

const Home: NextPage = () => {
    return (
        <Layout>
            <CurrenciesListContainer />
        </Layout>
    );
};

export const getServerSideProps = async ({ locale }: NextPageContext) => {
    return ({
        props: {
            ...(await serverSideTranslations(locale as string, [
                NS_COMMON,
            ])),
            locale,
        },
    });
};

export default Home;
