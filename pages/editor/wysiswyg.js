import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const WYSISWYG = asyncComponent(() => import('../../app/editors/WYSISWYG'));

export default Page(() => (
    <>
        <Head>
            <title>WYSISWYG Editors</title>
        </Head>
        <div className="app-wrapper">
            <WYSISWYG/>
        </div>
    </>
));