import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const ProductsGrid = asyncComponent(() => import('../../app/eCommerce/ProductsGrid'));

export default Page(() => (
    <>
        <Head>
            <title>ProductsGrid Components</title>
        </Head>
        <div className="app-wrapper">
            <ProductsGrid/>
        </div>
    </>
));