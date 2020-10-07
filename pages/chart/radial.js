import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Radial = asyncComponent(() => import('../../app/charts/Radial'));

export default Page(() => (
    <>
        <Head>
            <title>Radial Charts</title>
        </Head>
        <div className="app-wrapper">
            <Radial/>
        </div>
    </>
));