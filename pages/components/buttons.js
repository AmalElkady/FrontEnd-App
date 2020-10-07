import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Button = asyncComponent(() => import('../../app/components/Button'));

export default Page(() => (
    <>
        <Head>
            <title>Button Components</title>
        </Head>
        <div className="app-wrapper">
            <Button/>
        </div>
    </>
));