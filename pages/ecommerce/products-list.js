import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const ProductsList = asyncComponent(() => import('../../app/eCommerce/ProductsList'));

export default Page(() => (
    <>
        <Head>
            <title>ProductsList Components</title>
        </Head>
        <div className="app-wrapper">
            <ProductsList/>
        </div>
    </>
));