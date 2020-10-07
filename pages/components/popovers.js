import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Popovers = asyncComponent(() => import('../../app/components/Popovers'));

export default Page(() => (
    <>
        <Head>
            <title>Popovers Components</title>
        </Head>
        <div className="app-wrapper">
            <Popovers/>
        </div>
    </>
));