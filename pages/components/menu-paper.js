import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const MenuNPaper = asyncComponent(() => import('../../app/components/MenuNPaper'));

export default Page(() => (
    <>
        <Head>
            <title>MenuNPaper Components</title>
        </Head>
        <div className="app-wrapper">
            <MenuNPaper/>
        </div>
    </>
));